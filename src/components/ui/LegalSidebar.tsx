"use client";

import { useEffect, useState } from "react";

interface Section {
  id: string;
  label: string;
}

interface LegalSidebarProps {
  sections: Section[];
}

export default function LegalSidebar({ sections }: LegalSidebarProps) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-20% 0px -60% 0px", // trigger when section occupies focal area of screen
      }
    );

    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) observer.observe(element);
    });

    return () => {
      sections.forEach((section) => {
        const element = document.getElementById(section.id);
        if (element) observer.unobserve(element);
      });
    };
  }, [sections]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offset = 96; // navbar height + breathing room
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
      setActiveId(id);
    }
  };

  return (
    <div className="w-full">
      {/* Mobile Horizontal Pill Scroll */}
      <div className="md:hidden w-full overflow-x-auto flex gap-2 pb-3.5 border-b border-charcoal-150 mb-8 sticky top-16 bg-paper/95 backdrop-blur z-20 pt-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {sections.map((section) => {
          const isActive = activeId === section.id;
          return (
            <a
              key={section.id}
              href={`#${section.id}`}
              onClick={(e) => handleClick(e, section.id)}
              className={`shrink-0 text-[10px] font-bold tracking-wider uppercase px-4 py-2 rounded-full border transition-all duration-200 ${
                isActive
                  ? "bg-teal-accent text-paper border-teal-accent shadow-sm"
                  : "bg-mist text-charcoal-500 border-charcoal-200 hover:text-ink hover:border-charcoal-300"
              }`}
            >
              {section.label.replace(/^\d+\.\s*/, "")}
            </a>
          );
        })}
      </div>

      {/* Desktop Sticky Sidebar */}
      <nav className="sticky top-32 space-y-1 hidden md:block">
        <p className="text-[10px] font-bold uppercase tracking-widest text-charcoal-400 mb-4 px-4">
          Table of Contents
        </p>
        {sections.map((section) => {
          const isActive = activeId === section.id;
          return (
            <a
              key={section.id}
              href={`#${section.id}`}
              onClick={(e) => handleClick(e, section.id)}
              className={`block text-xs font-semibold px-4 py-2.5 rounded-xl transition-all duration-200 border-l-2 ${
                isActive
                  ? "text-teal-accent border-teal-accent bg-teal-accent/5 font-bold translate-x-1"
                  : "text-charcoal-500 border-transparent hover:text-ink hover:bg-charcoal-50"
              }`}
            >
              {section.label}
            </a>
          );
        })}
      </nav>
    </div>
  );
}
