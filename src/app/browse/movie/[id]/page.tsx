import ContentDetail from "@/app/_components/content-detail";
import { getMovieDetails } from "@/lib/tmdb";

type PageProps = {
    params: Promise<{
        id: string;
    }>;
};

export default async function MoviePage({ params }: PageProps) {
    const { id } = await params;
    const movie = await getMovieDetails(id);


    if (!movie) {
        return <div>Movie not found</div>;
    }

    return <ContentDetail content={movie} />;
} 