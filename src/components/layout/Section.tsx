import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

interface SectionProps extends HTMLAttributes<HTMLElement> {
  as?: "section" | "div" | "article";
  size?: "sm" | "md" | "lg";
  variant?: "default" | "muted" | "dark";
  container?: boolean;
}

/**
 * Reusable section wrapper with consistent padding and optional container grid.
 */
export default function Section({
  as: Tag = "section",
  size = "md",
  variant = "default",
  container = true,
  className,
  children,
  ...props
}: SectionProps) {
  const paddingClass = {
    sm: "section-padding-sm",
    md: "section-padding",
    lg: "py-32 md:py-40",
  }[size];

  const variantClass = {
    default: "bg-paper",
    muted: "section-muted",
    dark: "section-dark",
  }[variant];

  return (
    <Tag
      className={cn(paddingClass, variantClass, className)}
      {...props}
    >
      {container ? (
        <div className="container-grid">{children}</div>
      ) : children}
    </Tag>
  );
}
