import * as AccordionPrimitive from "@radix-ui/react-accordion";
import React from "react";
import { Panel, PanelHeader, PanelTitle } from "../Panel";

import { ExperienceItem } from "./ExperienceItem";

interface ExperiencePosition {
  id: string;
  title: string;
  startDate: string;
  endDate?: string;
  isCurrent: boolean;
  description: string;
  experienceId: string;
  order: number;
}

interface Experience {
  id: string;
  company: string;
  position: string;
  location?: string;
  startDate: string;
  endDate?: string;
  isCurrent: boolean;
  description: string;
  logoUrl?: string;
  order: number;
  positions: ExperiencePosition[];
}

interface ExperiencesProps {
  data: Experience[];
}

export function Experiences({ data }: ExperiencesProps) {
  // Ensure data is an array and sort experiences
  const safeData = Array.isArray(data) ? data : [];
  const sortedExperiences = safeData.sort((a, b) => a.order - b.order);

  const defaultValue = sortedExperiences.flatMap((exp: Experience) =>
    exp.positions?.filter((pos: ExperiencePosition) => pos.isCurrent).map((pos: ExperiencePosition) => pos.id) || []
  );


  return (
    <Panel id="experience" className="scroll-mt-[4.75rem]">
      <PanelHeader>
        <PanelTitle>Experience</PanelTitle>
      </PanelHeader>

      <AccordionPrimitive.Root
        type="multiple"
        defaultValue={defaultValue}
        asChild
      >
        <div className="px-4">
          {sortedExperiences.map((experience: Experience, index: number) => {
            return <ExperienceItem key={experience.id || index} experience={experience} />;
          })}
        </div>
      </AccordionPrimitive.Root>
    </Panel>
  );
}
