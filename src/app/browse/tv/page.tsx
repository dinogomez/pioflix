import { getPopularTv, getTrendingTv } from '@/lib/tmdb';
import { Suspense } from "react";
import HeroSection from "../_components/hero-section";
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
            <HeroSection
                imageSrc={`https://image.tmdb.org/t/p/original${randomHeroShow.backdrop_path}`}
                title={randomHeroShow.name}
                overview={randomHeroShow.overview}
            />
            <Suspense fallback={<MediaGrid title="Popular TV Shows" items={[]} isLoading={true} />}>
                <MediaGrid
                    title="Popular TV Shows"
                    items={popularTv}
                />
            </Suspense>
            <MediaGrid
                title="Trending TV Shows"
                items={trendingTv}
            />
        </main>
    );
}

export default TvPage;