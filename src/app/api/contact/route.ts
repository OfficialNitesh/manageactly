import { NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional(),
  business: z.string().optional(),
  service: z.string().optional(),
  message: z.string().min(1),
});

export async function POST(req: Request) {
  let body: unknown;
  try { body = await req.json(); } catch { return NextResponse.json({ error: "Invalid request" }, { status: 400 }); }

  const parsed = schema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.errors[0].message }, { status: 400 });

  const d = parsed.data;

  console.log("[Contact] New enquiry:", d.name, d.email, d.service);

  try {
    await sendEmails(d);
  } catch (err) {
    console.error("[Contact] Email error:", err);
  }

  return NextResponse.json({ success: true });
}

async function sendEmails(d: z.infer<typeof schema>) {
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;
  if (!user || !pass) { console.warn("[Contact] Set GMAIL_USER + GMAIL_APP_PASSWORD"); return; }

  let nodemailer: typeof import("nodemailer") | null = null;
  try { nodemailer = await import("nodemailer"); } catch {
    console.warn("[Contact] Run: npm install nodemailer @types/nodemailer");
    return;
  }

  const transporter = nodemailer.createTransport({ service: "gmail", auth: { user, pass } });

  await transporter.sendMail({
    from: `Manage Actly <${user}>`,
    to: d.email,
    subject: "We received your message — Manage Actly",
    html: `<div style="font-family:Georgia,serif;max-width:560px;margin:0 auto;padding:40px 24px;color:#1a1a2e;">
      <p style="font-size:20px;font-weight:bold;margin-bottom:28px;">Manage Actly</p>
      <h1 style="font-size:22px;margin-bottom:16px;">Thanks for reaching out.</h1>
      <p style="color:#555;line-height:1.7;margin-bottom:14px;">Hi ${d.name},</p>
      <p style="color:#555;line-height:1.7;margin-bottom:14px;">We received your message and will get back to you within <strong>24 hours</strong>.</p>
      ${d.service ? `<p style="color:#555;line-height:1.7;margin-bottom:14px;">You expressed interest in: <strong>${d.service}</strong></p>` : ""}
      <p style="color:#555;line-height:1.7;">In the meantime, explore our packages at <a href="https://manageactly.com/solutions" style="color:#2a9d8f;">manageactly.com/solutions</a>.</p>
      <p style="color:#555;margin-top:24px;">Warm regards,<br><strong>Manage Actly Team</strong></p>
    </div>`,
  });

  const notify = process.env.CONTACT_NOTIFY_EMAIL ?? user;
  await transporter.sendMail({
    from: `Manage Actly Contact <${user}>`,
    to: notify,
    subject: `New Contact: ${d.name} — ${d.service ?? "General"}`,
    html: `<div style="font-family:monospace;max-width:520px;padding:28px 24px;color:#1a1a2e;">
      <h2 style="font-size:16px;margin-bottom:16px;">New Contact Form Submission</h2>
      <table style="font-size:14px;">
        <tr><td style="color:#888;padding:5px 0;width:120px;">Name</td><td>${d.name}</td></tr>
        <tr><td style="color:#888;padding:5px 0;">Email</td><td><a href="mailto:${d.email}">${d.email}</a></td></tr>
        ${d.phone ? `<tr><td style="color:#888;padding:5px 0;">Phone</td><td>${d.phone}</td></tr>` : ""}
        ${d.business ? `<tr><td style="color:#888;padding:5px 0;">Business</td><td>${d.business}</td></tr>` : ""}
        ${d.service ? `<tr><td style="color:#888;padding:5px 0;">Service</td><td>${d.service}</td></tr>` : ""}
      </table>
      <p style="margin-top:16px;"><strong>Message:</strong><br><span style="color:#555;">${d.message}</span></p>
    </div>`,
  });
}
