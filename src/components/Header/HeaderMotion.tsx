"use client";

import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { USER } from "@/data/user";
import { Avatar } from "./Avatar";
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
      {/* Modern backdrop with gradient */}
      <div className="absolute inset-0 bg-background/80 backdrop-blur-md border-b border-border/50 shadow-lg" />

      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/80 to-background/70" />

      <div className="relative overflow-hidden">
        <div className="border-y border-border/30">
          <div className="mx-auto px-4 md:max-w-3xl">
            <motion.div
              className="flex items-center gap-4 border-x border-border/30 py-2 pl-2"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6, ease: "easeOut" }}
            >
              {/* Modern avatar with enhanced styling */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5, ease: "easeOut" }}
                whileHover={{ scale: 1.05 }}
                className="relative"
              >
                <Avatar
                  className="rounded-full ring-2 ring-primary/20 ring-offset-2 ring-offset-background/80 shadow-lg hover:shadow-xl transition-all duration-300"
                  size={48}
                  priority={false}
                />
                {/* Status indicator */}
                <div className="absolute -bottom-1 -right-1 h-3 w-3 rounded-full bg-green-500 border-2 border-background shadow-sm" />
              </motion.div>

              {/* Enhanced name section */}
              <motion.div
                className="flex flex-1 items-center font-heading text-xl font-semibold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
              >
                {USER.displayName}
              </motion.div>

              {/* Modern navigation with active state */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.6, ease: "easeOut" }}
              >
                <Nav className="max-sm:hidden" activeId={activeId} />
              </motion.div>

              {/* Enhanced controls */}
              <motion.div
                className="flex items-center gap-2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.6, ease: "easeOut" }}
              >
                <ToggleTheme />
                <NavDropdown className="sm:hidden" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
