import Link from "next/link";
import { company } from "@/lib/tokens";

export default function NotFound() {
  return (
    <section className="min-h-screen flex items-center section-dark">
      <div className="container-grid py-32">
        <div className="md:col-span-7">
          <p className="font-mono text-xs text-navy-400 mb-8">404</p>
          <h1 className="font-display text-4xl md:text-5xl text-paper mb-6 leading-tight">
            This page doesn't exist.
          </h1>
          <p className="text-navy-300 text-lg leading-relaxed mb-10 max-w-md">
            It may have been moved, or the URL may be incorrect.
            Return home and navigate from there.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/" className="btn-accent">
              Back to homepage
            </Link>
            <Link href="/contact" className="btn-ghost text-navy-300 hover:text-paper border border-navy-700 rounded-full px-7 py-3.5">
              Contact us
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
