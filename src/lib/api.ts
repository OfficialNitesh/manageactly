// src/lib/api.ts
// Reusable utilities for API routes.
// Uses NextAuth v4's getServerSession.

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import db from "@/lib/db";
import { NextResponse } from "next/server";
import type { SubscriptionPlan } from "@prisma/client";

// ─── Error responses ──────────────────────────────────────────────────────────

export function unauthorized(message = "Unauthorized") {
  return NextResponse.json({ error: message }, { status: 401 });
}

export function forbidden(message = "Forbidden") {
  return NextResponse.json({ error: message }, { status: 403 });
}

export function badRequest(message: string) {
  return NextResponse.json({ error: message }, { status: 400 });
}

export function notFound(message = "Not found") {
  return NextResponse.json({ error: message }, { status: 404 });
}

export function serverError(message = "Internal server error") {
  return NextResponse.json({ error: message }, { status: 500 });
}

// ─── Custom error ─────────────────────────────────────────────────────────────

export class ApiError extends Error {
  constructor(public readonly status: number, message: string) {
    super(message);
    this.name = "ApiError";
  }
}

// ─── Auth guard ───────────────────────────────────────────────────────────────

export async function requireAuth() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    throw new ApiError(401, "Authentication required");
  }
  return { session };
}

// ─── Workspace guard ─────────────────────────────────────────────────────────

export async function requireWorkspaceMember(userId: string, workspaceId: string) {
  const membership = await db.workspaceMember.findUnique({
    where: { workspaceId_userId: { workspaceId, userId } },
    include: {
      workspace: {
        select: { id: true, name: true, slug: true, deletedAt: true },
      },
    },
  });

  if (!membership || membership.workspace.deletedAt) {
    throw new ApiError(403, "Workspace not found or access denied");
  }

  return membership;
}

export async function requireWorkspaceAdmin(userId: string, workspaceId: string) {
  const membership = await requireWorkspaceMember(userId, workspaceId);
  if (membership.role === "MEMBER") {
    throw new ApiError(403, "Admin access required");
  }
  return membership;
}

// ─── Subscription guard ───────────────────────────────────────────────────────

const PLAN_LIMITS: Record<SubscriptionPlan, { postsPerMonth: number; aiCreditsPerMonth: number }> = {
  FREE:       { postsPerMonth: 10,     aiCreditsPerMonth: 20     },
  STARTER:    { postsPerMonth: 50,     aiCreditsPerMonth: 100    },
  PRO:        { postsPerMonth: 200,    aiCreditsPerMonth: 500    },
  ENTERPRISE: { postsPerMonth: 999999, aiCreditsPerMonth: 999999 },
};

export async function requireActiveSubscription(workspaceId: string) {
  const subscription = await db.subscription.findUnique({ where: { workspaceId } });

  if (!subscription) {
    throw new ApiError(403, "No subscription found. Please subscribe to continue.");
  }

  const isActive = ["ACTIVE", "TRIALING"].includes(subscription.status);
  if (!isActive) {
    throw new ApiError(403, "Subscription inactive. Please renew to continue.");
  }

  if (
    subscription.status === "TRIALING" &&
    subscription.trialEndsAt &&
    subscription.trialEndsAt < new Date()
  ) {
    db.subscription
      .update({ where: { workspaceId }, data: { status: "PAST_DUE" } })
      .catch(console.error);
    throw new ApiError(403, "Trial expired. Please subscribe to continue.");
  }

  return subscription;
}

export async function requireAiCredits(workspaceId: string) {
  const subscription = await requireActiveSubscription(workspaceId);

  const startOfMonth = new Date();
  startOfMonth.setDate(1);
  startOfMonth.setHours(0, 0, 0, 0);

  const used = await db.post.count({
    where: {
      workspaceId,
      aiGenerated: true,
      createdAt: { gte: startOfMonth },
      deletedAt: null,
    },
  });

  const limit = PLAN_LIMITS[subscription.plan].aiCreditsPerMonth;

  if (used >= limit) {
    throw new ApiError(
      403,
      `AI credit limit reached (${limit}/month on ${subscription.plan} plan). Upgrade to generate more.`
    );
  }

  return { used, limit, plan: subscription.plan };
}

// ─── Error handler wrapper ────────────────────────────────────────────────────

export function withErrorHandling(
  handler: (req: Request, ctx?: unknown) => Promise<NextResponse>
) {
  return async (req: Request, ctx?: unknown): Promise<NextResponse> => {
    try {
      return await handler(req, ctx);
    } catch (error) {
      if (error instanceof ApiError) {
        return NextResponse.json({ error: error.message }, { status: error.status });
      }
      console.error("[API Error]", error);
      return serverError();
    }
  };
}
