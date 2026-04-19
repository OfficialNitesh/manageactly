import type { Metadata } from "next";
import CareerApplicationForm from "./CareerApplicationForm";

export const metadata: Metadata = {
  title: "Apply | Careers | Manage Actly",
  description: "Apply for a role at Manage Actly.",
};

const roleLabels: Record<string, string> = {
  "content-writer": "Content Writer",
  "graphic-designer": "Graphic Designer",
  "video-editor": "Video Editor",
  "pr-strategist": "PR and Communications Strategist",
  "web-developer": "Web Developer",
  "social-media-manager": "Social Media Account Manager",
};

export default function ApplyPage({ searchParams }: { searchParams: { role?: string } }) {
  const roleId = searchParams.role ?? "";
  const roleLabel = roleLabels[roleId] ?? "Open Application";

  return (
    <div className="min-h-screen bg-mist">
      <div className="max-w-2xl mx-auto px-6 py-24">
        <div className="mb-10">
          <a href="/careers" className="text-sm text-charcoal-500 hover:text-ink inline-flex items-center gap-2 mb-6">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M13 8H3M7 4l-4 4 4 4"/></svg>
            Back to Careers
          </a>
          <p className="label text-charcoal-400 mb-3">Applying for</p>
          <h1 className="font-display text-4xl text-ink">{roleLabel}</h1>
        </div>
        <CareerApplicationForm roleId={roleId} roleLabel={roleLabel} />
      </div>
    </div>
  );
}
