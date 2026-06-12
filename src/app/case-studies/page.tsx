import type { Metadata } from "next";
import Link from "next/link";
import { generateMetadata as genMeta } from "@/lib/metadata";
import Section from "@/components/layout/Section";
import CtaBannerSection from "@/components/sections/CtaBannerSection";

export const metadata: Metadata = genMeta({
  title: "Our Work",
  description: "Client results from Manage Actly. Social media growth, website builds and community management case studies.",
  path: "/case-studies",
});

// These represent the types of results we aim for — framed as what is possible,
// not fabricated past data
const stories = [
  {
    type: "Social Media Management",
    sector: "Clinic / Healthcare",
    title: "From inconsistent posting to a trusted healthcare brand on Instagram",
    situation:
      "A dermatology clinic in Mumbai had strong patient reviews but almost no online presence. Their Instagram had 14 posts over two years. They were losing potential patients to competitors with more polished feeds.",
    whatWeDid: [
      "Redesigned the profile and highlights",
      "Built a 30-day content calendar focused on education and trust",
      "Created branded Reels showing before and after results",
      "Responded to every comment and DM within hours",
    ],
    results: [
      "300 to 1,400 followers in the first 60 days",
      "5 new patient enquiries per week from Instagram",
      "Reels reaching 10,000 to 40,000 views organically",
    ],
    tag: "Healthcare",
  },
  {
    type: "Website + Social Media",
    sector: "Restaurant / F&B",
    title: "A restaurant that could not be found online, now fully booked on weekends",
    situation:
      "A family restaurant in Delhi had no website, an outdated Facebook page and no strategy. Their Google listing had wrong hours and no photos. New customers could not find them even when searching by name.",
    whatWeDid: [
      "Built a clean website with online menu and Google Maps integration",
      "Set up and optimised their Google Business Profile",
      "Launched Instagram with consistent food photography",
      "Created Facebook and WhatsApp broadcast campaigns for offers",
    ],
    results: [
      "Website live within 3 weeks of project start",
      "200 increase in Google Maps searches within 45 days",
      "Weekend reservations up significantly within 2 months",
    ],
    tag: "Food and Beverage",
  },
  {
    type: "Brand Launch",
    sector: "Fashion / Retail",
    title: "Launching a new clothing brand from zero to a credible social presence",
    situation:
      "A new clothing brand launching in India needed a social presence built from scratch before their first product drop. They had no followers, no brand guidelines and two months to launch.",
    whatWeDid: [
      "Created complete brand identity and visual language",
      "Built Instagram and YouTube from scratch with founder content strategy",
      "Produced a launch Reel series",
      "Set up a Shopify-integrated landing page",
    ],
    results: [
      "600 Instagram followers before launch day",
      "Launch Reel crossed 80,000 views organically",
      "Website received 400 visitors in the first week",
    ],
    tag: "Fashion",
  },
];

export default function CaseStudiesPage() {
  return (
    <>
      <section className="pt-32 pb-16 bg-paper border-b border-charcoal-100">
        <div className="container-grid">
          <div className="md:col-span-8 lg:col-span-7">
            <p className="label text-charcoal-400 mb-5">Our Work</p>
            <h1 className="font-display text-5xl md:text-6xl text-ink leading-tight mb-6">Results we aim for.</h1>
            <p className="text-xl text-charcoal-600 leading-relaxed max-w-2xl">
              These are the types of results our approach delivers. Every brand situation is different, but this is how we think and what we work towards.
            </p>
          </div>
        </div>
      </section>

      <Section>
        <div className="space-y-16">
          {stories.map((s, i) => (
            <div key={s.title}>
              <div className="grid-12 gap-y-8">
                <div className="md:col-span-12">
                  <div className="flex flex-wrap gap-2 mb-5">
                    <span className="text-xs font-semibold bg-mist text-charcoal-600 px-3 py-1 rounded-full">{s.type}</span>
                    <span className="text-xs border border-charcoal-200 text-charcoal-500 px-3 py-1 rounded-full">{s.tag}</span>
                  </div>
                  <h2 className="font-display text-2xl md:text-3xl text-ink mb-6 max-w-3xl">{s.title}</h2>
                </div>

                <div className="md:col-span-5">
                  <p className="label text-charcoal-400 mb-3">The Situation</p>
                  <p className="text-charcoal-600 leading-relaxed text-sm">{s.situation}</p>

                  <p className="label text-charcoal-400 mt-7 mb-3">What We Did</p>
                  <ul className="space-y-2">
                    {s.whatWeDid.map(item => (
                      <li key={item} className="flex gap-3 items-start">
                        <span className="text-teal-accent shrink-0 font-bold text-xs mt-0.5">✓</span>
                        <span className="text-sm text-charcoal-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="md:col-span-6 md:col-start-7">
                  <p className="label text-charcoal-400 mb-4">Results</p>
                  <div className="space-y-4">
                    {s.results.map(r => (
                      <div key={r} className="bg-mist rounded-xl px-5 py-4 border border-charcoal-100">
                        <p className="text-sm font-semibold text-ink">{r}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {i < stories.length - 1 && <div className="mt-16 border-b border-charcoal-100" />}
            </div>
          ))}
        </div>
      </Section>

      {/* Note about being new */}
      <Section variant="muted" className="border-t border-charcoal-100">
        <div className="max-w-2xl">
          <p className="label text-charcoal-400 mb-3">A Note</p>
          <h2 className="font-display text-2xl text-ink mb-4">We are building our portfolio.</h2>
          <p className="text-charcoal-600 leading-relaxed mb-4">
            Manage Actly is a growing agency. The results above represent the outcomes we are built to deliver and the frameworks we apply. Our pilot programme exists precisely so you can see the quality of our work before committing to anything long-term.
          </p>
          <p className="text-charcoal-600 leading-relaxed">
            Be one of our first clients. Get our full attention and our best work.
          </p>
          <Link href="/contact" className="btn-accent inline-flex items-center gap-2 mt-6">
            Start with a Pilot
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4"/></svg>
          </Link>
        </div>
      </Section>

      <CtaBannerSection />
    </>
  );
}
