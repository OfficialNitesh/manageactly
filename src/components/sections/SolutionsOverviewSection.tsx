"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Section from "@/components/layout/Section";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const } },
};
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const services = [
  {
    icon: "📱",
    title: "Social Media Management",
    description: "We manage your Instagram, Facebook, YouTube and LinkedIn. Consistent posting, community replies, and strategic growth planning every single day.",
  },
  {
    icon: "✍️",
    title: "Content Creation",
    description: "Captions, scripts, carousels, reels and stories — crafted for your brand voice. Content that actually stops the scroll.",
  },
  {
    icon: "🎬",
    title: "Video Production",
    description: "Short form reels, YouTube videos, product showcases and brand films. We handle scripting, shooting coordination and editing.",
  },
  {
    icon: "🌐",
    title: "Website Building",
    description: "Clean, fast, mobile-first websites that convert visitors into customers. From landing pages to full business websites.",
  },
  {
    icon: "💬",
    title: "Community Management",
    description: "Comments answered, DMs handled, audience engaged. We represent your brand with the tone and care it deserves.",
  },
  {
    icon: "📊",
    title: "Analytics and Reporting",
    description: "Monthly reports covering reach, engagement, follower growth and what is actually working. Clear data, no jargon.",
  },
];

export default function SolutionsOverviewSection() {
  return (
    <Section>
      <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}>
        <motion.p variants={fadeUp} className="label text-charcoal-400 mb-4">What We Do</motion.p>
        <motion.h2 variants={fadeUp} className="font-display text-4xl md:text-5xl text-ink mb-5 max-w-3xl">
          Everything your brand needs online.
        </motion.h2>
        <motion.p variants={fadeUp} className="text-lg text-charcoal-600 leading-relaxed max-w-3xl mb-14">
          We take full ownership of your digital presence. You focus on your business. We handle everything else.
        </motion.p>

        <motion.div variants={stagger} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s) => (
            <motion.div
              key={s.title}
              variants={fadeUp}
              className="group bg-paper rounded-2xl border border-charcoal-100 p-8 hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300"
            >
              <div className="text-3xl mb-5">{s.icon}</div>
              <h3 className="font-display text-xl text-ink mb-3">{s.title}</h3>
              <p className="text-charcoal-600 text-sm leading-relaxed">{s.description}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div variants={fadeUp} className="mt-10">
          <Link
            href="/solutions"
            className="inline-flex items-center gap-2 text-sm font-semibold text-teal-accent hover:text-teal-dark transition-colors duration-200"
          >
            See all packages and pricing
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4"/></svg>
          </Link>
        </motion.div>
      </motion.div>
    </Section>
  );
}
