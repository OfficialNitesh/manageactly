// src/app/api/leads/route.ts
import { NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/lib/db";
import { sendLeadNotificationEmail } from "@/lib/email";

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Valid email is required"),
  companyName: z.string().nullable().optional(),
  message: z.string().nullable().optional(),
});

export async function POST(req: Request) {
  let body: unknown;
  try { body = await req.json(); } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.errors[0].message }, { status: 400 });
  }

  try {
    // Save to database
    const lead = await prisma.lead.create({
      data: {
        name: parsed.data.name,
        email: parsed.data.email,
        companyName: parsed.data.companyName || null,
        message: parsed.data.message || null,
      },
    });

    // Send notification email
    try {
      await sendLeadNotificationEmail({
        name: parsed.data.name,
        email: parsed.data.email,
        companyName: parsed.data.companyName || undefined,
        message: parsed.data.message || undefined,
      });
      console.log("[Lead] Notification email sent to admin");
    } catch (emailErr) {
      console.error("[Lead] Email notification failed:", emailErr);
      // Don't fail the API response if email fails
    }

    return NextResponse.json({ success: true, leadId: lead.id });
  } catch (err) {
    console.error("[Lead] Database error:", err);
    return NextResponse.json({ error: "Failed to save lead" }, { status: 500 });
  }
}
