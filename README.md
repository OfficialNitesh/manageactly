# Manage Actly — Enterprise Digital Operations Platform

> [!IMPORTANT]
> **PROPRIETARY & CLOSED SOURCE LICENSE**
> This repository and all of its code are proprietary, closed-source, and protected by copyright. All rights are reserved by the author. This codebase is made public strictly for read-only portfolio review, architectural evaluation, and recruiting purposes. Any replication, cloning for deployment, unauthorized reuse, modification, or distribution of this code is strictly prohibited under the terms of the project [LICENSE](file:///c:/Users/realo/OneDrive/Desktop/manage-actly/LICENSE).

Manage Actly is a high-performance, enterprise-grade digital operations and social presence automation platform. Designed for modern digital operations management, the platform bridges the gap between customer acquisition, talent pipeline management, and client onboarding through custom automated workflows, database persistence, and communication pipelines.

---

## 🏗️ Technical Architecture & Stack

The application is engineered with an emphasis on performance, search engine optimization (SEO), and end-to-end type safety:

- **Frontend Framework:** Next.js 14 (App Router) leveraging server-side rendering (SSR) and static generation to achieve optimal Core Web Vitals.
- **Language & Type Safety:** TypeScript implemented in strict mode, establishing complete end-to-end type safety across client interfaces and server APIs.
- **Database & ORM:** PostgreSQL for relational database reliability, accessed via Prisma ORM for schema safety, database migrations, and optimized queries.
- **Design System & Styling:** Vanilla CSS combined with Tailwind CSS, utilizing a centralized, custom design token system (`src/lib/tokens.ts`) for consistent theme styling, layout guidelines, and responsiveness.
- **Animation System:** Framer Motion carefully tuned to support elegant, non-intrusive micro-animations (fade-ins, subtle shifts) to elevate user experience without impacting performance.
- **Validation:** Zod schemas enforcing strict validation of user inputs at the API boundaries (e.g., career applications and contact requests).

---

## ⚡ Key Engineering & Architectural Achievements

### 1. Robust Lead Capture & Talent Application Pipeline
- Designed and built separate public-facing entry points for business leads and career applicants.
- Integrated a secure database persistence layer using Prisma to store inbound data in relational schemas (`Lead` and `Applicant` tables), separating transaction workflows from general site analytics.
- Created robust transactional email notification flows using Node SMTP/Nodemailer/Resend to alert administration instantly when new submissions arrive, ensuring 100% notification reliability.

### 2. High-Performance Navigation & Routing
- Structured a highly performant and responsive navigation hierarchy.
- Unified routing definitions through centralized metadata configurations.
- Implemented responsive mobile drawer headers (`MobileHeader.tsx`) and global custom layouts (`Navbar.tsx`, `Footer.tsx`) with zero layout shift (CLS).

### 3. Professional UI/UX & Responsive Optimization
- Created custom layout controls to handle dynamic, complex user paths.
- Enforced strict color contrast meeting WCAG AA standards, using HSL-tailored colors, deep modern tones, and clean surface gradients.
- Tailored interactive components to prevent unwanted client behaviors (e.g. secure profile picture elements that prevent drag-and-drop and right-clicks).

---

## 📂 System Directory Layout

```
src/
├── app/                    # Next.js App Router (Pages, layouts & API routes)
│   ├── layout.tsx          # Root Layout containing global fonts, SEO configurations
│   ├── page.tsx            # Homepage
│   ├── about/              # About Us page
│   ├── careers/            # Career pipeline interface
│   ├── contact/            # Enterprise inquiry interface
│   ├── solutions/          # Specialized service offerings
│   └── api/                # Secure serverless API endpoints
├── components/             # Reusable UI component library
│   ├── layout/             # Structure (Navbar, Footer, Section wrappers)
│   ├── ui/                 # Atomic UI primitives (Buttons, Cards, Forms, Badges)
│   └── icons/              # Performance-optimized SVG icons
├── lib/                    # Core utilities & configurations
│   ├── tokens.ts           # Unified design tokens & metadata constants
│   ├── email.ts            # Email communication services
│   ├── motion.ts           # Framer Motion transition parameters
│   └── utils.ts            # Class merge, text formatting, & calculation utilities
└── styles/                 # Global styles and tailwind directives
```

---

## 📈 Performance & Accessibility Focus

- **Lighthouse Performance:** Engineered to score 90+ across performance, accessibility, best practices, and SEO.
- **SEO Optimization:** Dynamic sitemap generation, structured page hierarchies with proper header nesting, and contextual metadata factories.
- **Interactive Security:** Elements are protected against manual download triggers, and forms are fully keyboard-navigable with clear state indicators (`aria-live`, role assignments).
