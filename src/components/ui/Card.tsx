"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const } },
};

interface CardProps {
  className?: string;
  children: ReactNode;
  animate?: boolean;
}

export function Card({ className, children, animate = true }: CardProps) {
  if (!animate) {
    return <div className={cn("card", className)}>{children}</div>;
  }
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      className={cn("bg-paper rounded-2xl border border-charcoal-100 p-8", className)}
    >
      {children}
    </motion.div>
  );
}

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  className?: string;
}

export function FeatureCard({ icon, title, description, className }: FeatureCardProps) {
  return (
    <motion.div
      variants={fadeUp}
      className={cn(
        "group bg-paper rounded-2xl border border-charcoal-100 p-8 transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1",
        className
      )}
    >
      <div className="w-12 h-12 rounded-xl bg-mist flex items-center justify-center mb-6 group-hover:bg-teal-accent/10 transition-colors duration-300">
        <div className="text-charcoal-600 group-hover:text-teal-accent transition-colors duration-300">{icon}</div>
      </div>
      <h3 className="font-display text-xl text-ink mb-3">{title}</h3>
      <p className="text-charcoal-600 text-sm leading-relaxed">{description}</p>
    </motion.div>
  );
}

interface StatCardProps {
  number: string;
  unit?: string;
  label: string;
  description?: string;
  dark?: boolean;
}

export function StatCard({ number, unit, label, description, dark = false }: StatCardProps) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className={cn("p-8 rounded-2xl border", dark ? "border-navy-700 bg-navy-900" : "border-charcoal-100 bg-paper")}
    >
      <div className="flex items-end gap-1 mb-2">
        <span className={cn("font-display text-5xl font-bold tracking-tight", dark ? "text-paper" : "text-ink")}>{number}</span>
        {unit && <span className="font-display text-2xl font-semibold pb-1 text-teal-accent">{unit}</span>}
      </div>
      <p className={cn("text-sm font-semibold mb-1", dark ? "text-navy-200" : "text-charcoal-700")}>{label}</p>
      {description && <p className={cn("text-xs", dark ? "text-navy-400" : "text-charcoal-400")}>{description}</p>}
    </motion.div>
  );
}
