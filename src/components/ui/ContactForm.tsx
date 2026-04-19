"use client";

import { useState, useRef } from "react";
import Button from "@/components/ui/Button";
import { IconArrowRight, IconCheck } from "@/components/icons/ServiceIcons";
import { cn } from "@/lib/utils";

interface FormState {
  status: "idle" | "loading" | "success" | "error";
  message?: string;
}

const services = [
  "Digital Ops Management",
  "Content Systems",
  "Analytics & Reporting",
  "Infrastructure & Tooling",
  "Not sure yet",
];

export default function ContactForm() {
  const [state, setState] = useState<FormState>({ status: "idle" });
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState({ status: "loading" });

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const json = await res.json();

      if (!res.ok) {
        setState({
          status: "error",
          message: json.error || "Something went wrong. Please try again.",
        });
        return;
      }

      setState({ status: "success" });
      formRef.current?.reset();
    } catch {
      setState({
        status: "error",
        message: "Network error. Please check your connection and try again.",
      });
    }
  }

  if (state.status === "success") {
    return (
      <div className="flex flex-col items-center justify-center text-center py-16 px-8
                      bg-mist rounded-2xl border border-charcoal-100">
        <div className="w-14 h-14 rounded-full bg-teal-accent/10 flex items-center justify-center mb-6">
          <IconCheck className="text-teal-accent" size={24} />
        </div>
        <h3 className="font-display text-2xl text-ink mb-3">Message received.</h3>
        <p className="text-charcoal-600 text-sm max-w-sm">
          We review every inquiry personally and typically respond within one business day.
          We'll be in touch.
        </p>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      noValidate
      aria-label="Contact form"
      className="space-y-6"
    >
      {/* Name + Company row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="form-label">
            Full name <span aria-hidden="true" className="text-red-500">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder="Jordan Smith"
            className="form-input"
            aria-required="true"
          />
        </div>
        <div>
          <label htmlFor="company" className="form-label">
            Company
          </label>
          <input
            id="company"
            name="company"
            type="text"
            autoComplete="organization"
            placeholder="Acme Corp"
            className="form-input"
          />
        </div>
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="form-label">
          Work email <span aria-hidden="true" className="text-red-500">*</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="jordan@company.com"
          className="form-input"
          aria-required="true"
        />
      </div>

      {/* Service interest */}
      <div>
        <label htmlFor="service" className="form-label">
          Area of interest
        </label>
        <select
          id="service"
          name="service"
          className={cn("form-input appearance-none", "cursor-pointer")}
          defaultValue=""
        >
          <option value="" disabled>Select a service…</option>
          {services.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="form-label">
          Message <span aria-hidden="true" className="text-red-500">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          placeholder="Tell us about your current situation and what you're trying to solve…"
          className="form-input resize-none"
          aria-required="true"
        />
      </div>

      {/* Error message */}
      {state.status === "error" && (
        <p
          role="alert"
          className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-3"
        >
          {state.message}
        </p>
      )}

      <Button
        type="submit"
        variant="primary"
        size="lg"
        disabled={state.status === "loading"}
        icon={state.status === "loading" ? undefined : <IconArrowRight size={16} />}
        className="w-full justify-center"
        aria-busy={state.status === "loading"}
      >
        {state.status === "loading" ? "Sending…" : "Send message"}
      </Button>

      <p className="text-xs text-charcoal-400 text-center">
        We typically respond within one business day.
        Your information is kept strictly confidential.
      </p>
    </form>
  );
}
