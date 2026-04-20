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
  try {
    const body = await req.json();

    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.errors[0].message },
        { status: 400 }
      );
    }

    const data = parsed.data;

    // 🚨 IMPORTANT: This function must NOT use nodemailer
    await sendCareerEmails(data);

    console.log("[Careers] Emails sent:", data.name, data.roleLabel);

    return NextResponse.json({ success: true });

  } catch (err) {
    console.error("[Careers] Error:", err);

    return NextResponse.json(
      { error: "Something went wrong while submitting application" },
      { status: 500 }
    );
  }
}