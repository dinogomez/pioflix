import { getPopularMovies, getTrendingMovies } from '@/lib/tmdb';
import { Suspense } from "react";
import HeroSection from "../../_components/hero-section";
import { MediaGrid } from "../../_components/media-grid";

export default async function MoviesPage() {
    const popularMoviesPromise = getPopularMovies();

    const trendingMoviesPromise = getTrendingMovies();

    const [popularMovies, trendingMovies] = await Promise.all([
        popularMoviesPromise,
        trendingMoviesPromise
    ]);

    const randomHeroMovie = popularMovies[Math.floor(Math.random() * popularMovies.length)];

    return (
        <main className="min-h-screen bg-background pt-5">
            <HeroSection
                imageSrc={`https://image.tmdb.org/t/p/original${randomHeroMovie.backdrop_path}`}
                title={randomHeroMovie.title}
                overview={randomHeroMovie.overview}
            />
            <Suspense fallback={<MediaGrid title="Trending Now" items={[]} isLoading={true} />}>
                <MediaGrid
                    title="Trending Now"
                    items={trendingMovies}
                />
            </Suspense>
            <MediaGrid
                title="Popular Movies"
                items={popularMovies}
            />
        </main>
    );
}





