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

const problems = [
  {
    number: "01",
    title: "Posting inconsistently loses followers",
    body: "Brands that go quiet for even a week lose momentum. Algorithms punish inconsistency. Your audience forgets you exist.",
  },
  {
    number: "02",
    title: "Bad visuals kill credibility",
    body: "Poor graphic design signals an unprofessional brand. In 2024, aesthetics are trust. Your feed is your first impression.",
  },
  {
    number: "03",
    title: "You don't have time to do it right",
    body: "Running a business and managing socials simultaneously is a recipe for mediocre results on both fronts. Something always gets neglected.",
  },
];

export default function ProblemSection() {
  return (
    <Section variant="muted" className="border-t border-charcoal-100">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 gap-y-16">
        <div className="md:col-span-5">
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}>
            <motion.p variants={fadeUp} className="label text-charcoal-400 mb-4">Why Brands Struggle</motion.p>
            <motion.h2 variants={fadeUp} className="font-display text-4xl md:text-5xl text-ink mb-5">
              Great products get ignored online every day.
            </motion.h2>
            <motion.p variants={fadeUp} className="text-lg text-charcoal-600 leading-relaxed">
              Your product is excellent. Your service is solid. But your social media presence does not reflect that — and potential customers are judging you before they ever speak to you.
            </motion.p>
          </motion.div>
        </div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="md:col-span-6 md:col-start-7 space-y-8"
        >
          {problems.map((p) => (
            <motion.div key={p.number} variants={fadeUp} className="flex gap-6 group">
              <div className="shrink-0 w-10 h-10 rounded-xl border border-charcoal-200 flex items-center justify-center group-hover:border-teal-accent group-hover:bg-teal-accent/5 transition-all duration-300">
                <span className="font-mono text-xs text-charcoal-400 group-hover:text-teal-accent transition-colors duration-300">
                  {p.number}
                </span>
              </div>
              <div>
                <h3 className="font-display text-xl text-ink mb-2">{p.title}</h3>
                <p className="text-charcoal-600 text-sm leading-relaxed">{p.body}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </Section>
  );
}
