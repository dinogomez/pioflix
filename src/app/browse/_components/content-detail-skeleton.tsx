import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Skeleton } from "@/components/ui/skeleton";

export default function ContentDetailSkeleton() {
    return (
        <div className="min-h-screen bg-background">
            {/* Hero Image Skeleton */}
            <div className="relative h-[60vh] w-full">
                <Skeleton className="absolute inset-0" />
                <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
            </div>

            <div className="relative z-10 px-4 lg:px-8 -mt-32">
                <div className="flex flex-col md:flex-row gap-8">
                    {/* Poster Skeleton */}
                    <div className="w-full md:w-1/4">
                        <AspectRatio ratio={2 / 3}>
                            <Skeleton className="absolute inset-0 rounded-lg" />
                        </AspectRatio>
                    </div>

                    {/* Info Skeleton */}
                    <div className="w-full md:w-3/4">
                        <Skeleton className="h-10 w-2/3 mb-4" />

                        {/* Stats and Genres Skeleton */}
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0 mb-6">
                            <div className="flex flex-wrap items-center gap-4 sm:gap-6">
                                {[1, 2, 3, 4].map((i) => (
                                    <Skeleton key={i} className="h-6 w-20" />
                                ))}
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {[1, 2, 3].map((i) => (
                                    <Skeleton key={i} className="h-6 w-16" />
                                ))}
                            </div>
                        </div>

                        {/* Overview Skeleton */}
                        <div className="space-y-2 mb-8">
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-5/6" />
                            <Skeleton className="h-4 w-4/6" />
                        </div>

                        {/* Credits and Buttons */}
                        <div className="flex flex-col lg:flex-row justify-between gap-8">
                            <div className="space-y-4">
                                {[1, 2, 3].map((i) => (
                                    <div key={i}>
                                        <Skeleton className="h-4 w-20 mb-1" />
                                        <Skeleton className="h-4 w-40" />
                                    </div>
                                ))}
                            </div>

                            {/* Action Buttons Skeleton */}
                            <div className="space-y-4 w-full lg:w-auto flex flex-col items-center lg:items-end">
                                <Skeleton className="w-full sm:w-64 h-[48px]" />
                                <Skeleton className="w-full sm:w-64 h-[48px]" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Additional Content Sections */}
            <div className="mt-16 space-y-12">
                {/* Cast & Crew Section Skeleton */}
                <section>
                    <Skeleton className="h-8 w-48 mb-6" />
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <div key={i} className="space-y-2">
                                <AspectRatio ratio={2 / 3}>
                                    <Skeleton className="absolute inset-0 rounded-lg" />
                                </AspectRatio>
                                <div className="space-y-1">
                                    <Skeleton className="h-4 w-3/4" />
                                    <Skeleton className="h-3 w-1/2" />
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Similar Content Section Skeleton */}
                <section>
                    <Skeleton className="h-8 w-48 mb-6" />
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <div key={i} className="space-y-2">
                                <AspectRatio ratio={2 / 3}>
                                    <Skeleton className="absolute inset-0 rounded-lg" />
                                </AspectRatio>
                                <div className="space-y-1">
                                    <Skeleton className="h-4 w-3/4" />
                                    <Skeleton className="h-3 w-1/2" />
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
} 