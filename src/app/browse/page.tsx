import { getPopularMovies, getPopularTv } from '@/lib/tmdb';
import Image from "next/image";
import { Suspense } from "react";
import { MediaGrid } from "./_components/media-grid";

async function BrowsePage() {
    const popularMoviesPromise = getPopularMovies();
    const popularTvPromise = getPopularTv();

    const [popularMovies, popularTv] = await Promise.all([
        popularMoviesPromise,
        popularTvPromise
    ]);

    const allContent = [...popularMovies, ...popularTv];
    const randomHeroContent = allContent[Math.floor(Math.random() * allContent.length)];

    return (
        <main className="min-h-screen bg-background pt-5">
            <section className="relative h-[40vh] w-full">
                <div className="relative h-full w-full">
                    <Image
                        src={`https://image.tmdb.org/t/p/original${randomHeroContent.backdrop_path}`}
                        alt={randomHeroContent.title ? randomHeroContent.title : "Hero Poster"}
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

            <Suspense fallback={<MediaGrid title="Popular Movies" items={[]} limit={8} isLoading={true} />}>
                <MediaGrid
                    title="Popular Movies"
                    items={popularMovies}
                    limit={8}
                />
            </Suspense>

            <Suspense fallback={<MediaGrid title="Popular TV Shows" items={[]} limit={8} isLoading={true} />}>
                <MediaGrid
                    title="Popular TV Shows"
                    items={popularTv}
                    limit={8}
                />
            </Suspense>
        </main>
    );
}

export default BrowsePage;