// src/app/api/careers/apply/route.ts
import { NextResponse } from "next/server";
import { z } from "zod";
import { sendCareerEmails } from "@/lib/email";

const schema = z.object({
  roleId: z.string(),
  roleLabel: z.string(),
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().optional(),
  city: z.string().optional(),
  portfolioUrl: z.string().min(1, "Portfolio URL is required"),
  experience: z.string().optional(),
  whyUs: z.string().optional(),
  availability: z.string().optional(),
  fileNames: z.array(z.string()).optional(),
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

  const data = parsed.data;

  try {
    await sendCareerEmails(data);
    console.log("[Careers] Emails sent:", data.name, data.roleLabel);
  } catch (err) {
    console.error("[Careers] Email failed:", err);
  }

  return NextResponse.json({ success: true });
}