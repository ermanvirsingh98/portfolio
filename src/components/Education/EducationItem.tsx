import Image from "next/image";
import React from "react";

import { EducationPositionItem } from "./EducationPositionItem";

export function EducationItem({ education }: { education: any }) {
    // Safety check for education object
    if (!education || typeof education !== 'object') {
        return null;
    }

    return (
        <div className="screen-line-after space-y-4 py-4">
            <div className="flex items-center gap-3">
                <span className="flex size-6 shrink-0 items-center justify-center">
                    {education.logoUrl && education.logoUrl.trim() !== "" ? (
                        <Image
                            src={education.logoUrl}
                            alt={education.institution || "Institution"}
                            width={24}
                            height={24}
                            className="rounded-full"
                        />
                    ) : (
                        <div className="w-6 h-6 bg-muted rounded-full flex items-center justify-center">
                            <span className="text-xs font-medium text-muted-foreground">
                                {education.institution && education.institution.charAt(0) ? education.institution.charAt(0).toUpperCase() : "?"}
                            </span>
                        </div>
                    )}
                </span>

                <h3 className="font-heading text-lg leading-snug font-medium">
                    {education.institution || "Unknown Institution"}
                </h3>

                {education?.isCurrent && (
                    <span className="relative flex items-center justify-center">
                        <span className="absolute inline-flex size-3 animate-ping rounded-full bg-success-foreground opacity-50"></span>
                        <span className="relative inline-flex size-2 rounded-full bg-success-foreground"></span>
                    </span>
                )}
            </div>

            <div className="relative space-y-4 before:absolute before:left-3 before:h-full before:w-px before:bg-border">
                <EducationPositionItem education={education} />
            </div>
        </div>
    );
} 