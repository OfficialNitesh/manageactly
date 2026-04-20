// src/lib/email.ts
// Central email sender using Resend.
// Works reliably on Vercel — no SMTP, no nodemailer needed.
//
// Setup:
// 1. npm install resend
// 2. Add RESEND_API_KEY to Vercel environment variables
// 3. Add NOTIFY_EMAIL to Vercel environment variables (your personal email)
// 4. Verify manageactly.in domain on resend.com/domains

import { Resend } from "resend";

function getResend(): Resend {
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    throw new Error(
      "RESEND_API_KEY is not set. Add it to Vercel environment variables."
    );
  }
  return new Resend(key);
}

// The "from" address — must match your verified domain on Resend
// Once manageactly.in is verified, use: hello@manageactly.in
// While testing (before domain verified): onboarding@resend.dev
const FROM_ADDRESS =
  process.env.EMAIL_FROM ?? "Manage Actly <hello@manageactly.in>";

// Where to send your internal notifications
// Set NOTIFY_EMAIL in Vercel env vars to your personal Gmail or any email
function getNotifyEmail(): string {
  const email = process.env.NOTIFY_EMAIL;
  if (!email) {
    console.warn(
      "[Email] NOTIFY_EMAIL not set — notifications will not be sent"
    );
    return "";
  }
  return email;
}

// ── Send a single email ────────────────────────────────────────────────────

interface SendEmailOptions {
  to: string;
  subject: string;
  html: string;
}

export async function sendEmail({ to, subject, html }: SendEmailOptions) {
  const resend = getResend();

  const { data, error } = await resend.emails.send({
    from: FROM_ADDRESS,
    to,
    subject,
    html,
  });

  if (error) {
    console.error("[Email] Send failed:", error);
    throw new Error(`Email send failed: ${error.message}`);
  }

  console.log("[Email] Sent:", { to, subject, id: data?.id });
  return data;
}

// ── Contact form emails ─────────────────────────────────────────────────────

interface ContactData {
  name: string;
  email: string;
  phone?: string;
  business?: string;
  service?: string;
  message: string;
}

export async function sendContactEmails(d: ContactData) {
  const notifyEmail = getNotifyEmail();

  // 1. Confirmation to person who filled the form
  await sendEmail({
    to: d.email,
    subject: "We received your message — Manage Actly",
    html: `
      <div style="font-family:Georgia,serif;max-width:560px;margin:0 auto;padding:40px 24px;color:#1a1a2e;">
        <p style="font-size:20px;font-weight:bold;margin-bottom:28px;">Manage Actly</p>
        <h1 style="font-size:22px;margin-bottom:16px;">Thanks for reaching out.</h1>
        <p style="color:#555;line-height:1.7;margin-bottom:14px;">Hi ${d.name},</p>
        <p style="color:#555;line-height:1.7;margin-bottom:14px;">
          We received your message and will get back to you within <strong>24 hours</strong>.
        </p>
        ${d.service ? `<p style="color:#555;line-height:1.7;margin-bottom:14px;">You expressed interest in: <strong>${d.service}</strong></p>` : ""}
        <p style="color:#555;line-height:1.7;">
          In the meantime, explore our packages at
          <a href="https://manageactly.in/solutions" style="color:#2a9d8f;">manageactly.in/solutions</a>
        </p>
        <p style="color:#555;margin-top:28px;">Warm regards,<br><strong>Manage Actly Team</strong></p>
        <div style="margin-top:40px;padding-top:16px;border-top:1px solid #e5e5e0;">
          <p style="font-size:12px;color:#999;margin:0;">
            manageactly.in &nbsp;·&nbsp; hello@manageactly.in
          </p>
        </div>
      </div>
    `,
  });

  // 2. Notification to you
  if (notifyEmail) {
    await sendEmail({
      to: notifyEmail,
      subject: `New Contact: ${d.name}${d.service ? ` — ${d.service}` : ""}`,
      html: `
        <div style="font-family:monospace;max-width:520px;padding:28px 24px;color:#1a1a2e;">
          <h2 style="font-size:16px;margin-bottom:16px;">New Contact Form Submission</h2>
          <table style="font-size:14px;border-collapse:collapse;">
            <tr><td style="color:#888;padding:6px 12px 6px 0;width:120px;">Name</td><td style="padding:6px 0;"><strong>${d.name}</strong></td></tr>
            <tr><td style="color:#888;padding:6px 12px 6px 0;">Email</td><td style="padding:6px 0;"><a href="mailto:${d.email}" style="color:#2a9d8f;">${d.email}</a></td></tr>
            ${d.phone ? `<tr><td style="color:#888;padding:6px 12px 6px 0;">Phone</td><td style="padding:6px 0;">${d.phone}</td></tr>` : ""}
            ${d.business ? `<tr><td style="color:#888;padding:6px 12px 6px 0;">Business</td><td style="padding:6px 0;">${d.business}</td></tr>` : ""}
            ${d.service ? `<tr><td style="color:#888;padding:6px 12px 6px 0;">Service</td><td style="padding:6px 0;">${d.service}</td></tr>` : ""}
          </table>
          <div style="margin-top:16px;padding:12px 16px;background:#f5f5f0;border-radius:8px;">
            <p style="font-size:12px;color:#888;margin:0 0 6px;font-weight:bold;text-transform:uppercase;letter-spacing:.05em;">Message</p>
            <p style="font-size:14px;color:#333;margin:0;line-height:1.6;">${d.message}</p>
          </div>
        </div>
      `,
    });
  }
}

// ── Career application emails ───────────────────────────────────────────────

interface CareerData {
  roleLabel: string;
  name: string;
  email: string;
  phone?: string;
  city?: string;
  portfolioUrl: string;
  experience?: string;
  whyUs?: string;
  availability?: string;
  fileNames?: string[];
}

export async function sendCareerEmails(d: CareerData) {
  const notifyEmail = getNotifyEmail();

  // 1. Confirmation to applicant
  await sendEmail({
    to: d.email,
    subject: `Your application for ${d.roleLabel} — Manage Actly`,
    html: `
      <div style="font-family:Georgia,serif;max-width:560px;margin:0 auto;padding:40px 24px;color:#1a1a2e;">
        <p style="font-size:20px;font-weight:bold;margin-bottom:28px;">Manage Actly</p>
        <h1 style="font-size:22px;margin-bottom:16px;">We received your application.</h1>
        <p style="color:#555;line-height:1.7;margin-bottom:14px;">Hi ${d.name},</p>
        <p style="color:#555;line-height:1.7;margin-bottom:14px;">
          Thank you for applying for the <strong>${d.roleLabel}</strong> role at Manage Actly.
          We review every application personally and will get back to you within <strong>5 business days</strong>.
        </p>
        <div style="background:#f5f5f0;border-radius:12px;padding:18px 22px;margin:24px 0;">
          <p style="font-size:11px;color:#888;margin:0 0 10px;text-transform:uppercase;letter-spacing:.1em;font-weight:bold;">Your Application</p>
          <p style="margin:4px 0;font-size:14px;"><strong>Role:</strong> ${d.roleLabel}</p>
          <p style="margin:4px 0;font-size:14px;"><strong>Portfolio:</strong>
            <a href="${d.portfolioUrl}" style="color:#2a9d8f;">${d.portfolioUrl}</a>
          </p>
          ${d.availability ? `<p style="margin:4px 0;font-size:14px;"><strong>Availability:</strong> ${d.availability}</p>` : ""}
        </div>
        <p style="color:#555;line-height:1.7;">
          Questions? Write to
          <a href="mailto:careers@manageactly.in" style="color:#2a9d8f;">careers@manageactly.in</a>
        </p>
        <p style="color:#555;margin-top:28px;">Warm regards,<br><strong>Manage Actly Team</strong></p>
        <div style="margin-top:40px;padding-top:16px;border-top:1px solid #e5e5e0;">
          <p style="font-size:12px;color:#999;margin:0;">manageactly.in &nbsp;·&nbsp; careers@manageactly.in</p>
        </div>
      </div>
    `,
  });

  // 2. Notification to you
  if (notifyEmail) {
    await sendEmail({
      to: notifyEmail,
      subject: `New Application: ${d.roleLabel} — ${d.name}`,
      html: `
        <div style="font-family:monospace;max-width:560px;padding:32px 24px;color:#1a1a2e;">
          <h2 style="font-size:16px;margin-bottom:20px;">New Career Application</h2>
          <table style="font-size:14px;border-collapse:collapse;">
            <tr><td style="color:#888;padding:6px 12px 6px 0;width:130px;">Role</td><td style="padding:6px 0;"><strong>${d.roleLabel}</strong></td></tr>
            <tr><td style="color:#888;padding:6px 12px 6px 0;">Name</td><td style="padding:6px 0;">${d.name}</td></tr>
            <tr><td style="color:#888;padding:6px 12px 6px 0;">Email</td><td style="padding:6px 0;"><a href="mailto:${d.email}" style="color:#2a9d8f;">${d.email}</a></td></tr>
            ${d.phone ? `<tr><td style="color:#888;padding:6px 12px 6px 0;">Phone</td><td style="padding:6px 0;">${d.phone}</td></tr>` : ""}
            ${d.city ? `<tr><td style="color:#888;padding:6px 12px 6px 0;">City</td><td style="padding:6px 0;">${d.city}</td></tr>` : ""}
            <tr><td style="color:#888;padding:6px 12px 6px 0;">Portfolio</td><td style="padding:6px 0;"><a href="${d.portfolioUrl}" style="color:#2a9d8f;">${d.portfolioUrl}</a></td></tr>
            ${d.availability ? `<tr><td style="color:#888;padding:6px 12px 6px 0;">Available</td><td style="padding:6px 0;">${d.availability}</td></tr>` : ""}
          </table>
          ${d.experience ? `<div style="margin-top:16px;"><strong>Experience:</strong><p style="color:#555;margin:6px 0 0;line-height:1.6;">${d.experience}</p></div>` : ""}
          ${d.whyUs ? `<div style="margin-top:14px;"><strong>Why Manage Actly:</strong><p style="color:#555;margin:6px 0 0;line-height:1.6;">${d.whyUs}</p></div>` : ""}
          ${d.fileNames && d.fileNames.length > 0 ? `<div style="margin-top:14px;"><strong>Attached files:</strong><p style="color:#555;margin:6px 0 0;">${d.fileNames.join(", ")}</p></div>` : ""}
        </div>
      `,
    });
  }
}

// ── UPI payment notification emails ────────────────────────────────────────

interface PaymentData {
  plan: string;
  amount: string;
  utrNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
}

export async function sendPaymentEmails(d: PaymentData) {
  const notifyEmail = getNotifyEmail();

  // 1. Confirmation to customer
  await sendEmail({
    to: d.customerEmail,
    subject: "Payment Submitted — Manage Actly",
    html: `
      <div style="font-family:Georgia,serif;max-width:560px;margin:0 auto;padding:40px 24px;color:#1a1a2e;">
        <p style="font-size:20px;font-weight:bold;margin-bottom:28px;">Manage Actly</p>
        <h1 style="font-size:22px;margin-bottom:16px;">Payment submitted for verification.</h1>
        <p style="color:#555;line-height:1.7;margin-bottom:14px;">Hi ${d.customerName},</p>
        <p style="color:#555;line-height:1.7;margin-bottom:14px;">
          We have received your UPI payment details for the <strong>${d.plan}</strong>.
          We will verify the payment and confirm within <strong>2 to 4 hours</strong>.
        </p>
        <div style="background:#f5f5f0;border-radius:12px;padding:18px 22px;margin:24px 0;">
          <p style="font-size:11px;color:#888;margin:0 0 10px;text-transform:uppercase;letter-spacing:.1em;font-weight:bold;">Payment Details</p>
          <p style="margin:4px 0;font-size:14px;"><strong>Plan:</strong> ${d.plan}</p>
          <p style="margin:4px 0;font-size:14px;"><strong>Amount:</strong> ${d.amount}</p>
          <p style="margin:4px 0;font-size:14px;"><strong>UTR / Transaction ID:</strong> ${d.utrNumber}</p>
        </div>
        <p style="color:#555;line-height:1.7;">
          Once verified, our team will contact you within 24 hours to schedule your onboarding call.
        </p>
        <p style="color:#555;line-height:1.7;margin-top:12px;">
          Questions? Write to
          <a href="mailto:hello@manageactly.in" style="color:#2a9d8f;">hello@manageactly.in</a>
        </p>
        <p style="color:#555;margin-top:28px;">Warm regards,<br><strong>Manage Actly Team</strong></p>
      </div>
    `,
  });

  // 2. Alert to you
  if (notifyEmail) {
    await sendEmail({
      to: notifyEmail,
      subject: `UPI Payment: ${d.plan} — ${d.customerName} — UTR: ${d.utrNumber}`,
      html: `
        <div style="font-family:monospace;max-width:520px;padding:28px 24px;color:#1a1a2e;">
          <h2 style="font-size:16px;margin-bottom:4px;">UPI Payment Submitted</h2>
          <p style="color:#2a9d8f;font-weight:bold;margin:0 0 20px;">Verify this payment in your UPI app.</p>
          <table style="font-size:14px;border-collapse:collapse;">
            <tr><td style="color:#888;padding:6px 12px 6px 0;width:150px;">Plan</td><td style="padding:6px 0;"><strong>${d.plan}</strong></td></tr>
            <tr><td style="color:#888;padding:6px 12px 6px 0;">Amount</td><td style="padding:6px 0;"><strong>${d.amount}</strong></td></tr>
            <tr><td style="color:#888;padding:6px 12px 6px 0;">UTR / Txn ID</td><td style="padding:6px 0;"><strong>${d.utrNumber}</strong></td></tr>
            <tr><td style="color:#888;padding:6px 12px 6px 0;">Name</td><td style="padding:6px 0;">${d.customerName}</td></tr>
            <tr><td style="color:#888;padding:6px 12px 6px 0;">Email</td><td style="padding:6px 0;"><a href="mailto:${d.customerEmail}" style="color:#2a9d8f;">${d.customerEmail}</a></td></tr>
            ${d.customerPhone ? `<tr><td style="color:#888;padding:6px 12px 6px 0;">Phone</td><td style="padding:6px 0;">${d.customerPhone}</td></tr>` : ""}
          </table>
          <p style="margin-top:20px;color:#e74c3c;font-weight:bold;">
            Action: Check your Axis Bank UPI app for a payment of ${d.amount} with UTR ${d.utrNumber}
          </p>
        </div>
      `,
    });
  }
}