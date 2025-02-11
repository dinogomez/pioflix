import { getPopularMovies, getTrendingMovies } from '@/lib/tmdb';
import { Movie } from '@/types/movie';
import MovieCard from '../_components/movie-card';



async function MoviesPage() {
    const popularMovies: Movie[] = await getPopularMovies();
    const trendingMovies = await getTrendingMovies();

    const randomHeroMovie = popularMovies[Math.floor(Math.random() * popularMovies.length)];

    return (
        <main className="min-h-screen bg-background pt-5">
            <section className="relative h-[40vh] w-full">
                <div className="relative h-full w-full">
                    <img
                        src={`https://image.tmdb.org/t/p/original${randomHeroMovie.backdrop_path}`}
                        alt={randomHeroMovie.title}
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

            <section className="px-4 py-8">
                <h2 className="text-2xl font-bold mb-4">Popular Movies</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {popularMovies.map((movie: Movie) => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))}
                </div>
            </section>

            <section className="px-4 py-8">
                <h2 className="text-2xl font-bold mb-4">Trending Now</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {trendingMovies.map((movie: Movie) => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))}
                </div>
            </section>
        </main>
    );
}

export default MoviesPage;




