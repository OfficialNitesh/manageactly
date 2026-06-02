# Manage Actly Database & Routing Setup Summary

## ✅ Completed Tasks

### 1. Database Schema (Prisma)
Added two new models to `prisma/schema.prisma`:

**Lead Model** (for "Book a Pilot" form):
- `id` (UUID)
- `name` (String)
- `email` (String, indexed)
- `companyName` (String, optional)
- `message` (Text, optional)
- `createdAt` (DateTime, default: now)

**Applicant Model** (for career applications):
- `id` (UUID)
- `name` (String)
- `email` (String, indexed)
- `phone` (String, optional)
- `roleAppliedFor` (String, indexed)
- `portfolioLink` (Text, optional)
- `appliedAt` (DateTime, default: now, indexed)

### 2. API Routes Created
- **`/api/leads/route.ts`** - POST endpoint to save leads from "Book a Pilot" form
- **`/api/applicants/route.ts`** - POST endpoint to save career applications

### 3. Email Functions Added
Updated `/lib/email.ts` with:
- `sendLeadNotificationEmail()` - Notifies admin of new leads
- `sendApplicantConfirmationEmail()` - Sends confirmation to applicants

### 4. Frontend Components Updated

#### ContactFormClient.tsx
- Now saves contact form submissions to Lead table
- Sends both email notifications and database records

#### CareerApplicationForm.tsx
- Now saves applications to Applicant table
- Maintains existing email flow plus database persistence

#### Navbar.tsx
- "Book a Pilot" button already wired to `/contact`
- Desktop and mobile navigation fully configured

### 5. Frontend Routes & Navigation

#### Top Navigation Links (Already Configured)
- Solutions → `/solutions`
- How It Works → `/methodology`
- Our Work → `/case-studies`
- Pricing → `/pricing`
- About → `/about`
- Careers → `/careers`

#### Key CTAs
- **"Book a Pilot"** (navbar + hero) → `/contact`
  - Uses ContactForm → saves to Lead table
  
- **"Apply Now"** (pricing page + careers) → `/careers/apply`
  - Uses CareerApplicationForm → saves to Applicant table
  
- **"Send Your Portfolio"** (careers page) → `/careers/apply`
  - Same as Apply Now

---

## 🚀 Terminal Commands to Complete Setup

### 1. Format Schema
```bash
npx prisma format
```

### 2. Generate Prisma Client
```bash
npm run db:generate
```

### 3. Push Schema to Database
```bash
npx prisma db push
```

### 4. Optional: View Data
```bash
npm run db:studio
```

This opens Prisma Studio at `http://localhost:5555` where you can:
- View all tables including Lead and Applicant
- Browse existing records
- Test queries

---

## 📋 Database Connection

**Host**: `localhost:5433` (mapped from Docker container's 5432)  
**User**: `manageactly`  
**Password**: `manageactly`  
**Database**: `manageactly`

Configured in `.env.local`:
```
DATABASE_URL=postgresql://manageactly:manageactly@localhost:5433/manageactly?schema=public
```

---

## 🧪 Testing the Setup

### Test Lead Form
1. Navigate to `http://localhost:3000/contact`
2. Fill in form and submit
3. Record appears in database and email sent to admin

### Test Career Application
1. Navigate to `http://localhost:3000/careers/apply`
2. Fill in form with name, email, portfolio link
3. Submit
4. Record saved to Applicant table and confirmation email sent

### Verify Data in Database
```bash
npm run db:studio
```

Then in Studio:
- Click "Lead" model to see all leads
- Click "Applicant" model to see all applications

---

## 🔗 API Endpoints

### POST /api/leads
Save a lead from Book a Pilot form.

**Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "companyName": "Acme Corp",
  "message": "I'm interested in the Foundation plan"
}
```

**Response:**
```json
{
  "success": true,
  "leadId": "cuid_here"
}
```

### POST /api/applicants
Save a career application.

**Body:**
```json
{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "phone": "+91 98765 43210",
  "roleAppliedFor": "Content Writer",
  "portfolioLink": "https://jane-portfolio.com"
}
```

**Response:**
```json
{
  "success": true,
  "applicantId": "cuid_here"
}
```

---

## 📊 Schema Relationships

Both Lead and Applicant models are **independent** (not tied to Workspace):
- Designed for public-facing lead capture
- Admin sees notifications via email
- Data stored for CRM / follow-up

This allows:
- Tracking all inbound leads before sign-up
- Recording career applications separately from user accounts
- Analytics on form submissions

---

## ✨ Next Steps

1. **Run Prisma commands** above to finalize schema push
2. **Test** both forms end-to-end
3. **Monitor** Lead and Applicant tables for data
4. **Optional**: Set up a CRM sync (Pipedrive, HubSpot, etc.) to export this data
