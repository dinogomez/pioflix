import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Skeleton } from "@/components/ui/skeleton";

export function MovieCardSkeleton() {
    return (
        <div className="relative group">
            <AspectRatio ratio={2 / 3}>
                <Skeleton className="absolute inset-0 rounded-lg bg-slate-400" />
            </AspectRatio>
        </div>
    );
}