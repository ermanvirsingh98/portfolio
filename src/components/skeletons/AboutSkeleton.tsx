import { Skeleton } from "@/components/ui/skeleton";

export function AboutSkeleton() {
    return (
        <section className="py-16">
            <div className="space-y-8">
                {/* Title */}
                <div className="space-y-2">
                    <Skeleton className="h-8 w-48" />
                    <Skeleton className="h-4 w-96" />
                </div>

                {/* Content */}
                <div className="space-y-4">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-5/6" />
                </div>

                {/* Image */}
                <div className="flex justify-center">
                    <Skeleton className="h-64 w-64 rounded-full" />
                </div>
            </div>
        </section>
    );
} 