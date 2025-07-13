import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDownIcon } from "lucide-react";
import React from "react";

import { Prose } from "@/components/ui/typography";

import { ExperienceIcon } from "./ExperiencePositionIcon";
import { Markdown } from "../Markdown";
import { Tag } from "../ui/tag";

export function ExperiencePositionItem({ position }: { position: any }) {
  console.log(position);
  return (
    <AccordionPrimitive.Item value={position.id} asChild>
      <div className="relative last:before:absolute last:before:h-full last:before:w-4 last:before:bg-background">
        <AccordionPrimitive.Trigger className="group/experience block w-full text-left select-none [&[data-state=open]_.lucide-chevron-down]:rotate-180">
          <div className="relative z-1 mb-1 flex items-center gap-3 bg-background">
            <div className="flex size-6 shrink-0 items-center justify-center rounded-lg border bg-accent/50 text-muted-foreground shadow-xs">
              <ExperienceIcon className="size-4" icon={position.icon} />
            </div>

            <h4 className="flex-1 font-heading font-medium text-balance underline-offset-4 group-hover/experience:underline">
              {position.title}
              {position.isCurrent && (
                <span className="ml-2 inline-flex items-center gap-1 text-xs font-medium text-green-600">
                  <span className="inline-flex size-1.5 rounded-full bg-green-500 animate-ping"></span>
                  Currently Working
                </span>
              )}
            </h4>

            <div className="flex items-center gap-2">
              <ChevronDownIcon className="size-4 shrink-0 text-muted-foreground transition-transform duration-300" />
            </div>
          </div>

          <p className="flex items-center gap-2 pl-9 font-mono text-xs text-muted-foreground">
            {position.employmentType && (
              <>
                <span>{position.employmentType}</span>
                <span className="flex h-4 w-px shrink-0 bg-border" />
              </>
            )}

            <span>{position.year}</span>

          </p>
        </AccordionPrimitive.Trigger>

        <AccordionPrimitive.Content className="overflow-hidden transition-all duration-300 data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
          {position?.description && (
            <div className="pt-4 pl-9">
              <Prose className="text-sm leading-relaxed">
                <Markdown>{position.description}</Markdown>
              </Prose>
            </div>
          )}

          {Array.isArray(position.skills) && position.skills.length > 0 && (
            <div className="pt-4 pl-9">
              <h5 className="text-sm font-medium text-muted-foreground mb-2">Technologies & Skills</h5>
              <div className="flex flex-wrap gap-1.5">
                {position.skills.map((skill: any, index: any) => (
                  <Tag key={index}>{skill}</Tag>
                ))}
              </div>
            </div>
          )}
        </AccordionPrimitive.Content>
      </div>
    </AccordionPrimitive.Item>
  );
}
