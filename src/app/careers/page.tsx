import type { Metadata } from "next";
import { generateMetadata as genMeta } from "@/lib/metadata";
import Link from "next/link";
import Section from "@/components/layout/Section";

export const metadata: Metadata = genMeta({
  title: "Careers",
  description: "Join Manage Actly. We are building a creative team of writers, designers, producers and strategists.",
  path: "/careers",
});

const roles = [
  {
    id: "content-writer",
    title: "Content Writer",
    type: "Part-time / Freelance",
    department: "Content",
    description: "Write captions, scripts, blog posts and carousel copy for our client brands across Instagram, LinkedIn and YouTube. You have a natural sense of voice and understand how to write for different audiences.",
    requirements: [
      "Strong written English and Hindi",
      "Understanding of social media tone and formats",
      "Ability to write 10 to 20 pieces of content per week",
      "Portfolio of previous writing work required",
    ],
  },
  {
    id: "graphic-designer",
    title: "Graphic Designer",
    type: "Part-time / Freelance",
    department: "Design",
    description: "Create social media graphics, carousels, reels thumbnails and brand assets. You have a strong aesthetic sense and know how to design for engagement and brand consistency.",
    requirements: [
      "Proficiency in Canva, Figma or Adobe Creative Suite",
      "Understanding of social media visual formats",
      "Ability to maintain multiple brand identities",
      "Portfolio of social media design work required",
    ],
  },
  {
    id: "video-editor",
    title: "Video Editor",
    type: "Part-time / Freelance",
    department: "Production",
    description: "Edit short-form reels, YouTube videos and brand content. Fast turnaround, clean cuts and a good eye for trending formats. You keep up with what is working on the platforms right now.",
    requirements: [
      "Proficiency in CapCut, Premiere Pro or DaVinci Resolve",
      "Experience with reels and short-form content",
      "Understanding of subtitles, sound design and pacing",
      "Portfolio of edited videos required",
    ],
  },
  {
    id: "pr-strategist",
    title: "PR and Communications Strategist",
    type: "Part-time / Freelance",
    department: "PR",
    description: "Handle media outreach, brand reputation, press release writing and coverage opportunities for our clients. You know how to position a brand and get it noticed by the right publications.",
    requirements: [
      "Experience with media pitching and PR campaigns",
      "Existing media contacts is a strong advantage",
      "Excellent writing and communication skills",
      "Previous coverage or campaign examples required",
    ],
  },
  {
    id: "web-developer",
    title: "Web Developer",
    type: "Project-based",
    department: "Tech",
    description: "Build clean, fast websites for our clients using Next.js, WordPress or Webflow. You deliver on time, write maintainable code and can work with our design direction without extensive handholding.",
    requirements: [
      "Proficiency in Next.js, React or Webflow",
      "Experience building mobile-first websites",
      "Understanding of SEO fundamentals",
      "GitHub profile or project links required",
    ],
  },
  {
    id: "social-media-manager",
    title: "Social Media Account Manager",
    type: "Full-time",
    department: "Operations",
    description: "Own a portfolio of client accounts. Coordinate content, respond to communities, track performance and serve as the primary client point of contact. This is a people and operations role as much as a creative one.",
    requirements: [
      "1 to 3 years managing social media accounts",
      "Strong organisational and communication skills",
      "Comfortable with analytics and reporting",
      "Examples of accounts you have managed required",
    ],
  },
];

const process = [
  { step: "01", title: "Application", body: "Fill out the role form. Share your previous work samples. We review every application personally." },
  { step: "02", title: "Portfolio Review", body: "Our team reviews your work. If it is a fit, you will hear from us within 5 business days." },
  { step: "03", title: "Brief Interview", body: "A 20 to 30 minute video or phone call to understand how you work and what you are looking for." },
  { step: "04", title: "Paid Test Task", body: "A small paid task relevant to the role. Real work, fairly compensated. We see how you think." },
  { step: "05", title: "Offer", body: "If everything aligns, we send you an offer. Onboarding is fast. You start contributing within your first week." },
];

export default function CareersPage() {
  return (
    <>
      <section className="pt-32 pb-16 bg-paper border-b border-charcoal-100">
        <div className="container-grid">
          <div className="md:col-span-8 lg:col-span-7">
            <p className="label text-charcoal-400 mb-5">Join the Team</p>
            <h1 className="font-display text-5xl md:text-6xl text-ink leading-tight mb-6">Careers</h1>
            <p className="text-xl text-charcoal-600 leading-relaxed max-w-2xl">
              We are a small, focused team building something real. Every person here does work that matters directly for our clients.
            </p>
          </div>
        </div>
      </section>

      {/* Hiring process */}
      <Section variant="muted" className="border-b border-charcoal-100">
        <p className="label text-charcoal-400 mb-4">Our Hiring Process</p>
        <h2 className="font-display text-3xl md:text-4xl text-ink mb-12">Transparent from start to finish.</h2>

        <div className="grid grid-cols-1 sm:grid-cols-5 gap-0 border border-charcoal-200 rounded-2xl overflow-hidden">
          {process.map((p, i) => (
            <div key={p.step} className={`p-6 ${i < process.length - 1 ? "border-b sm:border-b-0 sm:border-r border-charcoal-200" : ""}`}>
              <p className="font-mono text-xs text-charcoal-400 mb-3">{p.step}</p>
              <h3 className="font-display text-base text-ink mb-2">{p.title}</h3>
              <p className="text-xs text-charcoal-600 leading-relaxed">{p.body}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Open roles */}
      <Section>
        <p className="label text-charcoal-400 mb-4">Open Roles</p>
        <h2 className="font-display text-3xl md:text-4xl text-ink mb-12">Current opportunities.</h2>

        <div className="space-y-4">
          {roles.map((role) => (
            <div
              key={role.id}
              className="group border border-charcoal-100 rounded-2xl p-8 hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-300"
            >
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                <div className="flex-1">
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="text-xs font-semibold bg-mist text-charcoal-600 px-3 py-1 rounded-full">{role.department}</span>
                    <span className="text-xs border border-charcoal-200 text-charcoal-500 px-3 py-1 rounded-full">{role.type}</span>
                  </div>
                  <h3 className="font-display text-xl text-ink mb-3">{role.title}</h3>
                  <p className="text-sm text-charcoal-600 leading-relaxed max-w-2xl mb-5">{role.description}</p>
                  <div className="space-y-1.5">
                    {role.requirements.map(req => (
                      <div key={req} className="flex items-start gap-2">
                        <span className="text-teal-accent text-xs mt-0.5 shrink-0 font-bold">✓</span>
                        <span className="text-xs text-charcoal-600">{req}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="shrink-0">
                  <Link
                    href={`/careers/apply?role=${role.id}`}
                    className="btn-accent text-sm py-3 px-6 inline-block"
                  >
                    Apply Now
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Bottom CTA */}
      <section className="bg-ink">
        <div className="container-grid py-20">
          <div className="max-w-2xl">
            <p className="label text-teal-accent mb-4">Do not see your role?</p>
            <h2 className="font-display text-3xl text-paper mb-4">We are always open to exceptional talent.</h2>
            <p className="text-navy-300 mb-8">If you are genuinely good at what you do and want to be part of a growing agency, send us your work.</p>
            <a href="mailto:careers@manageactly.com" className="btn-accent inline-flex items-center gap-2">
              Send Your Portfolio
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 8h10M9 4l4 4-4 4"/></svg>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
