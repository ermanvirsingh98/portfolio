"use client";

import { MoonStarIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import React, { useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";

import { Button } from "./ui/button";

export function ToggleTheme() {
  const { resolvedTheme, setTheme } = useTheme();

  const handleToggle = useCallback(() => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  }, [resolvedTheme, setTheme]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.9, duration: 0.5, ease: "easeOut" }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Button
        variant="outline"
        size="icon"
        onClick={handleToggle}
        className="bg-white/80 backdrop-blur-sm border border-zinc-200 hover:bg-white/90 dark:bg-zinc-800/80 dark:border-zinc-700 dark:hover:bg-zinc-800/90 shadow-md hover:shadow-lg transition-all duration-300 relative overflow-hidden"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={resolvedTheme}
            initial={{ opacity: 0, rotate: -90 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={{ opacity: 0, rotate: 90 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <MoonStarIcon className="hidden [html.dark_&]:block h-4 w-4" />
            <SunIcon className="hidden [html.light_&]:block h-4 w-4" />
          </motion.div>
        </AnimatePresence>

        {/* Glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 via-orange-400/20 to-red-400/20 opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-md" />

        <span className="sr-only">Toggle Theme</span>
      </Button>
    </motion.div>
  );
}
