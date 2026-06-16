import type { Metadata } from "next";
import { generateMetadata as genMeta } from "@/lib/metadata";
import Section from "@/components/layout/Section";
import LegalSidebar from "@/components/ui/LegalSidebar";
import { company } from "@/lib/tokens";

export const metadata: Metadata = genMeta({
  title: "Terms of Service",
  description: "Read the terms and conditions governing the digital operations, social media management, and web development services provided by Manage Actly.",
  path: "/terms",
});

const sections = [
  { id: "introduction", label: "1. Introduction" },
  { id: "services", label: "2. Services & Scope" },
  { id: "intellectual-property", label: "3. Intellectual Property" },
  { id: "billing-payments", label: "4. Billing & Payments" },
  { id: "client-responsibilities", label: "5. Client Responsibilities" },
  { id: "limitation-liability", label: "6. Liability & Indemnity" },
  { id: "term-termination", label: "7. Term & Termination" },
  { id: "governing-law", label: "8. Governing Law" },
];

export default function TermsPage() {
  return (
    <>
      {/* Header section */}
      <section className="relative pt-36 pb-20 border-b border-charcoal-100/50 bg-gradient-to-b from-mist via-paper to-paper overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />
        <div className="container-grid relative z-10 text-center max-w-3xl mx-auto">
          <p className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold bg-teal-accent/10 text-teal-accent mb-6 animate-pulse">
            Legal Agreement
          </p>
          <h1 className="font-display text-5xl md:text-6xl text-ink leading-tight font-bold mb-6 tracking-tight">
            Terms of Service
          </h1>
          <p className="text-sm md:text-base text-charcoal-600 leading-relaxed max-w-2xl mx-auto font-medium">
            Last Updated: June 16, 2026. Please read these terms carefully before engaging our services.
          </p>
        </div>
      </section>

      {/* Main legal content */}
      <Section className="bg-paper py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start max-w-6xl mx-auto">
          
          {/* Sticky Sidebar (3 Columns) */}
          <div className="lg:col-span-3 lg:sticky lg:top-28">
            <LegalSidebar sections={sections} />
          </div>

          {/* Core Content (9 Columns) */}
          <div className="lg:col-span-9 space-y-12 text-charcoal-700 font-medium leading-relaxed text-sm">
            
            {/* Section 1: Introduction */}
            <div id="introduction" className="scroll-mt-32 border-b border-charcoal-100/60 pb-10">
              <h2 className="font-display text-2xl md:text-3xl text-ink font-bold mb-6">
                1. Introduction
              </h2>
              <div className="space-y-4">
                <p>
                  Welcome to <strong>{company.name}</strong> (&ldquo;Company&rdquo;, &ldquo;we&rdquo;, &ldquo;our&rdquo;, &ldquo;us&rdquo;). These Terms of Service (&ldquo;Terms&rdquo;) govern your access to and use of our website located at <a href="https://manageactly.com" className="text-teal-accent hover:underline">https://manageactly.com</a> (the &ldquo;Site&rdquo;), as well as any digital operations, social media management, web development, content creation, brand reputation, and consulting services (collectively, the &ldquo;Services&rdquo;) provided by us.
                </p>
                <p>
                  By engaging us to perform Services, signing a Statement of Work (SOW), or browsing our Site, you agree to be bound by these Terms. If you do not agree to these Terms, you may not access or use our Site or Services.
                </p>
                <p>
                  If you are entering into this agreement on behalf of a company or other legal entity, you represent that you have the authority to bind such entity to these Terms, in which case the terms &ldquo;Client&rdquo;, &ldquo;you&rdquo;, or &ldquo;your&rdquo; shall refer to such entity.
                </p>
              </div>
            </div>

            {/* Section 2: Services & Scope */}
            <div id="services" className="scroll-mt-32 border-b border-charcoal-100/60 pb-10">
              <h2 className="font-display text-2xl md:text-3xl text-ink font-bold mb-6">
                2. Services & Scope of Work
              </h2>
              <div className="space-y-4">
                <p>
                  {company.name} is a management-first digital operations company. We specialize in day-to-day management of brand channels, content execution, digital infrastructure, and marketing operations. 
                </p>
                <p>
                  The specific details, deliverables, timelines, and budgets of your project will be defined in a separate Statement of Work (SOW) or Service Agreement executed by both parties. Any changes to the scope of work must be agreed upon in writing.
                </p>
                <div className="bg-mist border border-charcoal-100 rounded-2xl p-6 my-4">
                  <h4 className="font-display font-bold text-ink text-sm mb-3">Operational Channels Governed:</h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-charcoal-600">
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-teal-accent" />
                      Instagram grid, stories, and reels management
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-teal-accent" />
                      YouTube channel optimization and video shorts execution
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-teal-accent" />
                      LinkedIn B2B thought leadership profiles
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-teal-accent" />
                      Custom React & Next.js website design & development
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-teal-accent" />
                      Public Relations (PR) & Reputation outreach
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-teal-accent" />
                      Email & WhatsApp community broadcasting
                    </li>
                  </ul>
                </div>
                <p>
                  While we strive for maximum consistency and algorithm alignment to boost brand visibility, you acknowledge that third-party platform algorithms are proprietary and change frequently. {company.name} cannot guarantee specific follower metrics, engagement percentages, or direct sales conversions.
                </p>
              </div>
            </div>

            {/* Section 3: Intellectual Property */}
            <div id="intellectual-property" className="scroll-mt-32 border-b border-charcoal-100/60 pb-10">
              <h2 className="font-display text-2xl md:text-3xl text-ink font-bold mb-6">
                3. Intellectual Property Rights
              </h2>
              <div className="space-y-4">
                <p>
                  We respect creative ownership. The rights concerning content generated during the service period are set forth as follows:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-4">
                  <div className="bg-paper border border-charcoal-100 rounded-2xl p-6 hover:shadow-sm transition-all duration-300">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-teal-accent bg-teal-accent/10 px-2.5 py-1 rounded-full mb-3 inline-block">
                      Client Ownership
                    </span>
                    <h4 className="font-display font-bold text-ink text-sm mb-2">Final Deliverables</h4>
                    <p className="text-xs text-charcoal-600 leading-relaxed">
                      Upon complete payment of all outstanding invoices, you own all rights, titles, and interests in the finalized visual designs, copy, website source code, and video packages produced specifically for your brand.
                    </p>
                  </div>
                  <div className="bg-paper border border-charcoal-100 rounded-2xl p-6 hover:shadow-sm transition-all duration-300">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-charcoal-450 bg-mist px-2.5 py-1 rounded-full mb-3 inline-block">
                      Agency Retained Rights
                    </span>
                    <h4 className="font-display font-bold text-ink text-sm mb-2">Internal Assets & Tools</h4>
                    <p className="text-xs text-charcoal-600 leading-relaxed">
                      We retain ownership of our pre-existing proprietary tools, operational methodologies, internal templates, working files (e.g. raw footage, project project-files, unrendered designs), and general strategies.
                    </p>
                  </div>
                </div>
                <p>
                  <strong>Portfolio Usage:</strong> Unless otherwise requested in writing, you grant us a royalty-free, non-exclusive, worldwide license to display completed graphics, videos, website screenshots, and campaign statistics in our portfolio, case studies, and social channels for promotional purposes.
                </p>
              </div>
            </div>

            {/* Section 4: Billing & Payments */}
            <div id="billing-payments" className="scroll-mt-32 border-b border-charcoal-100/60 pb-10">
              <h2 className="font-display text-2xl md:text-3xl text-ink font-bold mb-6">
                4. Billing & Payments
              </h2>
              <div className="space-y-4">
                <p>
                  You agree to compensate us in accordance with the pricing structure and schedules set out in your SOW.
                </p>
                <ul className="space-y-3 list-decimal pl-5">
                  <li>
                    <strong>Retainer Fees:</strong> Regular digital management services are billed on a recurring monthly retainer. Retainer invoices are sent 5 days prior to the start of the billing period and are due upon receipt.
                  </li>
                  <li>
                    <strong>Project Milestones:</strong> One-off project milestones (e.g., website development) are billed on a structured split plan (typically 50% upfront deposit, 50% upon final sign-off prior to site launch).
                  </li>
                  <li>
                    <strong>Late Fees & Suspension:</strong> Invoices outstanding for more than 7 days from their due date will accrue a late fee of 1.5% per month, and may result in the temporary suspension of all operational Services until accounts are brought to date.
                  </li>
                  <li>
                    <strong>Third-Party Expenses:</strong> Any direct expenses incurred for campaign assets (such as ad spends, stock asset purchases, high-end typeface licenses, domain hosting) are billed directly to the Client or reimbursed to us at cost.
                  </li>
                </ul>
              </div>
            </div>

            {/* Section 5: Client Responsibilities */}
            <div id="client-responsibilities" className="scroll-mt-32 border-b border-charcoal-100/60 pb-10">
              <h2 className="font-display text-2xl md:text-3xl text-ink font-bold mb-6">
                5. Client Responsibilities
              </h2>
              <div className="space-y-4">
                <p>
                  To deliver peak operational performance, our team requires active support and timely inputs from your side. You agree to:
                </p>
                <div className="space-y-3">
                  <div className="flex gap-4 items-start bg-mist rounded-xl p-4 border border-charcoal-100">
                    <span className="shrink-0 w-6 h-6 rounded-full bg-teal-accent/15 text-teal-accent flex items-center justify-center font-bold text-xs">
                      A
                    </span>
                    <div>
                      <h4 className="text-xs font-bold text-ink mb-1">Timely Credentials & Assets</h4>
                      <p className="text-xs text-charcoal-600">Provide secure access to necessary social channels, dashboard permissions, brand assets, images, and fonts within 3 working days of onboarding.</p>
                    </div>
                  </div>
                  <div className="flex gap-4 items-start bg-mist rounded-xl p-4 border border-charcoal-100">
                    <span className="shrink-0 w-6 h-6 rounded-full bg-teal-accent/15 text-teal-accent flex items-center justify-center font-bold text-xs">
                      B
                    </span>
                    <div>
                      <h4 className="text-xs font-bold text-ink mb-1">Feedback & Approvals</h4>
                      <p className="text-xs text-charcoal-600">Establish a designated stakeholder to review content schedules and designs. Deliver feedback within 48 hours to ensure consistency in publishing schedules.</p>
                    </div>
                  </div>
                  <div className="flex gap-4 items-start bg-mist rounded-xl p-4 border border-charcoal-100">
                    <span className="shrink-0 w-6 h-6 rounded-full bg-teal-accent/15 text-teal-accent flex items-center justify-center font-bold text-xs">
                      C
                    </span>
                    <div>
                      <h4 className="text-xs font-bold text-ink mb-1">Compliance & Legality</h4>
                      <p className="text-xs text-charcoal-600">Verify that all products, internal materials, claims, or business licenses provided to us for content creation are accurate and fully compliant with local advertising laws.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 6: Liability & Indemnity */}
            <div id="limitation-liability" className="scroll-mt-32 border-b border-charcoal-100/60 pb-10">
              <h2 className="font-display text-2xl md:text-3xl text-ink font-bold mb-6">
                6. Limitation of Liability & Indemnity
              </h2>
              <div className="space-y-4">
                <p>
                  <strong>Indemnity:</strong> You agree to indemnify, defend, and hold harmless {company.name}, its directors, officers, employees, and agents from and against any claims, liabilities, losses, costs, or damages arising out of the content provided by you, copyright infringement of client-provided assets, or breach of advertising laws.
                </p>
                <p>
                  <strong>Limitation of Liability:</strong> In no event shall {company.name} be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, revenue, data, or reputation, whether in contract or tort, arising from your use of the Services or Site. Our cumulative liability for all claims related to any Service SOW shall not exceed the total amount paid by you to us during the three (3) months immediately preceding the event giving rise to liability.
                </p>
              </div>
            </div>

            {/* Section 7: Term & Termination */}
            <div id="term-termination" className="scroll-mt-32 border-b border-charcoal-100/60 pb-10">
              <h2 className="font-display text-2xl md:text-3xl text-ink font-bold mb-6">
                7. Term & Termination
              </h2>
              <div className="space-y-4">
                <p>
                  Our services run on recurring terms defined in the specific service SOW.
                </p>
                <p>
                  <strong>Termination for Convenience:</strong> Either party may terminate monthly retainer agreements by giving the other party at least **30 days advance written notice** (email is acceptable). Services and billing will continue during this 30-day notice period.
                </p>
                <p>
                  <strong>Termination for Cause:</strong> Either party may terminate services immediately if the other party breaches a material clause of these Terms or the SOW and fails to cure such breach within 14 days of receiving written notice of the breach.
                </p>
                <p>
                  <strong>Post-Termination:</strong> Upon termination, you agree to pay for all services rendered up to the date of termination. We will deliver all final paid creative assets and remove our team credentials from your systems.
                </p>
              </div>
            </div>

            {/* Section 8: Governing Law */}
            <div id="governing-law" className="scroll-mt-32 pb-10">
              <h2 className="font-display text-2xl md:text-3xl text-ink font-bold mb-6">
                8. Governing Law & Dispute Resolution
              </h2>
              <div className="space-y-4">
                <p>
                  These Terms and any dispute or claim arising out of or in connection with them or their subject matter shall be governed by and construed in accordance with the laws of the **State of New York**, without regard to its conflict of law principles.
                </p>
                <p>
                  Any dispute, controversy, or claim arising out of or relating to this agreement, including its formation or breach, shall first be addressed through good-faith direct negotiations. If a resolution is not reached within 30 days, the dispute shall be resolved in the state or federal courts located in **{company.location}**.
                </p>
              </div>
            </div>

            {/* Contact Footer Callout */}
            <div className="bg-gradient-to-br from-ink to-[#13224f] border border-navy-800 rounded-3xl p-8 relative overflow-hidden text-paper">
              <div className="absolute top-0 right-0 w-24 h-24 bg-teal-accent/10 rounded-full blur-xl pointer-events-none" />
              <h4 className="font-display text-xl text-paper mb-3">Questions about our Terms?</h4>
              <p className="text-xs text-navy-200 leading-relaxed mb-6">
                If you have any questions, concerns, or requests regarding these Terms of Service, please reach out directly to our operations team.
              </p>
              <a 
                href={`mailto:${company.email}`}
                className="btn-accent text-xs px-6 py-3 font-bold uppercase tracking-wider inline-flex items-center gap-2"
              >
                Contact Legal Operations
                <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 8h10M9 4l4 4-4 4"/>
                </svg>
              </a>
            </div>

          </div>
        </div>
      </Section>
    </>
  );
}
