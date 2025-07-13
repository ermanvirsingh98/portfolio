import { cn } from "@/lib/utils";
import { ExternalLinkIcon } from "lucide-react";
import Image from "next/image";

export function SocialLinkItem({ icon, title, description, href }: any) {
  // Safety check for required props
  if (!title || !href) {
    return null;
  }

  return (
    <a
      className={cn(
        "group/social-link flex cursor-pointer items-center gap-4 rounded-2xl p-4 transition-colors select-none",
        "max-sm:screen-line-before max-sm:screen-line-after",
        "sm:nth-[2n+1]:screen-line-before sm:nth-[2n+1]:screen-line-after"
      )}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className="relative size-12 shrink-0">
        {icon && icon.trim() !== "" ? (
          <Image
            className="rounded-xl"
            src={icon}
            alt={`${title}'s icon`}
            width={48}
            height={48}
            quality={100}
          />
        ) : (
          <div className="w-12 h-12 bg-muted rounded-xl flex items-center justify-center">
            <span className="text-lg font-medium text-muted-foreground">
              {title && title.charAt(0) ? title.charAt(0).toUpperCase() : "?"}
            </span>
          </div>
        )}
        <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-black/8 ring-inset dark:ring-white/8" />
      </div>

      <div className="flex-1">
        <p className="flex items-center font-heading font-medium underline-offset-4 group-hover/social-link:underline">
          {title}
        </p>

        {description && (
          <p className="font-mono text-sm text-muted-foreground">
            {description}
          </p>
        )}
      </div>

      <ExternalLinkIcon className="size-4 text-muted-foreground" />
    </a>
  );
}
