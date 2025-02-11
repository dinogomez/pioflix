import { Movie } from "@/types/movie";
import { Show } from "@/types/show";
import MovieCard from "./movie-card";
import { MovieCardSkeleton } from "./movie-card-skeleton";

interface MediaGridProps {
    title: string;
    items: (Movie | Show)[];
    limit?: number;
    isLoading?: boolean;
}

export function MediaGrid({ title, items, limit, isLoading = false }: MediaGridProps) {
    const displayItems = limit ? items.slice(0, limit) : items;

    return (
        <section className="px-4 py-8">
            <h2 className="text-2xl font-bold mb-4">{title}</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {isLoading ? (
                    // Show skeleton grid while loading
                    Array.from({ length: limit || 8 }).map((_, index) => (
                        <MovieCardSkeleton key={index} />
                    ))
                ) : (
                    // Show actual content when loaded
                    displayItems.map((item) => (
                        <MovieCard key={item.id} movie={item} />
                    ))
                )}
            </div>
        </section>
    );
}