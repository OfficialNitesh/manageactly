import Link from "next/link";
import { company, navLinks } from "@/lib/tokens";

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
      className="bg-navy-950 text-paper"
    >
      {/* Main footer */}
      <div className="container-grid py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
          {/* Brand column */}
          <div className="md:col-span-4 lg:col-span-5">
            <Link href="/" className="inline-flex items-center gap-2.5 mb-6 group" aria-label="Manage Actly – Home">
              <div className="w-7 h-7 bg-teal-accent rounded-md flex items-center justify-center">
                <span className="text-paper text-xs font-display font-bold leading-none">M</span>
              </div>
              <span className="font-display font-semibold text-paper text-lg tracking-tight">
                {company.name}
              </span>
            </Link>
            <p className="text-navy-300 text-sm leading-relaxed max-w-xs mb-6">
              Management-first digital operations. We don&apos;t advise — we operate.
              We don&apos;t consult — we execute.
            </p>
            <p className="text-navy-400 text-xs">
              {company.email}
            </p>
          </div>

          {/* Nav columns */}
          {Object.entries(footerLinks).map(([group, links]) => (
            <div key={group} className="md:col-span-2 lg:col-span-2">
              <p className="label text-navy-400 mb-4">{group}</p>
              <ul className="space-y-3" role="list">
                {links.map(({ label, href }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="text-sm text-navy-300 hover:text-paper transition-colors duration-200"
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

      {/* Bottom bar */}
      <div className="border-t border-navy-800">
        <div className="container-grid py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-navy-400 text-xs">
              © {year} {company.name}. All rights reserved.
            </p>
            <p className="text-navy-500 text-xs">
              Built with operational precision.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
