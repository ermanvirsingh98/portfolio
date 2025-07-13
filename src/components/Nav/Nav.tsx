import React from "react";
import { cn } from "@/lib/utils";
import { NavItem } from "./NavItem";
import { NAV_LINKS } from "@/data/site";

export function Nav({
  className,
  activeId,
}: {
  className?: string;
  activeId?: string | null;
}) {
  return (
    <nav
      className={cn(
        "flex h-8 items-center gap-3 font-mono text-sm text-muted-foreground",
        className
      )}
    >
      {NAV_LINKS.map(({ title, href }) => {
        const itemId = href?.split("#")[1] ?? "";
        const active = itemId === activeId;

        return (
          <NavItem key={href} href={href} active={active}>
            {title}
          </NavItem>
        );
      })}
    </nav>
  );
}
