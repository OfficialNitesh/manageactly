// src/app/api/payments/upi/route.ts
// Handles UPI payment submission.
// Customer pays via QR/UPI ID, then submits their UTR number here.
// We verify manually and send confirmation emails.

import { NextResponse } from "next/server";
import { z } from "zod";
import { sendPaymentEmails } from "@/lib/email";

const PLAN_AMOUNTS: Record<string, string> = {
  PILOT:      "₹2,000",
  FOUNDATION: "₹10,000",
  GROWTH:     "₹20,000",
  AUTHORITY:  "₹40,000",
};

const PLAN_LABELS: Record<string, string> = {
  PILOT:      "Paid Pilot (7–10 days)",
  FOUNDATION: "Foundation Plan",
  GROWTH:     "Growth Plan",
  AUTHORITY:  "Authority Plan",
};

const schema = z.object({
  plan: z.enum(["PILOT", "FOUNDATION", "GROWTH", "AUTHORITY"]),
  customerName: z.string().min(1, "Name is required"),
  customerEmail: z.string().email("Valid email is required"),
  customerPhone: z.string().optional(),
  utrNumber: z.string().min(6, "Please enter a valid UTR or transaction ID"),
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

  const d = parsed.data;

  console.log("[UPI] Payment submitted:", {
    plan: d.plan,
    name: d.customerName,
    email: d.customerEmail,
    utr: d.utrNumber,
  });

  try {
    await sendPaymentEmails({
      plan: PLAN_LABELS[d.plan] ?? d.plan,
      amount: PLAN_AMOUNTS[d.plan] ?? "As agreed",
      utrNumber: d.utrNumber,
      customerName: d.customerName,
      customerEmail: d.customerEmail,
      customerPhone: d.customerPhone,
    });
  } catch (err) {
    console.error("[UPI] Email failed:", err);
    // Still return success — the submission is logged even if email fails
  }

  return NextResponse.json({ success: true });
}