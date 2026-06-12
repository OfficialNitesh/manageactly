import type { Metadata } from "next";
import { generateMetadata as genMeta } from "@/lib/metadata";
import Section from "@/components/layout/Section";
import CtaBannerSection from "@/components/sections/CtaBannerSection";
import Link from "next/link";

export const metadata: Metadata = genMeta({
  title: "Insights",
  description: "Social media tips, platform guides and growth strategies for Indian businesses from the Manage Actly team.",
  path: "/insights",
});

const featured = {
  category: "Strategy",
  title: "Why Indian brands fail on Instagram (and how to fix it)",
  excerpt:
    "Most brands post without a strategy and wonder why nothing is growing. Here are the five most common mistakes we see and what to do instead.",
  readTime: "6 min read",
  slug: "why-indian-brands-fail-on-instagram",
};

const posts = [
  {
    category: "Platform Guide",
    title: "The complete guide to Instagram Reels for businesses in 2024",
    excerpt: "Reels are the fastest way to grow on Instagram right now. Here is how to make them work for your brand without a professional crew.",
    readTime: "8 min read",
    slug: "instagram-reels-guide-businesses",
  },
  {
    category: "Content",
    title: "30 content ideas for any Indian business this month",
    excerpt: "No ideas for what to post? Use this list. Festivals, trends, educational content and behind-the-scenes formats that work in the Indian market.",
    readTime: "4 min read",
    slug: "30-content-ideas-indian-business",
  },
  {
    category: "Growth",
    title: "How to grow from 0 to 1,000 followers in 90 days without paid ads",
    excerpt: "Organic growth is slower but more durable. This is the playbook we use for new brand accounts: what to post, when to post it and how to engage.",
    readTime: "7 min read",
    slug: "grow-0-to-1000-followers-organic",
  },
  {
    category: "LinkedIn",
    title: "LinkedIn for Indian founders: why you are not posting enough",
    excerpt: "LinkedIn is the most underused platform by Indian founders. Your expertise is worth sharing. Here is how to start without overthinking it.",
    readTime: "5 min read",
    slug: "linkedin-for-indian-founders",
  },
  {
    category: "Website",
    title: "Does your business actually need a website in 2024?",
    excerpt: "Social media has replaced websites for some businesses, but not all. Here is how to decide what you actually need and what it should do.",
    readTime: "5 min read",
    slug: "does-your-business-need-a-website",
  },
  {
    category: "Community",
    title: "How to respond to negative comments without damaging your brand",
    excerpt: "Every brand gets criticism online. How you respond matters more than what was said. Here is a simple framework for handling it with class.",
    readTime: "4 min read",
    slug: "respond-to-negative-comments",
  },
];

const categories = ["All", "Strategy", "Platform Guide", "Content", "Growth", "LinkedIn", "Website", "Community"];

export default function InsightsPage() {
  return (
    <>
      <section className="pt-32 pb-16 bg-paper border-b border-charcoal-100">
        <div className="container-grid">
          <div className="md:col-span-8 lg:col-span-7">
            <p className="label text-charcoal-400 mb-5">Insights</p>
            <h1 className="font-display text-5xl md:text-6xl text-ink leading-tight mb-6">Social media knowledge, plainly written.</h1>
            <p className="text-xl text-charcoal-600 leading-relaxed max-w-2xl">
              Practical guides for Indian businesses navigating social media, content strategy and digital growth.
            </p>
          </div>
        </div>
      </section>

      {/* Featured post */}
      <Section>
        <p className="label text-charcoal-400 mb-6">Featured</p>
        <Link href={`/insights/${featured.slug}`} className="group block">
          <div className="bg-ink rounded-2xl p-10 md:p-14 hover:bg-navy-900 transition-colors duration-300">
            <div className="flex flex-wrap gap-3 mb-6 items-center">
              <span className="text-xs font-semibold bg-teal-accent/20 text-teal-accent px-3 py-1 rounded-full">{featured.category}</span>
              <span className="text-xs text-navy-500">{featured.readTime}</span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl text-paper leading-tight mb-5 max-w-3xl group-hover:text-teal-accent transition-colors duration-200">
              {featured.title}
            </h2>
            <p className="text-navy-300 leading-relaxed max-w-2xl mb-8">{featured.excerpt}</p>
            <span className="inline-flex items-center gap-2 text-sm font-semibold text-teal-accent">
              Read article
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 8h10M9 4l4 4-4 4"/></svg>
            </span>
          </div>
        </Link>
      </Section>

      {/* Category filter — static display, no JS needed for MVP */}
      <div className="border-y border-charcoal-100 bg-mist">
        <div className="container-grid py-4">
          <div className="md:col-span-12 flex gap-2 overflow-x-auto pb-1">
            {categories.map(cat => (
              <span
                key={cat}
                className={`shrink-0 text-xs font-semibold px-4 py-2 rounded-full border transition-colors duration-200 cursor-pointer ${
                  cat === "All"
                    ? "bg-ink text-paper border-ink"
                    : "bg-paper text-charcoal-600 border-charcoal-200 hover:border-charcoal-400"
                }`}
              >
                {cat}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Post grid */}
      <Section>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map(post => (
            <Link key={post.slug} href={`/insights/${post.slug}`} className="group block">
              <article className="bg-paper border border-charcoal-100 rounded-2xl p-8 h-full flex flex-col hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300">
                <div className="flex justify-between items-start mb-5">
                  <span className="text-xs font-semibold bg-mist text-charcoal-600 px-3 py-1 rounded-full">{post.category}</span>
                  <span className="text-xs text-charcoal-400">{post.readTime}</span>
                </div>
                <h2 className="font-display text-lg text-ink mb-3 leading-snug group-hover:text-teal-accent transition-colors duration-200">
                  {post.title}
                </h2>
                <p className="text-sm text-charcoal-600 leading-relaxed flex-1">{post.excerpt}</p>
                <div className="mt-6 flex items-center gap-2 text-xs font-semibold text-teal-accent">
                  Read
                  <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 8h10M9 4l4 4-4 4"/></svg>
                </div>
              </article>
            </Link>
          ))}
        </div>

        <div className="mt-12 text-center py-12 border border-dashed border-charcoal-200 rounded-2xl">
          <p className="text-charcoal-500 mb-2 font-display text-lg">More articles coming soon.</p>
          <p className="text-sm text-charcoal-400">We publish weekly on social media strategy, platform updates and growth tactics for Indian brands.</p>
        </div>
      </Section>

      <CtaBannerSection />
    </>
  );
}
