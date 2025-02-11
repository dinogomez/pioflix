import { getPopularTv, getTrendingTv } from '@/lib/tmdb';
import { Show } from '@/types/show';
import MovieCard from '../_components/movie-card';

async function TvPage() {
    const popularTv: Show[] = await getPopularTv();
    const trendingTv = await getTrendingTv();

    const randomHeroShow = popularTv[Math.floor(Math.random() * popularTv.length)];

    return (
        <main className="min-h-screen bg-background pt-5">
            <section className="relative h-[40vh] w-full">
                <div className="relative h-full w-full">
                    <img
                        src={`https://image.tmdb.org/t/p/original${randomHeroShow.backdrop_path}`}
                        alt={randomHeroShow.name}
                        className="w-full h-full object-cover rounded-md"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
                    <div className="absolute bottom-0 left-0 p-8">
                        <h1 className="text-4xl font-bold mb-4">
                            {randomHeroShow?.name || "Featured Show"}
                        </h1>
                        <p className="text-lg max-w-2xl line-clamp-3">
                            {randomHeroShow?.overview || "No overview available"}
                        </p>
                    </div>
                </div>
            </section>

            <section className="px-4 py-8">
                <h2 className="text-2xl font-bold mb-4">Popular TV Shows</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {popularTv.map((show: Show) => (
                        <MovieCard key={show.id} movie={show} />
                    ))}
                </div>
            </section>

            <section className="px-4 py-8">
                <h2 className="text-2xl font-bold mb-4">Trending TV Shows</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {trendingTv.map((show: Show) => (
                        <MovieCard key={show.id} movie={show} />
                    ))}
                </div>
            </section>
        </main>
    );
}

export default TvPage;