import { cn } from "@/lib/utils";

export function Footer() {
  return (
    <footer className="screen-line-before border-x border-grid pt-4 pb-[env(safe-area-inset-bottom,0px)]">
      <p className="mb-1 text-center font-mono text-sm text-balance text-muted-foreground">
        © 2025 Build by{" "}
        <a
          className="link"
          href="https://linkedin.com/in/ncdai"
          target="_blank"
          rel="noopener noreferrer"
        >
          Manny
        </a>
        .
      </p>

      <p className="mb-4 text-center font-mono text-sm text-balance text-muted-foreground">
        Designed, coded, and launched with love.
      </p>

      <div
        className={cn(
          "screen-line-before",
          "[--pattern-foreground:var(--color-black)]/1 dark:[--pattern-foreground:var(--color-white)]/1",
          "bg-[image:repeating-linear-gradient(0deg,_var(--pattern-foreground)_0,_var(--pattern-foreground)_1px,_transparent_0,_transparent_10px),repeating-linear-gradient(90deg,_var(--pattern-foreground)_0,_var(--pattern-foreground)_1px,_transparent_0,_transparent_10px)]",
          "bg-[size:10px_10px] bg-[position:-1px_1px]"
        )}
      >
        <div className="-mx-px py-4"></div>
      </div>
    </footer>
  );
}
