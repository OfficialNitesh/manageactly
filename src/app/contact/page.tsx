import type { Metadata } from "next";
import { generateMetadata as genMeta } from "@/lib/metadata";
import Section from "@/components/layout/Section";
import ContactFormClient from "./ContactFormClient";

export const metadata: Metadata = genMeta({
  title: "Contact Us",
  description: "Get in touch with Manage Actly. Book a pilot, ask about packages or just say hello.",
  path: "/contact",
});

const contactInfo = [
  { label: "Email", value: "hello@manageactly.com", href: "mailto:hello@manageactly.com" },
  { label: "WhatsApp", value: "+91 00000 00000", href: "https://wa.me/910000000000" },
  { label: "Careers", value: "careers@manageactly.com", href: "mailto:careers@manageactly.com" },
];

const process = [
  { step: "01", title: "Send your details", body: "Tell us about your brand, your current situation and what you want to achieve." },
  { step: "02", title: "We review and respond", body: "Within 24 hours we will reply with whether we are a good fit and next steps." },
  { step: "03", title: "Discovery call", body: "A 30-minute call to understand your brand deeply before we propose anything." },
  { step: "04", title: "Pilot begins", body: "We kick off the 7 to 10 day paid pilot. You see results. Then you decide." },
];

export default function ContactPage() {
  return (
    <>
      <section className="pt-32 pb-16 bg-paper border-b border-charcoal-100">
        <div className="container-grid">
          <div className="md:col-span-8 lg:col-span-7">
            <p className="label text-charcoal-400 mb-5">Get In Touch</p>
            <h1 className="font-display text-5xl md:text-6xl text-ink leading-tight mb-6">Start the conversation.</h1>
            <p className="text-xl text-charcoal-600 leading-relaxed max-w-2xl">
              Whether you want to book a pilot, ask about a package or just understand what we can do for your brand — reach out.
            </p>
          </div>
        </div>
      </section>

      <Section>
        <div className="grid-12 gap-y-12">
          {/* Form */}
          <div className="md:col-span-7">
            <ContactFormClient />
          </div>

          {/* Info */}
          <div className="md:col-span-4 md:col-start-9 space-y-10">
            {/* Contact details */}
            <div>
              <p className="label text-charcoal-400 mb-5">Contact Details</p>
              <div className="space-y-4">
                {contactInfo.map(c => (
                  <div key={c.label}>
                    <p className="text-xs text-charcoal-400 mb-1">{c.label}</p>
                    <a href={c.href} className="text-sm font-semibold text-ink hover:text-teal-accent transition-colors duration-200">
                      {c.value}
                    </a>
                  </div>
                ))}
              </div>
            </div>

            {/* Process */}
            <div>
              <p className="label text-charcoal-400 mb-5">What Happens Next</p>
              <div className="space-y-5">
                {process.map(p => (
                  <div key={p.step} className="flex gap-4">
                    <div className="shrink-0 w-7 h-7 rounded-full border border-charcoal-200 flex items-center justify-center">
                      <span className="font-mono text-xs text-charcoal-400">{p.step}</span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-ink mb-0.5">{p.title}</p>
                      <p className="text-xs text-charcoal-500 leading-relaxed">{p.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Pilot note */}
            <div className="bg-ink rounded-2xl p-6">
              <p className="label text-teal-accent mb-3">Starting out?</p>
              <p className="text-navy-200 text-sm leading-relaxed mb-4">
                Not ready for a full monthly plan? Our ₹2K–₹5K paid pilot is the perfect way to see what we can do for your brand with zero risk.
              </p>
              <p className="text-navy-400 text-xs">7–10 days. Real results. No lock-in.</p>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
