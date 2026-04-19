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
      <section className="pt-32 pb-16 bg-paper border-b border-charcoal-100">
        <div className="container-grid">
          <div className="md:col-span-8 lg:col-span-7">
            <p className="label text-charcoal-400 mb-5">Who We Are</p>
            <h1 className="font-display text-5xl md:text-6xl text-ink leading-tight mb-6">About Manage Actly</h1>
            <p className="text-xl text-charcoal-600 leading-relaxed max-w-2xl">
              A social media management agency that actually manages — not just reports on — your digital presence.
            </p>
          </div>
        </div>
      </section>

      {/* Story */}
      <Section>
        <div className="grid-12 gap-y-12">
          <div className="md:col-span-5">
            <p className="label text-charcoal-400 mb-5">Why We Started</p>
            <h2 className="font-display text-3xl md:text-4xl text-ink leading-tight">
              Too many good businesses were invisible online.
            </h2>
          </div>
          <div className="md:col-span-6 md:col-start-7 space-y-5">
            <p className="text-charcoal-600 leading-relaxed">
              We kept seeing the same problem. A restaurant with amazing food and an Instagram that had not been updated in three months. A clinic with outstanding doctors and a Facebook page with blurry photos from 2019. A founder building something genuinely impressive with 200 followers and no strategy.
            </p>
            <p className="text-charcoal-600 leading-relaxed">
              The problem was never a lack of effort. It was a lack of time and the right expertise. Running a business is already a full-time job. Managing social media properly is another full-time job on top of that.
            </p>
            <p className="text-charcoal-600 leading-relaxed">
              Manage Actly exists to solve that problem. We take complete ownership of your online presence so you can focus entirely on your business.
            </p>
          </div>
        </div>
      </Section>

      {/* Platforms */}
      <Section variant="muted" className="border-t border-charcoal-100">
        <p className="label text-charcoal-400 mb-4">Platforms We Manage</p>
        <h2 className="font-display text-3xl md:text-4xl text-ink mb-10">Wherever your audience is, we are there.</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {platforms.map(p => (
            <div key={p.name} className="bg-paper rounded-2xl border border-charcoal-100 p-5 text-center">
              <h3 className="font-display text-base text-ink mb-1">{p.name}</h3>
              <p className="text-xs text-charcoal-400">{p.note}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Values */}
      <Section>
        <p className="label text-charcoal-400 mb-4">What We Stand For</p>
        <h2 className="font-display text-3xl md:text-4xl text-ink mb-12">How we think about this work.</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {values.map(v => (
            <div key={v.title} className="bg-mist rounded-2xl border border-charcoal-100 p-8">
              <h3 className="font-display text-xl text-ink mb-3">{v.title}</h3>
              <p className="text-sm text-charcoal-600 leading-relaxed">{v.description}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Website building callout */}
      <Section variant="muted" className="border-t border-charcoal-100">
        <div className="grid-12 gap-y-8 items-center">
          <div className="md:col-span-7">
            <p className="label text-charcoal-400 mb-4">Also Available</p>
            <h2 className="font-display text-3xl md:text-4xl text-ink mb-4">We build websites too.</h2>
            <p className="text-charcoal-600 leading-relaxed mb-6">
              Need a website that matches the quality of your social presence? We design and develop clean, fast, mobile-first websites for businesses of every size. From single-page landing pages to full ecommerce stores.
            </p>
            <a href="/solutions" className="btn-primary inline-flex items-center gap-2">
              See Website Packages
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4"/></svg>
            </a>
          </div>
          <div className="md:col-span-4 md:col-start-9">
            <div className="bg-ink rounded-2xl p-8">
              <div className="space-y-3">
                {["Landing pages", "Business websites", "eCommerce stores", "Portfolio sites", "Blog and content platforms"].map(item => (
                  <div key={item} className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full bg-teal-accent/20 flex items-center justify-center shrink-0">
                      <svg width="8" height="8" viewBox="0 0 10 10" fill="none" stroke="#2a9d8f" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 5l2 2 4-4"/></svg>
                    </div>
                    <span className="text-navy-200 text-sm">{item}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-5 border-t border-navy-800">
                <p className="font-display text-2xl font-bold text-paper">₹15K–₹60K</p>
                <p className="text-navy-400 text-xs mt-1">One-time project</p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <CtaBannerSection />
    </>
  );
}
