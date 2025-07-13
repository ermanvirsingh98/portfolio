import { Skeleton } from "@/components/ui/skeleton";

export function SkillsSkeleton() {
    return (
        <section className="py-16">
            <div className="space-y-8">
                {/* Title */}
                <div className="space-y-2">
                    <Skeleton className="h-8 w-48" />
                    <Skeleton className="h-4 w-96" />
                </div>

                {/* Skills Grid */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
                        <div key={i} className="flex items-center space-x-3 rounded-lg border p-4">
                            {/* Skill Icon */}
                            <Skeleton className="h-8 w-8 rounded" />

                            {/* Skill Info */}
                            <div className="flex-1 space-y-1">
                                <Skeleton className="h-4 w-24" />
                                <Skeleton className="h-2 w-16" />
                            </div>

                            {/* Skill Level */}
                            <Skeleton className="h-4 w-8" />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
} 