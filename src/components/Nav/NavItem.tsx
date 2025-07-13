"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { NavLink } from "./NavLink";

export function NavItem({
  active,
  ...props
}: React.ComponentProps<typeof NavLink> & {
  active?: boolean;
}) {
  return (
    <div className="relative group">
      <NavLink
        className={cn(
          "relative z-10 font-medium transition-all duration-300 hover:text-foreground/90",
          active && "text-foreground font-semibold"
        )}
        {...props}
      />

      {active && (
        <motion.div
          className="absolute -inset-x-2 -inset-y-1 rounded-lg bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 shadow-sm backdrop-blur-sm"
          layoutId="nav-item-active"
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
            duration: 0.4
          }}
        >
          <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary/5 to-transparent" />
          <div className="absolute -bottom-px left-2 right-2 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        </motion.div>
      )}

      {/* Hover effect for non-active items */}
      {!active && (
        <motion.div
          className="absolute -inset-x-2 -inset-y-1 rounded-lg bg-muted/30 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          initial={false}
        />
      )}
    </div>
  );
}
