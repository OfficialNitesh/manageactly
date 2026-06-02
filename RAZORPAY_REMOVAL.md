# Razorpay Removal & UPI-Only System Guide

## 📋 Summary

This document outlines the complete removal of Razorpay and transition to a UPI-only payment system. The pricing page is already configured for direct UPI payments via QR code.

---

## 🗑️ Files to Delete

### API Routes
- `src/app/api/payments/checkout/route.ts`
- `src/app/api/payments/order/route.ts`
- `src/app/api/payments/verify/route.ts`
- `src/app/api/webhooks/razorpay/route.ts`

### Library Files (if exist)
- `src/lib/payments/razorpay.ts` (if present)
- `src/lib/payments/` (entire folder if only contains Razorpay)

---

## 🧹 Cleanup Commands

### 1. Remove Razorpay Package
```bash
npm uninstall razorpay
```

### 2. Remove Razorpay API Routes
```powershell
Remove-Item -Path "src/app/api/payments/checkout/route.ts" -Force
Remove-Item -Path "src/app/api/payments/order/route.ts" -Force
Remove-Item -Path "src/app/api/payments/verify/route.ts" -Force
Remove-Item -Path "src/app/api/webhooks/razorpay" -Recurse -Force
```

Or on Linux/Mac:
```bash
rm -f src/app/api/payments/checkout/route.ts
rm -f src/app/api/payments/order/route.ts
rm -f src/app/api/payments/verify/route.ts
rm -rf src/app/api/webhooks/razorpay
```

### 3. Remove Empty Folders (if necessary)
```powershell
# Remove payments folder if all routes are deleted
Remove-Item -Path "src/app/api/payments" -Recurse -Force
```

---

## 📝 Environment Variables to Remove from `.env.local` and `.env.example`

Remove these lines:
```
# ── Razorpay ─────────────────────────────────────────────────────────
RAZORPAY_KEY_ID=rzp_test_PASTE_FROM_RAZORPAY
RAZORPAY_KEY_SECRET=PASTE_FROM_RAZORPAY
RAZORPAY_WEBHOOK_SECRET=PASTE_FROM_RAZORPAY
RAZORPAY_PLAN_STARTER=plan_
RAZORPAY_PLAN_PRO=plan_
RAZORPAY_PLAN_ENTERPRISE=plan_
```

---

## 🗄️ Database Schema Changes

Update `prisma/schema.prisma` — the Subscription model already supports provider abstraction but references Razorpay. Consider:

1. **Option A (Keep as is)** — Leave the Razorpay fields for backward compatibility, just don't populate them
2. **Option B (Clean up)** — Create a migration to remove Razorpay-specific fields:

```prisma
model Subscription {
  id          String @id @default(cuid())
  workspaceId String @unique

  // Provider abstraction for future payment systems
  provider String @default("upi")  // Changed from "razorpay"

  // Payment tracking (UPI-specific or generic)
  // Razorpay fields can be removed or kept as optional

  plan   SubscriptionPlan   @default(FREE)
  status SubscriptionStatus @default(TRIALING)

  currentPeriodStart DateTime?
  currentPeriodEnd   DateTime?
  trialEndsAt        DateTime?
  cancelledAt        DateTime?

  postsPerMonth     Int @default(10)
  aiCreditsPerMonth Int @default(20)

  workspace Workspace @relation(fields: [workspaceId], references: [id], onDelete: Cascade)

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@index([workspaceId])
  @@index([status])
}
```

---

## 📚 Documentation Updates

### Update these files by removing Razorpay references:

1. **`SETUP_GUIDE.md`**
   - Remove "STEP 6 — Razorpay Setup" section
   - Remove Razorpay testing instructions
   - Add UPI setup instructions instead

2. **`INSTALL.md`**
   - Remove "Add Razorpay credentials" step
   - Update to reference direct UPI payments

3. **`README.md`** (if it mentions Razorpay)
   - Update payment method to "Direct UPI"

4. **`.env.example`**
   - Remove all RAZORPAY_* variables

---

## ✅ Current UPI System (Already Configured)

### Pricing Page (`src/app/pricing/PricingClient.tsx`)
- ✅ UPI QR code generation using `api.qrserver.com`
- ✅ All "Get Started" buttons wired to UPI payment flow
- ✅ UTR/Transaction ID collection form
- ✅ Email notifications via Resend

### UPI Integration Details
- **UPI ID**: `nitesshh@axl` (configured in PricingClient.tsx)
- **QR Generation**: Dynamic QR codes for each plan amount
- **Payment Flow**: Plan selection → QR display → UTR entry → Email confirmation

---

## 🔄 Migration Steps

1. **Back up your current state** (git commit)
   ```bash
   git add .
   git commit -m "Pre-Razorpay removal backup"
   ```

2. **Run cleanup commands** above

3. **Remove .env variables**
   ```bash
   npm uninstall razorpay
   ```

4. **Update documentation files** (manually)

5. **Optional: Create Prisma migration** to clean Subscription schema
   ```bash
   npx prisma migrate dev --name remove_razorpay_fields
   ```

6. **Test pricing page** for UPI flow end-to-end

7. **Commit changes**
   ```bash
   git add .
   git commit -m "Remove Razorpay, keep UPI-only system"
   ```

---

## 🎯 UPI Payment Flow

1. User clicks "Get Started" on a pricing plan
2. Plan selection → UPI Payment screen
3. QR code generated with plan amount
4. User scans and pays via any UPI app (GPay, PhonePe, Paytm, BHIM, etc.)
5. User enters UTR/Transaction ID
6. System saves to database (Lead/Payment tracking)
7. Confirmation email sent to user
8. Admin notified via `/api/payments/upi` endpoint

---

## 💾 Payment Record Storage

Current UPI payments are stored via:
- **Endpoint**: `/api/payments/upi` (existing)
- **Database**: Lead or custom Payment table (if created)
- **Tracking**: UTR number + customer email

No Razorpay SDK interaction needed.

---

## ⚠️ Before Removal

Verify:
- [ ] All payment history is exported or archived
- [ ] Razorpay webhook is disabled in Razorpay dashboard
- [ ] UPI payment flow tested end-to-end on pricing page
- [ ] Email notifications configured (NOTIFY_EMAIL set in .env)
- [ ] QR code displays properly on pricing page

---

## ✨ Result

After removal:
- ✅ No Razorpay SDK or package dependencies
- ✅ Simpler architecture (direct UPI QR payments)
- ✅ Lower operational overhead (no webhook verification)
- ✅ Faster checkout (no page redirects)
- ✅ All tracking via UTR number
