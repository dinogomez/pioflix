import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Movie } from '@/types/movie';
import { Show } from '@/types/show';
import { Star, ThumbsUp } from 'lucide-react';
import ImageFallback from "./ImageFallback";

interface MovieCardProps {
    movie: Movie | Show;
}

export default function MovieCard({ movie }: MovieCardProps) {
    const title = 'title' in movie ? movie.title : movie.name;
    const year = 'release_date' in movie ? new Date(movie.release_date).getFullYear() : new Date(movie.first_air_date).getFullYear();

    // Generate a random number to determine badge display
    const badgeType = Math.random() < 0.6 ? "4K" : Math.random() < 0.8 ? "HD" : "SD";

    return (
        <div className="relative group cursor-pointer">
            <div className="relative z-10 transition-transform duration-300 group-hover:scale-125 group-hover:z-20">
                <AspectRatio ratio={2 / 3}>
                    <ImageFallback
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt={title ? title : "Movie/Show"}
                        fill
                        width={0}
                        height={0}
                        sizes="100vw"
                        className="rounded-t-lg object-cover"
                        placeholder="blur"
                        blurDataURL="/load.png"
                        fallbackSrc={"/image-fail.png"}
                    />
                </AspectRatio>
                <div className="absolute w-full invisible group-hover:visible transform 
                    translate-y-[-1px] bg-neutral-800 rounded-b-lg group-hover:shadow-lg group-hover:shadow-blur shadow-black">
                    <div className="p-4">
                        <h3 className="text-white font-semibold text-lg flex items-center justify-between">
                            {title}
                            {badgeType && (
                                <span className={`ml-2 bg-green-500 text-white text-xs font-bold px-2 py-1 `}>
                                    {badgeType}
                                </span>
                            )}
                        </h3>
                        <div className="mt-1 flex items-center text-muted-foreground text-sm">
                            {isNaN(year) ? null : <span className="mr-4">{year}</span>}
                            <span className="flex items-center">
                                <Star className="w-4 h-4" />
                                {movie.vote_average !== undefined && (
                                    <span className="ml-1">
                                        {movie.vote_average.toFixed(1)}
                                    </span>
                                )}
                            </span>
                            <span className="flex items-center ml-4">
                                <ThumbsUp className="w-4 h-4" />
                                <span className="ml-1">
                                    {movie.vote_count}
                                </span>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
