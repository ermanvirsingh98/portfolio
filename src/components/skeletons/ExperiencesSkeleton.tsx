import { Skeleton } from "@/components/ui/skeleton";

export function ExperiencesSkeleton() {
    return (
        <section className="py-16">
            <div className="space-y-8">
                {/* Title */}
                <div className="space-y-2">
                    <Skeleton className="h-8 w-48" />
                    <Skeleton className="h-4 w-96" />
                </div>

                {/* Experiences */}
                <div className="space-y-8">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="space-y-4 rounded-lg border p-6">
                            {/* Company Header */}
                            <div className="flex items-start space-x-4">
                                <Skeleton className="h-12 w-12 rounded" />
                                <div className="flex-1 space-y-2">
                                    <Skeleton className="h-5 w-48" />
                                    <Skeleton className="h-4 w-32" />
                                    <Skeleton className="h-4 w-24" />
                                </div>
                            </div>

                            {/* Description */}
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-5/6" />
                                <Skeleton className="h-4 w-4/5" />
                            </div>

                            {/* Positions */}
                            <div className="space-y-3">
                                <Skeleton className="h-4 w-32" />
                                <div className="ml-4 space-y-2">
                                    <Skeleton className="h-4 w-40" />
                                    <Skeleton className="h-4 w-36" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
} 