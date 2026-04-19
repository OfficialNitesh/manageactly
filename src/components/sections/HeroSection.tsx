"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const, delay: i * 0.12 },
  }),
};

export default function HeroSection() {
  return (
    <section aria-label="Hero" className="relative min-h-[92vh] flex items-center bg-navy-950 overflow-hidden">
      {/* Grid texture */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
        aria-hidden="true"
      />
      {/* Teal glow */}
      <div
        className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] rounded-full opacity-[0.05] blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, #2a9d8f 0%, transparent 70%)" }}
        aria-hidden="true"
      />

      <div className="container-grid relative z-10 pt-28 pb-20">
        <div className="md:col-span-12 lg:col-span-10">
          <motion.p custom={0} variants={fadeUp} initial="hidden" animate="visible"
            className="label text-teal-accent mb-8 tracking-widest"
          >
            Social Media Management
          </motion.p>

          <motion.h1 custom={1} variants={fadeUp} initial="hidden" animate="visible"
            className="font-display text-paper text-5xl md:text-6xl lg:text-[72px] leading-[1.06] tracking-tight mb-8 max-w-5xl"
          >
            Your brand deserves
            <br />
            <span className="text-teal-accent">to be seen.</span>
            <br />
            We make it happen.
          </motion.h1>

          <motion.p custom={2} variants={fadeUp} initial="hidden" animate="visible"
            className="text-navy-200 text-lg md:text-xl leading-relaxed max-w-2xl mb-12"
          >
            Manage Actly handles your social media presence end to end. Content creation, posting, community management, video production and website building. This means you can focus on your business.
          </motion.p>

          <motion.div custom={3} variants={fadeUp} initial="hidden" animate="visible"
            className="flex flex-col sm:flex-row gap-4 items-start"
          >
            <Link href="/contact" className="btn-accent inline-flex items-center gap-2 text-base py-4 px-8">
              Start with a Pilot
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4"/></svg>
            </Link>
            <Link href="/solutions"
              className="inline-flex items-center gap-2 text-base font-semibold border border-navy-700 rounded-full px-8 py-4 text-navy-200 hover:text-paper hover:bg-navy-800 transition-all duration-200"
            >
              See Our Packages
            </Link>
          </motion.div>

          <motion.div custom={4} variants={fadeUp} initial="hidden" animate="visible"
            className="mt-16 pt-8 border-t border-navy-800 flex flex-wrap gap-10"
          >
            {[
              { n: "₹2K", label: "Pilot starts at" },
              { n: "7", label: "Days to first results" },
              { n: "100%", label: "Managed for you" },
            ].map(({ n, label }) => (
              <div key={label}>
                <p className="font-display text-3xl font-bold text-paper">{n}</p>
                <p className="text-xs text-navy-400 mt-1">{label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Slim bottom fade — just 8px */}
      <div
        className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-paper to-transparent pointer-events-none"
        aria-hidden="true"
      />
    </section>
  );
}
