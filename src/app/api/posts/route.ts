// src/app/api/posts/route.ts
// Post management — create and list posts.
// Separate routes handle publish (/api/linkedin/publish) and delete (/api/posts/[id]).

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
import db from "@/lib/db";

// ─── Create post ──────────────────────────────────────────────────────────────

const createSchema = z.object({
  workspaceId: z.string().min(1),
  content: z.string().min(1, "Content is required").max(3000, "Content too long"),
  platform: z.enum(["LINKEDIN"]).default("LINKEDIN"),
  scheduledAt: z.string().datetime().optional().nullable(),
  aiGenerated: z.boolean().default(false),
  aiPrompt: z.string().optional(),
  hashtags: z.array(z.string()).default([]),
});

export const POST = withErrorHandling(async (req: Request) => {
  const { session } = await requireAuth();
  const body = await req.json();

  const parsed = createSchema.safeParse(body);
  if (!parsed.success) return badRequest(parsed.error.errors[0].message);

  const { workspaceId, content, platform, scheduledAt, aiGenerated, aiPrompt, hashtags } =
    parsed.data;

  await requireWorkspaceMember(session.user.id, workspaceId);
  const subscription = await requireActiveSubscription(workspaceId);

  // Check monthly post limit
  const startOfMonth = new Date();
  startOfMonth.setDate(1);
  startOfMonth.setHours(0, 0, 0, 0);

  const postsThisMonth = await db.post.count({
    where: {
      workspaceId,
      createdAt: { gte: startOfMonth },
      deletedAt: null,
      status: { not: "DRAFT" }, // Drafts don't count against limit
    },
  });

  if (postsThisMonth >= subscription.postsPerMonth) {
    throw new ApiError(
      403,
      `Monthly post limit reached (${subscription.postsPerMonth} on ${subscription.plan} plan). Upgrade to post more.`
    );
  }

  // Validate scheduled time is in the future
  let parsedScheduledAt: Date | null = null;
  if (scheduledAt) {
    parsedScheduledAt = new Date(scheduledAt);
    if (parsedScheduledAt <= new Date()) {
      return badRequest("Scheduled time must be in the future");
    }
  }

  const post = await db.post.create({
    data: {
      workspaceId,
      content,
      platform,
      status: parsedScheduledAt ? "SCHEDULED" : "DRAFT",
      scheduledAt: parsedScheduledAt,
      aiGenerated,
      aiPrompt: aiGenerated ? aiPrompt : null,
      aiModel: aiGenerated ? "gpt-4o-mini" : null,
      hashtags,
      createdByUserId: session.user.id,
    },
  });

  await db.auditLog.create({
    data: {
      workspaceId,
      actorId: session.user.id,
      actorEmail: session.user.email ?? undefined,
      action: parsedScheduledAt ? "post.scheduled" : "post.created",
      entity: "Post",
      entityId: post.id,
      metadata: { platform, aiGenerated, scheduledAt },
    },
  });

  return NextResponse.json({ post }, { status: 201 });
});

// ─── List posts ───────────────────────────────────────────────────────────────

export const GET = withErrorHandling(async (req: Request) => {
  const { session } = await requireAuth();
  const url = new URL(req.url);

  const workspaceId = url.searchParams.get("workspaceId");
  const status = url.searchParams.get("status"); // optional filter
  const page = Math.max(1, parseInt(url.searchParams.get("page") ?? "1"));
  const limit = Math.min(50, parseInt(url.searchParams.get("limit") ?? "20"));

  if (!workspaceId) return badRequest("workspaceId is required");

  await requireWorkspaceMember(session.user.id, workspaceId);

  const where = {
    workspaceId,
    deletedAt: null,
    ...(status && { status: status as "DRAFT" | "SCHEDULED" | "PUBLISHED" | "FAILED" }),
  };

  const [posts, total] = await Promise.all([
    db.post.findMany({
      where,
      orderBy: [{ scheduledAt: "desc" }, { createdAt: "desc" }],
      skip: (page - 1) * limit,
      take: limit,
      select: {
        id: true,
        content: true,
        platform: true,
        status: true,
        scheduledAt: true,
        publishedAt: true,
        platformPostId: true,
        failureReason: true,
        aiGenerated: true,
        hashtags: true,
        createdAt: true,
        updatedAt: true,
      },
    }),
    db.post.count({ where }),
  ]);

  return NextResponse.json({
    posts,
    pagination: {
      total,
      page,
      limit,
      pages: Math.ceil(total / limit),
    },
  });
});
