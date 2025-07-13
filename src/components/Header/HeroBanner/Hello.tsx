"use client";

import { RepeatIcon } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import { SimpleTooltip } from "@/components/ui/tooltip";
import { AppleHelloEnglishEffect } from "./AppleHelloEffect";
import { cn } from "@/lib/utils";

const layers = ["hello", "manny-wordmark"] as const;

export function Hello() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const canRestart = currentIndex === layers.length - 1;

  return (
    <>
      <div
        className={cn(
          "absolute top-1/2 h-16 w-full -translate-y-1/2 border-y border-grid transition-all duration-500 sm:h-20",
          {
            "h-10 sm:h-16": ["manny", "hello"].includes(layers[currentIndex]),
          }
        )}
      />

      <AnimatePresence mode="wait">
        <div
          key={`layer-${currentIndex}`}
          className="relative flex items-center justify-center text-black dark:text-white"
        >
          <motion.div
            className="h-full w-px bg-grid"
            layoutId="layout-grid-left"
            transition={{
              duration: 0.5,
            }}
          />

          {layers[currentIndex] === "hello" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="relative"
            >
              <AppleHelloEnglishEffect className="h-10 sm:h-16" />

              {/* Glow effect behind the text */}
              <div className="absolute inset-0 -z-10 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 blur-xl scale-110" />
            </motion.div>
          )}

          <motion.div
            className="h-full w-px bg-grid"
            layoutId="layout-grid-right"
            transition={{
              duration: 0.5,
            }}
          />
        </div>
      </AnimatePresence>

      {/* Enhanced restart button */}
      <div className="absolute inset-0 flex items-end justify-end">
        <SimpleTooltip content="Restart animation">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            <Button
              className="translate-px bg-white/80 backdrop-blur-sm border border-zinc-200 hover:bg-white/90 dark:bg-zinc-800/80 dark:border-zinc-700 dark:hover:bg-zinc-800/90 shadow-lg hover:shadow-xl transition-all duration-300"
              variant="outline"
              size="icon"
              disabled={!canRestart}
              onClick={() => {
                setCurrentIndex(0);
              }}
            >
              <RepeatIcon className="h-4 w-4" />
            </Button>
          </motion.div>
        </SimpleTooltip>
      </div>

      {/* Subtle text overlay for additional context */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center"
      >
        <p className="text-xs text-zinc-500 dark:text-zinc-400 font-mono tracking-wider">
          Welcome to my digital space
        </p>
      </motion.div>
    </>
  );
}
