import { MediaGrid } from "@/app/_components/media-grid";
import { getSearchResults } from "@/lib/tmdb";
import { Movie } from "@/types/movie";
import { Show } from "@/types/show";
import { SearchParams } from "nuqs/server";
import { loadSearchParams } from "./_params/SearchParams";

type PageProps = {
    searchParams: Promise<SearchParams>;
};

export default async function SearchPage({ searchParams }: PageProps) {
    const { q } = await loadSearchParams(searchParams);

    if (!q) {
        return (
            <main className="min-h-screen bg-background pt-20">
                <div className="text-center text-muted-foreground">
                    Start typing to search for movies and TV shows
                </div>
            </main>
        );
    }

    const { movies, tvShows }: { movies: Movie[], tvShows: Show[] } = await getSearchResults(q);

    const validMovies = (movies || [])
        .filter((movie: Movie) => movie?.poster_path && movie?.title)
        .sort((a: Movie, b: Movie) => b.vote_count - a.vote_count);

    const validTvShows = (tvShows || [])
        .filter((show: Show) => show?.poster_path && show?.name)
        .sort((a: Show, b: Show) => b.vote_count - a.vote_count);

    return (
        <main className="min-h-screen bg-background pt-5">
            <div className="max-w-7xl mx-auto px-4">
                {validMovies.length > 0 && (
                    <MediaGrid title="Movies" items={validMovies as Movie[]} />
                )}

                {validTvShows.length > 0 && (
                    <MediaGrid title="TV Shows" items={validTvShows as Show[]} />
                )}

                {validMovies.length === 0 && validTvShows.length === 0 && (
                    <div className="pt-20">
                        <div className="text-center text-muted-foreground text-xl">
                            No results found for &ldquo;{String(q)}&rdquo;
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}
