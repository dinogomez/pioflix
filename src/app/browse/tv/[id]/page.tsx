import ContentDetail from "@/app/browse/_components/content-detail";
import { getTvShowDetails } from "@/lib/tmdb";
import { Show } from "@/types/show";

type PageProps = {
    params: Promise<{
        id: string;
    }>;
};

export default async function TvShowPage({ params }: PageProps) {
    const { id } = await params;
    const show = await getTvShowDetails(id) as Show;

    if (!show) {
        return <div>TV Show not found</div>;
    }

    return <ContentDetail content={show} />;
} 