"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { navLinks } from "@/lib/tokens";

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const onDarkPage = pathname === "/";
  // Text/icon colour: white when on dark hero AND not yet scrolled; ink otherwise
  const isDark = onDarkPage && !scrolled;

  return (
    <header
      role="banner"
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-paper/96 backdrop-blur-md border-b border-charcoal-100 shadow-sm"
          : onDarkPage
          ? "bg-transparent"
          : "bg-paper/96 border-b border-charcoal-100"
      )}
    >
      <div className="container-grid">
        <nav
          aria-label="Main navigation"
          className="flex items-center justify-between h-16 md:h-20"
        >
          {/* ── Logo ── always visible: teal bg + white M, text adjusts */}
          <Link
            href="/"
            className="flex items-center gap-2.5 group shrink-0"
            aria-label="Manage Actly — Home"
          >
            {/* Icon: teal bg so it's always visible against any background */}
            <div className="w-8 h-8 rounded-lg bg-teal-accent flex items-center justify-center
                            group-hover:bg-teal-dark transition-colors duration-200 shrink-0">
              <span className="text-paper text-sm font-display font-bold leading-none select-none">M</span>
            </div>
            {/* Text: white on dark hero, ink otherwise */}
            <span className={cn(
              "font-display font-semibold text-lg tracking-tight transition-colors duration-200",
              isDark ? "text-paper" : "text-ink"
            )}>
              Manage Actly
            </span>
          </Link>

          {/* ── Desktop nav ── */}
          <ul className="hidden lg:flex items-center gap-0.5" role="list">
            {navLinks.map(({ label, href }) => {
              const isActive =
                 pathname === href ||
                (pathname.startsWith(href) && href !== "/" as string);
              return (
                <li key={href}>
                  <Link
                    href={href}
                    className={cn(
                      "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                      isDark
                        ? cn("text-navy-200 hover:text-paper hover:bg-white/10",
                            isActive && "text-paper bg-white/10")
                        : cn("text-charcoal-600 hover:text-ink hover:bg-charcoal-50",
                            isActive && "text-ink bg-charcoal-50")
                    )}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* ── Desktop CTA ── */}
          <div className="hidden lg:flex items-center gap-3">
            <Link href="/contact" className="btn-accent text-sm py-2.5 px-6">
              Book a Pilot
            </Link>
          </div>

          {/* ── Mobile toggle ── */}
          <button
            className={cn(
              "lg:hidden p-2 rounded-lg transition-colors",
              isDark
                ? "text-paper hover:bg-white/10"
                : "text-charcoal-600 hover:text-ink hover:bg-charcoal-50"
            )}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            <div className="w-5 h-4 flex flex-col justify-between">
              <span className={cn("h-px bg-current transition-all duration-200 origin-center",
                mobileOpen && "rotate-45 translate-y-[7.5px]")} />
              <span className={cn("h-px bg-current transition-all duration-200",
                mobileOpen && "opacity-0 scale-x-0")} />
              <span className={cn("h-px bg-current transition-all duration-200 origin-center",
                mobileOpen && "-rotate-45 -translate-y-[8.5px]")} />
            </div>
          </button>
        </nav>
      </div>

      {/* ── Mobile menu ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="lg:hidden border-t border-charcoal-100 bg-paper overflow-hidden"
          >
            <div className="max-w-screen-xl mx-auto px-6 py-6 flex flex-col gap-1">
              {navLinks.map(({ label, href }) => {
                const isActive =
                   pathname === href ||
                   (pathname.startsWith(href) && (href as string) !== "/");
                return (
                  <Link key={href} href={href}
                    className={cn(
                      "block px-4 py-3 rounded-xl text-base font-medium transition-colors",
                      isActive ? "bg-mist text-ink font-semibold" : "text-charcoal-600 hover:text-ink hover:bg-charcoal-50"
                    )}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {label}
                  </Link>
                );
              })}
              <div className="pt-4 border-t border-charcoal-100 mt-2 grid grid-cols-2 gap-3">
                <Link href="/contact" className="btn-accent w-full justify-center text-sm py-3">
                  Book a Pilot
                </Link>
                <a href="https://wa.me/918178114219" target="_blank" rel="noopener noreferrer"
                  className="btn-secondary w-full justify-center text-sm py-3 flex items-center gap-2">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                  WhatsApp
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
