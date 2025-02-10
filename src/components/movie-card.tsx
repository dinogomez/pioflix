import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Movie } from "@/types/movie";
import Image from "next/image";
import { Badge } from "./ui/badge";

interface MovieCardProps {
    movie: Movie;
}

export function MovieCard({ movie }: MovieCardProps) {
    return (
        <Card className="h-full overflow-hidden transition-all hover:scale-[1.02]">
            <CardHeader className="p-0">
                <div className="relative aspect-[2/3] w-full">
                    <Image
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt={movie.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                </div>
            </CardHeader>
            <CardContent className="p-4">
                <h3 className="font-semibold line-clamp-1">{movie.title}</h3>
                <div className="mt-2 flex items-center gap-2">
                    <Badge variant="secondary">
                        {new Date(movie.release_date).getFullYear()}
                    </Badge>
                    <Badge variant="secondary" className="flex items-center gap-1">
                        ⭐ {movie.vote_average.toFixed(1)}
                    </Badge>
                </div>
                <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                    {movie.overview}
                </p>
            </CardContent>
        </Card>
    );
}