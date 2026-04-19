"use client";

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

const steps = [
  {
    step: "01",
    title: "Onboarding Call",
    description: "We learn your brand, your audience, your goals and your tone. One focused 30-minute conversation sets the entire direction.",
    duration: "Day 1",
  },
  {
    step: "02",
    title: "Brand Setup",
    description: "We build your content calendar, create templates, establish brand guidelines and get access to your platforms.",
    duration: "Days 2 to 3",
  },
  {
    step: "03",
    title: "Content Goes Live",
    description: "Posts are created, reviewed and published on schedule. Community replies start immediately. You see results within the first week.",
    duration: "Day 4 onwards",
  },
  {
    step: "04",
    title: "Monthly Reviews",
    description: "Every month we review performance, adjust strategy and share a clear report. Your growth is tracked and improved continuously.",
    duration: "Ongoing",
  },
];

export default function MethodologyDiagramSection() {
  return (
    <Section variant="muted" className="border-t border-charcoal-100">
      <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}>
        <motion.p variants={fadeUp} className="label text-charcoal-400 mb-4">How It Works</motion.p>
        <motion.h2 variants={fadeUp} className="font-display text-4xl md:text-5xl text-ink mb-5 max-w-3xl">
          You brief us once. We run from there.
        </motion.h2>
        <motion.p variants={fadeUp} className="text-lg text-charcoal-600 leading-relaxed max-w-3xl mb-16">
          Getting started takes less than a week. From onboarding to your first published post, the process is designed to be fast and frictionless.
        </motion.p>

        {/* Desktop */}
        <motion.div variants={stagger} className="hidden md:grid grid-cols-4 gap-0 relative">
          <div className="absolute top-6 left-[12.5%] right-[12.5%] h-px bg-charcoal-200" aria-hidden="true" />
          {steps.map((s) => (
            <motion.div key={s.step} variants={fadeUp} className="relative px-6 first:pl-0 last:pr-0">
              <div className="relative w-12 h-12 rounded-full border-2 border-charcoal-200 bg-paper flex items-center justify-center mb-6 z-10 hover:border-teal-accent hover:bg-teal-accent/5 transition-all duration-300">
                <span className="font-mono text-xs font-semibold text-charcoal-500">{s.step}</span>
              </div>
              <p className="label text-charcoal-400 mb-2">{s.duration}</p>
              <h3 className="font-display text-xl text-ink mb-3">{s.title}</h3>
              <p className="text-sm text-charcoal-600 leading-relaxed">{s.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Mobile */}
        <motion.div variants={stagger} className="md:hidden space-y-8">
          {steps.map((s) => (
            <motion.div key={s.step} variants={fadeUp} className="flex gap-6">
              <div className="shrink-0 w-12 h-12 rounded-full border-2 border-charcoal-200 bg-paper flex items-center justify-center">
                <span className="font-mono text-xs font-semibold text-charcoal-500">{s.step}</span>
              </div>
              <div className="pt-2">
                <p className="label text-charcoal-400 mb-1">{s.duration}</p>
                <h3 className="font-display text-xl text-ink mb-2">{s.title}</h3>
                <p className="text-sm text-charcoal-600 leading-relaxed">{s.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </Section>
  );
}
