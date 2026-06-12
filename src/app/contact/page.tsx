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
  { label: "Email", value: "realofficialcreator@gmail.com", href: "mailto:realofficialcreator@gmail.com" },
  { label: "WhatsApp", value: "+91 817811 4219", href: "https://wa.me/918178114219" },
  { label: "Careers", value: "realofficialcreator@gmail.com", href: "mailto:realofficialcreator@gmail.com" },
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
      {/* Hero Header */}
      <section className="relative pt-36 pb-20 border-b border-charcoal-100/50 bg-gradient-to-b from-mist via-paper to-paper overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />
        <div className="container-grid relative z-10 text-center max-w-3xl mx-auto">
          <p className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold bg-teal-accent/10 text-teal-accent mb-6 animate-pulse">
            Get In Touch
          </p>
          <h1 className="font-display text-5xl md:text-6xl text-ink leading-tight font-bold mb-6 tracking-tight">
            Start the conversation.
          </h1>
          <p className="text-lg text-charcoal-600 leading-relaxed max-w-2xl mx-auto font-medium">
            Whether you want to book a pilot, ask about a package or just understand what we can do for your brand, reach out.
          </p>
        </div>
      </section>

      {/* Main Grid Content */}
      <Section className="bg-paper">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-6xl mx-auto items-start">
          {/* Left: Contact Form Client */}
          <div className="lg:col-span-7">
            <ContactFormClient />
          </div>

          {/* Right: Contact Information Sidebar */}
          <div className="lg:col-span-4 lg:col-start-9 space-y-12">
            {/* Contact Details Card Stack */}
            <div>
              <p className="label text-teal-accent mb-6">Contact Details</p>
              <div className="space-y-4">
                {contactInfo.map((c) => (
                  <div
                    key={c.label}
                    className="bg-paper border border-charcoal-100 rounded-2xl p-4 hover:border-teal-accent/30 hover:shadow-md transition-all duration-300 flex flex-col"
                  >
                    <span className="text-[10px] text-charcoal-400 font-bold uppercase tracking-wider mb-1">
                      {c.label}
                    </span>
                    <a
                      href={c.href}
                      className="text-sm font-semibold text-ink hover:text-teal-accent transition-colors duration-200 break-all"
                    >
                      {c.value}
                    </a>
                  </div>
                ))}
              </div>
            </div>

            {/* Vertically Connected Process Stepper */}
            <div>
              <p className="label text-teal-accent mb-6">What Happens Next</p>
              <div className="relative pl-8 space-y-6">
                {/* Stepper Guide Connector Line */}
                <div className="absolute top-2 bottom-2 left-3.5 w-[2px] bg-gradient-to-b from-teal-accent via-teal-accent/50 to-teal-accent/10" />

                {process.map((p) => (
                  <div key={p.step} className="relative group">
                    {/* Numeric bubble */}
                    <div className="absolute -left-8 top-0.5 w-7 h-7 rounded-full bg-paper border-2 border-teal-accent text-teal-accent font-mono text-xs font-bold flex items-center justify-center shadow-sm z-10 group-hover:bg-teal-accent group-hover:text-paper transition-all duration-300">
                      {p.step}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-ink mb-1 group-hover:text-teal-accent transition-colors">
                        {p.title}
                      </h4>
                      <p className="text-[11px] text-charcoal-600 leading-relaxed font-medium">
                        {p.body}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Pilot CTA Details */}
            <div className="bg-gradient-to-b from-ink via-[#13224f] to-ink rounded-3xl p-6 shadow-xl border border-navy-800 relative overflow-hidden text-paper">
              <div className="absolute top-0 right-0 w-24 h-24 bg-teal-accent/5 rounded-full blur-xl pointer-events-none" />
              <p className="text-[10px] text-teal-accent font-bold uppercase tracking-wider mb-3">
                Starting Out?
              </p>
              <p className="text-navy-200 text-xs leading-relaxed mb-5 font-semibold">
                Not ready for a full monthly plan? Our ₹2K to ₹5K paid pilot is the perfect way to see what we can do for your brand with zero risk.
              </p>
              <p className="text-navy-450 text-[10px] font-bold uppercase tracking-wider border-t border-navy-800/80 pt-3">
                7 to 10 days · Real results · No lock-in
              </p>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
