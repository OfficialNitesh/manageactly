/**
 * Centralized design tokens for Manage Actly
 * Single source of truth for colors, typography, and spacing
 */

export const tokens = {
  colors: {
    ink: "#0e1a3d",
    inkMuted: "#364151",
    inkSubtle: "#7a8696",
    bg: "#ffffff",
    bgMuted: "#f5f7fa",
    bgDark: "#0e1a3d",
    accent: "#2a9d8f",
    accentLight: "#3db8a9",
    accentDark: "#1f7a6e",
    border: "#e4e6ea",
    borderDark: "#253a6e",
    // Navy scale
    navy950: "#070d24",
    navy900: "#0e1a3d",
    navy800: "#192856",
    navy700: "#253a6e",
    navy600: "#344d87",
    // Charcoal scale
    charcoal50: "#f4f5f6",
    charcoal100: "#e4e6ea",
    charcoal200: "#c8cdd4",
    charcoal400: "#7a8696",
    charcoal600: "#475566",
    charcoal700: "#364151",
    charcoal800: "#263040",
  },

  fonts: {
    display: "var(--font-display)",
    body: "var(--font-body)",
    mono: "var(--font-mono)",
  },

  fontSizes: {
    "2xs": "0.625rem",
    xs: "0.75rem",
    sm: "0.875rem",
    base: "1rem",
    lg: "1.125rem",
    xl: "1.25rem",
    "2xl": "1.5rem",
    "3xl": "1.875rem",
    "4xl": "2.25rem",
    "5xl": "3rem",
    "6xl": "3.75rem",
    "7xl": "4.5rem",
  },

  spacing: {
    sectionSm: "4rem",
    section: "6rem",
    sectionLg: "8rem",
  },

  transitions: {
    fast: "150ms",
    base: "300ms",
    slow: "600ms",
    easeOutExpo: "cubic-bezier(0.16, 1, 0.3, 1)",
  },

  shadows: {
    card: "0 1px 3px rgba(14,26,61,0.06), 0 4px 16px rgba(14,26,61,0.08)",
    cardHover: "0 4px 8px rgba(14,26,61,0.08), 0 12px 32px rgba(14,26,61,0.12)",
    section: "0 24px 64px rgba(14,26,61,0.10)",
  },
} as const;

/** Navigation links */
export const navLinks = [
  { label: "Services", href: "/solutions" },
  { label: "How It Works", href: "/methodology" },
  { label: "Our Work", href: "/case-studies" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
  { label: "Careers", href: "/careers" },
] as const;

/** Company meta */
export const company = {
  name: "Manage Actly",
  tagline: "We Take Ownership of Your Digital Presence",
  description:
    "Manage Actly is a management-first digital operations company. We don't advise — we operate. We don't consult — we execute.",
  email: "realofficialcreator@gmail.com",
  location: "New York, NY",
  founded: "2023",
} as const;

/** SEO defaults */
export const seoDefaults = {
  title: "Manage Actly | Digital Operations Management",
  description:
    "Management-first digital operations. Manage Actly takes ownership of your digital infrastructure, content systems, and analytics — so leadership can focus on what matters.",
  ogImage: "/og-image.png",
  twitterHandle: "@manageactly",
  siteUrl: "https://manageactly.com",
} as const;
