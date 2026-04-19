"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const } },
};
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

export default function CtaBannerSection() {
  return (
    <section aria-label="Call to action" className="bg-ink">
      <div className="container-grid py-24 md:py-32">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="max-w-3xl"
        >
          <motion.p variants={fadeUp} className="label text-teal-accent mb-6">Ready to grow?</motion.p>
          <motion.h2 variants={fadeUp} className="font-display text-4xl md:text-5xl text-paper leading-tight mb-8">
            Stop losing business to a weak social presence.
          </motion.h2>
          <motion.p variants={fadeUp} className="text-navy-200 text-lg leading-relaxed mb-10 max-w-xl">
            Start with a 7 to 10 day paid pilot. No contracts. No lock-in. Just results.
          </motion.p>
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4">
            <Link href="/contact" className="btn-accent inline-flex items-center gap-2 text-base py-4 px-8">
              Book a Pilot
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4"/></svg>
            </Link>
            <Link href="/solutions" className="inline-flex items-center gap-2 text-base font-semibold text-navy-300 hover:text-paper transition-colors duration-200 py-4">
              See Packages
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4"/></svg>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
