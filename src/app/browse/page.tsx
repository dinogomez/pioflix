import { getPopularMovies, getPopularTv } from "@/lib/tmdb";
import HeroSection from "./_components/hero-section";
import { MediaGrid } from "./_components/media-grid";

export default async function BrowsePage() {
    const popularMoviesPromise = getPopularMovies();
    const popularTvPromise = getPopularTv();

    const [popularMovies, popularTv] = await Promise.all([
        popularMoviesPromise,
        popularTvPromise,
    ]);

    const allContent = [...(popularMovies || []), ...(popularTv || [])].filter(
        (content) => content?.backdrop_path && ('title' in content ? content.title : content.name)
    );

    const randomHeroContent =
        allContent.length > 0
            ? allContent[Math.floor(Math.random() * allContent.length)]
            : null;

    return (
        <main className="min-h-screen bg-background pt-5">
            {randomHeroContent && (
                <HeroSection content={randomHeroContent} />
            )}

            {popularMovies?.length > 0 && (
                <MediaGrid title="Popular Movies" items={popularMovies} limit={8} />
            )}

            {popularTv?.length > 0 && (
                <MediaGrid title="Popular TV Shows" items={popularTv} limit={8} />
            )}
        </main>
    );
}

