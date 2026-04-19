# Manage Actly — Enterprise Website

Production-ready Next.js 14 website for Manage Actly, a management-first digital operations company.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS with centralized design tokens
- **Animation**: Framer Motion (fade + slide only)
- **Validation**: Zod
- **Fonts**: Playfair Display (display) + DM Sans (body) via `next/font/google`

---

## Quick Start

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Project Structure

```
src/
├── app/                    # Next.js App Router pages + API routes
│   ├── layout.tsx          # Root layout (fonts, nav, footer)
│   ├── page.tsx            # Homepage
│   ├── about/
│   ├── careers/
│   ├── case-studies/
│   ├── contact/
│   ├── insights/
│   ├── methodology/
│   ├── solutions/
│   ├── api/
│   │   └── contact/        # Contact form API route (Zod validation)
│   ├── sitemap.ts          # Dynamic XML sitemap
│   ├── robots.ts           # robots.txt
│   └── not-found.tsx       # Custom 404 page
├── components/
│   ├── layout/             # Navbar, Footer, Section wrapper
│   ├── ui/                 # Reusable UI: Card, Button, Badge, Form
│   ├── sections/           # Page-section components (Hero, CTA, etc.)
│   ├── icons/              # Custom SVG icon set
│   └── index.ts            # Barrel file
├── lib/
│   ├── tokens.ts           # Design tokens, nav links, company meta
│   ├── metadata.ts         # SEO metadata factory function
│   ├── motion.ts           # Framer Motion animation variants
│   └── utils.ts            # cn(), formatDate(), readingTime()
└── styles/
    └── globals.css         # Tailwind base + component layer
```

---

## Design System

### Colors
| Token | Hex | Usage |
|-------|-----|-------|
| `ink` | `#0e1a3d` | Primary text, dark backgrounds |
| `teal-accent` | `#2a9d8f` | CTAs, highlights, hover states |
| `charcoal-600` | `#475566` | Body text |
| `mist` | `#f5f7fa` | Muted section backgrounds |

### Typography
- **Display**: Playfair Display — headings, hero text
- **Body**: DM Sans — all UI text, labels, descriptions
- **Mono**: JetBrains Mono — step numbers, code, labels

### Spacing Tokens (Tailwind)
- `section-padding` = `py-24 md:py-32`
- `container-grid` = centered container with responsive padding
- `grid-12` = 12-column grid with `gap-6`

---

## Adding Content

### Insights (Blog Posts)
Replace the static array in `src/app/insights/page.tsx` with a CMS fetch:

```typescript
// Example: fetch from Contentful / Sanity / MDX
const posts = await fetchInsightPosts();
```

### Case Studies
Add individual `[slug]/page.tsx` files under `src/app/case-studies/`.

---

## Email Configuration

The contact form (`/api/contact`) validates submissions with Zod.
To enable email delivery, configure SMTP in `.env.local` and uncomment the
`nodemailer` block in `src/app/api/contact/route.ts`.

Recommended providers: **Resend**, **Postmark**, **SendGrid**.

---

## Performance

- Fonts preloaded via `next/font/google` (zero layout shift)
- Images lazy-loaded by default
- Static generation for all non-dynamic pages
- Target: Lighthouse 90+ across all categories

---

## Accessibility

- Semantic HTML throughout
- Skip navigation link on all pages
- `aria-label`, `aria-current`, `role` attributes on interactive elements
- Focus-visible outlines styled in `globals.css`
- Color contrast meets WCAG AA
- Forms: `htmlFor`/`id` pairing, `aria-required`, `role="alert"` on errors
