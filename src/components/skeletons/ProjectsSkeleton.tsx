import { Skeleton } from "@/components/ui/skeleton";

export function ProjectsSkeleton() {
    return (
        <section className="py-16">
            <div className="space-y-8">
                {/* Title */}
                <div className="space-y-2">
                    <Skeleton className="h-8 w-48" />
                    <Skeleton className="h-4 w-96" />
                </div>

                {/* Projects Grid */}
                <div className="grid gap-6 md:grid-cols-2">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="space-y-4 rounded-lg border p-6">
                            {/* Project Image */}
                            <Skeleton className="h-48 w-full rounded-md" />

                            {/* Project Title */}
                            <Skeleton className="h-6 w-3/4" />

                            {/* Project Description */}
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-5/6" />
                            </div>

                            {/* Technologies */}
                            <div className="flex flex-wrap gap-2">
                                <Skeleton className="h-6 w-16 rounded-full" />
                                <Skeleton className="h-6 w-20 rounded-full" />
                                <Skeleton className="h-6 w-14 rounded-full" />
                            </div>

                            {/* Links */}
                            <div className="flex gap-2">
                                <Skeleton className="h-8 w-20" />
                                <Skeleton className="h-8 w-20" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
} 