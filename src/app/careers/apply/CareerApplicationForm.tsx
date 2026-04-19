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
      const res = await fetch("/api/careers/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, roleId, roleLabel, fileNames }),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
    } catch {
      setStatus("error");
      setErrorMsg("Something went wrong. Please email us directly at careers@manageactly.com");
    }
  };

  if (status === "success") {
    return (
      <div className="bg-paper rounded-2xl border border-charcoal-100 p-10 text-center">
        <div className="w-16 h-16 bg-teal-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2a9d8f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
        </div>
        <h2 className="font-display text-2xl text-ink mb-3">Application received.</h2>
        <p className="text-charcoal-600 mb-2">Thank you for applying for <strong>{roleLabel}</strong>.</p>
        <p className="text-charcoal-600 text-sm">We have sent a confirmation to <strong>{form.email}</strong>. Our team will review your application and get back to you within 5 business days.</p>
        <a href="/careers" className="inline-flex items-center gap-2 mt-8 text-sm font-semibold text-teal-accent hover:underline">
          Back to Careers
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-paper rounded-2xl border border-charcoal-100 p-8 md:p-10 space-y-6">
      {/* Personal */}
      <div>
        <h2 className="font-display text-xl text-ink mb-5">Personal Details</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-charcoal-600 mb-2">Full Name *</label>
            <input
              className="form-input w-full"
              placeholder="Your full name"
              value={form.name}
              onChange={e => set("name", e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-charcoal-600 mb-2">Email Address *</label>
            <input
              type="email"
              className="form-input w-full"
              placeholder="you@email.com"
              value={form.email}
              onChange={e => set("email", e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-charcoal-600 mb-2">Phone Number</label>
            <input
              className="form-input w-full"
              placeholder="+91 98765 43210"
              value={form.phone}
              onChange={e => set("phone", e.target.value)}
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-charcoal-600 mb-2">City</label>
            <input
              className="form-input w-full"
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
        <h2 className="font-display text-xl text-ink mb-5">Your Work</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-charcoal-600 mb-2">Portfolio / Work Samples URL *</label>
            <input
              className="form-input w-full"
              placeholder="Behance, Notion, Google Drive, GitHub, Instagram link..."
              value={form.portfolioUrl}
              onChange={e => set("portfolioUrl", e.target.value)}
              required
            />
            <p className="text-xs text-charcoal-400 mt-1.5">Share a link to your previous work. This is the most important part of your application.</p>
          </div>

          <div>
            <label className="block text-xs font-semibold text-charcoal-600 mb-2">Attach Work Samples (optional)</label>
            <label className="flex items-center justify-center gap-3 border-2 border-dashed border-charcoal-200 rounded-xl p-6 cursor-pointer hover:border-teal-accent hover:bg-teal-accent/5 transition-all duration-200">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-charcoal-400"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12"/></svg>
              <span className="text-sm text-charcoal-500">
                {fileNames.length > 0 ? fileNames.join(", ") : "Upload PDF, images or documents"}
              </span>
              <input type="file" multiple accept=".pdf,.jpg,.jpeg,.png,.mp4,.zip" onChange={handleFiles} className="hidden" />
            </label>
          </div>
        </div>
      </div>

      <div className="h-px bg-charcoal-100" />

      {/* About */}
      <div>
        <h2 className="font-display text-xl text-ink mb-5">About You</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-charcoal-600 mb-2">Relevant Experience</label>
            <textarea
              className="form-input w-full resize-none"
              rows={3}
              placeholder="Briefly describe your relevant experience for this role..."
              value={form.experience}
              onChange={e => set("experience", e.target.value)}
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-charcoal-600 mb-2">Why Manage Actly?</label>
            <textarea
              className="form-input w-full resize-none"
              rows={3}
              placeholder="What draws you to this role specifically? What do you want to build here?"
              value={form.whyUs}
              onChange={e => set("whyUs", e.target.value)}
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-charcoal-600 mb-2">Availability</label>
            <select
              className="form-input w-full"
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
        <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3">
          <p className="text-sm text-red-700">{errorMsg}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="btn-accent w-full py-4 text-base disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === "submitting" ? (
          <span className="flex items-center justify-center gap-2">
            <span className="w-4 h-4 border-2 border-paper/30 border-t-paper rounded-full animate-spin" />
            Submitting...
          </span>
        ) : (
          "Submit Application"
        )}
      </button>

      <p className="text-xs text-charcoal-400 text-center">
        We review every application personally. You will receive a confirmation email immediately after submitting.
      </p>
    </form>
  );
}
