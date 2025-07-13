import { cn } from "@/lib/utils";
import { Hello } from "./Hello";

export function HeroBanner() {
  return (
    <div
      className={cn(
        "relative aspect-[2/1] border-x border-grid select-none overflow-hidden",
        "screen-line-before screen-line-after after:-bottom-px",
        "bg-gradient-to-br from-zinc-50 via-white to-zinc-100 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-800",
        "before:absolute before:inset-0 before:bg-[image:radial-gradient(var(--pattern-foreground)_1px,_transparent_0)] before:bg-[size:8px_8px] before:[--pattern-foreground:var(--color-zinc-950)]/5 sm:before:bg-[size:10px_10px] dark:before:[--pattern-foreground:var(--color-white)]/5",
        "after:absolute after:inset-0 after:bg-gradient-to-t after:from-transparent after:via-transparent after:to-background/20"
      )}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-gradient-to-tr from-green-500/20 to-blue-500/20 blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 h-60 w-60 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 blur-2xl animate-pulse delay-500" />
      </div>

      {/* Floating particles effect */}
      <div className="absolute inset-0">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute h-2 w-2 rounded-full bg-zinc-400/30 dark:bg-zinc-600/30 animate-bounce"
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + (i % 2) * 40}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${2 + i * 0.5}s`
            }}
          />
        ))}
      </div>

      <div className="relative flex size-full justify-center items-center">
        <Hello />
      </div>

      {/* Decorative corner elements */}
      <div className="absolute top-4 left-4 h-8 w-8 border-l-2 border-t-2 border-zinc-300 dark:border-zinc-600" />
      <div className="absolute top-4 right-4 h-8 w-8 border-r-2 border-t-2 border-zinc-300 dark:border-zinc-600" />
      <div className="absolute bottom-4 left-4 h-8 w-8 border-l-2 border-b-2 border-zinc-300 dark:border-zinc-600" />
      <div className="absolute bottom-4 right-4 h-8 w-8 border-r-2 border-b-2 border-zinc-300 dark:border-zinc-600" />
    </div>
  );
}
