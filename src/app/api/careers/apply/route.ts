import { NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  roleId: z.string(),
  roleLabel: z.string(),
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional(),
  city: z.string().optional(),
  portfolioUrl: z.string().min(1),
  experience: z.string().optional(),
  whyUs: z.string().optional(),
  availability: z.string().optional(),
  fileNames: z.array(z.string()).optional(),
});

export async function POST(req: Request) {
  let body: unknown;
  try { body = await req.json(); } catch { return NextResponse.json({ error: "Invalid request" }, { status: 400 }); }

  const parsed = schema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.errors[0].message }, { status: 400 });

  const data = parsed.data;

  try {
    await sendEmails(data);
  } catch (err) {
    console.error("[Careers] Email error:", err);
  }

  console.log("[Careers] Application received:", data.name, data.roleLabel);
  return NextResponse.json({ success: true });
}

async function sendEmails(data: z.infer<typeof schema>) {
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;
  if (!user || !pass) {
    console.warn("[Careers] Set GMAIL_USER + GMAIL_APP_PASSWORD in .env.local to enable emails");
    return;
  }

  let nodemailer: typeof import("nodemailer") | null = null;
  try { nodemailer = await import("nodemailer"); } catch {
    console.warn("[Careers] Run: npm install nodemailer @types/nodemailer");
    return;
  }

  const transporter = nodemailer.createTransport({ service: "gmail", auth: { user, pass } });

  // Confirmation to applicant
  await transporter.sendMail({
    from: `Manage Actly <${user}>`,
    to: data.email,
    subject: `Your application for ${data.roleLabel} — Manage Actly`,
    html: confirmationHtml(data),
  });

  // Notification to team
  const teamEmail = process.env.CAREERS_NOTIFY_EMAIL ?? user;
  await transporter.sendMail({
    from: `Manage Actly Careers <${user}>`,
    to: teamEmail,
    subject: `New Application: ${data.roleLabel} — ${data.name}`,
    html: teamHtml(data),
  });
}

function confirmationHtml(d: z.infer<typeof schema>) {
  return `<div style="font-family:Georgia,serif;max-width:560px;margin:0 auto;padding:40px 24px;color:#1a1a2e;">
    <p style="font-size:20px;font-weight:bold;margin-bottom:28px;">Manage Actly</p>
    <h1 style="font-size:22px;margin-bottom:16px;">We received your application.</h1>
    <p style="color:#555;line-height:1.7;margin-bottom:14px;">Hi ${d.name},</p>
    <p style="color:#555;line-height:1.7;margin-bottom:14px;">Thank you for applying for the <strong>${d.roleLabel}</strong> position. We review every application personally and will get back to you within <strong>5 business days</strong>.</p>
    <div style="background:#f5f5f0;border-radius:10px;padding:18px 22px;margin:24px 0;">
      <p style="font-size:11px;color:#888;margin:0 0 10px;text-transform:uppercase;letter-spacing:.1em;font-weight:bold;">Your Application</p>
      <p style="margin:4px 0;font-size:14px;"><strong>Role:</strong> ${d.roleLabel}</p>
      <p style="margin:4px 0;font-size:14px;"><strong>Portfolio:</strong> <a href="${d.portfolioUrl}" style="color:#2a9d8f;">${d.portfolioUrl}</a></p>
      ${d.availability ? `<p style="margin:4px 0;font-size:14px;"><strong>Availability:</strong> ${d.availability}</p>` : ""}
    </div>
    <p style="color:#555;line-height:1.7;">If you have questions, write to <a href="mailto:careers@manageactly.com" style="color:#2a9d8f;">careers@manageactly.com</a>.</p>
    <p style="color:#555;margin-top:24px;">Warm regards,<br><strong>Manage Actly Team</strong></p>
  </div>`;
}

function teamHtml(d: z.infer<typeof schema>) {
  return `<div style="font-family:monospace;max-width:560px;margin:0 auto;padding:32px 24px;color:#1a1a2e;">
    <h2 style="font-size:16px;margin-bottom:18px;">New Application — ${d.roleLabel}</h2>
    <table style="font-size:14px;width:100%;">
      <tr><td style="color:#888;padding:6px 0;width:130px;">Name</td><td>${d.name}</td></tr>
      <tr><td style="color:#888;padding:6px 0;">Email</td><td><a href="mailto:${d.email}" style="color:#2a9d8f;">${d.email}</a></td></tr>
      ${d.phone ? `<tr><td style="color:#888;padding:6px 0;">Phone</td><td>${d.phone}</td></tr>` : ""}
      ${d.city ? `<tr><td style="color:#888;padding:6px 0;">City</td><td>${d.city}</td></tr>` : ""}
      <tr><td style="color:#888;padding:6px 0;">Portfolio</td><td><a href="${d.portfolioUrl}" style="color:#2a9d8f;">${d.portfolioUrl}</a></td></tr>
      ${d.availability ? `<tr><td style="color:#888;padding:6px 0;">Available</td><td>${d.availability}</td></tr>` : ""}
    </table>
    ${d.experience ? `<p style="margin-top:16px;"><strong>Experience:</strong><br><span style="color:#555;">${d.experience}</span></p>` : ""}
    ${d.whyUs ? `<p style="margin-top:12px;"><strong>Why us:</strong><br><span style="color:#555;">${d.whyUs}</span></p>` : ""}
  </div>`;
}
