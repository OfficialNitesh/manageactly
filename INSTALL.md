# Installation Guide

## Step 1: Clean your environment (Windows PowerShell)

```powershell
# Remove old dependencies (PowerShell syntax — NOT bash)
Remove-Item -Recurse -Force node_modules -ErrorAction SilentlyContinue
Remove-Item -Force package-lock.json -ErrorAction SilentlyContinue
```

## Step 2: Install dependencies

```powershell
npm install
```

This installs the locked stack:
- Next.js 14.2.5
- React 18.2.0
- NextAuth 4.24.7 (stable)
- @next-auth/prisma-adapter 1.0.7
- Prisma 5.22.0
- NO nodemailer, NO beta packages

## Step 3: Set up environment variables

```powershell
Copy-Item .env.example .env.local
```

Open `.env.local` and fill in:
```
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=     # run: node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
DATABASE_URL=postgresql://postgres:yourpassword@localhost:5432/manage_actly
GOOGLE_CLIENT_ID=    # from console.cloud.google.com
GOOGLE_CLIENT_SECRET=
ENCRYPTION_KEY=      # run: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

## Step 4: Set up the database

Make sure PostgreSQL is running, then:

```powershell
npm run db:generate   # generates Prisma client
npm run db:push       # pushes schema to DB (dev only)
```

For production use `npm run db:migrate` instead of `db:push`.

## Step 5: Run the dev server

```powershell
npm run dev
```

Open http://localhost:3000

## Google OAuth Setup

1. Go to https://console.cloud.google.com
2. Create a new project (or select existing)
3. APIs & Services → Credentials → Create OAuth 2.0 Client ID
4. Application type: Web application
5. Authorized redirect URIs: `http://localhost:3000/api/auth/callback/google`
6. Copy Client ID and Client Secret to `.env.local`

## Build Order (follow this)

1. ✅ `npm install` + `.env.local` with DATABASE_URL
2. ✅ `npm run db:push` — get DB running
3. ✅ `npm run dev` — verify site loads at /
4. ✅ Add Google credentials — test /login
5. 🔜 Add OPENAI_API_KEY — test AI generation
6. 🔜 Add LinkedIn credentials — test OAuth connect

## Email Setup (for contact and career forms)

The contact form and career application form both send emails via Gmail.

### Steps:
1. Enable 2-Factor Authentication on your Google account
2. Go to **myaccount.google.com/apppasswords**
3. Click "Generate" for app name "Mail"
4. Copy the 16-character password
5. Add to `.env.local`:
   ```
   GMAIL_USER=yourname@gmail.com
   GMAIL_APP_PASSWORD=xxxx xxxx xxxx xxxx
   CONTACT_NOTIFY_EMAIL=hello@manageactly.com
   CAREERS_NOTIFY_EMAIL=careers@manageactly.com
   ```
6. Install nodemailer (optional — emails are skipped if not installed):
   ```powershell
   npm install nodemailer @types/nodemailer
   ```

Forms work without this setup — they just won't send emails. Applications are logged to console in development.
