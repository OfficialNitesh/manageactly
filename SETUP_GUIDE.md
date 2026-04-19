# Manage Actly — Complete Setup Guide

## What This Guide Covers
1. Install dependencies
2. Set up PostgreSQL database
3. Set up environment variables (with exact values to fill in)
4. Configure Gmail for emails
5. Configure Razorpay for payments
6. Configure Google OAuth for login
7. Run the project
8. Deploy to production (Vercel)

---

## STEP 1 — Clean Install

Open PowerShell in your project folder:

```powershell
# Remove old dependencies (PowerShell syntax)
Remove-Item -Recurse -Force node_modules -ErrorAction SilentlyContinue
Remove-Item -Force package-lock.json -ErrorAction SilentlyContinue

# Install
npm install

# Install email library (needed for Gmail)
npm install nodemailer
npm install --save-dev @types/nodemailer
```

---

## STEP 2 — PostgreSQL Database

### Option A: Local (for development)
1. Download and install PostgreSQL from https://www.postgresql.org/download/windows/
2. During install, set a password for the `postgres` user — remember it
3. Open pgAdmin or psql and run:
   ```sql
   CREATE DATABASE manage_actly;
   ```
4. Your DATABASE_URL will be:
   ```
   postgresql://postgres:YOUR_PASSWORD@localhost:5432/manage_actly
   ```

### Option B: Free cloud database (recommended)
1. Go to https://neon.tech and sign up free
2. Create a new project called "manage-actly"
3. Copy the connection string — it looks like:
   ```
   postgresql://username:password@ep-xxx.us-east-1.aws.neon.tech/manage_actly?sslmode=require
   ```

---

## STEP 3 — Environment Variables

Create a file called `.env.local` in your project root (same folder as package.json).

Copy this exactly and fill in the values:

```env
# ── App ──────────────────────────────────────────────────────────────────
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=PASTE_GENERATED_VALUE_HERE
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# ── Database ─────────────────────────────────────────────────────────────
DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@localhost:5432/manage_actly

# ── Google OAuth ──────────────────────────────────────────────────────────
GOOGLE_CLIENT_ID=PASTE_FROM_GOOGLE_CONSOLE
GOOGLE_CLIENT_SECRET=PASTE_FROM_GOOGLE_CONSOLE

# ── Encryption (for storing LinkedIn tokens) ─────────────────────────────
ENCRYPTION_KEY=PASTE_GENERATED_VALUE_HERE

# ── OpenAI (for AI caption generation in dashboard) ──────────────────────
OPENAI_API_KEY=PASTE_FROM_OPENAI

# ── Razorpay ─────────────────────────────────────────────────────────────
RAZORPAY_KEY_ID=rzp_test_PASTE_FROM_RAZORPAY
RAZORPAY_KEY_SECRET=PASTE_FROM_RAZORPAY
RAZORPAY_WEBHOOK_SECRET=PASTE_FROM_RAZORPAY

# ── Gmail (for contact form + career application emails) ─────────────────
GMAIL_USER=yourname@gmail.com
GMAIL_APP_PASSWORD=xxxx xxxx xxxx xxxx

# ── Email routing ─────────────────────────────────────────────────────────
CONTACT_NOTIFY_EMAIL=hello@manageactly.com
CAREERS_NOTIFY_EMAIL=careers@manageactly.com

# ── Cron security (for scheduled post publisher) ─────────────────────────
CRON_SECRET=PASTE_GENERATED_VALUE_HERE
```

### Generate the secret values

Run these one at a time in PowerShell:

```powershell
# NEXTAUTH_SECRET
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"

# ENCRYPTION_KEY
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# CRON_SECRET
node -e "console.log(require('crypto').randomBytes(24).toString('hex'))"
```

Paste each output into the matching variable in `.env.local`.

---

## STEP 4 — Google OAuth Setup

1. Go to https://console.cloud.google.com
2. Click "Select a project" → "New Project" → name it "Manage Actly" → Create
3. In the sidebar: APIs & Services → OAuth consent screen
   - User type: External → Create
   - App name: Manage Actly
   - User support email: your email
   - Developer contact: your email
   - Click Save and Continue through all steps
4. Go to Credentials → Create Credentials → OAuth 2.0 Client ID
   - Application type: Web application
   - Name: Manage Actly Web
   - Authorised redirect URIs — click Add URI and add:
     ```
     http://localhost:3000/api/auth/callback/google
     ```
   - Click Create
5. Copy the Client ID and Client Secret into `.env.local`

---

## STEP 5 — Gmail App Password

This lets the app send emails from your Gmail account WITHOUT exposing your real password.

1. Go to your Google Account: https://myaccount.google.com
2. Security → 2-Step Verification → turn it ON if not already
3. Go back to Security → search "App passwords" → click it
4. Select app: Mail → Select device: Windows Computer → Generate
5. You will get a 16-character password like `abcd efgh ijkl mnop`
6. Paste this (including spaces) as `GMAIL_APP_PASSWORD` in `.env.local`
7. Set `GMAIL_USER` to the Gmail address you used

### WHERE TO CHANGE IN CODE — Email addresses

Open these files and update the hardcoded email addresses to yours:

**File 1:** `src/app/api/contact/route.ts` — line with `CONTACT_NOTIFY_EMAIL`
- No code change needed — it reads from `.env.local`

**File 2:** `src/app/api/careers/apply/route.ts` — line with `CAREERS_NOTIFY_EMAIL`
- No code change needed — it reads from `.env.local`

**File 3:** `src/components/layout/Footer.tsx` — around line 17
```tsx
// CHANGE THIS:
{ label: "Email", value: "hello@manageactly.com", href: "mailto:hello@manageactly.com" },

// TO YOUR EMAIL:
{ label: "Email", value: "your@email.com", href: "mailto:your@email.com" },
```

---

## STEP 6 — Razorpay Setup

1. Go to https://dashboard.razorpay.com and sign up
2. Complete KYC verification (required to accept payments)
3. Go to Settings → API Keys
4. Click "Generate Test Key" (use test keys until you go live)
5. Copy Key ID (starts with `rzp_test_`) and Key Secret
6. Paste into `.env.local` as `RAZORPAY_KEY_ID` and `RAZORPAY_KEY_SECRET`

### Set up Webhook (for payment notifications)

1. In Razorpay Dashboard → Settings → Webhooks → Add New Webhook
2. Webhook URL: `https://YOUR_DOMAIN.com/api/webhooks/razorpay`
   (for local testing use ngrok — see below)
3. Secret: generate one and paste as `RAZORPAY_WEBHOOK_SECRET` in `.env.local`
4. Events to enable:
   - payment.captured
   - payment.failed
   - subscription.activated
   - subscription.charged
   - subscription.cancelled

### WHERE TO CHANGE IN CODE — Razorpay prices

Open `src/app/api/payments/order/route.ts` — around line 10:

```typescript
// CHANGE THESE AMOUNTS (in paise — multiply rupees by 100):
const PLAN_PRICES: Record<string, { amount: number; label: string }> = {
  FOUNDATION: { amount: 1000000, label: "Foundation" },  // ₹10,000 → change to your price
  GROWTH:     { amount: 2000000, label: "Growth" },       // ₹20,000 → change to your price
  AUTHORITY:  { amount: 4000000, label: "Authority" },    // ₹40,000 → change to your price
  PILOT:      { amount: 200000,  label: "Paid Pilot" },   // ₹2,000  → change to your price
};
```

### Test Razorpay locally with ngrok

```powershell
# Install ngrok: https://ngrok.com/download
ngrok http 3000
# Copy the https URL e.g. https://abc123.ngrok.io
# Use that as your webhook URL in Razorpay dashboard
```

---

## STEP 7 — Push Database Schema

```powershell
# Generate Prisma client
npm run db:generate

# Push schema to database (creates all tables)
npm run db:push
```

If you see errors about the DATABASE_URL, double check it in `.env.local`.

---

## STEP 8 — Run Development Server

```powershell
npm run dev
```

Open http://localhost:3000

### Test checklist:
- [ ] Homepage loads with navbar logo visible
- [ ] /login page shows Google sign-in button
- [ ] Google sign-in works (redirects to /dashboard)
- [ ] /pricing page loads with plan cards
- [ ] Clicking "Get Started" opens details form
- [ ] Razorpay checkout opens (use test card: 4111 1111 1111 1111)
- [ ] Contact form sends email to your Gmail
- [ ] Career application sends confirmation email

---

## STEP 9 — Where to Change Your Personal Details

Search the project for these and update them:

| What to change | File | What to search for |
|---|---|---|
| Your email address | `src/lib/tokens.ts` | `hello@manageactly.com` |
| Your WhatsApp number | `src/lib/tokens.ts` | `+91 00000 00000` |
| Your WhatsApp link | `src/components/layout/Navbar.tsx` | `wa.me/910000000000` |
| Your WhatsApp link | `src/components/layout/Footer.tsx` | `wa.me/910000000000` |
| Company location | `src/lib/tokens.ts` | `India` |
| Instagram link | `src/lib/tokens.ts` | `instagram.com/manageactly` |
| LinkedIn link | `src/lib/tokens.ts` | `linkedin.com/company/manageactly` |

**Replace `910000000000` with your actual number** (country code + number, no spaces or +):
- If your number is +91 98765 43210, use `919876543210`

---

## STEP 10 — Deploy to Vercel (Production)

1. Push your code to GitHub
2. Go to https://vercel.com → New Project → import your GitHub repo
3. In Vercel project settings → Environment Variables:
   - Add every variable from your `.env.local`
   - Change `NEXTAUTH_URL` to your actual domain: `https://yourdomain.com`
   - Change `NEXT_PUBLIC_SITE_URL` to your actual domain
   - Change `LINKEDIN_REDIRECT_URI` to: `https://yourdomain.com/api/linkedin/callback`
   - Switch Razorpay keys from `rzp_test_` to `rzp_live_` (after KYC approval)
4. Deploy

### After deploying:
- Update Google OAuth redirect URI in Google Console to: `https://yourdomain.com/api/auth/callback/google`
- Update Razorpay webhook URL to: `https://yourdomain.com/api/webhooks/razorpay`

---

## Cron Job Setup (Scheduled Posts)

The `/api/cron/publish` route publishes scheduled posts automatically.

In `vercel.json` (already in your project):
```json
{
  "crons": [
    {
      "path": "/api/cron/publish",
      "schedule": "* * * * *"
    }
  ]
}
```

This runs every minute on Vercel. For local testing, call it manually:
```
GET http://localhost:3000/api/cron/publish?secret=YOUR_CRON_SECRET
```

---

## Troubleshooting

**"Cannot find module 'next-auth'"**
→ Run: `npm install next-auth@4.24.7 @next-auth/prisma-adapter@1.0.7`

**"ENCRYPTION_KEY must be a 64-character hex string"**
→ Regenerate: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`

**"Razorpay is not defined"**
→ The Razorpay checkout.js script loads from CDN. Check your internet connection.

**Emails not sending**
→ Check GMAIL_USER and GMAIL_APP_PASSWORD are set. Ensure 2FA is ON on your Google account.
→ Run: `npm install nodemailer @types/nodemailer`

**Database connection refused**
→ Make sure PostgreSQL is running. Check the password in DATABASE_URL.

