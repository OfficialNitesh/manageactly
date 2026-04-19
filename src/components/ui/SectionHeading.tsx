"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const } },
};
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

interface SectionHeadingProps {
  label?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  titleClassName?: string;
  className?: string;
  dark?: boolean;
}

export default function SectionHeading({
  label,
  title,
  description,
  align = "left",
  titleClassName,
  className,
  dark = false,
}: SectionHeadingProps) {
  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}
    >
      {label && (
        <motion.p variants={fadeUp} className={cn("label mb-4", dark ? "text-navy-300" : "text-charcoal-400")}>
          {label}
        </motion.p>
      )}
      <motion.h2 variants={fadeUp} className={cn("font-display text-ink", dark && "text-paper", titleClassName)}>
        {title}
      </motion.h2>
      {description && (
        <motion.p variants={fadeUp} className={cn("mt-5 text-lg leading-relaxed", dark ? "text-navy-200" : "text-charcoal-600")}>
          {description}
        </motion.p>
      )}
    </motion.div>
  );
}
