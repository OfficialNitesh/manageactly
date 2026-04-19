"use client";

import { useState } from "react";
import Link from "next/link";

declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => { open(): void };
  }
}

interface RazorpayOptions {
  key: string;
  order_id: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  image?: string;
  prefill?: { name?: string; email?: string; contact?: string };
  theme?: { color?: string };
  // UPI + payment method config
  method?: {
    upi?: boolean;
    card?: boolean;
    netbanking?: boolean;
    wallet?: boolean;
    emi?: boolean;
  };
  config?: {
    display?: {
      blocks?: {
        upi?: { name: string; instruments: { method: string; flows?: string[] }[] };
        other?: { name: string; instruments: { method: string }[] };
      };
      sequence?: string[];
      preferences?: { show_default_blocks?: boolean };
    };
  };
  handler?: (response: {
    razorpay_payment_id: string;
    razorpay_order_id: string;
    razorpay_signature: string;
  }) => void;
  modal?: { ondismiss?: () => void };
}

const plans = [
  {
    id: "FOUNDATION",
    label: "FOUNDATION",
    price: "₹10,000",
    priceRange: "₹10K–₹15K",
    period: "per month",
    for: "Startups · Clinics · Founders",
    highlight: false,
    badge: null,
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
    id: "GROWTH",
    label: "GROWTH",
    price: "₹20,000",
    priceRange: "₹20K–₹35K",
    period: "per month",
    for: "Mid-size B2B · Scaling Brands",
    highlight: true,
    badge: "Most Popular",
    description: "Full-service management for brands ready to scale with Reels and active engagement.",
    features: [
      "3 to 4 platforms managed",
      "15 to 20 posts per month including Reels and Carousels",
      "Active daily community engagement",
      "Bi-weekly strategy calls",
      "Advanced analytics reporting",
      "30-day content calendar proactive planning",
    ],
  },
  {
    id: "AUTHORITY",
    label: "AUTHORITY",
    price: "₹40,000",
    priceRange: "₹40K–₹80K+",
    period: "per month",
    for: "Funded Startups · Enterprise · Luxury",
    highlight: false,
    badge: null,
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

export default function PricingClient() {
  const [loading, setLoading] = useState<string | null>(null);
  const [successPlan, setSuccessPlan] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Capture customer details before opening checkout
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  const loadRazorpay = (): Promise<boolean> =>
    new Promise(resolve => {
      if (typeof window !== "undefined" && window.Razorpay) { resolve(true); return; }
      const s = document.createElement("script");
      s.src = "https://checkout.razorpay.com/v1/checkout.js";
      s.onload = () => resolve(true);
      s.onerror = () => resolve(false);
      document.body.appendChild(s);
    });

  const initiateCheckout = async (planId: string) => {
    if (!customerEmail || !customerName) {
      setError("Please fill in your name and email before proceeding.");
      return;
    }

    setLoading(planId);
    setError(null);

    try {
      const loaded = await loadRazorpay();
      if (!loaded) throw new Error("Payment system could not be loaded. Please refresh and try again.");

      // Create order
      const res = await fetch("/api/payments/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan: planId }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({})) as { error?: string };
        throw new Error(err.error ?? "Failed to create order");
      }

      const { orderId, amount, currency, keyId, planLabel } = await res.json() as {
        orderId: string;
        amount: number;
        currency: string;
        keyId: string;
        planLabel: string;
      };

      const rzp = new window.Razorpay({
        key: keyId,
        order_id: orderId,
        amount,
        currency,
        name: "Manage Actly",
        description: `${planLabel} — Social Media Management`,
        theme: { color: "#2a9d8f" },
        prefill: {
          name: customerName,
          email: customerEmail,
          contact: customerPhone,
        },
        // Show UPI first, then cards/netbanking
        config: {
          display: {
            blocks: {
              upi: {
                name: "Pay via UPI",
                instruments: [
                  { method: "upi", flows: ["qr", "intent", "collect"] },
                ],
              },
              other: {
                name: "Other Payment Methods",
                instruments: [
                  { method: "card" },
                  { method: "netbanking" },
                  { method: "wallet" },
                ],
              },
            },
            sequence: ["block.upi", "block.other"],
            preferences: { show_default_blocks: false },
          },
        },
        handler: async (response) => {
          // Verify server-side
          const verifyRes = await fetch("/api/payments/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              plan: planId,
              customerName,
              customerEmail,
              customerPhone,
            }),
          });

          if (verifyRes.ok) {
            setSuccessPlan(planLabel);
            setShowForm(false);
            window.scrollTo({ top: 0, behavior: "smooth" });
          } else {
            setError(`Payment received (ID: ${response.razorpay_payment_id}) but verification failed. Please email hello@manageactly.com with this ID.`);
          }
        },
        modal: { ondismiss: () => setLoading(null) },
      });

      rzp.open();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(null);
    }
  };

  const handlePlanClick = (planId: string) => {
    setSelectedPlan(planId);
    setShowForm(true);
    setError(null);
    setTimeout(() => document.getElementById("checkout-form")?.scrollIntoView({ behavior: "smooth" }), 100);
  };

  if (successPlan) {
    return (
      <div className="min-h-screen bg-paper flex items-center justify-center px-6">
        <div className="max-w-md text-center">
          <div className="w-20 h-20 bg-teal-accent/10 rounded-full flex items-center justify-center mx-auto mb-8">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#2a9d8f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
          </div>
          <h1 className="font-display text-3xl text-ink mb-4">Payment confirmed.</h1>
          <p className="text-charcoal-600 mb-3">
            Welcome to the <strong>{successPlan}</strong> plan.
          </p>
          <p className="text-charcoal-600 mb-8">
            We have sent a confirmation to <strong>{customerEmail}</strong>. Our team will contact you within 24 hours to schedule the onboarding call.
          </p>
          <Link href="/" className="btn-accent">Back to Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-paper">
      {/* Header */}
      <section className="pt-32 pb-16 border-b border-charcoal-100">
        <div className="container-grid">
          <div className="md:col-span-8 lg:col-span-7">
            <p className="label text-charcoal-400 mb-5">Pricing</p>
            <h1 className="font-display text-5xl md:text-6xl text-ink leading-tight mb-6">Simple, transparent pricing.</h1>
            <p className="text-xl text-charcoal-600 leading-relaxed max-w-2xl">
              Every engagement starts with a ₹2K–₹5K paid pilot. Once you see results, choose your monthly plan.
            </p>
          </div>
        </div>
      </section>

      {/* Pilot */}
      <div className="container-grid pt-12 pb-8">
        <div className="md:col-span-12">
          <div className="bg-ink rounded-2xl p-8 md:p-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div>
              <p className="label text-teal-accent mb-3">Start Here — No Risk</p>
              <p className="font-display text-4xl font-bold text-paper mb-2">₹2,000 – ₹5,000</p>
              <p className="text-navy-300 text-sm mb-4">7–10 Day Paid Pilot</p>
              <div className="flex flex-wrap gap-5 text-sm text-navy-200">
                {["Full profile audit", "3 to 5 live posts", "Visual brand setup", "Zero long-term commitment"].map(f => (
                  <div key={f} className="flex items-center gap-2">
                    <span className="text-teal-accent font-bold text-xs">✓</span>
                    {f}
                  </div>
                ))}
              </div>
            </div>
            <button
              onClick={() => handlePlanClick("PILOT")}
              className="btn-accent shrink-0 text-base py-4 px-8"
            >
              Book Pilot — ₹2,000
            </button>
          </div>
        </div>
      </div>

      {/* Plans */}
      <div className="container-grid pb-16">
        <div className="md:col-span-12">
          <p className="label text-charcoal-400 mb-10">Monthly Plans</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-charcoal-200 rounded-2xl overflow-hidden">
            {plans.map((plan, i) => (
              <div
                key={plan.id}
                className={`relative flex flex-col p-8 md:p-10 ${
                  plan.highlight ? "bg-ink" : "bg-paper"
                } ${i < plans.length - 1 ? "border-b md:border-b-0 md:border-r border-charcoal-200" : ""}`}
              >
                {plan.badge && (
                  <div className="absolute -top-3.5 left-8">
                    <span className="text-xs bg-teal-accent text-paper px-3 py-1 rounded-full font-semibold">
                      ★ {plan.badge}
                    </span>
                  </div>
                )}

                <p className={`label tracking-widest mb-4 ${plan.highlight ? "text-teal-accent" : "text-charcoal-400"}`}>
                  {plan.label}
                </p>

                <p className={`font-display text-3xl md:text-4xl font-bold mb-1 ${plan.highlight ? "text-paper" : "text-ink"}`}>
                  {plan.priceRange}
                </p>
                <p className={`text-sm mb-2 ${plan.highlight ? "text-navy-400" : "text-charcoal-500"}`}>
                  {plan.period}
                </p>

                <div className={`my-5 h-px ${plan.highlight ? "bg-navy-800" : "bg-charcoal-100"}`} />

                <p className={`text-xs font-bold tracking-widest mb-5 ${plan.highlight ? "text-navy-400" : "text-charcoal-400"}`}>
                  {plan.for}
                </p>

                <ul className="space-y-3 flex-1 mb-8">
                  {plan.features.map(f => (
                    <li key={f} className="flex items-start gap-3">
                      <span className="text-teal-accent font-bold text-sm shrink-0 mt-0.5">✓</span>
                      <span className={`text-sm leading-snug ${plan.highlight ? "text-navy-200" : "text-charcoal-700"}`}>{f}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => handlePlanClick(plan.id)}
                  className={`w-full py-3.5 rounded-full font-semibold text-sm transition-all duration-200 ${
                    plan.highlight
                      ? "bg-teal-accent text-paper hover:bg-teal-dark"
                      : "border border-charcoal-200 text-ink hover:bg-charcoal-50 hover:border-charcoal-400"
                  }`}
                >
                  Get Started — {plan.price}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Checkout form — appears when plan is selected */}
      {showForm && (
        <div id="checkout-form" className="container-grid pb-24">
          <div className="md:col-span-8 lg:col-span-6">
            <div className="bg-mist border border-charcoal-100 rounded-2xl p-8">
              <h2 className="font-display text-2xl text-ink mb-2">Your Details</h2>
              <p className="text-charcoal-600 text-sm mb-6">
                Enter your details before proceeding to payment.
                {selectedPlan && (
                  <span className="ml-1 font-semibold text-teal-accent">
                    Selected: {plans.find(p => p.id === selectedPlan)?.priceRange ?? selectedPlan}
                    {selectedPlan === "PILOT" && " Pilot"}
                  </span>
                )}
              </p>

              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-charcoal-600 mb-2">Full Name *</label>
                    <input
                      className="form-input w-full"
                      placeholder="Your name"
                      value={customerName}
                      onChange={e => setCustomerName(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-charcoal-600 mb-2">Email Address *</label>
                    <input
                      type="email"
                      className="form-input w-full"
                      placeholder="you@email.com"
                      value={customerEmail}
                      onChange={e => setCustomerEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-charcoal-600 mb-2">Phone / WhatsApp</label>
                  <input
                    className="form-input w-full"
                    placeholder="+91 98765 43210"
                    value={customerPhone}
                    onChange={e => setCustomerPhone(e.target.value)}
                  />
                </div>
              </div>

              {error && (
                <div className="mt-4 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              )}

              <div className="mt-6 flex gap-3">
                <button
                  onClick={() => selectedPlan && initiateCheckout(selectedPlan)}
                  disabled={!!loading}
                  className="btn-accent flex-1 py-4 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <span className="w-4 h-4 border-2 border-paper/30 border-t-paper rounded-full animate-spin" />
                      Opening payment...
                    </>
                  ) : (
                    <>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>
                      Pay with Razorpay
                    </>
                  )}
                </button>
                <button
                  onClick={() => { setShowForm(false); setSelectedPlan(null); setError(null); }}
                  className="btn-secondary px-5"
                >
                  Cancel
                </button>
              </div>

              <div className="mt-4 flex items-center gap-2 justify-center">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#7a8696" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>
                <p className="text-xs text-charcoal-400">Secured by Razorpay. 256-bit SSL encryption.</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
