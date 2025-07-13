import Link from "next/link";
import React from "react";
import { cn } from "@/lib/utils";

export function NavLink({
  href,
  className,
  ...props
}: React.ComponentProps<"a"> & {
  href: string;
}) {
  const shouldUseNextLink = href.startsWith("/");
  const baseClasses = "px-2 py-1 rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:ring-offset-2 focus:ring-offset-background";

  if (shouldUseNextLink) {
    return <Link href={href} className={cn(baseClasses, className)} {...props} />;
  }

  return <a href={href} className={cn(baseClasses, className)} {...props} />;
}
