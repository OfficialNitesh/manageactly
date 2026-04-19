import type { Metadata } from "next";
import { generateMetadata as genMeta } from "@/lib/metadata";
import Section from "@/components/layout/Section";
import CtaBannerSection from "@/components/sections/CtaBannerSection";
import Link from "next/link";

export const metadata: Metadata = genMeta({
  title: "Solutions and Pricing",
  description: "Social media management packages for Indian businesses. Foundation, Growth and Authority plans. Start with a paid pilot.",
  path: "/solutions",
});

const plans = [
  {
    tier: "Foundation",
    label: "FOUNDATION",
    price: "₹10K–₹15K",
    period: "per month",
    highlight: false,
    badge: null,
    audience: "Startups · Clinics · Founders",
    description: "Perfect for businesses establishing their social presence. 3 platforms, consistent posting and community basics.",
    includes: [
      "Ownership of 3 platforms (Instagram, Facebook, YouTube)",
      "8 high quality static posts per month",
      "Basic aesthetic grid planning",
      "Community monitoring during business hours",
      "Standard monthly performance report",
      "Brand tone consistency",
    ],
  },
  {
    tier: "Growth",
    label: "GROWTH",
    price: "₹20K–₹35K",
    period: "per month",
    highlight: true,
    badge: "Most Popular",
    audience: "Mid-size B2B · Scaling Brands",
    description: "Full-service management for brands ready to scale. More content, more platforms, more engagement.",
    includes: [
      "Ownership of 3 to 4 platforms",
      "15 to 20 posts per month including Reels and Carousels",
      "Active daily community engagement",
      "Bi-weekly strategy calls",
      "Advanced analytics reporting",
      "Proactive content calendar 30 days ahead",
    ],
  },
  {
    tier: "Authority",
    label: "AUTHORITY",
    price: "₹40K–₹80K+",
    period: "per month",
    highlight: false,
    badge: null,
    audience: "Funded Startups · Enterprise · Luxury",
    description: "Omnichannel dominance. Daily presence, custom shoots, executive reporting and competitor intelligence.",
    includes: [
      "Full omnichannel (5 or more platforms)",
      "Daily posting velocity across all channels",
      "Custom content shoots and creative direction",
      "Competitor share-of-voice analysis",
      "Crisis management and PR alignment",
      "Real-time executive data dashboards",
    ],
  },
];

const addOns = [
  { name: "Website Design and Development", price: "₹15K–₹60K", note: "One-time" },
  { name: "YouTube Channel Management", price: "₹8K–₹20K", note: "Per month" },
  { name: "Paid Ads Management (Meta / Google)", price: "₹5K–₹15K", note: "Per month + ad spend" },
  { name: "Video Production (Reels / Shorts)", price: "₹3K–₹8K", note: "Per video" },
  { name: "Brand Identity and Logo Design", price: "₹10K–₹25K", note: "One-time" },
  { name: "PR and Media Coverage", price: "₹15K+", note: "Per campaign" },
];

export default function SolutionsPage() {
  return (
    <>
      {/* Header */}
      <section className="pt-32 pb-16 bg-paper border-b border-charcoal-100">
        <div className="container-grid">
          <div className="md:col-span-8 lg:col-span-7">
            <p className="label text-charcoal-400 mb-5">Packages and Pricing</p>
            <h1 className="font-display text-5xl md:text-6xl text-ink leading-tight mb-6">
              Simple, honest pricing.
            </h1>
            <p className="text-xl text-charcoal-600 leading-relaxed max-w-2xl">
              Every engagement starts with a paid pilot. Once you see what we can do, choose the plan that fits your ambition.
            </p>
          </div>
        </div>
      </section>

      {/* Pilot Card */}
      <Section variant="muted">
        <div className="max-w-4xl">
          <p className="label text-charcoal-400 mb-4">How Every Engagement Begins</p>
          <h2 className="font-display text-3xl md:text-4xl text-ink mb-8">The Paid Pilot Programme</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <p className="text-charcoal-600 leading-relaxed mb-4">
                We do not offer free trials. We offer a short, high-intensity demonstration of operational capability. Profile audit, visual revamp, and 3 to 5 published pieces of high-quality content. This proves the system works before any long-term commitment is required.
              </p>
              <p className="text-charcoal-600 leading-relaxed">
                If you are happy with the results, we move to a monthly plan. If not, you keep everything we made.
              </p>
            </div>
            <div className="bg-ink rounded-2xl p-8 flex flex-col justify-between">
              <p className="label text-teal-accent tracking-widest mb-4">Investment</p>
              <div>
                <p className="font-display text-5xl font-bold text-paper leading-none mb-2">₹2K–₹5K</p>
                <p className="text-navy-300 text-sm mb-6">7–10 Day Pilot</p>
              </div>
              <div className="space-y-2">
                {["Full profile audit", "3 to 5 published posts", "Visual brand setup", "Zero lock-in"].map(item => (
                  <div key={item} className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full bg-teal-accent/20 flex items-center justify-center shrink-0">
                      <svg width="8" height="8" viewBox="0 0 10 10" fill="none" stroke="#2a9d8f" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 5l2 2 4-4"/></svg>
                    </div>
                    <span className="text-navy-200 text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Plans — matching uploaded image layout */}
      <Section>
        <p className="label text-charcoal-400 mb-4">Monthly Plans</p>
        <h2 className="font-display text-3xl md:text-4xl text-ink mb-12">Choose your growth level.</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-charcoal-200 rounded-2xl overflow-hidden">
          {plans.map((plan, i) => (
            <div
              key={plan.tier}
              className={`relative flex flex-col p-8 md:p-10 ${
                plan.highlight
                  ? "bg-ink text-paper"
                  : "bg-paper text-ink"
              } ${i < plans.length - 1 ? "border-b md:border-b-0 md:border-r border-charcoal-200" : ""}`}
            >
              {plan.badge && (
                <div className="flex items-center gap-2 mb-4">
                  <span className="label text-teal-accent tracking-widest">{plan.label}</span>
                  <span className="text-xs bg-teal-accent text-paper px-2 py-0.5 rounded-full font-semibold">★ {plan.badge}</span>
                </div>
              )}
              {!plan.badge && (
                <p className={`label tracking-widest mb-4 ${plan.highlight ? "text-teal-accent" : "text-charcoal-400"}`}>{plan.label}</p>
              )}

              <div className="mb-2">
                <p className={`font-display text-4xl md:text-5xl font-bold leading-none ${plan.highlight ? "text-paper" : "text-ink"}`}>
                  {plan.price}
                </p>
                <p className={`text-sm mt-1 ${plan.highlight ? "text-navy-300" : "text-charcoal-500"}`}>{plan.period}</p>
              </div>

              <div className={`my-6 h-px ${plan.highlight ? "bg-navy-800" : "bg-charcoal-100"}`} />

              <p className={`text-xs font-semibold tracking-widest mb-5 ${plan.highlight ? "text-navy-400" : "text-charcoal-400"}`}>
                {plan.audience}
              </p>

              <ul className="space-y-3 flex-1">
                {plan.includes.map(item => (
                  <li key={item} className="flex items-start gap-3">
                    <span className={`mt-1 shrink-0 font-semibold text-sm ${plan.highlight ? "text-teal-accent" : "text-teal-accent"}`}>✓</span>
                    <span className={`text-sm leading-snug ${plan.highlight ? "text-navy-200" : "text-charcoal-700"}`}>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8">
                <Link
                  href="/contact"
                  className={`block w-full text-center py-3 px-6 rounded-full font-semibold text-sm transition-all duration-200 ${
                    plan.highlight
                      ? "bg-teal-accent text-paper hover:bg-teal-dark"
                      : "border border-charcoal-200 text-ink hover:bg-charcoal-50"
                  }`}
                >
                  Get Started
                </Link>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Add-ons */}
      <Section variant="muted" className="border-t border-charcoal-100">
        <p className="label text-charcoal-400 mb-4">Additional Services</p>
        <h2 className="font-display text-3xl md:text-4xl text-ink mb-3">Add on what you need.</h2>
        <p className="text-charcoal-600 mb-12 max-w-2xl">These services can be added to any monthly plan or booked as standalone projects.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {addOns.map(addon => (
            <div key={addon.name} className="bg-paper rounded-2xl border border-charcoal-100 p-6 flex items-center justify-between gap-4">
              <div>
                <h3 className="font-display text-base text-ink">{addon.name}</h3>
                <p className="text-xs text-charcoal-400 mt-1">{addon.note}</p>
              </div>
              <p className="font-display text-xl font-bold text-ink shrink-0">{addon.price}</p>
            </div>
          ))}
        </div>
      </Section>

      <CtaBannerSection />
    </>
  );
}
