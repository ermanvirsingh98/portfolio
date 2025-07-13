"use client";

import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { USER } from "@/data/user";
import { ToggleTheme } from "../ThemeToggle";
import { Nav } from "../Nav/Nav";
import { NavDropdown } from "../Nav/NavDropdown";
import { useScrollSpy } from "@/hooks/use-scroll-spy";

export function HeaderMotion() {
  const { scrollY } = useScroll();
  const activeId = useScrollSpy();

  // Smooth scroll-based animations
  const _top = useTransform(scrollY, [100, 300], [-80, 0]);
  const top = useSpring(_top, {
    stiffness: 300,
    damping: 30,
    mass: 0.8
  });

  // Opacity and blur effects based on scroll
  const opacity = useTransform(scrollY, [100, 200], [0, 1]);
  const blur = useTransform(scrollY, [100, 200], [10, 0]);
  const scale = useTransform(scrollY, [100, 200], [0.95, 1]);

  return (
    <motion.header
      className="fixed inset-x-0 top-0 z-50"
      style={{
        translateY: top,
        opacity,
        filter: `blur(${blur}px)`,
        transform: `translateY(${top}px) scale(${scale})`
      }}
    >
      {/* Modern backdrop with subtle gradient */}
      <div className="absolute inset-0 bg-background/95 backdrop-blur-md border-b border-border/40 shadow-lg" />

      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/98 via-background/95 to-background/90" />

      <div className="relative">
        <div className="border-y border-border/30">
          <div className="mx-auto px-4 md:max-w-3xl">
            <motion.div
              className="flex items-center justify-between py-3"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6, ease: "easeOut" }}
            >
              {/* Modern name section */}
              <motion.div
                className="flex items-center"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
              >
                <h1 className="font-heading text-xl font-semibold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text">
                  {USER.displayName}
                </h1>
                <div className="ml-2 h-1 w-1 rounded-full bg-primary/60" />
              </motion.div>

              {/* Modern navigation with active state */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
                className="flex items-center gap-4"
              >
                <Nav className="max-sm:hidden" activeId={activeId} />

                {/* Enhanced controls */}
                <div className="flex items-center gap-2">
                  <ToggleTheme />
                  <NavDropdown className="sm:hidden" />
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
