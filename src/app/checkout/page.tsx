"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import QRCode from "react-qr-code";

interface CheckoutState {
  plan: string;
  amount: string;
  step: "plan" | "qr" | "verify" | "loading";
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  utrNumber: string;
  error?: string;
}

function CheckoutContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [state, setState] = useState<CheckoutState>({
    plan: searchParams.get("plan") || "",
    amount: searchParams.get("amount") || "",
    step: "qr",
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    utrNumber: "",
  });

  const upiId = process.env.NEXT_PUBLIC_UPI_ID;

  if (!upiId) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-white">
        <div className="max-w-md w-full text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Configuration Error</h1>
          <p className="text-gray-600">
            UPI ID is not configured. Please contact support.
          </p>
        </div>
      </div>
    );
  }

  // Generate QR Code Value with UPI Intent Link
  const generateQRValue = () => {
    const amount = state.amount.replace(/,/g, ""); // Remove commas from amount
    const upiIntent = `upi://pay?pa=${upiId}&pn=${encodeURIComponent("ManageActly")}&am=${amount}&cu=INR&tn=${encodeURIComponent(state.plan)}`;
    return upiIntent;
  };

  // Handle "I have made the payment" submission
  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!state.customerName.trim()) {
      setState((prev) => ({ ...prev, error: "Name is required" }));
      return;
    }
    if (!state.customerEmail.trim()) {
      setState((prev) => ({ ...prev, error: "Email is required" }));
      return;
    }
    if (!state.utrNumber.trim()) {
      setState((prev) => ({ ...prev, error: "UTR/Transaction ID is required" }));
      return;
    }

    setState((prev) => ({ ...prev, step: "loading" }));

    try {
      const res = await fetch("/api/payments/manual-verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          plan: state.plan,
          amount: state.amount,
          utrNumber: state.utrNumber,
          customerName: state.customerName,
          customerEmail: state.customerEmail,
          customerPhone: state.customerPhone,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Payment verification failed");
      }

      // Redirect to success page
      router.push(`/success?email=${encodeURIComponent(state.customerEmail)}`);
    } catch (err) {
      console.error("[Checkout] Error:", err);
      setState((prev) => ({
        ...prev,
        step: "verify",
        error: err instanceof Error ? err.message : "An error occurred",
      }));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8">
        {/* Header */}
        <h1 className="text-3xl font-bold text-center mb-2 text-slate-900">
          Complete Payment
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Scan the QR code or use your UPI app to pay
        </p>

        {/* Plan Info */}
        <div className="bg-slate-50 rounded-lg p-4 mb-6 border border-slate-200">
          <p className="text-sm text-gray-600 mb-1">Plan</p>
          <h2 className="text-xl font-bold text-slate-900">{state.plan}</h2>
          <p className="text-2xl font-bold text-emerald-600 mt-2">₹{state.amount}</p>
        </div>

        {/* QR Code Section */}
        <div className="mb-6 flex flex-col items-center">
          <div className="bg-white p-4 border-2 border-slate-200 rounded-lg mb-4">
            <QRCode
              value={generateQRValue()}
              size={200}
              level="H"
              fgColor="#000000"
              bgColor="#ffffff"
            />
          </div>
          <p className="text-xs text-gray-600 text-center mb-4">
            Scan this QR code with any UPI app
          </p>

          {/* UPI ID Display */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 w-full">
            <p className="text-xs text-gray-600 mb-1 font-semibold">Or enter UPI ID:</p>
            <p className="text-lg font-mono font-bold text-slate-900 break-all">
              {upiId}
            </p>
          </div>
        </div>

        {/* Verification Form */}
        {(state.step === "verify" || state.step === "loading") && (
          <form onSubmit={handlePaymentSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                placeholder="Your name"
                value={state.customerName}
                onChange={(e) =>
                  setState((prev) => ({
                    ...prev,
                    customerName: e.target.value,
                    error: undefined,
                  }))
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                disabled={state.step === "loading"}
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                placeholder="your@email.com"
                value={state.customerEmail}
                onChange={(e) =>
                  setState((prev) => ({
                    ...prev,
                    customerEmail: e.target.value,
                    error: undefined,
                  }))
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                disabled={state.step === "loading"}
              />
            </div>

            {/* Phone (Optional) */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Phone (Optional)
              </label>
              <input
                type="tel"
                placeholder="+91 XXXXX XXXXX"
                value={state.customerPhone}
                onChange={(e) =>
                  setState((prev) => ({
                    ...prev,
                    customerPhone: e.target.value,
                  }))
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                disabled={state.step === "loading"}
              />
            </div>

            {/* UTR/Transaction ID */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                UTR / Transaction ID
              </label>
              <input
                type="text"
                placeholder="Enter the UTR from your UPI app"
                value={state.utrNumber}
                onChange={(e) =>
                  setState((prev) => ({
                    ...prev,
                    utrNumber: e.target.value,
                    error: undefined,
                  }))
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                disabled={state.step === "loading"}
              />
              <p className="text-xs text-gray-500 mt-1">
                This is a 12-digit code displayed in your UPI app after payment
              </p>
            </div>

            {/* Error Message */}
            {state.error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {state.error}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={state.step === "loading"}
              className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-400 text-white font-bold py-3 px-4 rounded-lg transition"
            >
              {state.step === "loading" ? "Processing..." : "Submit Payment"}
            </button>
          </form>
        )}

        {/* Info Box */}
        <div className="mt-6 bg-amber-50 border border-amber-200 rounded-lg p-3">
          <p className="text-xs text-gray-700 leading-relaxed">
            <strong>⏱️ Verification:</strong> Your payment will be verified within 2-4 hours.
            We'll send you an email confirmation.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-emerald-600"></div>
      </div>
    }>
      <CheckoutContent />
    </Suspense>
  );
}
