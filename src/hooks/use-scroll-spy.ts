"use client";

import { useEffect, useState } from "react";
import { useScroll } from "motion/react";
import { NAV_LINKS } from "@/data/site";

export function useScrollSpy() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const { scrollY } = useScroll();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = scrollY.get();
      const sections = NAV_LINKS.map((link) => {
        const id = link.href.split("#")[1];
        const element = document.getElementById(id);
        if (!element) return null;

        const rect = element.getBoundingClientRect();
        const offset = 100; // Offset for header height

        return {
          id,
          top: rect.top + window.scrollY - offset,
          bottom: rect.bottom + window.scrollY - offset,
        };
      }).filter(Boolean);

      // Find the section that's currently in view
      const currentSection = sections.find(
        (section) =>
          scrollPosition >= section!.top && scrollPosition < section!.bottom
      );

      setActiveId(currentSection?.id || null);
    };

    // Initial check
    handleScroll();

    // Listen to scroll changes
    const unsubscribe = scrollY.on("change", handleScroll);

    return () => {
      unsubscribe();
    };
  }, [scrollY]);

  return activeId;
}
