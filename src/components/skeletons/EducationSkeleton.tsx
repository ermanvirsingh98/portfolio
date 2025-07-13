import { Panel, PanelHeader, PanelTitle } from "@/components/Panel";
import { Skeleton } from "@/components/ui/skeleton";

export function EducationSkeleton() {
    return (
        <Panel id="education" className="scroll-mt-[4.75rem]">
            <PanelHeader>
                <PanelTitle>Education</PanelTitle>
            </PanelHeader>

            <div className="px-4 space-y-4">
                {[1, 2].map((i) => (
                    <div key={i} className="screen-line-after space-y-4 py-4">
                        {/* Institution header */}
                        <div className="flex items-center gap-3">
                            <Skeleton className="h-6 w-6 rounded-full" />
                            <Skeleton className="h-6 w-48" />
                        </div>

                        {/* Position details */}
                        <div className="relative space-y-4 before:absolute before:left-3 before:h-full before:w-px before:bg-border">
                            <div className="relative last:before:absolute last:before:h-full last:before:w-4 last:before:bg-background">
                                <div className="relative z-1 mb-1 flex items-center gap-3 bg-background">
                                    <Skeleton className="h-6 w-6 rounded-lg" />
                                    <Skeleton className="h-5 flex-1" />
                                    <Skeleton className="h-4 w-4" />
                                </div>
                                <div className="flex items-center gap-2 pl-9">
                                    <Skeleton className="h-3 w-24" />
                                    <Skeleton className="h-4 w-px" />
                                    <Skeleton className="h-3 w-20" />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </Panel>
    );
} 