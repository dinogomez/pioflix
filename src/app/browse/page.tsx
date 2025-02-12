import { getPopularMovies, getPopularTv } from "@/lib/tmdb";
import HeroSection from "../_components/hero-section";
import { MediaGrid } from "../_components/media-grid";

export default async function BrowsePage() {
    const popularMoviesPromise = getPopularMovies();
    const popularTvPromise = getPopularTv();

    const [popularMovies, popularTv] = await Promise.all([
        popularMoviesPromise,
        popularTvPromise,
    ]);

    const allContent = [...popularMovies, ...popularTv];
    const randomHeroContent =
        allContent[Math.floor(Math.random() * allContent.length)];

    return (
        <main className="min-h-screen bg-background pt-5">
            <HeroSection
                imageSrc={`https://image.tmdb.org/t/p/original${randomHeroContent.backdrop_path}`}
                title={randomHeroContent.title || randomHeroContent.name}
                overview={randomHeroContent.overview}
            />

            <MediaGrid title="Popular Movies" items={popularMovies} limit={8} />

            <MediaGrid title="Popular TV Shows" items={popularTv} limit={8} />
        </main>
    );
}

