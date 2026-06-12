"use client";

import { useState } from "react";

interface Props {
  roleId: string;
  roleLabel: string;
}

export default function CareerApplicationForm({ roleId, roleLabel }: Props) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    portfolioUrl: "",
    experience: "",
    whyUs: "",
    availability: "",
  });
  const [fileNames, setFileNames] = useState<string[]>([]);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));

  const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    setFileNames(files.map(f => f.name));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.portfolioUrl) {
      setErrorMsg("Please fill in name, email and portfolio URL.");
      return;
    }
    setStatus("submitting");
    setErrorMsg("");
    try {
      if (roleId === "General") {
        // Save to portfolio_submissions and send email notification (single endpoint)
        const res = await fetch("/api/portfolio-submissions", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: form.name,
            email: form.email,
            portfolioLink: form.portfolioUrl,
            message: `Phone: ${form.phone || "N/A"}\nCity: ${form.city || "N/A"}\nExperience: ${form.experience || "N/A"}\nWhy Us: ${form.whyUs || "N/A"}\nAvailability: ${form.availability || "N/A"}${fileNames.length > 0 ? `\nFiles: ${fileNames.join(", ")}` : ""}`,
          }),
        });
        if (!res.ok) throw new Error();
      } else {
        // Save to Applicant table AND send email notification in a single endpoint
        const res = await fetch("/api/careers/apply", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...form, roleId, roleLabel, fileNames }),
        });
        if (!res.ok) throw new Error();
      }
      setStatus("success");
    } catch {
      setStatus("error");
      setErrorMsg("Something went wrong. Please email us directly at realofficialcreator@gmail.com");
    }
  };

  if (status === "success") {
    return (
      <div className="bg-paper rounded-2xl border border-charcoal-100 p-10 text-center shadow-card hover:shadow-card-hover transition-all duration-300">
        <div className="w-16 h-16 bg-teal-accent/10 rounded-full flex items-center justify-center mx-auto mb-6 ring-8 ring-teal-accent/5">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2a9d8f" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="animate-bounce"><path d="M20 6L9 17l-5-5"/></svg>
        </div>
        <h2 className="font-display text-2xl font-bold text-ink mb-3">Application received.</h2>
        <p className="text-charcoal-600 mb-2">Thank you for applying for <strong>{roleLabel}</strong>.</p>
        <p className="text-charcoal-600 text-sm max-w-md mx-auto">We have sent a confirmation to <strong>{form.email}</strong>. Our team will review your application and get back to you within 5 business days.</p>
        <a href="/careers" className="inline-flex items-center gap-2 mt-8 text-sm font-semibold text-teal-accent hover:underline">
          Back to Careers
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-paper rounded-2xl border border-charcoal-100 p-8 md:p-10 space-y-6 shadow-card">
      {/* Personal */}
      <div>
        <div className="border-b border-charcoal-100 pb-3 mb-5">
          <h2 className="font-display text-xl text-ink font-semibold">Personal Details</h2>
          <p className="text-xs text-charcoal-450">Introduce yourself and how we can reach you.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-600 mb-2">Full Name *</label>
            <input
              className="form-input w-full focus:ring-2 focus:ring-teal-accent/20 transition-all duration-200"
              placeholder="Your full name"
              value={form.name}
              onChange={e => set("name", e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-600 mb-2">Email Address *</label>
            <input
              type="email"
              className="form-input w-full focus:ring-2 focus:ring-teal-accent/20 transition-all duration-200"
              placeholder="you@email.com"
              value={form.email}
              onChange={e => set("email", e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-600 mb-2">Phone Number</label>
            <input
              className="form-input w-full focus:ring-2 focus:ring-teal-accent/20 transition-all duration-200"
              placeholder="+91 98765 43210"
              value={form.phone}
              onChange={e => set("phone", e.target.value)}
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-600 mb-2">City</label>
            <input
              className="form-input w-full focus:ring-2 focus:ring-teal-accent/20 transition-all duration-200"
              placeholder="Mumbai, Delhi, Bengaluru..."
              value={form.city}
              onChange={e => set("city", e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="h-px bg-charcoal-100" />

      {/* Work */}
      <div>
        <div className="border-b border-charcoal-100 pb-3 mb-5">
          <h2 className="font-display text-xl text-ink font-semibold">Your Work</h2>
          <p className="text-xs text-charcoal-450">Showcase your skills and relevant previous samples.</p>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-600 mb-2">Portfolio / Work Samples URL *</label>
            <input
              className="form-input w-full focus:ring-2 focus:ring-teal-accent/20 transition-all duration-200"
              placeholder="Behance, Notion, Google Drive, GitHub, Instagram link..."
              value={form.portfolioUrl}
              onChange={e => set("portfolioUrl", e.target.value)}
              required
            />
            <p className="text-xs text-charcoal-400 mt-1.5 font-medium">Share a link to your previous work. This is the most important part of your application.</p>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-600 mb-2">Attach Work Samples (optional)</label>
            <label className="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-charcoal-200 rounded-xl p-6 cursor-pointer hover:border-teal-accent hover:bg-teal-accent/5 transition-all duration-200">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-charcoal-400"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12"/></svg>
              <span className="text-sm font-semibold text-charcoal-700">
                {fileNames.length > 0 ? "Files Selected" : "Upload files"}
              </span>
              <span className="text-xs text-charcoal-400 text-center">
                {fileNames.length > 0 ? fileNames.join(", ") : "PDF, images, documents or ZIP (Max 10MB)"}
              </span>
              <input type="file" multiple accept=".pdf,.jpg,.jpeg,.png,.mp4,.zip" onChange={handleFiles} className="hidden" />
            </label>
          </div>
        </div>
      </div>

      <div className="h-px bg-charcoal-100" />

      {/* About */}
      <div>
        <div className="border-b border-charcoal-100 pb-3 mb-5">
          <h2 className="font-display text-xl text-ink font-semibold">About You</h2>
          <p className="text-xs text-charcoal-450">Tell us what makes you a great fit for this team.</p>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-600 mb-2">Relevant Experience</label>
            <textarea
              className="form-input w-full resize-none focus:ring-2 focus:ring-teal-accent/20 transition-all duration-200"
              rows={3}
              placeholder="Briefly describe your relevant experience for this role..."
              value={form.experience}
              onChange={e => set("experience", e.target.value)}
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-600 mb-2">Why Manage Actly?</label>
            <textarea
              className="form-input w-full resize-none focus:ring-2 focus:ring-teal-accent/20 transition-all duration-200"
              rows={3}
              placeholder="What draws you to this role specifically? What do you want to build here?"
              value={form.whyUs}
              onChange={e => set("whyUs", e.target.value)}
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-600 mb-2">Availability</label>
            <select
              className="form-input w-full focus:ring-2 focus:ring-teal-accent/20 transition-all duration-200 cursor-pointer"
              value={form.availability}
              onChange={e => set("availability", e.target.value)}
            >
              <option value="">Select availability</option>
              <option value="immediate">Immediate</option>
              <option value="2weeks">Within 2 weeks</option>
              <option value="1month">Within a month</option>
              <option value="flexible">Flexible</option>
            </select>
          </div>
        </div>
      </div>

      {errorMsg && (
        <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-red-700 text-sm font-medium flex items-center gap-2">
          <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
          {errorMsg}
        </div>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="btn-accent w-full py-4 text-base font-semibold tracking-wide shadow-md hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
      >
        {status === "submitting" ? (
          <span className="flex items-center justify-center gap-2">
            <span className="w-4 h-4 border-2 border-paper/30 border-t-paper rounded-full animate-spin" />
            Submitting Application...
          </span>
        ) : (
          "Submit Application"
        )}
      </button>

      <p className="text-xs text-charcoal-400 text-center font-medium">
        We review every application personally. You will receive a confirmation email immediately after submitting.
      </p>
    </form>
  );
}
