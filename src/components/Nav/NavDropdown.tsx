"use client";

import React from "react";
import { motion } from "motion/react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { NavLink } from "./NavLink";
import { cn } from "@/lib/utils";
import { NAV_LINKS } from "@/data/site";

export function NavDropdown({ className }: { className?: string }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className={cn(
            "group/toggle flex flex-col gap-1 h-8 w-8 border-border/50 bg-background/80 backdrop-blur-sm hover:bg-background/90 transition-all duration-200",
            className
          )}
        >
          <motion.span
            className="flex h-0.5 w-4 rounded-[1px] bg-foreground/80 transition-all duration-200"
            animate={{
              rotate: 0,
              y: 0,
            }}
            transition={{ duration: 0.2 }}
          />
          <motion.span
            className="flex h-0.5 w-4 rounded-[1px] bg-foreground/80 transition-all duration-200"
            animate={{
              rotate: 0,
              y: 0,
            }}
            transition={{ duration: 0.2 }}
          />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        side="bottom"
        align="end"
        onCloseAutoFocus={(e) => e.preventDefault()}
        className="w-48 bg-background/95 backdrop-blur-md border border-border/50 shadow-lg"
      >
        {NAV_LINKS.map((link, index) => (
          <DropdownMenuItem
            key={link.href}
            className="font-mono text-sm hover:bg-primary/5 focus:bg-primary/5 transition-colors duration-150"
            asChild
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.2 }}
            >
              <NavLink href={link.href}>{link.title}</NavLink>
            </motion.div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
