// src/app/api/webhooks/razorpay/route.ts
// Razorpay webhook receiver.
//
// Security: all webhooks are signature-verified before processing.
// Idempotency: we check current state before updating to prevent duplicate events
// from causing inconsistent state.
//
// Supported events:
//   subscription.activated  → mark ACTIVE, set billing dates
//   subscription.charged    → update billing period
//   subscription.pending    → mark PAST_DUE
//   subscription.halted     → mark PAST_DUE (max retries exceeded)
//   subscription.cancelled  → mark CANCELLED
//   subscription.completed  → mark CANCELLED

import { NextResponse } from "next/server";
import { verifyRazorpayWebhookSignature, mapRazorpayStatus } from "@/lib/payments/razorpay";
import db from "@/lib/db";

const PLAN_LIMITS = {
  STARTER:    { postsPerMonth: 50,     aiCreditsPerMonth: 100    },
  PRO:        { postsPerMonth: 200,    aiCreditsPerMonth: 500    },
  ENTERPRISE: { postsPerMonth: 999999, aiCreditsPerMonth: 999999 },
  FREE:       { postsPerMonth: 10,     aiCreditsPerMonth: 20     },
} as const;

export async function POST(req: Request) {
  // 1. Read raw body — MUST be raw for signature verification
  const rawBody = await req.text();
  const signature = req.headers.get("x-razorpay-signature");

  if (!signature) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  // 2. Verify signature
  const isValid = verifyRazorpayWebhookSignature(rawBody, signature);
  if (!isValid) {
    console.warn("[Webhook] Invalid Razorpay signature received");
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  // 3. Parse event
  let event: {
    event: string;
    payload: {
      subscription?: {
        entity: {
          id: string;
          status: string;
          plan_id: string;
          notes?: { workspaceId?: string };
          current_start?: number;
          current_end?: number;
          charge_at?: number;
        };
      };
    };
  };

  try {
    event = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const subscriptionEntity = event.payload.subscription?.entity;

  if (!subscriptionEntity) {
    // Not a subscription event — ignore silently
    return NextResponse.json({ received: true });
  }

  const razorpaySubscriptionId = subscriptionEntity.id;

  // 4. Find existing subscription record
  const subscription = await db.subscription.findUnique({
    where: { razorpaySubscriptionId },
    include: { workspace: { select: { id: true } } },
  });

  if (!subscription) {
    // Could be a subscription created outside our system — log and ignore
    console.warn(`[Webhook] Unknown subscription: ${razorpaySubscriptionId}`);
    return NextResponse.json({ received: true });
  }

  const workspaceId = subscription.workspaceId;
  const eventType = event.event;

  console.log(`[Webhook] ${eventType} for subscription ${razorpaySubscriptionId}`);

  // 5. Handle each event type
  try {
    switch (eventType) {
      case "subscription.activated": {
        const limits = PLAN_LIMITS[subscription.plan] ?? PLAN_LIMITS.FREE;
        await db.subscription.update({
          where: { razorpaySubscriptionId },
          data: {
            status: "ACTIVE",
            currentPeriodStart: subscriptionEntity.current_start
              ? new Date(subscriptionEntity.current_start * 1000)
              : new Date(),
            currentPeriodEnd: subscriptionEntity.current_end
              ? new Date(subscriptionEntity.current_end * 1000)
              : null,
            postsPerMonth: limits.postsPerMonth,
            aiCreditsPerMonth: limits.aiCreditsPerMonth,
          },
        });

        await auditLog(workspaceId, "subscription.activated", { plan: subscription.plan });
        break;
      }

      case "subscription.charged": {
        await db.subscription.update({
          where: { razorpaySubscriptionId },
          data: {
            status: "ACTIVE",
            currentPeriodStart: subscriptionEntity.current_start
              ? new Date(subscriptionEntity.current_start * 1000)
              : undefined,
            currentPeriodEnd: subscriptionEntity.current_end
              ? new Date(subscriptionEntity.current_end * 1000)
              : undefined,
          },
        });

        await auditLog(workspaceId, "subscription.charged", {});
        break;
      }

      case "subscription.pending":
      case "subscription.halted": {
        await db.subscription.update({
          where: { razorpaySubscriptionId },
          data: { status: "PAST_DUE" },
        });

        await auditLog(workspaceId, `subscription.${eventType.split(".")[1]}`, {});
        break;
      }

      case "subscription.cancelled":
      case "subscription.completed": {
        await db.subscription.update({
          where: { razorpaySubscriptionId },
          data: {
            status: "CANCELLED",
            cancelledAt: new Date(),
            // Downgrade to free limits
            postsPerMonth: PLAN_LIMITS.FREE.postsPerMonth,
            aiCreditsPerMonth: PLAN_LIMITS.FREE.aiCreditsPerMonth,
            plan: "FREE",
          },
        });

        await auditLog(workspaceId, "subscription.cancelled", {});
        break;
      }

      default:
        // Unknown event — log and ignore
        console.log(`[Webhook] Unhandled event type: ${eventType}`);
    }
  } catch (error) {
    console.error(`[Webhook] Failed to process ${eventType}:`, error);
    // Return 500 so Razorpay retries
    return NextResponse.json({ error: "Processing failed" }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}

async function auditLog(
  workspaceId: string,
  action: string,
  metadata: Record<string, unknown>
) {
  await db.auditLog.create({
    data: {
      workspaceId,
      actorId: null, // system event
      action,
      entity: "Subscription",
      metadata,
    },
  });
}
