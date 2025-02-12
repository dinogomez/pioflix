import { getPopularMovies, getTrendingMovies } from '@/lib/tmdb';
import { Movie } from '@/types/movie';
import HeroSection from '../_components/hero-section';
import { MediaGrid } from '../_components/media-grid';

export default async function MoviesPage() {
    const popularMoviesPromise = getPopularMovies();
    const trendingMoviesPromise = getTrendingMovies();

    const [popularMovies, trendingMovies]: [Movie[], Movie[]] = await Promise.all([
        popularMoviesPromise,
        trendingMoviesPromise
    ]) as [Movie[], Movie[]];

    const validPopularMovies = (popularMovies || [])
        .filter((movie: Movie) => movie?.backdrop_path && movie?.title);

    const validTrendingMovies = (trendingMovies || [])
        .filter((movie: Movie) => movie?.poster_path && movie?.title);

    const randomHeroMovie: Movie | null = validPopularMovies.length > 0
        ? validPopularMovies[Math.floor(Math.random() * validPopularMovies.length)]
        : null;

    return (
        <main className="min-h-screen bg-background pt-5">
            {randomHeroMovie && (
                <HeroSection content={randomHeroMovie} />
            )}

            {validTrendingMovies.length > 0 && (
                <MediaGrid
                    title="Trending Now"
                    items={validTrendingMovies}
                    limit={8}
                    exploreLink="/browse/movie/trending"
                />
            )}

            {validPopularMovies.length > 0 && (
                <MediaGrid
                    title="Popular Movies"
                    items={validPopularMovies}
                    limit={8}
                    exploreLink="/browse/movie/popular"
                />
            )}
        </main>
    );
}