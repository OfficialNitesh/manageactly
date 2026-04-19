import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  variant?: "default" | "accent" | "dark" | "outline";
  className?: string;
}

export default function Badge({ children, variant = "default", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold tracking-wide",
        {
          default: "bg-charcoal-100 text-charcoal-700",
          accent: "bg-teal-accent/10 text-teal-dark",
          dark: "bg-navy-900 text-navy-200",
          outline: "border border-charcoal-200 text-charcoal-600 bg-transparent",
        }[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
