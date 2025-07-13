import { Skeleton } from "@/components/ui/skeleton";

export function HeaderSkeleton() {
    return (
        <header className="relative mt-2">
            {/* Hero Banner placeholder */}
            <div className="h-8 bg-muted rounded" />

            {/* Navigation placeholder */}
            <div className="absolute top-0 right-0 flex items-center gap-3 border-grid bg-background ring ring-grid ring-inset sm:pl-3">
                <div className="flex items-center gap-2">
                    <Skeleton className="h-8 w-8 rounded" />
                    <Skeleton className="h-8 w-8 rounded" />
                </div>
            </div>

            {/* Main header content */}
            <div className="screen-line-after flex border-x border-grid">
                <div className="shrink-0 border-r border-grid">
                    <div className="mx-[2px] my-[3px]">
                        <Skeleton className="size-32 rounded-full sm:size-40" />
                    </div>
                </div>

                <div className="flex flex-1 flex-col">
                    <div className="flex grow items-end mask-r-from-60% pb-1 pl-4">
                        <Skeleton className="h-3 w-24" />
                    </div>

                    <div className="border-t border-grid">
                        <div className="flex items-center pl-4">
                            <Skeleton className="h-8 w-48" />
                            <Skeleton className="ml-2 h-4 w-4 rounded-full" />
                        </div>

                        <div className="h-12 border-t border-grid py-1 pl-4 sm:h-auto">
                            <Skeleton className="h-4 w-64" />
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
} 