import Image from "next/image";
import React from "react";

import { ExperiencePositionItem } from "./ExperiencePositionItem";

export function ExperienceItem({ experience }: { experience: any }) {
  // Safety check for experience object
  if (!experience || typeof experience !== 'object') {
    return null;
  }

  console.log(experience);

  return (
    <div className="screen-line-after space-y-4 py-4">
      <div className="flex items-center gap-3">
        <span className="flex size-6 shrink-0 items-center justify-center">
          {experience.logoUrl && experience.logoUrl.trim() !== "" ? (
            <Image
              src={experience.logoUrl}
              alt={experience.company || "Company"}
              width={24}
              height={24}
              className="rounded-full"
            />
          ) : (
            <div className="w-6 h-6 bg-muted rounded-full flex items-center justify-center">
              <span className="text-xs font-medium text-muted-foreground">
                {experience.company && experience.company.charAt(0) ? experience.company.charAt(0).toUpperCase() : "?"}
              </span>
            </div>
          )}
        </span>

        <h3 className="font-heading text-lg leading-snug font-medium">
          {experience.company || "Unknown Company"}
        </h3>

        {experience?.isCurrent && (
          <span className="relative flex items-center justify-center">
            <span className="absolute inline-flex size-3 animate-ping rounded-full bg-success-foreground opacity-50"></span>
            <span className="relative inline-flex size-2 rounded-full bg-success-foreground"></span>
          </span>
        )}
      </div>

      <div className="relative space-y-4 before:absolute before:left-3 before:h-full before:w-px before:bg-border">
        {Array.isArray(experience.positions) && experience.positions.map((position: any, index: any) => {
          return <ExperiencePositionItem key={position.id || index} position={position} />;
        })}
      </div>
    </div>
  );
}
