"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { ReactNode, ButtonHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "accent" | "ghost";
type Size = "sm" | "md" | "lg";

interface ButtonBaseProps {
  variant?: Variant;
  size?: Size;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  className?: string;
  children?: ReactNode;
}

type ButtonAsButtonProps =
  ButtonBaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> & {
    as?: "button";
    href?: never;
  };

interface ButtonAsLinkProps extends ButtonBaseProps {
  as: "link";
  href: string;
  external?: boolean;
}

type ButtonProps = ButtonAsButtonProps | ButtonAsLinkProps;

const variantClasses: Record<Variant, string> = {
  primary: "btn-primary",
  secondary: "btn-secondary",
  accent: "btn-accent",
  ghost: "btn-ghost",
};

const sizeClasses: Record<Size, string> = {
  sm: "text-xs py-2 px-4",
  md: "",
  lg: "text-base py-4 px-9",
};

export default function Button(props: ButtonProps) {
  const {
    variant = "primary",
    size = "md",
    icon,
    iconPosition = "right",
    className,
    children,
  } = props;

  const baseClass = cn(
    variantClasses[variant],
    size !== "md" && sizeClasses[size],
    className
  );

  const content = (
    <>
      {icon && iconPosition === "left" && (
        <span className="shrink-0">{icon}</span>
      )}
      {children}
      {icon && iconPosition === "right" && (
        <span className="shrink-0">{icon}</span>
      )}
    </>
  );

  if (props.as === "link") {
    const externalProps = props.external
      ? { target: "_blank", rel: "noopener noreferrer" }
      : {};

    return (
      <Link href={props.href} className={baseClass} {...externalProps}>
        {content}
      </Link>
    );
  }

  const { as: _as, href: _href, ...buttonProps } =
    props as ButtonAsButtonProps;

  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      className={baseClass}
      {...buttonProps}
    >
      {content}
    </motion.button>
  );
}