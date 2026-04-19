import type { Variants } from "framer-motion";

/** Fade up from below — for section headings, cards */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

/** Fade in — for backgrounds, overlays */
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

/** Stagger container — wraps staggered children */
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

/** Stagger container with longer delay for hero */
export const staggerContainerSlow: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

/** Slide in from left */
export const slideLeft: Variants = {
  hidden: { opacity: 0, x: -32 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

/** Slide in from right */
export const slideRight: Variants = {
  hidden: { opacity: 0, x: 32 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

/** Card hover — subtle lift */
export const cardHover = {
  rest: { y: 0, boxShadow: "0 1px 3px rgba(14,26,61,0.06), 0 4px 16px rgba(14,26,61,0.08)" },
  hover: {
    y: -4,
    boxShadow: "0 4px 8px rgba(14,26,61,0.08), 0 12px 32px rgba(14,26,61,0.12)",
    transition: { duration: 0.2, ease: "easeOut" },
  },
};

/** Scale on hover — for buttons/icons */
export const scaleTap = {
  rest: { scale: 1 },
  hover: { scale: 1.02, transition: { duration: 0.15 } },
  tap: { scale: 0.98, transition: { duration: 0.1 } },
};
