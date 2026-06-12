import type { Metadata } from "next";
import { generateMetadata as genMeta } from "@/lib/metadata";
import Section from "@/components/layout/Section";
import CtaBannerSection from "@/components/sections/CtaBannerSection";

export const metadata: Metadata = genMeta({
  title: "About Us",
  description: "Manage Actly is a social media management agency that takes full ownership of your digital presence.",
  path: "/about",
});

const values = [
  {
    title: "We own it, we don't just manage it",
    description:
      "There is a difference between someone who posts content and someone who genuinely cares about your brand's growth. We are the second kind. Your wins are our wins.",
  },
  {
    title: "Consistency beats everything",
    description:
      "Algorithms reward consistent creators. Audiences trust consistent brands. We show up every day, on every platform, without gaps or excuses.",
  },
  {
    title: "Creative work backed by data",
    description:
      "Good design and sharp copy are non-negotiable. But we also track what works, cut what does not, and make decisions based on real performance data.",
  },
  {
    title: "Built for Indian brands",
    description:
      "We understand the Indian market, Indian platforms, Indian audiences and Indian business culture. We are not a template agency applying Western playbooks to Indian brands.",
  },
];

const platforms = [
  { name: "Instagram", note: "Reels, Stories, Grid" },
  { name: "Facebook", note: "Posts, Groups, Ads" },
  { name: "YouTube", note: "Shorts, Long-form" },
  { name: "LinkedIn", note: "B2B, Thought Leadership" },
  { name: "WhatsApp", note: "Broadcast, Business" },
  { name: "Twitter / X", note: "Brand Voice, Engagement" },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero section */}
      <section className="relative pt-36 pb-20 border-b border-charcoal-100/50 bg-gradient-to-b from-mist via-paper to-paper overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />
        <div className="container-grid relative z-10 text-center max-w-3xl mx-auto">
          <p className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold bg-teal-accent/10 text-teal-accent mb-6 animate-pulse">
            Who We Are
          </p>
          <h1 className="font-display text-5xl md:text-6xl text-ink leading-tight font-bold mb-6 tracking-tight">
            About Manage Actly
          </h1>
          <p className="text-lg text-charcoal-600 leading-relaxed max-w-2xl mx-auto font-medium">
            A social media management agency that actually manages, rather than just reports on, your digital presence.
          </p>
        </div>
      </section>

      {/* Story */}
      <Section className="bg-paper">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start max-w-6xl mx-auto">
          <div className="lg:col-span-5">
            <p className="label text-teal-accent mb-4">Why We Started</p>
            <h2 className="font-display text-3xl md:text-4xl text-ink font-bold leading-tight">
              Too many good businesses were invisible online.
            </h2>
            <div className="w-16 h-1 bg-teal-accent rounded-full mt-6" />
          </div>
          <div className="lg:col-span-7 space-y-6 text-charcoal-600 font-medium leading-relaxed text-sm">
            <p>
              We kept seeing the same problem. A restaurant with amazing food and an Instagram that had not been updated in three months. A clinic with outstanding doctors and a Facebook page with blurry photos from 2019. A founder building something genuinely impressive with 200 followers and no strategy.
            </p>
            <p>
              The problem was never a lack of effort. It was a lack of time and the right expertise. Running a business is already a full-time job. Managing social media properly is another full-time job on top of that.
            </p>
            <p>
              Manage Actly exists to solve that problem. We take complete ownership of your online presence so you can focus entirely on your business.
            </p>
          </div>
        </div>
      </Section>

      {/* Platforms */}
      <Section variant="muted" className="border-t border-charcoal-100/60 relative overflow-hidden">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="label text-teal-accent mb-4">Platforms We Manage</p>
          <h2 className="font-display text-3xl md:text-4xl text-ink font-bold">Wherever your audience is, we are there.</h2>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 max-w-6xl mx-auto">
          {platforms.map((p) => (
            <div key={p.name} className="bg-paper rounded-2xl border border-charcoal-100 p-6 text-center shadow-sm hover:shadow-lg hover:border-teal-accent/30 hover:-translate-y-1 transition-all duration-300">
              <h3 className="font-display text-base font-bold text-ink mb-2">{p.name}</h3>
              <p className="text-[11px] text-charcoal-500 font-semibold">{p.note}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Values */}
      <Section className="bg-paper">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="label text-teal-accent mb-4">What We Stand For</p>
          <h2 className="font-display text-3xl md:text-4xl text-ink font-bold">How we think about this work.</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {values.map((v, idx) => (
            <div key={v.title} className="bg-mist border border-charcoal-100 rounded-3xl p-8 hover:shadow-md hover:border-charcoal-250 transition-all duration-300 flex items-start gap-5">
              <div className="w-10 h-10 rounded-full bg-teal-accent/10 text-teal-accent flex items-center justify-center font-mono text-xs font-bold shrink-0">
                {`0${idx + 1}`}
              </div>
              <div>
                <h3 className="font-display text-lg font-bold text-ink mb-3">{v.title}</h3>
                <p className="text-xs text-charcoal-600 leading-relaxed font-medium">{v.description}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Website building callout */}
      <Section variant="muted" className="border-t border-charcoal-100/60 relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-6xl mx-auto">
          <div className="lg:col-span-7">
            <p className="label text-teal-accent mb-4">Also Available</p>
            <h2 className="font-display text-3xl md:text-4.5xl text-ink font-bold mb-4">We build websites too.</h2>
            <p className="text-sm text-charcoal-600 leading-relaxed mb-8 font-medium">
              Need a website that matches the quality of your social presence? We design and develop clean, fast, mobile-first websites for businesses of every size. From single-page landing pages to full ecommerce stores.
            </p>
            <a href="/solutions" className="btn-primary inline-flex items-center gap-2 shadow-sm hover:shadow-md transition-all">
              See Website Packages
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4"/>
              </svg>
            </a>
          </div>
          <div className="lg:col-span-5 lg:col-start-9">
            <div className="bg-gradient-to-b from-ink via-[#13224f] to-ink rounded-3xl p-8 shadow-xl border border-navy-800 relative overflow-hidden text-paper">
              <div className="absolute top-0 right-0 w-24 h-24 bg-teal-accent/10 rounded-full blur-xl pointer-events-none" />
              <p className="text-[10px] text-teal-accent font-bold uppercase tracking-wider mb-6">Service Scope</p>
              
              <div className="space-y-3.5 mb-8">
                {["Landing pages", "Business websites", "eCommerce stores", "Portfolio sites", "Blog and content platforms"].map((item) => (
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
              
              <div className="pt-6 border-t border-navy-800/80 flex items-baseline justify-between">
                <div>
                  <p className="text-[9px] text-navy-400 font-bold uppercase tracking-widest">Pricing starts from</p>
                  <p className="font-display text-3xl font-bold text-paper mt-1">₹15K to ₹60K</p>
                </div>
                <span className="text-navy-400 text-[10px] font-bold uppercase tracking-wider bg-navy-900 border border-navy-850 px-3 py-1 rounded-full">
                  One-Time
                </span>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <CtaBannerSection />
    </>
  );
}
