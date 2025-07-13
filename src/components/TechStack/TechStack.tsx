import React from "react";
import { Panel, PanelContent, PanelHeader, PanelTitle } from "../Panel";

import { TeckStackContent } from "./TechStackContent";
import { cn } from "@/lib/utils";

interface Skill {
  id: string;
  name: string;
  category: string;
  iconUrl?: string;
  level: number;
  order: number;
}

interface TechStackProps {
  data: Skill[];
}

export function TeckStack({ data }: TechStackProps) {
  // Ensure data is an array and sort skills
  const safeData = Array.isArray(data) ? data : [];
  const sortedSkills = safeData.sort((a, b) => a.order - b.order);

  return (
    <Panel id="skills" className="scroll-mt-[4.75rem]">
      <PanelHeader>
        <PanelTitle>Skills</PanelTitle>
      </PanelHeader>

      <PanelContent
        className={cn(
          "[--pattern-foreground:var(--color-black)]/2 dark:[--pattern-foreground:var(--color-white)]/2",
          "bg-[image:repeating-linear-gradient(0deg,_var(--pattern-foreground)_0,_var(--pattern-foreground)_1px,_transparent_0,_transparent_10px),repeating-linear-gradient(90deg,_var(--pattern-foreground)_0,_var(--pattern-foreground)_1px,_transparent_0,_transparent_10px)]",
          "bg-[size:10px_10px] bg-[position:-1px_0]"
        )}
      >
        <TeckStackContent data={sortedSkills} />
      </PanelContent>
    </Panel>
  );
}
