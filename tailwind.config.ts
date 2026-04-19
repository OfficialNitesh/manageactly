import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary palette
        navy: {
          50: "#f0f2f8",
          100: "#dde2f0",
          200: "#b8c3e0",
          300: "#8fa0cb",
          400: "#637db3",
          500: "#4560a0",
          600: "#344d87",
          700: "#253a6e",
          800: "#192856",
          900: "#0e1a3d",
          950: "#070d24",
        },
        charcoal: {
          50: "#f4f5f6",
          100: "#e4e6ea",
          200: "#c8cdd4",
          300: "#a3acb8",
          400: "#7a8696",
          500: "#5c6a7a",
          600: "#475566",
          700: "#364151",
          800: "#263040",
          900: "#182030",
          950: "#0d1520",
        },
        // Accent
        slate: {
          accent: "#c8d8e8",
        },
        teal: {
          accent: "#2a9d8f",
          light: "#3db8a9",
          dark: "#1f7a6e",
        },
        // Neutrals
        ink: "#0e1a3d",
        mist: "#f5f7fa",
        paper: "#ffffff",
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      fontSize: {
        "2xs": ["0.625rem", { lineHeight: "1rem" }],
        xs: ["0.75rem", { lineHeight: "1.125rem" }],
        sm: ["0.875rem", { lineHeight: "1.375rem" }],
        base: ["1rem", { lineHeight: "1.625rem" }],
        lg: ["1.125rem", { lineHeight: "1.75rem" }],
        xl: ["1.25rem", { lineHeight: "1.875rem" }],
        "2xl": ["1.5rem", { lineHeight: "2rem" }],
        "3xl": ["1.875rem", { lineHeight: "2.375rem" }],
        "4xl": ["2.25rem", { lineHeight: "2.75rem" }],
        "5xl": ["3rem", { lineHeight: "3.5rem" }],
        "6xl": ["3.75rem", { lineHeight: "4.25rem" }],
        "7xl": ["4.5rem", { lineHeight: "5rem" }],
        "8xl": ["6rem", { lineHeight: "6.5rem" }],
        "9xl": ["8rem", { lineHeight: "8.5rem" }],
      },
      spacing: {
        // Layout tokens
        "grid-gap": "1.5rem",
        section: "6rem",
        "section-sm": "4rem",
        "section-lg": "8rem",
      },
      maxWidth: {
        "8xl": "88rem",
        "9xl": "96rem",
        container: "80rem",
      },
      borderRadius: {
        "4xl": "2rem",
      },
      boxShadow: {
        card: "0 1px 3px rgba(14,26,61,0.06), 0 4px 16px rgba(14,26,61,0.08)",
        "card-hover":
          "0 4px 8px rgba(14,26,61,0.08), 0 12px 32px rgba(14,26,61,0.12)",
        section: "0 24px 64px rgba(14,26,61,0.10)",
      },
      transitionTimingFunction: {
        "ease-out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
        "ease-in-out-expo": "cubic-bezier(0.87, 0, 0.13, 1)",
      },
      animation: {
        "fade-up": "fadeUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) both",
        "fade-in": "fadeIn 0.4s ease both",
      },
      keyframes: {
        fadeUp: {
          from: { opacity: "0", transform: "translateY(24px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
      },
      gridTemplateColumns: {
        "12": "repeat(12, minmax(0, 1fr))",
      },
    },
  },
  plugins: [],
};

export default config;
