import { Movie } from "@/types/movie";
import { Show } from "@/types/show";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import MovieCard from "./movie-card";
import { MovieCardSkeleton } from "./movie-card-skeleton";

interface MediaGridProps {
    title: string;
    items: (Movie | Show)[];
    limit?: number;
    isLoading?: boolean;
    exploreLink?: string;
}

export function MediaGrid({ title, items, limit, isLoading = false, exploreLink }: MediaGridProps) {
    const displayItems = limit
        ? items.slice(0, limit).filter(item => item.poster_path)
        : items.filter(item => item.poster_path);

    return (
        displayItems.length > 0 && (
            <section className="px-4 py-8">
                <div className="flex items-center mb-4 group relative z-10">
                    <h2 className="text-2xl font-bold">{title}</h2>
                    {exploreLink && (
                        <Link
                            href={exploreLink}
                            className="flex items-center font-bold text-sky-300 gap-1 ml-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                        >
                            Explore All
                            <ChevronRight className="w-4 h-4" />
                        </Link>
                    )}
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {isLoading ? (
                        Array.from({ length: limit || 8 }).map((_, index) => (
                            <MovieCardSkeleton key={index} />
                        ))
                    ) : (
                        displayItems.map((item) => (
                            <MovieCard key={item.id} content={item} />
                        ))
                    )}
                </div>
            </section>
        )
    );
}