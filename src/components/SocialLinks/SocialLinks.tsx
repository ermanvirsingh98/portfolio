import React from "react";

import { Panel } from "../Panel";
import { SocialLinkItem } from "./SocialLinkItem";

interface SocialLink {
  id: string;
  platform: string;
  url: string;
  iconUrl?: string;
  isActive: boolean;
  order: number;
}

interface SocialLinksProps {
  data: SocialLink[];
}

export function SocialLinks({ data }: SocialLinksProps) {
  // Ensure data is an array and filter active links
  const safeData = Array.isArray(data) ? data : [];
  const activeLinks = safeData.filter(link => link && link.isActive).sort((a, b) => a.order - b.order);

  return (
    <Panel>
      <h2 className="sr-only">Social Links</h2>

      <div className="relative">
        <div className="pointer-events-none absolute inset-0 -z-1 grid grid-cols-1 gap-4 max-sm:hidden sm:grid-cols-2">
          <div className="border-r border-grid"></div>
          <div className="border-l border-grid"></div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {activeLinks.map((link: SocialLink, index: number) => {
            return (
              <SocialLinkItem
                key={link.id || index}
                icon={link.iconUrl}
                title={link.platform || "Social Link"}
                description={`Visit my ${link.platform || "social"} profile`}
                href={link.url || "#"}
              />
            );
          })}
        </div>
      </div>
    </Panel>
  );
}
