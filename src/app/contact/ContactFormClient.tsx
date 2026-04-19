"use client";

import { useState } from "react";

type Status = "idle" | "submitting" | "success" | "error";

export default function ContactFormClient() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    business: "",
    service: "",
    message: "",
  });
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setError("Please fill in name, email and message.");
      return;
    }
    setStatus("submitting");
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
    } catch {
      setStatus("error");
      setError("Something went wrong. Please email us at hello@manageactly.com");
    }
  };

  if (status === "success") {
    return (
      <div className="bg-paper rounded-2xl border border-charcoal-100 p-12 text-center">
        <div className="w-16 h-16 bg-teal-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2a9d8f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
        </div>
        <h2 className="font-display text-2xl text-ink mb-3">Message received.</h2>
        <p className="text-charcoal-600">We will get back to you within 24 hours.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-xs font-semibold text-charcoal-600 mb-2">Your Name *</label>
          <input className="form-input w-full" placeholder="Full name" value={form.name} onChange={e => set("name", e.target.value)} required />
        </div>
        <div>
          <label className="block text-xs font-semibold text-charcoal-600 mb-2">Email Address *</label>
          <input type="email" className="form-input w-full" placeholder="you@email.com" value={form.email} onChange={e => set("email", e.target.value)} required />
        </div>
        <div>
          <label className="block text-xs font-semibold text-charcoal-600 mb-2">Phone / WhatsApp</label>
          <input className="form-input w-full" placeholder="+91 98765 43210" value={form.phone} onChange={e => set("phone", e.target.value)} />
        </div>
        <div>
          <label className="block text-xs font-semibold text-charcoal-600 mb-2">Business Name</label>
          <input className="form-input w-full" placeholder="Your business" value={form.business} onChange={e => set("business", e.target.value)} />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-charcoal-600 mb-2">What are you interested in?</label>
        <select className="form-input w-full" value={form.service} onChange={e => set("service", e.target.value)}>
          <option value="">Select a service</option>
          <option value="pilot">Paid Pilot (₹2K–₹5K)</option>
          <option value="foundation">Foundation Plan (₹10K–₹15K/mo)</option>
          <option value="growth">Growth Plan (₹20K–₹35K/mo)</option>
          <option value="authority">Authority Plan (₹40K–₹80K/mo)</option>
          <option value="website">Website Development</option>
          <option value="other">Not sure yet</option>
        </select>
      </div>

      <div>
        <label className="block text-xs font-semibold text-charcoal-600 mb-2">Tell us about your brand *</label>
        <textarea
          className="form-input w-full resize-none"
          rows={5}
          placeholder="What does your business do? What are your social media goals? What is your current situation online?"
          value={form.message}
          onChange={e => set("message", e.target.value)}
          required
        />
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3">
          <p className="text-sm text-red-700">{error}</p>
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
            Sending...
          </span>
        ) : "Send Message"}
      </button>

      <p className="text-xs text-charcoal-400 text-center">We reply within 24 hours. No spam, ever.</p>
    </form>
  );
}
