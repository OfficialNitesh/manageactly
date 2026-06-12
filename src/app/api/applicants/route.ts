// src/app/api/applicants/route.ts
import { NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/lib/db";
import { sendApplicantConfirmationEmail } from "@/lib/email";

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().nullable().optional(),
  roleAppliedFor: z.string().min(1, "Role is required"),
  portfolioLink: z.string().nullable().optional(),
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
    const applicant = await prisma.applicant.create({
      data: {
        name: parsed.data.name,
        email: parsed.data.email,
        phone: parsed.data.phone || null,
        roleAppliedFor: parsed.data.roleAppliedFor,
        portfolioLink: parsed.data.portfolioLink || null,
      },
    });

    console.log("[Applicant] Saved to database:", applicant.id);

    // Send confirmation email (optional, add to your email service)
    try {
      await sendApplicantConfirmationEmail(applicant);
      console.log("[Applicant] Confirmation email sent");
    } catch (emailErr) {
      console.error("[Applicant] Email confirmation failed:", emailErr);
      // Don't fail the API response if email fails
    }

    return NextResponse.json({ success: true, applicantId: applicant.id });
  } catch (err) {
    console.error("[Applicant] Database error:", err);
    return NextResponse.json({ error: "Failed to save application" }, { status: 500 });
  }
}
