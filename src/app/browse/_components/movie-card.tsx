import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Movie } from '@/types/movie';
import { Show } from '@/types/show';
import { Calendar, Clock, Star, ThumbsUp, Tv } from 'lucide-react';
import { Link } from 'next-view-transitions';
import ImageFallback from "../../_components/ImageFallback";

interface MovieCardProps {
    content: Movie | Show;
}

export default function MovieCard({ content }: MovieCardProps) {

    const isMovie = 'title' in content;
    const title = isMovie ? content.title : content.name;
    const year = 'release_date' in content ? new Date(content.release_date).getFullYear() : new Date(content.first_air_date).getFullYear();

    const badgeType = Math.random() < 0.6 ? "4K" : Math.random() < 0.8 ? "HD" : "SD";

    const route = 'title' in content ? `/browse/movie/${content.id}` : `/browse/tv/${content.id}`;

    return (
        <Link href={route} className="block [&:active]:z-30 relative">
            <div className="relative group cursor-pointer [&:active_.details-section]:opacity-0 [&:active]:pointer-events-none">
                <div className="relative z-10 transition-all duration-200 ease-in-out group-hover:scale-110 group-hover:z-20 active:scale-100 active:z-10">
                    <AspectRatio ratio={2 / 3}>
                        <ImageFallback
                            src={`https://image.tmdb.org/t/p/w500${content.poster_path}`}
                            alt={isMovie ? title : "Movie/Show"}
                            fill
                            width={0}
                            height={0}
                            sizes="100vw"
                            className="rounded-t-lg object-cover"
                            placeholder="blur"
                            blurDataURL="/load.png"
                        />
                    </AspectRatio>
                    <div className="details-section absolute w-full opacity-0 group-hover:opacity-100 active:opacity-0 transition-all duration-200 ease-in-out transform 
                        translate-y-[-1px] bg-neutral-800 rounded-b-lg group-hover:shadow-lg group-hover:shadow-blur shadow-black">
                        <div className="p-4">
                            <h3 className="text-white font-semibold text-lg flex items-center justify-between">
                                {title}
                                {badgeType && (
                                    <span className={`ml-2 border-muted-foreground border text-muted-foreground text-xs font-bold px-1 py-0.5 mb-1`}>
                                        {badgeType}
                                    </span>
                                )}
                            </h3>
                            <div className="mt-1 flex items-center text-muted-foreground text-sm">
                                {isNaN(year) ? null : (
                                    <span className="flex items-center mr-4">
                                        <Calendar className="w-4 h-4 mr-1" />
                                        {year}
                                    </span>
                                )}
                                {isMovie && (content as Movie).runtime && (
                                    <span className="flex items-center mr-4">
                                        <Clock className="w-4 h-4 mr-1" />
                                        {(content as Movie).runtime}m
                                    </span>
                                )}
                                {!isMovie && (content as Show).number_of_seasons && (
                                    <span className="flex items-center mr-4">
                                        <Tv className="w-4 h-4 mr-1" />
                                        {(content as Show).number_of_seasons} {(content as Show).number_of_seasons === 1 ? 'Season' : 'Seasons'}
                                    </span>
                                )}
                                <span className="flex items-center">
                                    <Star className="w-4 h-4" />
                                    {content.vote_average !== undefined && (
                                        <span className="ml-1">
                                            {content.vote_average.toFixed(1)}
                                        </span>
                                    )}
                                </span>
                                {isMovie && (
                                    <span className="flex items-center ml-4">
                                        <ThumbsUp className="w-4 h-4" />
                                        <span className="ml-1">
                                            {content.vote_count}
                                        </span>
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}
