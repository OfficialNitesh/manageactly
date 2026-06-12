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
    price: "₹10K to ₹15K",
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
    price: "₹20K to ₹35K",
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
    price: "₹40K to ₹80K+",
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
  { name: "Website Design and Development", price: "₹15K to ₹60K", note: "One-time" },
  { name: "YouTube Channel Management", price: "₹8K to ₹20K", note: "Per month" },
  { name: "Paid Ads Management (Meta / Google)", price: "₹5K to ₹15K", note: "Per month + ad spend" },
  { name: "Video Production (Reels / Shorts)", price: "₹3K to ₹8K", note: "Per video" },
  { name: "Brand Identity and Logo Design", price: "₹10K to ₹25K", note: "One-time" },
  { name: "PR and Media Coverage", price: "₹15K+", note: "Per campaign" },
];

export default function SolutionsPage() {
  return (
    <>
      {/* Hero Header */}
      <section className="relative pt-36 pb-20 border-b border-charcoal-100/50 bg-gradient-to-b from-mist via-paper to-paper overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />
        <div className="container-grid relative z-10 text-center max-w-3xl mx-auto">
          <p className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold bg-teal-accent/10 text-teal-accent mb-6 animate-pulse">
            Packages and Pricing
          </p>
          <h1 className="font-display text-5xl md:text-6xl text-ink leading-tight font-bold mb-6 tracking-tight">
            Simple, honest pricing.
          </h1>
          <p className="text-lg text-charcoal-600 leading-relaxed max-w-2xl mx-auto font-medium">
            Every engagement starts with a paid pilot. Once you see what we can do, choose the plan that fits your ambition.
          </p>
        </div>
      </section>

      {/* Paid Pilot Section */}
      <Section variant="muted" className="border-b border-charcoal-100/50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center md:text-left mb-12">
            <p className="label text-teal-accent mb-4">How Every Engagement Begins</p>
            <h2 className="font-display text-3xl md:text-4.5xl text-ink font-bold leading-tight">The Paid Pilot Programme</h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-5 text-charcoal-600 font-medium leading-relaxed text-sm">
              <p>
                We do not offer free trials. We offer a short, high-intensity demonstration of operational capability. Profile audit, visual revamp, and 3 to 5 published pieces of high-quality content. This proves the system works before any long-term commitment is required.
              </p>
              <p>
                If you are happy with the results, we move to a monthly plan. If not, you keep everything we made.
              </p>
            </div>
            
            <div className="lg:col-span-5 bg-gradient-to-b from-ink via-[#13224f] to-ink rounded-3xl p-8 shadow-xl border border-navy-800 relative overflow-hidden text-paper">
              <div className="absolute top-0 right-0 w-24 h-24 bg-teal-accent/10 rounded-full blur-xl pointer-events-none" />
              <p className="text-[10px] text-teal-accent font-bold uppercase tracking-wider mb-4">Investment</p>
              <div>
                <p className="font-display text-5xl font-bold text-paper leading-none mb-2">₹2,000 to ₹5,000</p>
                <p className="text-navy-300 text-xs font-semibold mb-6">7 to 10 Day Pilot</p>
              </div>
              <div className="space-y-3">
                {["Full profile audit", "3 to 5 published posts", "Visual brand setup", "Zero lock-in"].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <div className="w-4.5 h-4.5 rounded-full bg-teal-accent/20 flex items-center justify-center shrink-0 text-teal-accent">
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-navy-200 text-xs font-semibold">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Monthly Plans */}
      <Section className="bg-paper">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="label text-teal-accent mb-4">Monthly Plans</p>
          <h2 className="font-display text-3xl md:text-4xl text-ink font-bold">Choose your growth level.</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch max-w-6xl mx-auto">
          {plans.map((plan) => {
            const isGrowth = plan.highlight;
            return (
              <div
                key={plan.tier}
                className={`relative rounded-3xl p-6 md:p-8 flex flex-col justify-between transition-all duration-300 group ${
                  isGrowth
                    ? "bg-gradient-to-b from-ink via-[#13224f] to-ink text-paper border-2 border-teal-accent shadow-xl hover:shadow-2xl hover:shadow-teal-accent/5 hover:-translate-y-2"
                    : "bg-paper border border-charcoal-100 hover:border-charcoal-350 hover:shadow-xl hover:-translate-y-2"
                }`}
              >
                {isGrowth && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-teal-accent text-paper font-semibold text-[10px] uppercase tracking-widest px-4 py-1 rounded-full shadow-md z-10 whitespace-nowrap">
                    {plan.badge}
                  </div>
                )}
                
                <div>
                  {/* Header */}
                  <div className="mb-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className={`text-[10px] font-bold tracking-widest uppercase px-2 py-0.5 rounded ${
                        isGrowth ? "bg-teal-accent/25 text-teal-accent" : "bg-mist text-charcoal-500"
                      }`}>
                        {plan.label}
                      </span>
                      {!isGrowth && plan.badge && (
                        <span className="text-[9px] bg-teal-accent/10 text-teal-accent/90 px-2 py-0.5 rounded font-bold uppercase tracking-wider">
                          {plan.badge}
                        </span>
                      )}
                    </div>
                    <h3 className={`font-display text-3xl font-bold mb-1 ${isGrowth ? "text-paper" : "text-ink"}`}>
                      {plan.price}
                    </h3>
                    <p className={`text-[10px] font-bold tracking-wider uppercase mb-3 ${isGrowth ? "text-teal-accent/80" : "text-teal-accent"}`}>
                      {plan.period}
                    </p>
                    <p className={`text-xs font-semibold ${isGrowth ? "text-navy-300" : "text-charcoal-500"}`}>
                      {plan.audience}
                    </p>
                  </div>

                  <div className={`w-full h-px mb-6 ${isGrowth ? "bg-navy-800" : "bg-charcoal-100"}`} />

                  {/* Description */}
                  <p className={`text-xs leading-relaxed mb-6 font-medium ${isGrowth ? "text-navy-200" : "text-charcoal-600"}`}>
                    {plan.description}
                  </p>

                  {/* Features list */}
                  <ul className="space-y-3 mb-8">
                    {plan.includes.map((item) => (
                      <li key={item} className="flex items-start gap-2.5">
                        <span className={`shrink-0 w-4.5 h-4.5 rounded-full flex items-center justify-center p-0.5 mt-0.5 ${
                          isGrowth ? "bg-teal-accent/20 text-teal-accent" : "bg-teal-accent/15 text-teal-accent"
                        }`}>
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        </span>
                        <span className={`text-xs leading-normal font-medium ${isGrowth ? "text-navy-200" : "text-charcoal-700"}`}>
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA Button */}
                <div className="mt-auto pt-4">
                  <Link
                    href="/contact"
                    className={`block w-full text-center py-3.5 px-6 rounded-full font-semibold text-xs transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 ${
                      isGrowth
                        ? "bg-teal-accent text-paper hover:bg-teal-dark hover:shadow-lg hover:shadow-teal-accent/20"
                        : "bg-ink text-paper hover:bg-navy-800 hover:shadow-md"
                    }`}
                  >
                    Get Started
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </Section>

      {/* Add-ons */}
      <Section variant="muted" className="border-t border-charcoal-100/60 relative overflow-hidden">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="label text-teal-accent mb-4">Additional Services</p>
          <h2 className="font-display text-3xl md:text-4xl text-ink font-bold">Add on what you need.</h2>
          <p className="text-charcoal-550 text-xs mt-3 font-medium">These services can be added to any monthly plan or booked as standalone projects.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {addOns.map((addon) => (
            <div key={addon.name} className="bg-paper rounded-2xl border border-charcoal-100 p-6 flex items-center justify-between gap-6 hover:shadow-lg hover:border-teal-accent/30 hover:-translate-y-0.5 transition-all duration-300">
              <div>
                <h3 className="font-display text-base font-bold text-ink">{addon.name}</h3>
                <p className="text-[10px] text-charcoal-500 mt-1 font-semibold">{addon.note}</p>
              </div>
              <p className="font-display text-lg font-bold text-teal-accent shrink-0">{addon.price}</p>
            </div>
          ))}
        </div>
      </Section>

      <CtaBannerSection />
    </>
  );
}
