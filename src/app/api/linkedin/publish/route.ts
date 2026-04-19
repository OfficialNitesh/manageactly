// src/app/api/linkedin/publish/route.ts
// Manually publish a post to LinkedIn immediately.
// Used when user clicks "Publish Now" (not scheduled).
// The cron job uses the same lib/linkedin.ts functions for scheduled posts.

import { NextResponse } from "next/server";
import { z } from "zod";
import {
  requireAuth,
  requireWorkspaceMember,
  requireActiveSubscription,
  withErrorHandling,
  badRequest,
  ApiError,
} from "@/lib/api";
import { publishToLinkedIn, LinkedInPublishError } from "@/lib/linkedin";
import db from "@/lib/db";

const schema = z.object({
  postId: z.string().min(1),
  workspaceId: z.string().min(1),
});

export const POST = withErrorHandling(async (req: Request) => {
  const { session } = await requireAuth();
  const body = await req.json();

  const parsed = schema.safeParse(body);
  if (!parsed.success) return badRequest(parsed.error.errors[0].message);

  const { postId, workspaceId } = parsed.data;

  // Auth checks
  await requireWorkspaceMember(session.user.id, workspaceId);
  await requireActiveSubscription(workspaceId);

  // Fetch post — verify it belongs to this workspace
  const post = await db.post.findUnique({
    where: { id: postId },
  });

  if (!post || post.workspaceId !== workspaceId || post.deletedAt) {
    throw new ApiError(404, "Post not found");
  }

  if (post.status === "PUBLISHED") {
    throw new ApiError(400, "Post is already published");
  }

  if (post.status === "PUBLISHING") {
    throw new ApiError(400, "Post is currently being published");
  }

  // Fetch LinkedIn connection
  const connection = await db.socialConnection.findUnique({
    where: {
      workspaceId_platform: { workspaceId, platform: "LINKEDIN" },
    },
  });

  if (!connection || connection.revokedAt) {
    throw new ApiError(400, "LinkedIn account not connected. Please connect in Settings.");
  }

  // Mark as PUBLISHING (prevents duplicate publish if user clicks twice)
  await db.post.update({
    where: { id: postId },
    data: { status: "PUBLISHING" },
  });

  try {
    const result = await publishToLinkedIn(connection, post.content);

    // Mark as published
    await db.post.update({
      where: { id: postId },
      data: {
        status: "PUBLISHED",
        publishedAt: new Date(),
        platformPostId: result.linkedInPostId,
        failureReason: null,
      },
    });

    // Audit log
    await db.auditLog.create({
      data: {
        workspaceId,
        actorId: session.user.id,
        actorEmail: session.user.email ?? undefined,
        action: "post.published",
        entity: "Post",
        entityId: postId,
        metadata: { platform: "LINKEDIN", linkedInPostId: result.linkedInPostId },
      },
    });

    return NextResponse.json({
      success: true,
      linkedInPostId: result.linkedInPostId,
    });
  } catch (error) {
    // Revert status to DRAFT so user can retry
    const failureReason =
      error instanceof Error ? error.message : "Unknown error";

    await db.post.update({
      where: { id: postId },
      data: {
        status: "FAILED",
        failureReason,
        retryCount: { increment: 1 },
        lastRetriedAt: new Date(),
      },
    });

    if (error instanceof LinkedInPublishError) {
      throw new ApiError(
        error.statusCode >= 500 ? 502 : 400,
        `LinkedIn publish failed: ${error.message}`
      );
    }

    throw error;
  }
});
