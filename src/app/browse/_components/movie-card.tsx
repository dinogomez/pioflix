import { ImageWithFallback } from '@/components/image-w-fallback';
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Movie } from '@/types/movie';
import { Show } from '@/types/show';

interface MovieCardProps {
    movie: Movie | Show;
}

export default function MovieCard({ movie }: MovieCardProps) {
    const title = 'title' in movie ? movie.title : movie.name;

    return (
        <div className="relative group cursor-pointer">
            <AspectRatio ratio={2 / 3}>
                <ImageWithFallback
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={title}
                    fill
                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                    className="rounded-lg transition-transform duration-300 group-hover:scale-105 object-cover"
                    priority={false}
                    quality={85}
                />
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <h3 className="text-white font-semibold">{title}</h3>
                    <div className="flex items-center mt-2">
                        <span className="text-yellow-400">★</span>
                        <span className="text-white ml-1">{movie.vote_average.toFixed(1)}</span>
                    </div>
                </div>
            </AspectRatio>
        </div>
    );
}