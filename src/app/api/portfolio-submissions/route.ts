// src/app/api/portfolio-submissions/route.ts
import { NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/lib/db";
import { sendPortfolioSubmissionEmail } from "@/lib/email";

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Valid email is required"),
  portfolioLink: z.string().min(1, "Portfolio Link is required"),
  message: z.string().nullable().optional(),
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

  const data = parsed.data;

  try {
    // 1. Database Integration: save the portfolio submission details
    const submission = await prisma.portfolioSubmission.create({
      data: {
        name: data.name,
        email: data.email,
        portfolioLink: data.portfolioLink,
        message: data.message || null,
      },
    });

    console.log("[Portfolio Submissions] Saved to database:", submission.id);

    // 2. Email Transmission: notify admin and customer
    try {
      await sendPortfolioSubmissionEmail({
        name: data.name,
        email: data.email,
        portfolioUrl: data.portfolioLink,
        message: data.message || undefined,
      });
      console.log("[Portfolio Submissions] Notification email sent successfully");
    } catch (emailErr) {
      console.error("[Portfolio Submissions] Email sending failed:", emailErr);
      // We don't fail the response if the email fails, matching applicants
    }

    return NextResponse.json({
      success: true,
      submissionId: submission.id,
    });
  } catch (err) {
    console.error("[Portfolio Submissions] Server error:", err);
    return NextResponse.json(
      { error: "Failed to save portfolio submission" },
      { status: 500 }
    );
  }
}
