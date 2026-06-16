import type { Metadata } from "next";
import { generateMetadata as genMeta } from "@/lib/metadata";
import Section from "@/components/layout/Section";
import LegalSidebar from "@/components/ui/LegalSidebar";
import { company } from "@/lib/tokens";

export const metadata: Metadata = genMeta({
  title: "Privacy Policy",
  description: "Read the Privacy Policy of Manage Actly to understand how we collect, protect, use, and process client credentials, personal information, and analytics data.",
  path: "/privacy",
});

const sections = [
  { id: "introduction", label: "1. Introduction" },
  { id: "information-collect", label: "2. Information We Collect" },
  { id: "how-we-use", label: "3. How We Use Information" },
  { id: "data-protection", label: "4. Data Protection & Security" },
  { id: "third-party", label: "5. Third-Party Disclosures" },
  { id: "client-rights", label: "6. Your Rights & Choices" },
  { id: "policy-updates", label: "7. Policy Updates" },
];

export default function PrivacyPage() {
  return (
    <>
      {/* Header section */}
      <section className="relative pt-36 pb-20 border-b border-charcoal-100/50 bg-gradient-to-b from-mist via-paper to-paper overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />
        <div className="container-grid relative z-10 text-center max-w-3xl mx-auto">
          <p className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold bg-teal-accent/10 text-teal-accent mb-6 animate-pulse">
            Data Protection
          </p>
          <h1 className="font-display text-5xl md:text-6xl text-ink leading-tight font-bold mb-6 tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-sm md:text-base text-charcoal-600 leading-relaxed max-w-2xl mx-auto font-medium">
            Last Updated: June 16, 2026. Your privacy and credential security are our highest operational priorities.
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
                  At <strong>{company.name}</strong> (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;), we take your privacy seriously. This Privacy Policy describes how we collect, use, process, disclose, and safeguard your information when you visit our website <a href="https://manageactly.com" className="text-teal-accent hover:underline">https://manageactly.com</a> (the &ldquo;Site&rdquo;) or engage our team to perform digital operations, design, website development, or social media management services (the &ldquo;Services&rdquo;).
                </p>
                <p>
                  Please read this policy carefully. By using our Site or engaging our Services, you consent to the collection, storage, and processing of your data as outlined in this Privacy Policy. If you do not agree with any terms of this policy, please do not provide us with your information.
                </p>
              </div>
            </div>

            {/* Section 2: Information We Collect */}
            <div id="information-collect" className="scroll-mt-32 border-b border-charcoal-100/60 pb-10">
              <h2 className="font-display text-2xl md:text-3xl text-ink font-bold mb-6">
                2. Information We Collect
              </h2>
              <div className="space-y-4">
                <p>
                  We collect information that is necessary to deliver, manage, and optimize our digital operations services. This falls into three categories:
                </p>
                
                <div className="space-y-4 my-6">
                  <div className="border border-charcoal-100 rounded-2xl p-5 bg-mist">
                    <h4 className="font-display font-bold text-ink text-sm mb-2">A. Information You Provide Directly</h4>
                    <p className="text-xs text-charcoal-600 mb-2">
                      When you inquire about services, fill out contact forms, or contract with us, we collect:
                    </p>
                    <ul className="list-disc pl-5 text-xs text-charcoal-600 space-y-1">
                      <li>Contact details (name, email address, phone number, physical address).</li>
                      <li>Business profile information (industry, target audience, brand assets, color schemes).</li>
                      <li>Payment and billing information (invoicing details, bank details, or tax registration numbers).</li>
                    </ul>
                  </div>

                  <div className="border border-charcoal-100 rounded-2xl p-5 bg-mist">
                    <h4 className="font-display font-bold text-ink text-sm mb-2">B. Account Access & Credentials</h4>
                    <p className="text-xs text-charcoal-600 mb-2">
                      To take operational ownership of your digital channels, you may securely share:
                    </p>
                    <ul className="list-disc pl-5 text-xs text-charcoal-600 space-y-1">
                      <li>Logins, page role permissions, or OAuth API tokens for social networks (Meta/Instagram, YouTube, LinkedIn, X/Twitter).</li>
                      <li>Hosting console logins, registrar credentials, or CMS access codes (Next.js hosting, WordPress, Shopify, Webflow) for website build contracts.</li>
                    </ul>
                  </div>

                  <div className="border border-charcoal-100 rounded-2xl p-5 bg-mist">
                    <h4 className="font-display font-bold text-ink text-sm mb-2">C. Technical & Usage Data</h4>
                    <p className="text-xs text-charcoal-600 mb-2">
                      When browsing our Site, we automatically collect basic analytics data:
                    </p>
                    <ul className="list-disc pl-5 text-xs text-charcoal-600 space-y-1">
                      <li>IP address, browser type, device information, operating system.</li>
                      <li>Referral URLs and engagement stats (pages visited, buttons clicked, form submission attempts).</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 3: How We Use Information */}
            <div id="how-we-use" className="scroll-mt-32 border-b border-charcoal-100/60 pb-10">
              <h2 className="font-display text-2xl md:text-3xl text-ink font-bold mb-6">
                3. How We Use Information
              </h2>
              <div className="space-y-4">
                <p>
                  We use the information we collect to operate, review, and enhance our Services. Specific use cases include:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-4">
                  <div className="bg-paper border border-charcoal-100 rounded-xl p-5">
                    <div className="w-8 h-8 rounded-lg bg-teal-accent/10 text-teal-accent flex items-center justify-center font-bold text-xs mb-3">
                      01
                    </div>
                    <h4 className="font-display font-bold text-ink text-xs mb-1.5">Service Execution</h4>
                    <p className="text-xs text-charcoal-600">Publishing scheduled graphics, scripts, and video shorts on your brand profiles, and building out codebases.</p>
                  </div>
                  <div className="bg-paper border border-charcoal-100 rounded-xl p-5">
                    <div className="w-8 h-8 rounded-lg bg-teal-accent/10 text-teal-accent flex items-center justify-center font-bold text-xs mb-3">
                      02
                    </div>
                    <h4 className="font-display font-bold text-ink text-xs mb-1.5">Reporting & Optimization</h4>
                    <p className="text-xs text-charcoal-600">Aggregating platform metrics (views, impressions, click rates) to present quarterly performance audits.</p>
                  </div>
                  <div className="bg-paper border border-charcoal-100 rounded-xl p-5">
                    <div className="w-8 h-8 rounded-lg bg-teal-accent/10 text-teal-accent flex items-center justify-center font-bold text-xs mb-3">
                      03
                    </div>
                    <h4 className="font-display font-bold text-ink text-xs mb-1.5">Client Communication</h4>
                    <p className="text-xs text-charcoal-600">Sending invoices, SOW updates, weekly copy reviews, and alerts regarding platform announcements.</p>
                  </div>
                  <div className="bg-paper border border-charcoal-100 rounded-xl p-5">
                    <div className="w-8 h-8 rounded-lg bg-teal-accent/10 text-teal-accent flex items-center justify-center font-bold text-xs mb-3">
                      04
                    </div>
                    <h4 className="font-display font-bold text-ink text-xs mb-1.5">Security Audits</h4>
                    <p className="text-xs text-charcoal-600">Detecting unauthorized login attempts and monitoring API health connections on client social dashboards.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 4: Data Protection & Security */}
            <div id="data-protection" className="scroll-mt-32 border-b border-charcoal-100/60 pb-10">
              <h2 className="font-display text-2xl md:text-3xl text-ink font-bold mb-6">
                4. Data Protection & Security Standards
              </h2>
              <div className="space-y-4">
                <p>
                  As an agency managing critical brand infrastructure, we hold ourselves to rigorous security standards to protect your passwords and data assets:
                </p>
                <div className="bg-gradient-to-br from-ink to-[#13224f] text-paper border border-navy-800 rounded-2xl p-6 my-4 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-teal-accent/5 rounded-full blur-xl pointer-events-none" />
                  <h4 className="font-display font-bold text-teal-accent text-sm mb-3">Credential Safety Protocols:</h4>
                  <ul className="space-y-2.5 text-xs text-navy-200">
                    <li className="flex items-start gap-2.5">
                      <span className="shrink-0 w-4 h-4 rounded-full bg-teal-accent/20 text-teal-accent flex items-center justify-center text-[10px] mt-0.5 font-bold">✓</span>
                      <span><strong>Encrypted Vaults:</strong> All shared passwords and keys must be transmitted via secure tools (e.g. 1Password, Bitwarden) and are never stored in plain text files.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="shrink-0 w-4 h-4 rounded-full bg-teal-accent/20 text-teal-accent flex items-center justify-center text-[10px] mt-0.5 font-bold">✓</span>
                      <span><strong>Multi-Factor Authentication (MFA):</strong> Our internal team devices are mandated to require MFA for all dashboard access.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="shrink-0 w-4 h-4 rounded-full bg-teal-accent/20 text-teal-accent flex items-center justify-center text-[10px] mt-0.5 font-bold">✓</span>
                      <span><strong>Role-Based Access:</strong> Access to your profiles is restricted to team members directly assigned to your account.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="shrink-0 w-4 h-4 rounded-full bg-teal-accent/20 text-teal-accent flex items-center justify-center text-[10px] mt-0.5 font-bold">✓</span>
                      <span><strong>Immediate Offboarding:</strong> Upon completion or termination of a contract, we systematically purge shared passwords and remove our access tokens.</span>
                    </li>
                  </ul>
                </div>
                <p>
                  However, please note that no method of transmission over the Internet, or method of electronic storage, is 100% secure. While we take maximum precautions, we cannot guarantee absolute data security.
                </p>
              </div>
            </div>

            {/* Section 5: Third-Party Disclosures */}
            <div id="third-party" className="scroll-mt-32 border-b border-charcoal-100/60 pb-10">
              <h2 className="font-display text-2xl md:text-3xl text-ink font-bold mb-6">
                5. Third-Party Disclosures
              </h2>
              <div className="space-y-4">
                <p>
                  We do not sell, trade, or rent your personal information to third parties. We share information only with:
                </p>
                <ul className="space-y-3 list-decimal pl-5">
                  <li>
                    <strong>Social Media Platforms:</strong> When we post content or manage profiles on Meta (Facebook, Instagram), LinkedIn, YouTube, X/Twitter, or TikTok, data flows directly to those platforms in accordance with their privacy policies.
                  </li>
                  <li>
                    <strong>Service Providers:</strong> We share data with trusted tools that help us operate our business, such as billing networks (Stripe), email routing (Resend, Nodemailer), communication tools (WhatsApp, Slack), and analytics tools (Google Analytics).
                  </li>
                  <li>
                    <strong>Legal Requirements:</strong> We may disclose information if required to do so by law, court order, or to protect the safety, rights, or property of {company.name}, our clients, or the public.
                  </li>
                </ul>
              </div>
            </div>

            {/* Section 6: Client Rights */}
            <div id="client-rights" className="scroll-mt-32 border-b border-charcoal-100/60 pb-10">
              <h2 className="font-display text-2xl md:text-3xl text-ink font-bold mb-6">
                6. Your Rights & Choices
              </h2>
              <div className="space-y-4">
                <p>
                  We support transparency and want you to have full agency over your information. Depending on your location, you have the following rights:
                </p>
                <ul className="space-y-2 list-disc pl-5">
                  <li><strong>Access & Export:</strong> You can request a summary and copy of all personal information we hold about your business.</li>
                  <li><strong>Correction:</strong> You can ask us to update or correct inaccurate or incomplete details.</li>
                  <li><strong>Access Revocation:</strong> You have the right to revoke our access to any of your social profiles, websites, or accounts at any time.</li>
                  <li><strong>Deletion (&ldquo;Right to be Forgotten&rdquo;):</strong> You can request that we permanently delete your contact data and stored files from our internal backups, subject to legal archiving exceptions.</li>
                </ul>
                <p>
                  To exercise any of these options, please contact us at <a href={`mailto:${company.email}`} className="text-teal-accent hover:underline">{company.email}</a>.
                </p>
              </div>
            </div>

            {/* Section 7: Policy Updates */}
            <div id="policy-updates" className="scroll-mt-32 pb-10">
              <h2 className="font-display text-2xl md:text-3xl text-ink font-bold mb-6">
                7. Policy Updates
              </h2>
              <div className="space-y-4">
                <p>
                  We may update this Privacy Policy from time to time to reflect changes in our operational procedures, privacy practices, or legal requirements.
                </p>
                <p>
                  When changes are made, we will revise the &ldquo;Last Updated&rdquo; date at the top of this page. We encourage you to review this page periodically to stay informed about how we protect your information. Your continued use of our Site and Services after any updates indicates your acceptance of the revised policy.
                </p>
              </div>
            </div>

            {/* Contact Footer Callout */}
            <div className="bg-gradient-to-br from-ink to-[#13224f] border border-navy-800 rounded-3xl p-8 relative overflow-hidden text-paper">
              <div className="absolute top-0 right-0 w-24 h-24 bg-teal-accent/10 rounded-full blur-xl pointer-events-none" />
              <h4 className="font-display text-xl text-paper mb-3">Data Protection Concerns?</h4>
              <p className="text-xs text-navy-200 leading-relaxed mb-6">
                For questions regarding data processing, secure password sharing, or to exercise your rights, please reach out to our privacy officer.
              </p>
              <a 
                href={`mailto:${company.email}`}
                className="btn-accent text-xs px-6 py-3 font-bold uppercase tracking-wider inline-flex items-center gap-2"
              >
                Contact Data Security
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
