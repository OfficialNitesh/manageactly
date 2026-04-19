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
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const ArrowRight = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4"/></svg>
);

// Pilot programme card matching the uploaded design
export default function PilotProgrammeSection() {
  return (
    <Section>
      <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}>
        <motion.p variants={fadeUp} className="label text-charcoal-400 mb-4">How Every Engagement Begins</motion.p>
        <motion.h2 variants={fadeUp} className="font-display text-4xl md:text-5xl text-ink mb-5 max-w-3xl">
          The Paid Pilot Programme
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mt-10">
          {/* Left: description */}
          <motion.div variants={fadeUp} className="md:col-span-7 flex flex-col justify-center">
            <p className="text-charcoal-600 text-lg leading-relaxed mb-6">
              We do not offer free trials. We offer a short, high-intensity demonstration of operational capability. Profile audit, visual revamp, and 3 to 5 published pieces of high-quality content — proving the system works before any long-term commitment is required.
            </p>
            <p className="text-charcoal-600 leading-relaxed mb-8">
              If you like what you see, we move to a monthly retainer. If not, you keep everything we created and pay nothing more.
            </p>
            <Link
              href="/contact"
              className="btn-accent inline-flex items-center gap-2 self-start"
            >
              Book Your Pilot
              <ArrowRight />
            </Link>
          </motion.div>

          {/* Right: pricing card matching design */}
          <motion.div variants={fadeUp} className="md:col-span-5">
            <div className="bg-ink rounded-2xl p-10 h-full flex flex-col justify-between min-h-[220px]">
              <p className="label text-teal-accent tracking-widest mb-4">Investment</p>
              <div>
                <p className="font-display text-6xl font-bold text-paper leading-none mb-3">
                  ₹2K–₹5K
                </p>
                <p className="text-navy-300 text-sm">7–10 Day Pilot</p>
              </div>
              <div className="mt-8 pt-6 border-t border-navy-800 space-y-2">
                {["Full profile audit", "3 to 5 published posts", "Visual brand setup", "Zero lock-in commitment"].map(item => (
                  <div key={item} className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full bg-teal-accent/20 flex items-center justify-center shrink-0">
                      <svg width="8" height="8" viewBox="0 0 10 10" fill="none" stroke="#2a9d8f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 5l2 2 4-4"/></svg>
                    </div>
                    <span className="text-navy-200 text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </Section>
  );
}
