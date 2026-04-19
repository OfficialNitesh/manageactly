// src/app/api/cron/publish/route.ts
// DB-based scheduler for publishing scheduled posts.
//
// How it works:
// 1. Called by an external cron service (Vercel Cron, GitHub Actions, cron-job.org)
//    every minute via: GET /api/cron/publish
// 2. Queries posts WHERE status=SCHEDULED AND scheduledAt <= now()
// 3. Claims each post atomically (sets status=PUBLISHING) before processing
// 4. Publishes to LinkedIn
// 5. Marks PUBLISHED or FAILED
//
// Idempotency: the PUBLISHING status + publishingLockAt act as a distributed lock.
// If the serverless function times out mid-publish, the post stays in PUBLISHING.
// A separate cleanup job (or manual intervention) can reset stale PUBLISHING posts.
//
// No Redis needed at this scale. At >1000 posts/min, migrate to BullMQ.
//
// Security: protected by CRON_SECRET header (set in Vercel Cron config)

import { NextResponse } from "next/server";
import db from "@/lib/db";
import { publishToLinkedIn, LinkedInPublishError } from "@/lib/linkedin";

const MAX_POSTS_PER_RUN = 20;       // prevent timeout on large backlogs
const MAX_RETRY_ATTEMPTS = 3;       // posts failing 3+ times won't be retried
const LOCK_TIMEOUT_MINUTES = 10;    // reclaim posts stuck in PUBLISHING > 10min

export async function GET(req: Request) {
  // Verify cron secret
  const secret = req.headers.get("x-cron-secret") ??
    new URL(req.url).searchParams.get("secret");

  if (secret !== process.env.CRON_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const startTime = Date.now();
  const results = {
    processed: 0,
    published: 0,
    failed: 0,
    skipped: 0,
  };

  try {
    // ── Step 1: Reclaim stale PUBLISHING posts (timed out previous runs) ──
    const staleThreshold = new Date(Date.now() - LOCK_TIMEOUT_MINUTES * 60 * 1000);

    await db.post.updateMany({
      where: {
        status: "PUBLISHING",
        publishingLockAt: { lt: staleThreshold },
      },
      data: {
        status: "SCHEDULED", // back to scheduled so next cron picks it up
        publishingLockAt: null,
      },
    });

    // ── Step 2: Fetch due scheduled posts ────────────────────────────────
    const duePosts = await db.post.findMany({
      where: {
        status: "SCHEDULED",
        scheduledAt: { lte: new Date() },
        deletedAt: null,
        retryCount: { lt: MAX_RETRY_ATTEMPTS },
      },
      orderBy: { scheduledAt: "asc" }, // oldest first
      take: MAX_POSTS_PER_RUN,
      include: {
        workspace: {
          include: {
            socialConnections: {
              where: {
                platform: "LINKEDIN",
                revokedAt: null,
              },
              take: 1,
            },
            subscription: {
              select: { status: true },
            },
          },
        },
      },
    });

    if (duePosts.length === 0) {
      return NextResponse.json({
        message: "No posts due",
        duration: Date.now() - startTime,
      });
    }

    // ── Step 3: Process each post ─────────────────────────────────────────
    for (const post of duePosts) {
      results.processed++;

      // Check workspace subscription is active
      const subscription = post.workspace.subscription;
      if (!subscription || !["ACTIVE", "TRIALING"].includes(subscription.status)) {
        // Don't fail the post — just skip it (subscription may renew)
        results.skipped++;
        continue;
      }

      // Check LinkedIn connection exists
      const connection = post.workspace.socialConnections[0];
      if (!connection) {
        await markFailed(
          post.id,
          post.workspaceId,
          "LinkedIn account not connected",
          post.retryCount
        );
        results.failed++;
        continue;
      }

      // ── Step 3a: Claim the post (atomic lock) ─────────────────────────
      // Only update if still in SCHEDULED status (prevents race conditions
      // if two cron instances run simultaneously)
      const claimed = await db.post.updateMany({
        where: {
          id: post.id,
          status: "SCHEDULED", // guard clause
        },
        data: {
          status: "PUBLISHING",
          publishingLockAt: new Date(),
        },
      });

      if (claimed.count === 0) {
        // Another instance claimed this post — skip
        results.skipped++;
        continue;
      }

      // ── Step 3b: Publish ───────────────────────────────────────────────
      try {
        const result = await publishToLinkedIn(connection, post.content);

        await db.post.update({
          where: { id: post.id },
          data: {
            status: "PUBLISHED",
            publishedAt: new Date(),
            platformPostId: result.linkedInPostId,
            failureReason: null,
            publishingLockAt: null,
          },
        });

        await db.auditLog.create({
          data: {
            workspaceId: post.workspaceId,
            actorId: null, // cron = system actor
            action: "post.published",
            entity: "Post",
            entityId: post.id,
            metadata: {
              platform: "LINKEDIN",
              linkedInPostId: result.linkedInPostId,
              scheduledAt: post.scheduledAt,
              source: "cron",
            },
          },
        });

        results.published++;
      } catch (error) {
        const isRetryable =
          error instanceof LinkedInPublishError && error.isRetryable;
        const reason =
          error instanceof Error ? error.message : "Unknown publish error";

        if (isRetryable && post.retryCount < MAX_RETRY_ATTEMPTS - 1) {
          // Put back to SCHEDULED for next cron run
          await db.post.update({
            where: { id: post.id },
            data: {
              status: "SCHEDULED",
              retryCount: { increment: 1 },
              lastRetriedAt: new Date(),
              failureReason: `Retrying: ${reason}`,
              publishingLockAt: null,
            },
          });
        } else {
          await markFailed(post.id, post.workspaceId, reason, post.retryCount);
        }

        results.failed++;
        console.error(`[Cron] Failed to publish post ${post.id}:`, error);
      }
    }
  } catch (error) {
    console.error("[Cron] Fatal error:", error);
    return NextResponse.json(
      {
        error: "Cron job failed",
        duration: Date.now() - startTime,
        results,
      },
      { status: 500 }
    );
  }

  console.log("[Cron] Run complete:", results);

  return NextResponse.json({
    message: "Cron run complete",
    duration: Date.now() - startTime,
    results,
  });
}

async function markFailed(
  postId: string,
  workspaceId: string,
  reason: string,
  retryCount: number
) {
  await db.post.update({
    where: { id: postId },
    data: {
      status: "FAILED",
      failureReason: reason,
      retryCount: retryCount + 1,
      lastRetriedAt: new Date(),
      publishingLockAt: null,
    },
  });

  await db.auditLog.create({
    data: {
      workspaceId,
      actorId: null,
      action: "post.failed",
      entity: "Post",
      entityId: postId,
      metadata: { reason, retryCount: retryCount + 1, source: "cron" },
    },
  });
}
