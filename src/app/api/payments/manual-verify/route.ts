// src/app/api/payments/manual-verify/route.ts

import { NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/lib/db";
import { sendPaymentEmails } from "@/lib/email";

const schema = z.object({
  plan: z.string().min(1, "Plan is required"),
  amount: z.string().min(1, "Amount is required"),
  utrNumber: z.string().min(1, "UTR/Transaction ID is required"),
  customerName: z.string().min(1, "Name is required"),
  customerEmail: z.string().email("Valid email is required"),
  customerPhone: z.string().optional(),
});

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.errors[0].message },
      { status: 400 }
    );
  }

  try {
    const data = parsed.data;

    // Log the payment submission
    console.log("[Manual Verify] Payment submitted:", {
      plan: data.plan,
      amount: data.amount,
      utr: data.utrNumber,
      customer: data.customerName,
    });

    // Send email notification
    try {
      await sendPaymentEmails({
        plan: data.plan,
        amount: data.amount,
        utrNumber: data.utrNumber,
        customerName: data.customerName,
        customerEmail: data.customerEmail,
        customerPhone: data.customerPhone,
      });
      console.log("[Manual Verify] Emails sent successfully");
    } catch (emailErr) {
      console.error("[Manual Verify] Email notification failed:", emailErr);
      // Don't fail the API response if email fails
    }

    return NextResponse.json({
      success: true,
      message: "Payment submitted for verification",
      utr: data.utrNumber,
    });
  } catch (err) {
    console.error("[Manual Verify] Server error:", err);
    return NextResponse.json(
      { error: "Failed to process payment verification" },
      { status: 500 }
    );
  }
}
