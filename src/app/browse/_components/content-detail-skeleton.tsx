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

                        {/* Stats Skeleton */}
                        <div className="flex gap-4 mb-6">
                            {[1, 2, 3, 4].map((i) => (
                                <Skeleton key={i} className="h-6 w-20" />
                            ))}
                        </div>

                        {/* Overview Skeleton */}
                        <div className="space-y-2 mb-8">
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-5/6" />
                            <Skeleton className="h-4 w-4/6" />
                        </div>

                        {/* Credits Skeleton */}
                        <div className="flex flex-col lg:flex-row justify-between gap-8">
                            <div className="space-y-6">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="space-y-2">
                                        <Skeleton className="h-4 w-20" />
                                        <Skeleton className="h-4 w-40" />
                                    </div>
                                ))}
                            </div>

                            {/* Action Buttons Skeleton */}
                            <div className="flex flex-col gap-4">
                                <Skeleton className="h-12 w-64" />
                                <Skeleton className="h-12 w-64" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
} 