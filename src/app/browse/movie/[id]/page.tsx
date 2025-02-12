import ContentDetail from "@/app/browse/_components/content-detail";
import { getMovieDetails } from "@/lib/tmdb";
import { Movie } from "@/types/movie";

type PageProps = {
    params: Promise<{
        id: string;
    }>;
};

export default async function MoviePage({ params }: PageProps) {
    const { id } = await params;
    const movie = await getMovieDetails(id) as Movie;


    if (!movie) {
        return <div>Movie not found</div>;
    }

    return <ContentDetail content={movie} />;
} 