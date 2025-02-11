import { ImageWithFallback } from '@/components/image-w-fallback';
import { getPopularMovies, getPopularTv } from '@/lib/tmdb';
import { Movie } from '@/types/movie';
import MovieCard from './_components/movie-card';

async function BrowsePage() {
    const popularMovies: Movie[] = await getPopularMovies();
    const popularTv: Movie[] = await getPopularTv();

    const allContent = [...popularMovies, ...popularTv];
    const randomHeroContent = allContent[Math.floor(Math.random() * allContent.length)];

    return (
        <main className="min-h-screen bg-background pt-5">
            <section className="relative h-[40vh] w-full">
                <div className="relative h-full w-full">
                    <ImageWithFallback
                        src={`https://image.tmdb.org/t/p/original${randomHeroContent.backdrop_path}`}
                        alt={randomHeroContent.title}
                        width={0}
                        height={0}
                        sizes="100vw"
                        className="w-full h-full object-cover rounded-md"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
                    <div className="absolute bottom-0 left-0 p-8">
                        <h1 className="text-4xl font-bold mb-4">
                            {randomHeroContent.title || "Featured Content"}
                        </h1>
                        <p className="text-lg max-w-2xl line-clamp-3">
                            {randomHeroContent.overview || "No overview available"}
                        </p>
                    </div>
                </div>
            </section>

            <section className="px-4 py-8">
                <h2 className="text-2xl font-bold mb-4">Popular Movies</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {popularMovies.slice(0, 8).map((movie) => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))}
                </div>
            </section>

            <section className="px-4 py-8">
                <h2 className="text-2xl font-bold mb-4">Popular TV Shows</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {popularTv.slice(0, 8).map((show) => (
                        <MovieCard key={show.id} movie={show} />
                    ))}
                </div>
            </section>
        </main>
    );
}

export default BrowsePage;