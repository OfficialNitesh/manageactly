// src/app/api/contact/route.ts
import { NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/lib/db";
import { sendContactEmails } from "@/lib/email";

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().nullable().optional(),
  business: z.string().nullable().optional(),
  service: z.string().nullable().optional(),
  message: z.string().min(1, "Message is required"),
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
    // 1. Database Integration: save the lead before sending emails
    await prisma.lead.create({
      data: {
        name: parsed.data.name,
        email: parsed.data.email,
        companyName: parsed.data.business || null,
        message: `Phone: ${parsed.data.phone || "N/A"}\nService: ${parsed.data.service || "N/A"}\n\nMessage: ${parsed.data.message}`,
      },
    });
    console.log("[Contact] Saved lead to database:", parsed.data.email);
  } catch (dbErr) {
    console.error("[Contact] Database save failed:", dbErr);
    return NextResponse.json({ error: "Failed to save contact lead to database" }, { status: 500 });
  }

  // 2. Send emails
  try {
    await sendContactEmails({
      name: parsed.data.name,
      email: parsed.data.email,
      phone: parsed.data.phone || undefined,
      business: parsed.data.business || undefined,
      service: parsed.data.service || undefined,
      message: parsed.data.message,
    });
    console.log("[Contact] Emails sent:", parsed.data.name, parsed.data.email);
  } catch (emailErr) {
    console.error("[Contact] Email sending failed:", emailErr);
  }

  return NextResponse.json({ success: true });
}