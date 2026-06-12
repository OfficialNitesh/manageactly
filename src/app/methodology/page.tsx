import type { Metadata } from "next";
import { generateMetadata as genMeta } from "@/lib/metadata";
import Section from "@/components/layout/Section";
import CtaBannerSection from "@/components/sections/CtaBannerSection";

export const metadata: Metadata = genMeta({
  title: "How We Work",
  description: "How Manage Actly manages your social media. From the first call to daily content, this is how we operate.",
  path: "/methodology",
});

const phases = [
  {
    phase: "Step 01",
    title: "The Onboarding Call",
    duration: "Day 1",
    description:
      "We start with a focused 30 to 45 minute call. We ask about your brand, your audience, your competitors and what you actually want from social media. We take notes on everything, including your tone, values, and what you hate seeing on other brand pages.",
    outputs: [
      "Brand tone and voice document",
      "Audience profile and persona",
      "Platform priorities agreed",
      "Content direction briefed",
      "Goals set for the first 30 days",
    ],
    note: "You do this once. Everything that follows runs from it.",
  },
  {
    phase: "Step 02",
    title: "Brand and Platform Setup",
    duration: "Days 2 to 4",
    description:
      "We build your visual templates, profile aesthetics and content calendar. Bios are rewritten. Profile pictures and banners are updated. Your grid gets a direction. We create the content system before we create a single post.",
    outputs: [
      "Redesigned profiles across platforms",
      "Branded Canva or design templates",
      "30-day content calendar",
      "Hashtag strategy per platform",
      "Caption style guide",
    ],
    note: "Most clients see a visual improvement before we publish a single post.",
  },
  {
    phase: "Step 03",
    title: "Content Creation and Publishing",
    duration: "Day 5 onwards",
    description:
      "We create, review and publish content on your approved schedule. Static posts, reels, carousels, and stories, tailored to whatever the strategy calls for. You can approve content before it goes live or give us full creative control. Either way works.",
    outputs: [
      "Posts published on schedule",
      "Reels and short-form video",
      "Story content and engagement prompts",
      "Community replies handled",
      "DM responses and follower interactions",
    ],
    note: "We post when your audience is online, not when it is convenient.",
  },
  {
    phase: "Step 04",
    title: "Community Management",
    duration: "Ongoing daily",
    description:
      "We respond to comments, answer DMs, engage with followers and keep your community active. Real conversations, not automated replies. Your audience should feel like there is a real human behind the account, because there is.",
    outputs: [
      "All comments replied to within 24 hours",
      "DM handling for enquiries",
      "Negative comment management",
      "Collaboration and partnership DMs flagged",
      "Audience engagement reports",
    ],
    note: "Community is where trust is built. We take it seriously.",
  },
  {
    phase: "Step 05",
    title: "Monthly Review and Strategy",
    duration: "End of every month",
    description:
      "At the end of each month we send you a clear performance report. What grew, what did not, what content performed best and what we are changing next month. A 30-minute call to review it together, adjust direction and confirm the next month's plan.",
    outputs: [
      "Growth report with reach and engagement data",
      "Top performing content breakdown",
      "Follower acquisition and retention numbers",
      "Next month strategy and calendar preview",
      "Competitor benchmark summary",
    ],
    note: "No jargon. Just what matters and what we are doing about it.",
  },
];

export default function MethodologyPage() {
  return (
    <>
      <section className="pt-32 pb-16 bg-paper border-b border-charcoal-100">
        <div className="container-grid">
          <div className="md:col-span-8 lg:col-span-7">
            <p className="label text-charcoal-400 mb-5">How We Work</p>
            <h1 className="font-display text-5xl md:text-6xl text-ink leading-tight mb-6">Our Process</h1>
            <p className="text-xl text-charcoal-600 leading-relaxed max-w-2xl">
              From the first conversation to daily publishing, here is exactly how we manage your social media presence.
            </p>
          </div>
        </div>
      </section>

      <Section>
        <div className="space-y-20">
          {phases.map((p, i) => (
            <div key={p.phase} className="grid-12 gap-y-8">
              <div className="md:col-span-2">
                <div className="sticky top-24">
                  <p className="font-mono text-xs text-charcoal-400 mb-1">{p.phase}</p>
                  <p className="font-mono text-xs text-teal-accent">{p.duration}</p>
                </div>
              </div>

              <div className="md:col-span-5">
                <h2 className="font-display text-3xl text-ink mb-5">{p.title}</h2>
                <p className="text-charcoal-600 leading-relaxed mb-6">{p.description}</p>
                <div className="bg-teal-accent/5 border-l-2 border-teal-accent pl-5 py-2">
                  <p className="text-sm text-charcoal-600 italic">{p.note}</p>
                </div>
              </div>

              <div className="md:col-span-4 md:col-start-9">
                <p className="label text-charcoal-400 mb-4">What You Get</p>
                <ul className="space-y-3">
                  {p.outputs.map(output => (
                    <li key={output} className="flex gap-3 items-start">
                      <div className="shrink-0 mt-0.5 w-5 h-5 rounded-full bg-teal-accent/10 flex items-center justify-center">
                        <svg width="8" height="8" viewBox="0 0 10 10" fill="none" stroke="#2a9d8f" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 5l2 2 4-4"/></svg>
                      </div>
                      <span className="text-sm text-charcoal-700">{output}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {i < phases.length - 1 && <div className="md:col-span-12 border-b border-charcoal-100" />}
            </div>
          ))}
        </div>
      </Section>

      <CtaBannerSection />
    </>
  );
}
