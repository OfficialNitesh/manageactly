// src/app/api/payments/order/route.ts
// Creates a Razorpay order for one-time or subscription payment.
// Called by the pricing page before opening Razorpay checkout.

import { NextResponse } from "next/server";
import { z } from "zod";
import Razorpay from "razorpay";

// Plan prices in paise (INR × 100)
const PLAN_PRICES: Record<string, { amount: number; label: string }> = {
  FOUNDATION: { amount: 1000000, label: "Foundation" },   // ₹10,000
  GROWTH:     { amount: 2000000, label: "Growth" },        // ₹20,000
  AUTHORITY:  { amount: 4000000, label: "Authority" },     // ₹40,000
  PILOT:      { amount: 200000,  label: "Paid Pilot" },    // ₹2,000
};

const schema = z.object({
  plan: z.enum(["FOUNDATION", "GROWTH", "AUTHORITY", "PILOT"]),
});

export async function POST(req: Request) {
  let body: unknown;
  try { body = await req.json(); } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.errors[0].message }, { status: 400 });
  }

  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;

  if (!keyId || !keySecret) {
    console.error("[Payments] RAZORPAY_KEY_ID or RAZORPAY_KEY_SECRET not set");
    return NextResponse.json({ error: "Payment system not configured" }, { status: 500 });
  }

  const { plan } = parsed.data;
  const planConfig = PLAN_PRICES[plan];

  try {
    const razorpay = new Razorpay({ key_id: keyId, key_secret: keySecret });

    // Create an order (works for one-time payments — simpler than subscriptions for MVP)
    const order = await razorpay.orders.create({
      amount: planConfig.amount,
      currency: "INR",
      receipt: `order_${plan}_${Date.now()}`,
      notes: {
        plan,
        source: "website_pricing_page",
      },
    });

    return NextResponse.json({
      orderId: order.id,
      amount: planConfig.amount,
      currency: "INR",
      keyId,
      planLabel: planConfig.label,
    });
  } catch (err) {
    console.error("[Payments] Razorpay order creation failed:", err);
    return NextResponse.json({ error: "Failed to create payment order" }, { status: 500 });
  }
}
