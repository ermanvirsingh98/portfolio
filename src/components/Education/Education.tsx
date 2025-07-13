"use client";

import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { CollapsibleList } from "@/components/CollapsibleList";
import { Panel, PanelHeader, PanelTitle } from "../Panel";
import { EducationItem } from "./EducationItem";

interface Education {
    id: string;
    institution: string;
    degree: string;
    field: string;
    location: string | null;
    startDate: string;
    endDate: string | null;
    isCurrent: boolean;
    description: string;
    logoUrl: string | null;
    order: number;
}

interface EducationProps {
    data: Education[];
}

export function Education({ data }: EducationProps) {
    if (!data || data.length === 0) {
        return null;
    }

    const sortedEducation = data.sort((a, b) => a.order - b.order);

    return (
        <Panel id="education" className="scroll-mt-[4.75rem]">
            <PanelHeader>
                <PanelTitle>Education</PanelTitle>
            </PanelHeader>

            <AccordionPrimitive.Root type="single" collapsible>
                <div className="px-4">
                    <CollapsibleList
                        items={sortedEducation}
                        max={3}
                        keyExtractor={(item: Education) => item.id}
                        renderItem={(item: Education) => <EducationItem education={item} />}
                    />
                </div>
            </AccordionPrimitive.Root>
        </Panel>
    );
} 