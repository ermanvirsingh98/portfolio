import { Skeleton } from "@/components/ui/skeleton";

export function SocialLinksSkeleton() {
    return (
        <section className="py-16">
            <div className="space-y-8">
                {/* Title */}
                <div className="space-y-2">
                    <Skeleton className="h-8 w-48" />
                    <Skeleton className="h-4 w-96" />
                </div>

                {/* Social Links Grid */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <div key={i} className="flex items-center space-x-3 rounded-lg border p-4">
                            {/* Platform Icon */}
                            <Skeleton className="h-8 w-8 rounded" />

                            {/* Platform Info */}
                            <div className="flex-1 space-y-1">
                                <Skeleton className="h-4 w-24" />
                                <Skeleton className="h-3 w-32" />
                            </div>

                            {/* Link Icon */}
                            <Skeleton className="h-4 w-4" />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
} 