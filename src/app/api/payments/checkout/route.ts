// Replaced by UPI payment — see /api/payments/upi/route.ts
import { NextResponse } from "next/server";
export async function POST() {
  return NextResponse.json({ error: "Use /api/payments/upi" }, { status: 410 });
}