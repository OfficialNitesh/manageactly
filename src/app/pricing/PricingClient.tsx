"use client";

import { useState } from "react";
import Link from "next/link";

// ─── Your UPI details ────────────────────────────────────────────────────────
const UPI_ID = "nitesshh@axl";
const UPI_NAME = "Manage Actly";
// QR code: generated from your UPI ID using a free service
// This URL generates a QR on the fly — works immediately, no setup needed
const getQrUrl = (amount: number, note: string) =>
  `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(
    `upi://pay?pa=${UPI_ID}&pn=${encodeURIComponent(UPI_NAME)}&am=${amount}&cu=INR&tn=${encodeURIComponent(note)}`
  )}`;

// ─── Plans ───────────────────────────────────────────────────────────────────
const plans = [
  {
    id: "PILOT" as const,
    label: "PILOT",
    priceDisplay: "₹2,000 – ₹5,000",
    amount: 2000,
    period: "one-time",
    for: "First step for everyone",
    highlight: false,
    badge: "Start Here",
    isPilot: true,
    description: "7 to 10 day paid pilot. See results before committing to a monthly plan.",
    features: [
      "Full profile audit across platforms",
      "3 to 5 published posts",
      "Visual brand setup and templates",
      "Zero long-term commitment",
    ],
  },
  {
    id: "FOUNDATION" as const,
    label: "FOUNDATION",
    priceDisplay: "₹10,000 – ₹15,000",
    amount: 10000,
    period: "per month",
    for: "Startups · Clinics · Founders",
    highlight: false,
    badge: null,
    isPilot: false,
    description: "Establish your social presence with consistent content and community basics.",
    features: [
      "3 platforms managed (Instagram, Facebook, YouTube)",
      "8 high quality posts per month",
      "Basic aesthetic grid planning",
      "Community monitoring during business hours",
      "Standard monthly performance report",
      "Brand tone consistency",
    ],
  },
  {
    id: "GROWTH" as const,
    label: "GROWTH",
    priceDisplay: "₹20,000 – ₹35,000",
    amount: 20000,
    period: "per month",
    for: "Mid-size B2B · Scaling Brands",
    highlight: true,
    badge: "Most Popular",
    isPilot: false,
    description: "Full-service management for brands ready to scale with Reels and active engagement.",
    features: [
      "3 to 4 platforms managed",
      "15 to 20 posts per month including Reels and Carousels",
      "Active daily community engagement",
      "Bi-weekly strategy calls",
      "Advanced analytics reporting",
      "30-day content calendar planned in advance",
    ],
  },
  {
    id: "AUTHORITY" as const,
    label: "AUTHORITY",
    priceDisplay: "₹40,000 – ₹80,000+",
    amount: 40000,
    period: "per month",
    for: "Funded Startups · Enterprise · Luxury",
    highlight: false,
    badge: null,
    isPilot: false,
    description: "Omnichannel dominance. Daily presence, custom shoots and executive reporting.",
    features: [
      "5 or more platforms managed",
      "Daily posting velocity across all channels",
      "Custom content shoots and creative direction",
      "Competitor share-of-voice analysis",
      "Crisis management and PR alignment",
      "Real-time executive data dashboards",
    ],
  },
];

type PlanId = "PILOT" | "FOUNDATION" | "GROWTH" | "AUTHORITY";
type Step = "plans" | "upi" | "confirm" | "success";

export default function PricingClient() {
  const [step, setStep] = useState<Step>("plans");
  const [selectedPlan, setSelectedPlan] = useState<(typeof plans)[0] | null>(null);

  // Customer details
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [utr, setUtr] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSelectPlan = (plan: (typeof plans)[0]) => {
    setSelectedPlan(plan);
    setStep("upi");
    setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 50);
  };

  const handleSubmitPayment = async () => {
    if (!name.trim()) { setError("Please enter your name."); return; }
    if (!email.trim()) { setError("Please enter your email."); return; }
    if (!utr.trim()) { setError("Please enter the UTR or transaction ID from your UPI app."); return; }

    setSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/payments/upi", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          plan: selectedPlan!.id,
          customerName: name,
          customerEmail: email,
          customerPhone: phone,
          utrNumber: utr,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({})) as { error?: string };
        throw new Error(data.error ?? "Submission failed. Please try again.");
      }

      setStep("success");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  // ── Success screen ─────────────────────────────────────────────────────────
  if (step === "success") {
    return (
      <div className="min-h-screen bg-paper flex items-center justify-center px-6 pt-24">
        <div className="max-w-md w-full text-center">
          <div className="w-20 h-20 bg-teal-accent/10 rounded-full flex items-center justify-center mx-auto mb-8">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#2a9d8f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 6L9 17l-5-5"/>
            </svg>
          </div>
          <h1 className="font-display text-3xl text-ink mb-4">Payment submitted.</h1>
          <p className="text-charcoal-600 mb-2">
            Thank you, <strong>{name}</strong>. We have received your payment details for the{" "}
            <strong>{selectedPlan?.label}</strong>.
          </p>
          <p className="text-charcoal-600 mb-8">
            A confirmation has been sent to <strong>{email}</strong>. We will verify your payment
            and contact you within <strong>2 to 4 hours</strong>.
          </p>
          <Link href="/" className="btn-accent">Back to Home</Link>
        </div>
      </div>
    );
  }

  // ── UPI payment screen ─────────────────────────────────────────────────────
  if (step === "upi" && selectedPlan) {
    const qrUrl = getQrUrl(
      selectedPlan.amount,
      `Manage Actly ${selectedPlan.label}`
    );

    return (
      <div className="min-h-screen bg-paper pt-28 pb-20 px-6">
        <div className="max-w-2xl mx-auto">
          {/* Back */}
          <button
            onClick={() => { setStep("plans"); setError(""); }}
            className="flex items-center gap-2 text-sm text-charcoal-500 hover:text-ink mb-8 transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 5l-7 7 7 7"/>
            </svg>
            Back to plans
          </button>

          <p className="label text-charcoal-400 mb-3">Payment</p>
          <h1 className="font-display text-3xl text-ink mb-2">{selectedPlan.label}</h1>
          <p className="text-charcoal-500 text-sm mb-10">
            {selectedPlan.priceDisplay} &nbsp;·&nbsp; {selectedPlan.period}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left: QR + UPI details */}
            <div className="bg-ink rounded-2xl p-8 flex flex-col items-center text-center">
              <p className="label text-teal-accent mb-5">Pay via UPI</p>

              {/* QR code */}
              <div className="bg-paper rounded-xl p-3 mb-5 inline-block">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={qrUrl}
                  alt="UPI QR Code"
                  width={180}
                  height={180}
                  className="block"
                />
              </div>

              <p className="text-navy-400 text-xs mb-3">Scan with any UPI app</p>
              <div className="text-xs text-navy-500 flex gap-2 justify-center flex-wrap mb-6">
                {["GPay", "PhonePe", "Paytm", "BHIM"].map(app => (
                  <span key={app} className="bg-navy-800 px-2 py-1 rounded">{app}</span>
                ))}
              </div>

              <div className="w-full border-t border-navy-800 pt-5">
                <p className="text-navy-400 text-xs mb-1">Or pay directly to UPI ID</p>
                <button
                  onClick={() => { navigator.clipboard.writeText(UPI_ID); }}
                  className="font-display text-xl text-paper hover:text-teal-accent transition-colors duration-200 flex items-center gap-2 mx-auto"
                  title="Click to copy"
                >
                  {UPI_ID}
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/>
                  </svg>
                </button>
                <p className="text-navy-600 text-xs mt-1">Click to copy</p>
              </div>

              <div className="mt-5 w-full border-t border-navy-800 pt-4">
                <p className="text-navy-400 text-xs">Amount</p>
                <p className="font-display text-2xl font-bold text-paper mt-1">
                  {selectedPlan.priceDisplay}
                </p>
                <p className="text-navy-500 text-xs mt-1">Pay the starting amount shown above</p>
              </div>
            </div>

            {/* Right: confirmation form */}
            <div>
              <h2 className="font-display text-xl text-ink mb-5">After paying, fill this form</h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-charcoal-600 mb-2">
                    Your Name *
                  </label>
                  <input
                    className="form-input w-full"
                    placeholder="Full name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-charcoal-600 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    className="form-input w-full"
                    placeholder="you@email.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-charcoal-600 mb-2">
                    Phone / WhatsApp
                  </label>
                  <input
                    className="form-input w-full"
                    placeholder="+91 98765 43210"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-charcoal-600 mb-2">
                    UTR / Transaction ID *
                  </label>
                  <input
                    className="form-input w-full"
                    placeholder="12-digit UTR from your UPI app"
                    value={utr}
                    onChange={e => setUtr(e.target.value)}
                  />
                  <p className="text-xs text-charcoal-400 mt-1.5">
                    Find this in your UPI app under transaction history. Looks like: 432112345678
                  </p>
                </div>
              </div>

              {error && (
                <div className="mt-4 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              )}

              <button
                onClick={handleSubmitPayment}
                disabled={submitting}
                className="btn-accent w-full mt-6 py-4 text-base disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {submitting ? (
                  <>
                    <span className="w-4 h-4 border-2 border-paper/30 border-t-paper rounded-full animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Confirm Payment"
                )}
              </button>

              <p className="text-xs text-charcoal-400 text-center mt-3">
                We will verify your payment within 2 to 4 hours and contact you to get started.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── Plans listing ──────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-paper">
      {/* Header */}
      <section className="pt-32 pb-16 border-b border-charcoal-100">
        <div className="container-grid">
          <div className="md:col-span-8 lg:col-span-7">
            <p className="label text-charcoal-400 mb-5">Pricing</p>
            <h1 className="font-display text-5xl md:text-6xl text-ink leading-tight mb-6">
              Simple, transparent pricing.
            </h1>
            <p className="text-xl text-charcoal-600 leading-relaxed max-w-2xl">
              Pay directly via UPI. No payment gateway. No extra charges. Every engagement starts with a paid pilot.
            </p>
          </div>
        </div>
      </section>

      {/* UPI badge */}
      <div className="border-b border-charcoal-100 bg-mist">
        <div className="container-grid py-4">
          <div className="md:col-span-12 flex items-center gap-3 flex-wrap">
            <span className="text-xs font-semibold text-charcoal-500">Pay via:</span>
            {["GPay", "PhonePe", "Paytm", "BHIM", "Any UPI App"].map(app => (
              <span key={app} className="text-xs bg-paper border border-charcoal-200 text-charcoal-600 px-3 py-1 rounded-full">
                {app}
              </span>
            ))}
            <span className="text-xs text-charcoal-400 ml-2">UPI ID: <strong className="text-ink">{UPI_ID}</strong></span>
          </div>
        </div>
      </div>

      {/* Plans */}
      <div className="container-grid py-16">
        <div className="md:col-span-12 space-y-6">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`rounded-2xl border p-8 md:p-10 ${
                plan.highlight
                  ? "bg-ink border-navy-700"
                  : "bg-paper border-charcoal-100"
              }`}
            >
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-8">
                {/* Left */}
                <div className="flex-1">
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className={`label tracking-widest ${plan.highlight ? "text-teal-accent" : "text-charcoal-400"}`}>
                      {plan.label}
                    </span>
                    {plan.badge && (
                      <span className="text-xs bg-teal-accent text-paper px-3 py-1 rounded-full font-semibold">
                        {plan.badge}
                      </span>
                    )}
                  </div>

                  <p className={`font-display text-4xl font-bold mb-1 ${plan.highlight ? "text-paper" : "text-ink"}`}>
                    {plan.priceDisplay}
                  </p>
                  <p className={`text-sm mb-5 ${plan.highlight ? "text-navy-400" : "text-charcoal-500"}`}>
                    {plan.period} &nbsp;·&nbsp; {plan.for}
                  </p>

                  <p className={`text-sm leading-relaxed mb-6 max-w-lg ${plan.highlight ? "text-navy-300" : "text-charcoal-600"}`}>
                    {plan.description}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {plan.features.map(f => (
                      <div key={f} className="flex items-start gap-2">
                        <span className="text-teal-accent font-bold text-sm shrink-0 mt-0.5">✓</span>
                        <span className={`text-sm ${plan.highlight ? "text-navy-200" : "text-charcoal-700"}`}>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right: CTA */}
                <div className="shrink-0 flex flex-col items-start md:items-end gap-3">
                  <button
                    onClick={() => handleSelectPlan(plan)}
                    className={`px-8 py-3.5 rounded-full font-semibold text-sm transition-all duration-200 whitespace-nowrap ${
                      plan.highlight
                        ? "bg-teal-accent text-paper hover:bg-teal-dark"
                        : "bg-ink text-paper hover:bg-navy-800"
                    }`}
                  >
                    {plan.isPilot ? "Book Pilot" : "Get Started"}
                  </button>
                  <p className={`text-xs ${plan.highlight ? "text-navy-500" : "text-charcoal-400"}`}>
                    Pay via UPI · No gateway fees
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* How payment works */}
      <div className="border-t border-charcoal-100 bg-mist">
        <div className="container-grid py-16">
          <div className="md:col-span-12">
            <p className="label text-charcoal-400 mb-4">How Payment Works</p>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-0 border border-charcoal-200 rounded-2xl overflow-hidden">
              {[
                { step: "01", title: "Choose Plan", body: "Select the plan that fits your needs and click Get Started." },
                { step: "02", title: "Pay via UPI", body: `Scan the QR code or send to ${UPI_ID} using any UPI app.` },
                { step: "03", title: "Enter UTR", body: "Copy the transaction ID from your UPI app and submit it in the form." },
                { step: "04", title: "We Verify", body: "We confirm receipt within 2 to 4 hours and contact you to begin." },
              ].map((s, i, arr) => (
                <div key={s.step} className={`p-6 bg-paper ${i < arr.length - 1 ? "border-b sm:border-b-0 sm:border-r border-charcoal-100" : ""}`}>
                  <p className="font-mono text-xs text-charcoal-400 mb-3">{s.step}</p>
                  <h3 className="font-display text-base text-ink mb-2">{s.title}</h3>
                  <p className="text-xs text-charcoal-600 leading-relaxed">{s.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}