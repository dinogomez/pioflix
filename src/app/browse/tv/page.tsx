import { getPopularTv, getTrendingTv } from '@/lib/tmdb';
import { Show } from '@/types/show';
import HeroSection from '../_components/hero-section';
import { MediaGrid } from '../_components/media-grid';

export default async function TvShowsPage() {
    const popularTvPromise = getPopularTv();
    const trendingTvPromise = getTrendingTv();

    const [popularTv, trendingTv]: [Show[], Show[]] = await Promise.all([
        popularTvPromise,
        trendingTvPromise
    ]) as [Show[], Show[]];

    const validPopularShows = (popularTv || [])
        .filter((show: Show) => show?.backdrop_path && show?.name);

    const validTrendingShows = (trendingTv || [])
        .filter((show: Show) => show?.poster_path && show?.name);

    const randomHeroShow: Show | null = validPopularShows.length > 0
        ? validPopularShows[Math.floor(Math.random() * validPopularShows.length)]
        : null;

    return (
        <main className="min-h-screen bg-background pt-5">
            {randomHeroShow && (
                <HeroSection content={randomHeroShow} />
            )}

            {validTrendingShows.length > 0 && (
                <MediaGrid
                    title="Trending Now"
                    items={validTrendingShows}
                    limit={8}
                    exploreLink="/browse/tv/trending"
                />
            )}

            {validPopularShows.length > 0 && (
                <MediaGrid
                    title="Popular TV Shows"
                    items={validPopularShows}
                    limit={8}
                    exploreLink="/browse/tv/popular"
                />
            )}
        </main>
    );
}

