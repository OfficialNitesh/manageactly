"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gradient-to-br from-emerald-50 to-teal-50">
      <div className="max-w-md w-full text-center">
        {/* Success Icon */}
        <div className="mb-6 flex justify-center">
          <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center">
            <svg
              className="w-10 h-10 text-emerald-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-3xl font-bold text-slate-900 mb-3">
          Payment Submitted!
        </h1>

        {/* Message */}
        <div className="bg-white rounded-lg p-6 mb-6 border border-emerald-200">
          <p className="text-gray-700 leading-relaxed mb-4">
            Thank you for your payment submission. We have received your UPI transfer details.
          </p>
          <p className="text-gray-700 leading-relaxed">
            <strong>Verification Status:</strong> PENDING
          </p>
          <p className="text-sm text-gray-600 mt-3">
            Our team will verify the payment within <strong>2-4 hours</strong>.
          </p>
        </div>

        {/* Confirmation Email */}
        {email && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-700">
              Confirmation email sent to:
            </p>
            <p className="text-base font-semibold text-slate-900 break-all">
              {email}
            </p>
          </div>
        )}

        {/* Next Steps */}
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6 text-left">
          <h3 className="font-semibold text-slate-900 mb-3">What happens next:</h3>
          <ol className="space-y-2 text-sm text-gray-700">
            <li className="flex">
              <span className="font-bold text-amber-600 mr-3">1.</span>
              <span>We verify your UPI payment against the UTR</span>
            </li>
            <li className="flex">
              <span className="font-bold text-amber-600 mr-3">2.</span>
              <span>Your account is activated</span>
            </li>
            <li className="flex">
              <span className="font-bold text-amber-600 mr-3">3.</span>
              <span>You receive onboarding instructions via email</span>
            </li>
          </ol>
        </div>

        {/* Support Info */}
        <div className="text-center mb-6">
          <p className="text-sm text-gray-600">
            Questions? Contact us at{" "}
            <a href="mailto:hello@manageactly.in" className="text-emerald-600 font-semibold hover:underline">
              hello@manageactly.in
            </a>
          </p>
        </div>

        {/* Action Button */}
        <Link
          href="/"
          className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-8 rounded-lg transition"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
