import Link from "next/link";
import { company } from "@/lib/tokens";

const footerLinks = {
  Company: [
    { label: "About", href: "/about" },
    { label: "Careers", href: "/careers" },
    { label: "Insights", href: "/insights" },
    { label: "Contact", href: "/contact" },
  ],
  Services: [
    { label: "Solutions", href: "/solutions" },
    { label: "Methodology", href: "/methodology" },
    { label: "Case Studies", href: "/case-studies" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ],
};

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      role="contentinfo"
      className="bg-navy-950 text-paper relative overflow-hidden"
    >
      {/* Background glow effects */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-teal-accent/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-teal-accent/5 rounded-full blur-3xl pointer-events-none" />
      
      {/* Subtle top divider with gradient glow */}
      <div className="relative w-full h-[1px]">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-navy-800 to-transparent" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-[1px] bg-gradient-to-r from-transparent via-teal-accent/30 to-transparent" />
      </div>

      {/* Main footer */}
      <div className="container-grid py-12 md:py-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          {/* Brand column */}
          <div className="lg:col-span-5 flex flex-col items-start">
            <Link href="/" className="inline-flex items-center gap-2.5 mb-5 group" aria-label="Manage Actly – Home">
              <div className="w-8 h-8 bg-teal-accent rounded-lg flex items-center justify-center group-hover:scale-105 group-hover:bg-teal-dark transition-all duration-300 shadow-md shadow-teal-accent/10">
                <span className="text-paper text-sm font-display font-bold leading-none select-none">M</span>
              </div>
              <span className="font-display font-semibold text-paper text-lg tracking-tight group-hover:text-teal-accent transition-colors duration-200">
                {company.name}
              </span>
            </Link>
            <p className="text-navy-300 text-sm leading-relaxed max-w-sm mb-6 font-medium">
              Management-first digital operations. We don&apos;t advise — we operate.
              We don&apos;t consult — we execute.
            </p>
            
            {/* Quick Contact & Socials */}
            <div className="flex flex-col gap-4 w-full">
              <a 
                href={`mailto:${company.email}`}
                className="text-navy-400 hover:text-teal-accent text-xs font-mono transition-colors duration-200"
              >
                {company.email}
              </a>
              <div className="flex items-center gap-3 mt-1">
                <a
                  href="https://wa.me/918178114219"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full border border-navy-800 hover:border-teal-accent hover:bg-teal-accent/10 hover:text-teal-accent flex items-center justify-center text-navy-400 transition-all duration-300 hover:scale-105 active:scale-95 group/social"
                  aria-label="Chat on WhatsApp"
                >
                  <svg className="w-4 h-4 fill-current group-hover/social:scale-110 transition-transform duration-300" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                </a>
                <a
                  href="https://x.com/manageactly"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full border border-navy-800 hover:border-teal-accent hover:bg-teal-accent/10 hover:text-teal-accent flex items-center justify-center text-navy-400 transition-all duration-300 hover:scale-105 active:scale-95 group/social"
                  aria-label="Follow on X"
                >
                  <svg className="w-3.5 h-3.5 fill-current group-hover/social:scale-110 transition-transform duration-300" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
                <a
                  href={`mailto:${company.email}`}
                  className="w-9 h-9 rounded-full border border-navy-800 hover:border-teal-accent hover:bg-teal-accent/10 hover:text-teal-accent flex items-center justify-center text-navy-400 transition-all duration-300 hover:scale-105 active:scale-95 group/social"
                  aria-label="Send Email"
                >
                  <svg className="w-4 h-4 fill-none stroke-current group-hover/social:scale-110 transition-transform duration-300" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Links Section (grouped responsive sub-grid) */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {Object.entries(footerLinks).map(([group, links]) => (
              <div key={group} className="flex flex-col">
                <p className="text-xs font-semibold uppercase tracking-widest text-navy-400 mb-5 relative inline-block after:content-[''] after:absolute after:bottom-[-6px] after:left-0 after:w-5 after:h-[1.5px] after:bg-teal-accent/50">
                  {group}
                </p>
                <ul className="space-y-3 mt-1" role="list">
                  {links.map(({ label, href }) => (
                    <li key={href}>
                      <Link
                        href={href}
                        className="inline-block text-sm text-navy-300 hover:text-teal-accent hover:translate-x-1.5 transition-all duration-200 ease-out font-medium"
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-navy-900/60 relative z-10 bg-navy-950/40 backdrop-blur-sm">
        <div className="container-grid py-5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <p className="text-navy-400 text-xs font-medium">
              © {year} {company.name}. All rights reserved.
            </p>
            <p className="text-navy-500 text-xs flex items-center gap-1.5 font-medium justify-center sm:justify-end">
              <span>Built with operational precision</span>
              <span className="w-1.5 h-1.5 rounded-full bg-teal-accent animate-pulse" />
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
