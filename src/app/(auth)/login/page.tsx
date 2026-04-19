// src/app/(auth)/login/page.tsx
// Login page with Google OAuth via NextAuth v4.
// Uses a client component for the sign-in button (v4 pattern).

import type { Metadata } from "next";
import LoginClient from "./LoginClient";

export const metadata: Metadata = {
  title: "Sign in | Manage Actly",
  description: "Sign in to your Manage Actly account.",
};

export default function LoginPage({
  searchParams,
}: {
  searchParams: { callbackUrl?: string; error?: string };
}) {
  const errorMessages: Record<string, string> = {
    OAuthAccountNotLinked: "This email is already registered with a different provider.",
    OAuthCallback: "Sign-in failed. Please try again.",
    Default: "An error occurred. Please try again.",
  };

  const error = searchParams.error
    ? (errorMessages[searchParams.error] ?? errorMessages.Default)
    : null;

  const callbackUrl = searchParams.callbackUrl ?? "/dashboard";

  return (
    <div className="min-h-screen bg-navy-950 flex items-center justify-center p-6">
      <div className="w-full max-w-sm">
        <div className="text-center mb-10">
          <div className="w-12 h-12 bg-teal-accent rounded-xl flex items-center justify-center mx-auto mb-4">
            <span className="font-display font-bold text-paper text-lg">M</span>
          </div>
          <h1 className="font-display text-2xl text-paper">Manage Actly</h1>
          <p className="text-navy-400 text-sm mt-2">AI-Assisted Social Presence Automation</p>
        </div>

        <div className="bg-navy-900 border border-navy-800 rounded-2xl p-8">
          <h2 className="font-display text-xl text-paper mb-2">Sign in</h2>
          <p className="text-navy-400 text-sm mb-8">
            Continue with your Google account. No password required.
          </p>

          {error && (
            <div className="mb-6 bg-red-900/30 border border-red-800 rounded-xl px-4 py-3">
              <p className="text-sm text-red-400">{error}</p>
            </div>
          )}

          <LoginClient callbackUrl={callbackUrl} />

          <p className="text-center text-xs text-navy-500 mt-6">
            By signing in, you agree to our{" "}
            <a href="/terms" className="text-navy-400 hover:text-navy-200 underline">Terms</a>{" "}
            and{" "}
            <a href="/privacy" className="text-navy-400 hover:text-navy-200 underline">Privacy Policy</a>.
          </p>
        </div>

        <p className="text-center text-xs text-navy-600 mt-6">
          &copy; {new Date().getFullYear()} Manage Actly
        </p>
      </div>
    </div>
  );
}
