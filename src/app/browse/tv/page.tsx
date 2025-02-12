import { getPopularTv, getTrendingTv } from '@/lib/tmdb';
import { Show } from '@/types/show';
import HeroSection from "../_components/hero-section";
import { MediaGrid } from "../_components/media-grid";

export default async function TvPage() {
    const popularTvPromise = getPopularTv();
    const trendingTvPromise = getTrendingTv();

    const [popularTv, trendingTv]: [Show[], Show[]] = await Promise.all([
        popularTvPromise,
        trendingTvPromise
    ]);
    const validPopularTv = (popularTv || [])
        .filter((show: Show) => show?.backdrop_path && show?.name && show?.overview);

    const validTrendingTv = (trendingTv || [])
        .filter((show: Show) => show?.poster_path && show?.name);

    const randomHeroShow = validPopularTv.length > 0
        ? validPopularTv[Math.floor(Math.random() * validPopularTv.length)]
        : null;

    return (
        <main className="min-h-screen bg-background pt-5">
            {randomHeroShow && (
                <HeroSection content={randomHeroShow} />
            )}

            {validTrendingTv.length > 0 && (
                <MediaGrid
                    title="Trending TV Shows"
                    items={validTrendingTv}
                />
            )}

            {validPopularTv.length > 0 && (
                <MediaGrid
                    title="Popular TV Shows"
                    items={validPopularTv}
                />
            )}
        </main>
    );
}

