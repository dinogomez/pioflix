import { getPopularTv, getTrendingTv } from '@/lib/tmdb';
import Image from "next/image";
import { Suspense } from "react";
import { MediaGrid } from "../_components/media-grid";

async function TvPage() {
    const popularTvPromise = getPopularTv();
    const trendingTvPromise = getTrendingTv();

    const [popularTv, trendingTv] = await Promise.all([
        popularTvPromise,
        trendingTvPromise
    ]);

    const randomHeroShow = popularTv[Math.floor(Math.random() * popularTv.length)];

    return (
        <main className="min-h-screen bg-background pt-5">
            <section className="relative h-[40vh] w-full">
                <div className="relative h-full w-full">
                    <Image
                        src={`https://image.tmdb.org/t/p/original${randomHeroShow.backdrop_path}`}
                        alt={randomHeroShow.name ? randomHeroShow.name : "Movie/Show"}
                        width={0}
                        height={0}
                        sizes="100vw"
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

            <Suspense fallback={<MediaGrid title="Popular TV Shows" items={[]} isLoading={true} />}>
                <MediaGrid
                    title="Popular TV Shows"
                    items={popularTv}
                />
            </Suspense>

            <Suspense fallback={<MediaGrid title="Trending TV Shows" items={[]} isLoading={true} />}>
                <MediaGrid
                    title="Trending TV Shows"
                    items={trendingTv}
                />
            </Suspense>
        </main>
    );
}

export default TvPage;