// src/lib/payments/razorpay.ts
// Payment abstraction layer.
//
// Design principle: all Razorpay-specific code is isolated here.
// The rest of the app calls these functions — never Razorpay SDK directly.
// To add Stripe later: implement the same interface in lib/payments/stripe.ts
// and swap the import in checkout/webhook routes.

import Razorpay from "razorpay";
import crypto from "crypto";

// ─── Client singleton ─────────────────────────────────────────────────────────

function getRazorpayClient(): Razorpay {
  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;

  if (!keyId || !keySecret) {
    throw new Error("RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET must be set");
  }

  return new Razorpay({ key_id: keyId, key_secret: keySecret });
}

// ─── Plan config ──────────────────────────────────────────────────────────────
// Store plan IDs in env vars — they differ between test/prod Razorpay accounts

export const RAZORPAY_PLANS = {
  STARTER:    process.env.RAZORPAY_PLAN_STARTER!,
  PRO:        process.env.RAZORPAY_PLAN_PRO!,
  ENTERPRISE: process.env.RAZORPAY_PLAN_ENTERPRISE!,
} as const;

// ─── Subscription creation ─────────────────────────────────────────────────────

interface CreateSubscriptionOptions {
  planId: string;
  customerEmail: string;
  customerName: string;
  workspaceId: string; // stored in notes for webhook reconciliation
  totalCount?: number; // billing cycles (default: 120 = 10 years / "forever")
}

export async function createRazorpaySubscription(
  options: CreateSubscriptionOptions
) {
  const client = getRazorpayClient();

  const subscription = await client.subscriptions.create({
    plan_id: options.planId,
    total_count: options.totalCount ?? 120,
    quantity: 1,
    customer_notify: 1,
    notes: {
      workspaceId: options.workspaceId,
      customerEmail: options.customerEmail,
    },
  });

  return subscription;
}

// ─── Webhook signature verification ──────────────────────────────────────────

/**
 * Verify that a webhook request genuinely came from Razorpay.
 * This MUST be called before processing any webhook.
 */
export function verifyRazorpayWebhookSignature(
  rawBody: string,
  signature: string,
  secret: string = process.env.RAZORPAY_WEBHOOK_SECRET!
): boolean {
  if (!secret) {
    throw new Error("RAZORPAY_WEBHOOK_SECRET must be set");
  }

  const expectedSignature = crypto
    .createHmac("sha256", secret)
    .update(rawBody)
    .digest("hex");

  // Use timingSafeEqual to prevent timing attacks
  try {
    return crypto.timingSafeEqual(
      Buffer.from(signature),
      Buffer.from(expectedSignature)
    );
  } catch {
    return false;
  }
}

// ─── Subscription status mapper ───────────────────────────────────────────────

type RazorpaySubscriptionStatus =
  | "created"
  | "authenticated"
  | "active"
  | "pending"
  | "halted"
  | "cancelled"
  | "completed"
  | "expired";

import type { SubscriptionStatus } from "@prisma/client";

export function mapRazorpayStatus(
  razorpayStatus: RazorpaySubscriptionStatus
): SubscriptionStatus {
  const map: Record<RazorpaySubscriptionStatus, SubscriptionStatus> = {
    created:       "INCOMPLETE",
    authenticated: "INCOMPLETE",
    active:        "ACTIVE",
    pending:       "PAST_DUE",
    halted:        "PAST_DUE",
    cancelled:     "CANCELLED",
    completed:     "CANCELLED",
    expired:       "CANCELLED",
  };
  return map[razorpayStatus] ?? "INCOMPLETE";
}

// ─── Cancel subscription ──────────────────────────────────────────────────────

export async function cancelRazorpaySubscription(
  subscriptionId: string,
  cancelAtCycleEnd = true // default: cancel at period end, not immediately
) {
  const client = getRazorpayClient();
  return client.subscriptions.cancel(subscriptionId, cancelAtCycleEnd);
}
