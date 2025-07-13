"use client";

import { ChevronUpIcon } from "lucide-react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "motion/react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function ScrollTop({
  className,
  ...props
}: React.ComponentProps<"button">) {
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState(false);

  useMotionValueEvent(scrollY, "change", (latestValue) => {
    setVisible(latestValue >= 400);
  });

  return (
    <AnimatePresence>
      {visible && (
        <Button
          key="scroll-top"
          className={cn(
            "fixed right-4 bottom-[calc(1rem+env(safe-area-inset-bottom,0px))] z-50 size-12 lg:right-8 lg:bottom-[calc(2rem+env(safe-area-inset-bottom,0px))] bg-background/80 backdrop-blur-md border border-border/50 shadow-lg hover:shadow-xl hover:bg-background/90 transition-all duration-300 group",
            className
          )}
          size="icon"
          asChild
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          {...props}
        >
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 25,
              duration: 0.4
            }}
          >
            <motion.div
              animate={{ y: [0, -2, 0] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <ChevronUpIcon className="size-6 text-foreground/80 group-hover:text-foreground transition-colors duration-200" />
            </motion.div>
          </motion.button>
        </Button>
      )}
    </AnimatePresence>
  );
}
