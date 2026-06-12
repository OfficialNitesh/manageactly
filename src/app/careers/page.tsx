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
      {/* Header section */}
      <section className="relative pt-36 pb-20 border-b border-charcoal-100/50 bg-gradient-to-b from-mist via-paper to-paper overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />
        <div className="container-grid relative z-10 text-center max-w-3xl mx-auto">
          <p className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold bg-teal-accent/10 text-teal-accent mb-6 animate-pulse">
            We're Hiring
          </p>
          <h1 className="font-display text-5xl md:text-6xl text-ink leading-tight font-bold mb-6 tracking-tight">
            Join the Creative Force.
          </h1>
          <p className="text-lg text-charcoal-600 leading-relaxed max-w-2xl mx-auto font-medium">
            We are a small, focused team building something real. Every person here does work that matters directly for our clients.
          </p>
        </div>
      </section>

      {/* Hiring process timeline */}
      <Section variant="muted" className="border-b border-charcoal-100 relative overflow-hidden">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="label text-teal-accent mb-4">Our Hiring Process</p>
          <h2 className="font-display text-3xl md:text-4xl text-ink font-bold">Transparent from start to finish.</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 max-w-6xl mx-auto relative">
          {/* Connecting line for desktop only */}
          <div className="hidden md:block absolute top-12 left-[10%] right-[10%] h-[2px] bg-gradient-to-r from-teal-accent/10 via-teal-accent to-teal-accent/10 z-0" />
          
          {process.map((p) => (
            <div key={p.step} className="bg-paper border border-charcoal-100 rounded-3xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 relative z-10 flex flex-col justify-between group">
              <div>
                <div className="w-12 h-12 rounded-full bg-teal-accent text-paper flex items-center justify-center font-mono text-sm font-bold mb-6 shadow-md shadow-teal-accent/10 ring-4 ring-teal-accent/5 group-hover:scale-110 transition-transform">
                  {p.step}
                </div>
                <h3 className="font-display text-base font-bold text-ink mb-3 group-hover:text-teal-accent transition-colors">{p.title}</h3>
                <p className="text-xs text-charcoal-600 leading-relaxed font-medium">{p.body}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Open roles listing */}
      <Section className="bg-paper">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="label text-teal-accent mb-4">Open Roles</p>
          <h2 className="font-display text-3xl md:text-4xl text-ink font-bold">Current Opportunities</h2>
          <p className="text-charcoal-500 text-sm mt-3 font-medium">Explore roles that match your skillset and passion.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {roles.map((role) => {
            // Custom department colors
            let deptColor = "bg-blue-50 text-blue-700 border-blue-100";
            if (role.department === "Content") deptColor = "bg-emerald-50 text-emerald-700 border-emerald-100";
            if (role.department === "Design") deptColor = "bg-indigo-50 text-indigo-700 border-indigo-100";
            if (role.department === "Production") deptColor = "bg-amber-50 text-amber-700 border-amber-100";
            if (role.department === "PR") deptColor = "bg-rose-50 text-rose-700 border-rose-100";
            if (role.department === "Tech") deptColor = "bg-sky-50 text-sky-700 border-sky-100";
            if (role.department === "Operations") deptColor = "bg-violet-50 text-violet-700 border-violet-100";

            return (
              <div
                key={role.id}
                className="bg-paper border border-charcoal-100 rounded-3xl p-8 shadow-sm hover:shadow-xl hover:border-teal-accent/30 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex flex-wrap gap-2 mb-6">
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border ${deptColor}`}>
                      {role.department}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-mist text-charcoal-600 border border-charcoal-200 px-3 py-1 rounded-full">
                      {role.type}
                    </span>
                  </div>
                  <h3 className="font-display text-2xl font-bold text-ink mb-4 group-hover:text-teal-accent transition-colors">
                    {role.title}
                  </h3>
                  <p className="text-xs text-charcoal-600 leading-relaxed mb-6 font-medium">
                    {role.description}
                  </p>

                  <div className="w-full h-px bg-charcoal-100 mb-6" />

                  <p className="text-[11px] font-bold uppercase tracking-wider text-charcoal-450 mb-3.5">
                    Requirements
                  </p>
                  <ul className="space-y-2.5 mb-8">
                    {role.requirements.map(req => (
                      <li key={req} className="flex items-start gap-2.5">
                        <span className="shrink-0 w-4.5 h-4.5 rounded-full bg-teal-accent/10 text-teal-accent flex items-center justify-center p-0.5 mt-0.5">
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        </span>
                        <span className="text-xs text-charcoal-700 font-medium leading-normal">{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-charcoal-100 mt-auto">
                  <Link
                    href={`/careers/apply?role=${role.id}`}
                    className="btn-accent w-full py-3 text-center block text-xs font-bold tracking-wider uppercase rounded-full shadow-sm hover:shadow-md transition-all"
                  >
                    Apply for this Role
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </Section>

      {/* General Applications CTA */}
      <section className="bg-ink relative overflow-hidden">
        {/* Decorative background gradients */}
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-[#13224f] to-ink pointer-events-none" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-teal-accent/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="container-grid py-24 relative z-10 text-center max-w-3xl mx-auto">
          <p className="text-teal-accent text-xs font-bold tracking-widest uppercase mb-4">Don't see your role?</p>
          <h2 className="font-display text-4xl text-paper font-bold mb-6 tracking-tight">We are always open to exceptional talent.</h2>
          <p className="text-sm text-navy-200 leading-relaxed mb-10 max-w-2xl mx-auto font-medium">
            If you are genuinely good at what you do and want to be part of a growing creative agency, drop us your details and portfolio. We review general applications weekly.
          </p>
          <Link href="/careers/apply?role=General" className="btn-accent inline-flex items-center gap-2 px-8 py-4 text-sm font-semibold rounded-full shadow-lg shadow-teal-accent/20 hover:-translate-y-0.5 active:translate-y-0 hover:shadow-teal-accent/30 transition-all group">
            Send Your Portfolio
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform">
              <path d="M3 8h10M9 4l4 4-4 4"/>
            </svg>
          </Link>
        </div>
      </section>
    </>
  );
}
