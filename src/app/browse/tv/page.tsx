import { getPopularTv, getTrendingTv } from '@/lib/tmdb';
import { Show } from '@/types/show';
import HeroSection from "../../_components/hero-section";
import { MediaGrid } from "../../_components/media-grid";

export default async function TvPage() {
    const popularTvPromise = getPopularTv();
    const trendingTvPromise = getTrendingTv();

    const [popularTv, trendingTv]: [Show[], Show[]] = await Promise.all([
        popularTvPromise,
        trendingTvPromise
    ]);
    const validPopularTv = (popularTv || [])
        .filter((show: Show) => show?.backdrop_path && show?.name);

    const validTrendingTv = (trendingTv || [])
        .filter((show: Show) => show?.poster_path && show?.name);

    const randomHeroShow = validPopularTv.length > 0
        ? validPopularTv[Math.floor(Math.random() * validPopularTv.length)]
        : null;

    return (
        <main className="min-h-screen bg-background pt-5">
            {randomHeroShow && (
                <HeroSection
                    imageSrc={`https://image.tmdb.org/t/p/original${randomHeroShow.backdrop_path}`}
                    title={randomHeroShow.name}
                    overview={randomHeroShow.overview}
                />
            )}

            {validPopularTv.length > 0 && (
                <MediaGrid
                    title="Popular TV Shows"
                    items={validPopularTv}
                />
            )}

            {validTrendingTv.length > 0 && (
                <MediaGrid
                    title="Trending TV Shows"
                    items={validTrendingTv}
                />
            )}
        </main>
    );
}

