// src/app/api/payments/verify/route.ts
// Verifies Razorpay payment signature after checkout completes.
// CRITICAL: always verify server-side — never trust client-side payment data.

import { NextResponse } from "next/server";
import { z } from "zod";
import crypto from "crypto";

const schema = z.object({
  razorpay_order_id: z.string().optional(),
  razorpay_payment_id: z.string(),
  razorpay_subscription_id: z.string().optional(),
  razorpay_signature: z.string(),
  plan: z.string(),
  customerName: z.string().optional(),
  customerEmail: z.string().email().optional(),
  customerPhone: z.string().optional(),
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
  const keySecret = process.env.RAZORPAY_KEY_SECRET;

  if (!keySecret) {
    return NextResponse.json({ error: "Payment system not configured" }, { status: 500 });
  }

  // Build the signature payload
  // For orders: order_id + "|" + payment_id
  // For subscriptions: subscription_id + "|" + payment_id
  const signatureBody = d.razorpay_subscription_id
    ? `${d.razorpay_subscription_id}|${d.razorpay_payment_id}`
    : `${d.razorpay_order_id}|${d.razorpay_payment_id}`;

  const expectedSignature = crypto
    .createHmac("sha256", keySecret)
    .update(signatureBody)
    .digest("hex");

  // Timing-safe comparison
  let isValid = false;
  try {
    isValid = crypto.timingSafeEqual(
      Buffer.from(d.razorpay_signature),
      Buffer.from(expectedSignature)
    );
  } catch {
    isValid = false;
  }

  if (!isValid) {
    console.warn("[Payments] Invalid signature:", d.razorpay_payment_id);
    return NextResponse.json({ error: "Payment verification failed" }, { status: 400 });
  }

  // Payment is genuine — log it and send confirmation email
  console.log("[Payments] Verified payment:", {
    paymentId: d.razorpay_payment_id,
    plan: d.plan,
    email: d.customerEmail,
  });

  // Send confirmation email
  try {
    await sendPaymentConfirmation(d);
  } catch (err) {
    console.error("[Payments] Email error:", err);
    // Don't fail the response — payment is verified
  }

  return NextResponse.json({
    success: true,
    paymentId: d.razorpay_payment_id,
    plan: d.plan,
  });
}

async function sendPaymentConfirmation(d: z.infer<typeof schema>) {
  const gmailUser = process.env.GMAIL_USER;
  const gmailPass = process.env.GMAIL_APP_PASSWORD;
  if (!gmailUser || !gmailPass || !d.customerEmail) return;

  let nodemailer: typeof import("nodemailer") | null = null;
  try { nodemailer = await import("nodemailer"); } catch { return; }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user: gmailUser, pass: gmailPass },
  });

  const planLabels: Record<string, string> = {
    FOUNDATION: "Foundation Plan (₹10,000/mo)",
    GROWTH: "Growth Plan (₹20,000/mo)",
    AUTHORITY: "Authority Plan (₹40,000/mo)",
    PILOT: "Paid Pilot (₹2,000)",
  };

  // Customer confirmation
  await transporter.sendMail({
    from: `Manage Actly <${gmailUser}>`,
    to: d.customerEmail,
    subject: "Payment Confirmed — Manage Actly",
    html: `
      <div style="font-family:Georgia,serif;max-width:560px;margin:0 auto;padding:40px 24px;color:#1a1a2e;">
        <p style="font-size:20px;font-weight:bold;margin-bottom:28px;">Manage Actly</p>
        <h1 style="font-size:22px;margin-bottom:16px;">Payment confirmed.</h1>
        <p style="color:#555;line-height:1.7;margin-bottom:14px;">Hi ${d.customerName ?? "there"},</p>
        <p style="color:#555;line-height:1.7;margin-bottom:14px;">
          Your payment for the <strong>${planLabels[d.plan] ?? d.plan}</strong> has been received and verified.
        </p>
        <div style="background:#f5f5f0;border-radius:12px;padding:18px 22px;margin:24px 0;">
          <p style="font-size:11px;color:#888;margin:0 0 10px;text-transform:uppercase;letter-spacing:.1em;font-weight:bold;">Payment Details</p>
          <p style="margin:4px 0;font-size:14px;"><strong>Plan:</strong> ${planLabels[d.plan] ?? d.plan}</p>
          <p style="margin:4px 0;font-size:14px;"><strong>Payment ID:</strong> ${d.razorpay_payment_id}</p>
        </div>
        <p style="color:#555;line-height:1.7;margin-bottom:14px;">
          Our team will contact you within <strong>24 hours</strong> to schedule the onboarding call and get started.
        </p>
        <p style="color:#555;line-height:1.7;">
          Any questions? Reply to this email or write to <a href="mailto:hello@manageactly.com" style="color:#2a9d8f;">hello@manageactly.com</a>
        </p>
        <p style="color:#555;margin-top:28px;">Warm regards,<br><strong>Manage Actly Team</strong></p>
      </div>
    `,
  });

  // Team notification
  const teamEmail = process.env.CONTACT_NOTIFY_EMAIL ?? gmailUser;
  await transporter.sendMail({
    from: `Manage Actly Payments <${gmailUser}>`,
    to: teamEmail,
    subject: `Payment Received: ${d.plan} — ${d.customerEmail}`,
    html: `
      <div style="font-family:monospace;max-width:520px;padding:28px 24px;color:#1a1a2e;">
        <h2 style="font-size:16px;margin-bottom:16px;">New Payment</h2>
        <table style="font-size:14px;">
          <tr><td style="color:#888;padding:5px 0;width:140px;">Plan</td><td><strong>${planLabels[d.plan] ?? d.plan}</strong></td></tr>
          <tr><td style="color:#888;padding:5px 0;">Name</td><td>${d.customerName ?? "Not provided"}</td></tr>
          <tr><td style="color:#888;padding:5px 0;">Email</td><td><a href="mailto:${d.customerEmail}">${d.customerEmail}</a></td></tr>
          ${d.customerPhone ? `<tr><td style="color:#888;padding:5px 0;">Phone</td><td>${d.customerPhone}</td></tr>` : ""}
          <tr><td style="color:#888;padding:5px 0;">Payment ID</td><td>${d.razorpay_payment_id}</td></tr>
        </table>
        <p style="margin-top:16px;color:#2a9d8f;font-weight:bold;">Action required: Contact this client within 24 hours.</p>
      </div>
    `,
  });
}
