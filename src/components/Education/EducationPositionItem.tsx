import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDownIcon, GraduationCap, MapPin, Calendar } from "lucide-react";
import React from "react";

import { Prose } from "@/components/ui/typography";
import { Tag } from "@/components/ui/tag";

export function EducationPositionItem({ education }: { education: any }) {
    const formatDate = (dateString: string) => {
        return new Date(dateString).getFullYear();
    };

    const dateRange = education.isCurrent
        ? `${formatDate(education.startDate)} - Present`
        : education.endDate
            ? `${formatDate(education.startDate)} - ${formatDate(education.endDate)}`
            : formatDate(education.startDate);

    return (
        <AccordionPrimitive.Item value={education.id} asChild>
            <div className="relative last:before:absolute last:before:h-full last:before:w-4 last:before:bg-background">
                <AccordionPrimitive.Trigger className="group/education block w-full text-left select-none [&[data-state=open]_.lucide-chevron-down]:rotate-180">
                    <div className="relative z-1 mb-1 flex items-center gap-3 bg-background">
                        <div className="flex size-6 shrink-0 items-center justify-center rounded-lg border bg-accent/50 text-muted-foreground shadow-xs">
                            <GraduationCap className="size-4" />
                        </div>

                        <h4 className="flex-1 font-heading font-medium text-balance underline-offset-4 group-hover/education:underline">
                            {education.degree} in {education.fieldOfStudy}
                        </h4>

                        <ChevronDownIcon className="size-4 shrink-0 text-muted-foreground transition-transform duration-300" />
                    </div>

                    <div className="flex items-center gap-2 pl-9 font-mono text-xs text-muted-foreground">
                        {education.location && (
                            <>
                                <span className="flex items-center gap-1">
                                    <MapPin className="size-3" />
                                    {education.location}
                                </span>
                                <span className="flex h-4 w-px shrink-0 bg-border" />
                            </>
                        )}

                        <span className="flex items-center gap-1">
                            <Calendar className="size-3" />
                            {dateRange}
                        </span>
                    </div>
                </AccordionPrimitive.Trigger>

                <AccordionPrimitive.Content className="overflow-hidden transition-all duration-300 data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                    {education?.description && (
                        <Prose className="pt-2 pl-9">
                            <div className="whitespace-pre-line">{education.description}</div>
                        </Prose>
                    )}
                </AccordionPrimitive.Content>
            </div>
        </AccordionPrimitive.Item>
    );
} 