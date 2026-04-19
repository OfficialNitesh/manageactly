// src/app/api/payments/checkout/route.ts
// Creates a Razorpay subscription and returns the subscription ID + key
// for the frontend to open Razorpay Checkout.

import { NextResponse } from "next/server";
import { z } from "zod";
import {
  requireAuth,
  requireWorkspaceMember,
  withErrorHandling,
  badRequest,
  ApiError,
} from "@/lib/api";
import {
  createRazorpaySubscription,
  RAZORPAY_PLANS,
} from "@/lib/payments/razorpay";
import db from "@/lib/db";
import type { SubscriptionPlan } from "@prisma/client";

const schema = z.object({
  workspaceId: z.string().min(1),
  plan: z.enum(["STARTER", "PRO", "ENTERPRISE"]),
});

const PLAN_IDS: Record<"STARTER" | "PRO" | "ENTERPRISE", string> = {
  STARTER:    RAZORPAY_PLANS.STARTER,
  PRO:        RAZORPAY_PLANS.PRO,
  ENTERPRISE: RAZORPAY_PLANS.ENTERPRISE,
};

export const POST = withErrorHandling(async (req: Request) => {
  const { session } = await requireAuth();
  const body = await req.json();

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return badRequest(parsed.error.errors[0].message);
  }

  const { workspaceId, plan } = parsed.data;

  // Verify membership
  await requireWorkspaceMember(session.user.id, workspaceId);

  // Fetch workspace + current subscription
  const workspace = await db.workspace.findUnique({
    where: { id: workspaceId },
    include: { subscription: true },
  });

  if (!workspace) throw new ApiError(404, "Workspace not found");

  // Prevent double-subscribing to same plan
  if (
    workspace.subscription?.status === "ACTIVE" &&
    workspace.subscription.plan === plan
  ) {
    throw new ApiError(400, "Already subscribed to this plan");
  }

  // Fetch user details for Razorpay
  const user = await db.user.findUnique({
    where: { id: session.user.id },
    select: { email: true, name: true },
  });

  if (!user?.email) throw new ApiError(400, "User email required");

  const planId = PLAN_IDS[plan];
  if (!planId) throw new ApiError(400, "Invalid plan selected");

  // Create Razorpay subscription
  const razorpaySubscription = await createRazorpaySubscription({
    planId,
    customerEmail: user.email,
    customerName: user.name ?? user.email,
    workspaceId,
  });

  // Upsert subscription record (idempotent)
  await db.subscription.upsert({
    where: { workspaceId },
    create: {
      workspaceId,
      provider: "razorpay",
      razorpaySubscriptionId: razorpaySubscription.id,
      plan: plan as SubscriptionPlan,
      status: "INCOMPLETE",
    },
    update: {
      razorpaySubscriptionId: razorpaySubscription.id,
      plan: plan as SubscriptionPlan,
      status: "INCOMPLETE",
    },
  });

  return NextResponse.json({
    subscriptionId: razorpaySubscription.id,
    keyId: process.env.RAZORPAY_KEY_ID,
    plan,
  });
});
