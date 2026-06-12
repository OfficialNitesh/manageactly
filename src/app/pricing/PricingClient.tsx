"use client";

import { useState } from "react";
import Link from "next/link";

// ─── UPI details ────────────────────────────────────────────────────────
const UPI_ID = "nitesshh@axl";
const UPI_NAME = "Manage Actly";

// QR code: generated from your UPI ID
const getQrUrl = (amount: number, note: string) =>
  `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(
    `upi://pay?pa=${UPI_ID}&pn=${encodeURIComponent(UPI_NAME)}&am=${amount}&cu=INR&tn=${encodeURIComponent(note)}`
  )}`;

// ─── Plans ───────────────────────────────────────────────────────────────────
const plans = [
  {
    id: "PILOT" as const,
    label: "PILOT",
    priceDisplay: "₹2,000 to ₹5,000",
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
    priceDisplay: "₹10,000 to ₹15,000",
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
    priceDisplay: "₹20,000 to ₹35,000",
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
    priceDisplay: "₹40,000 to ₹80,000+",
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

type Step = "plans" | "upi" | "success";

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
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setSubmitting(false);
    }
  };

  // ── Success screen ─────────────────────────────────────────────────────────
  if (step === "success") {
    return (
      <div className="min-h-screen bg-gradient-to-b from-mist to-paper flex items-center justify-center px-6 pt-24 pb-12">
        <div className="max-w-md w-full bg-paper border border-charcoal-100 rounded-3xl p-10 text-center shadow-2xl hover:shadow-card-hover transition-all duration-300">
          <div className="w-20 h-20 bg-teal-accent/10 rounded-full flex items-center justify-center mx-auto mb-8 ring-8 ring-teal-accent/5">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#2a9d8f" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="animate-bounce text-teal-accent">
              <path d="M20 6L9 17l-5-5"/>
            </svg>
          </div>
          <h1 className="font-display text-3xl font-bold text-ink mb-4">Payment Submitted</h1>
          <p className="text-charcoal-600 text-sm mb-4">
            Thank you, <strong>{name}</strong>. We have received your payment details for the{" "}
            <strong className="text-teal-accent">{selectedPlan?.label}</strong>.
          </p>
          <p className="text-charcoal-500 text-xs leading-relaxed mb-8">
            A confirmation email has been sent to <strong>{email}</strong>. Our operations team will verify your payment
            and reach out within <strong>2 to 4 hours</strong>.
          </p>
          <Link href="/" className="btn-accent w-full py-3.5 block text-center font-semibold tracking-wide shadow-md hover:shadow-lg transition-all">
            Back to Home
          </Link>
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
      <div className="min-h-screen bg-gradient-to-b from-mist via-paper to-paper pt-28 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Back button */}
          <button
            onClick={() => { setStep("plans"); setError(""); }}
            className="flex items-center gap-2 text-sm font-semibold text-charcoal-500 hover:text-ink mb-8 transition-colors group"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-translate-x-1 transition-transform">
              <path d="M19 12H5M12 5l-7 7 7 7"/>
            </svg>
            Back to plans
          </button>

          <div className="mb-8">
            <p className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-teal-accent/10 text-teal-accent mb-3">
              Payment Verification
            </p>
            <h1 className="font-display text-4xl font-bold text-ink mb-1">{selectedPlan.label} Plan</h1>
            <p className="text-charcoal-500 text-sm">
              Base Price: <span className="font-bold text-ink">{selectedPlan.priceDisplay}</span> &nbsp;·&nbsp; {selectedPlan.period}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            {/* Left: QR + UPI details */}
            <div className="md:col-span-5 bg-gradient-to-b from-ink via-[#13224f] to-ink rounded-3xl p-8 flex flex-col items-center text-center shadow-xl border border-navy-800 text-paper relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-teal-accent/10 rounded-full blur-xl pointer-events-none" />
              <p className="text-teal-accent text-[10px] font-bold tracking-widest uppercase mb-6">Scan QR to Pay</p>

              {/* QR code */}
              <div className="bg-paper rounded-2xl p-4 mb-6 inline-block shadow-xl border border-charcoal-100 relative group transition-transform duration-300 hover:scale-[1.03]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={qrUrl}
                  alt="UPI QR Code"
                  width={160}
                  height={160}
                  className="block rounded-lg"
                />
              </div>

              <p className="text-navy-200 text-xs font-semibold mb-3">Scan with any major UPI app</p>
              <div className="text-[9px] font-bold text-navy-400 flex gap-1.5 justify-center flex-wrap mb-6">
                {["GPay", "PhonePe", "Paytm", "BHIM"].map(app => (
                  <span key={app} className="bg-navy-900 border border-navy-800/60 px-2.5 py-0.5 rounded-md text-navy-300">{app}</span>
                ))}
              </div>

              <div className="w-full border-t border-navy-800/80 pt-5 mt-2">
                <p className="text-navy-400 text-[10px] font-semibold uppercase tracking-wider mb-2">Or transfer directly to UPI ID:</p>
                <button
                  onClick={() => { navigator.clipboard.writeText(UPI_ID); }}
                  className="font-mono text-base font-bold text-paper hover:text-teal-accent transition-all duration-200 flex items-center justify-center gap-2 mx-auto focus:outline-none bg-navy-900/40 hover:bg-navy-900 border border-navy-800 hover:border-teal-accent/30 px-4 py-2.5 rounded-xl w-full"
                  title="Click to copy"
                >
                  {UPI_ID}
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-navy-400 group-hover:text-teal-accent shrink-0">
                    <rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/>
                  </svg>
                </button>
                <p className="text-navy-500 text-[9px] mt-2 font-medium tracking-wider uppercase">Click ID to copy</p>
              </div>
            </div>

            {/* Right: confirmation form */}
            <div className="md:col-span-7 bg-paper rounded-3xl border border-charcoal-100 p-8 shadow-xl space-y-6">
              <div>
                <h2 className="font-display text-xl text-ink font-bold">Submit Payment Details</h2>
                <p className="text-xs text-charcoal-500 mt-1">Please enter your transaction information for verification.</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-charcoal-600 mb-2">
                    Your Name *
                  </label>
                  <input
                    className="form-input w-full focus:ring-2 focus:ring-teal-accent/20 transition-all"
                    placeholder="Enter full name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-charcoal-600 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    className="form-input w-full focus:ring-2 focus:ring-teal-accent/20 transition-all"
                    placeholder="you@example.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-charcoal-600 mb-2">
                    Phone / WhatsApp
                  </label>
                  <input
                    className="form-input w-full focus:ring-2 focus:ring-teal-accent/20 transition-all"
                    placeholder="+91 98765 43210"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-charcoal-600 mb-2">
                    UTR / Transaction ID *
                  </label>
                  <input
                    className="form-input w-full focus:ring-2 focus:ring-teal-accent/20 transition-all"
                    placeholder="12-digit UPI UTR number"
                    value={utr}
                    onChange={e => setUtr(e.target.value)}
                  />
                  <p className="text-[10px] text-charcoal-400 mt-1.5 font-medium leading-relaxed">
                    Retrieve this from your payment app (Google Pay, PhonePe, Paytm, etc.) under transaction details. E.g. 432112345678.
                  </p>
                </div>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-red-700 text-xs font-semibold flex items-start gap-2">
                  <svg className="w-4 h-4 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
                  <span>{error}</span>
                </div>
              )}

              <button
                onClick={handleSubmitPayment}
                disabled={submitting}
                className="btn-accent w-full py-4 text-sm font-semibold tracking-wide shadow-md hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 hover:-translate-y-0.5 active:translate-y-0 transition-all"
              >
                {submitting ? (
                  <>
                    <span className="w-4 h-4 border-2 border-paper/30 border-t-paper rounded-full animate-spin" />
                    Verifying Submission...
                  </>
                ) : (
                  "Confirm Payment"
                )}
              </button>

              <p className="text-[10px] text-charcoal-400 text-center font-medium">
                Payments are typically verified within 2 to 4 hours.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── Plans listing ──────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-mist">
      {/* Header */}
      <section className="relative pt-36 pb-20 border-b border-charcoal-100/50 bg-gradient-to-b from-mist via-paper to-paper overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />
        <div className="container-grid relative z-10 text-center max-w-3xl mx-auto">
          <p className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold bg-teal-accent/10 text-teal-accent mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-accent animate-ping" />
            Simple, Transparent Pricing
          </p>
          <h1 className="font-display text-5xl md:text-6xl text-ink leading-tight font-bold mb-6 tracking-tight">
            Invest in Real Growth.
          </h1>
          <p className="text-lg text-charcoal-600 leading-relaxed max-w-2xl mx-auto font-medium">
            Pay directly via UPI with zero processing gateway fees. Every plan includes dedicated operations and starts with a paid test pilot.
          </p>
        </div>
      </section>

      {/* UPI info sticker */}
      <div className="border-b border-charcoal-100 bg-paper/60 backdrop-blur-md sticky top-[64px] z-20 shadow-sm">
        <div className="container-grid py-3 flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[11px] font-bold text-charcoal-400 uppercase tracking-widest">Accepted:</span>
            {["GPay", "PhonePe", "Paytm", "BHIM", "Any UPI App"].map(app => (
              <span key={app} className="text-[10px] bg-mist border border-charcoal-200 text-charcoal-600 px-2.5 py-0.5 rounded-full font-semibold">
                {app}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-2 text-xs">
            <span className="text-charcoal-500 font-medium">Direct UPI ID:</span>
            <button
              onClick={() => { navigator.clipboard.writeText(UPI_ID); }}
              className="font-mono bg-mist text-ink hover:text-teal-accent border border-charcoal-200 hover:border-teal-accent/30 px-3 py-1 rounded-md font-bold transition-all flex items-center gap-1.5 group active:scale-95"
              title="Click to copy UPI ID"
            >
              {UPI_ID}
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-charcoal-400 group-hover:text-teal-accent transition-colors">
                <rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Plans comparison cards */}
      <div className="container-grid py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 xl:gap-8 items-stretch">
          {plans.map((plan) => {
            const isGrowth = plan.highlight;
            return (
              <div
                key={plan.id}
                className={`relative rounded-3xl p-6 md:p-8 flex flex-col justify-between transition-all duration-300 group ${
                  isGrowth
                    ? "bg-gradient-to-b from-ink via-[#13224f] to-ink text-paper border-2 border-teal-accent shadow-xl hover:shadow-2xl hover:shadow-teal-accent/5 hover:-translate-y-2"
                    : "bg-paper border border-charcoal-100 hover:border-charcoal-350 hover:shadow-xl hover:-translate-y-2"
                }`}
              >
                {isGrowth && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-teal-accent text-paper font-semibold text-[10px] uppercase tracking-widest px-4 py-1 rounded-full shadow-md z-10 whitespace-nowrap">
                    {plan.badge}
                  </div>
                )}
                
                <div>
                  {/* Header */}
                  <div className="mb-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className={`text-[10px] font-bold tracking-widest uppercase px-2 py-0.5 rounded ${
                        isGrowth ? "bg-teal-accent/25 text-teal-accent" : "bg-mist text-charcoal-500"
                      }`}>
                        {plan.label}
                      </span>
                      {!isGrowth && plan.badge && (
                        <span className="text-[9px] bg-teal-accent/10 text-teal-accent/90 px-2 py-0.5 rounded font-bold uppercase tracking-wider">
                          {plan.badge}
                        </span>
                      )}
                    </div>
                    <h3 className={`font-display text-2xl font-bold mb-1 ${isGrowth ? "text-paper" : "text-ink"}`}>
                      {plan.priceDisplay}
                    </h3>
                    <p className={`text-[10px] font-bold tracking-wider uppercase mb-3 ${isGrowth ? "text-teal-accent/80" : "text-teal-accent"}`}>
                      {plan.period}
                    </p>
                    <p className={`text-xs font-semibold ${isGrowth ? "text-navy-300" : "text-charcoal-500"}`}>
                      {plan.for}
                    </p>
                  </div>

                  <div className={`w-full h-px mb-6 ${isGrowth ? "bg-navy-800" : "bg-charcoal-100"}`} />

                  {/* Description */}
                  <p className={`text-xs leading-relaxed mb-6 font-medium ${isGrowth ? "text-navy-200" : "text-charcoal-600"}`}>
                    {plan.description}
                  </p>

                  {/* Features list */}
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5">
                        <span className={`shrink-0 w-4.5 h-4.5 rounded-full flex items-center justify-center p-0.5 mt-0.5 ${
                          isGrowth ? "bg-teal-accent/20 text-teal-accent" : "bg-teal-accent/15 text-teal-accent"
                        }`}>
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        </span>
                        <span className={`text-xs leading-normal font-medium ${isGrowth ? "text-navy-200" : "text-charcoal-700"}`}>
                          {f}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA Button */}
                <div className="mt-auto pt-4">
                  <button
                    onClick={() => handleSelectPlan(plan)}
                    className={`w-full py-3 px-6 rounded-full font-semibold text-xs transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 ${
                      isGrowth
                        ? "bg-teal-accent text-paper hover:bg-teal-dark hover:shadow-lg hover:shadow-teal-accent/20"
                        : "bg-ink text-paper hover:bg-navy-800 hover:shadow-md"
                    }`}
                  >
                    {plan.isPilot ? "Book Pilot" : "Get Started"}
                  </button>
                  <p className={`text-[9px] text-center font-medium mt-3 tracking-wider uppercase ${isGrowth ? "text-navy-500" : "text-charcoal-450"}`}>
                    Pay via UPI · 0% fees
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* How payment works process steps */}
      <div className="border-t border-charcoal-100 bg-paper">
        <div className="container-grid py-20">
          <div className="max-w-4xl mx-auto">
            <p className="label text-teal-accent mb-4 text-center">Process Workflow</p>
            <h2 className="font-display text-3xl font-bold text-center text-ink mb-12">How Payment Works</h2>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
              {[
                { step: "01", title: "Choose Plan", body: "Select the service package or paid pilot option that fits your needs." },
                { step: "02", title: "Pay via UPI", body: `Scan the generated QR code or send payment directly to ${UPI_ID}.` },
                { step: "03", title: "Enter UTR", body: "Input the 12-digit transaction UTR number shown in your UPI app." },
                { step: "04", title: "Verification", body: "Our administrators verify the transaction within 2 to 4 hours." },
              ].map((s, i) => (
                <div key={s.step} className="p-6 bg-paper rounded-2xl border border-charcoal-100 hover:border-charcoal-300 hover:shadow-lg transition-all duration-300 relative group flex flex-col justify-between">
                  <div>
                    <div className="w-8 h-8 rounded-full bg-teal-accent/10 text-teal-accent flex items-center justify-center font-mono text-xs font-bold mb-4 group-hover:bg-teal-accent group-hover:text-paper transition-all duration-300">
                      {s.step}
                    </div>
                    <h3 className="font-display text-base font-bold text-ink mb-2">{s.title}</h3>
                    <p className="text-xs text-charcoal-600 leading-relaxed font-medium">{s.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}