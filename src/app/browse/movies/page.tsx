import { getPopularMovies, getTrendingMovies } from '@/lib/tmdb';
import Image from "next/image";
import { Suspense } from "react";
import { MediaGrid } from "../_components/media-grid";

async function MoviesPage() {
    const popularMoviesPromise = getPopularMovies();
    const trendingMoviesPromise = getTrendingMovies();

    const [popularMovies, trendingMovies] = await Promise.all([
        popularMoviesPromise,
        trendingMoviesPromise
    ]);

    const randomHeroMovie = popularMovies[Math.floor(Math.random() * popularMovies.length)];

    return (
        <main className="min-h-screen bg-background pt-5">
            <section className="relative h-[40vh] w-full">
                <div className="relative h-full w-full">
                    <Image
                        src={`https://image.tmdb.org/t/p/original${randomHeroMovie.backdrop_path}`}
                        alt={randomHeroMovie.title ? randomHeroMovie.title : "Movie/Show"}
                        width={0}
                        height={0}
                        sizes="100vw"
                        className="w-full h-full object-cover rounded-md"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
                    <div className="absolute bottom-0 left-0 p-8">
                        <h1 className="text-4xl font-bold mb-4">
                            {randomHeroMovie?.title || "Featured Movie"}
                        </h1>
                        <p className="text-lg max-w-2xl line-clamp-3">
                            {randomHeroMovie?.overview || "No overview available"}
                        </p>
                    </div>
                </div>
            </section>

            <Suspense fallback={<MediaGrid title="Popular Movies" items={[]} isLoading={true} />}>
                <MediaGrid
                    title="Popular Movies"
                    items={popularMovies}
                />
            </Suspense>

            <Suspense fallback={<MediaGrid title="Trending Now" items={[]} isLoading={true} />}>
                <MediaGrid
                    title="Trending Now"
                    items={trendingMovies}
                />
            </Suspense>
        </main>
    );
}

export default MoviesPage;




