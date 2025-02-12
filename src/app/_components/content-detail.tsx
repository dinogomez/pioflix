"use client";

import { CheckIcon, CheckIconHandle } from "@/components/icons/check";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import { Movie } from "@/types/movie";
import { Show } from "@/types/show";
import { motion } from "framer-motion";
import { Calendar, Clock, Play, Plus, Star, ThumbsUp, Tv } from "lucide-react";
import { useRef, useState } from "react";
import ImageFallback from "./ImageFallback";

interface ContentDetailProps {
    content: Movie | Show;
}

export default function ContentDetail({ content }: ContentDetailProps) {
    const isMovie = 'title' in content;
    const title = isMovie ? content.title : content.name;
    const releaseDate = isMovie ? content.release_date : content.first_air_date;
    const year = new Date(releaseDate).getFullYear();

    const director = isMovie && content.credits?.crew.find(crew => crew.job === "Director");
    const writers = isMovie && content.credits?.crew.filter(crew =>
        crew.department === "Writing" || crew.job === "Screenplay" || crew.job === "Writer"
    );

    const creators = !isMovie && (content as Show).created_by;

    const topCast = content.credits?.cast
        ?.sort((a, b) => a.order - b.order)
        ?.slice(0, 3) || [];

    const [isFavorite, setIsFavorite] = useState(false);
    const checkIconRef = useRef<CheckIconHandle>(null);

    return (
        <div className="min-h-screen bg-background">
            <div className="relative h-[60vh] w-full">
                <ImageFallback
                    src={`https://image.tmdb.org/t/p/original${content.backdrop_path}`}
                    alt={title}
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
            </div>

            <div className="relative z-10 px-4 lg:px-8 -mt-32">
                <div className="flex flex-col md:flex-row gap-8">
                    {/* Poster */}
                    <div className="w-full md:w-1/4">
                        <AspectRatio ratio={2 / 3}>
                            <ImageFallback
                                src={`https://image.tmdb.org/t/p/w500${content.poster_path}`}
                                alt={title}
                                fill
                                className="rounded-lg object-cover"
                            />
                        </AspectRatio>
                    </div>

                    {/* Info */}
                    <div className="w-full md:w-3/4">
                        <h1 className="text-4xl font-bold mb-4">{title}</h1>

                        {/* Stats and Genres in one line */}
                        <div className="flex justify-between items-center mb-6">
                            <div className="flex items-center gap-6 text-muted-foreground">
                                <span className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4" />
                                    {year}
                                </span>
                                {isMovie && content.runtime && (
                                    <span className="flex items-center gap-2">
                                        <Clock className="w-4 h-4" />
                                        {content.runtime}m
                                    </span>
                                )}
                                <span className="flex items-center gap-2">
                                    <Star className="w-4 h-4" />
                                    {(content.vote_average ?? 0).toFixed(1)}
                                </span>
                                <span className="flex items-center gap-2">
                                    <ThumbsUp className="w-4 h-4" />
                                    {content.vote_count ?? 0}
                                </span>
                                {!isMovie && (content as Show).number_of_seasons && (
                                    <span className="flex items-center gap-2">
                                        <Tv className="w-4 h-4" />
                                        {(content as Show).number_of_seasons} Seasons
                                    </span>
                                )}
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {content.genres?.map((genre) => (
                                    <Badge key={genre.id} variant="secondary">
                                        {genre.name}
                                    </Badge>
                                ))}
                            </div>
                        </div>

                        <p className="text-lg mb-8">{content.overview}</p>

                        {/* Credits and Buttons */}
                        <div className="flex justify-between">
                            <div className="space-y-4">
                                {isMovie && director && (
                                    <div>
                                        <h3 className="text-sm text-muted-foreground">Director</h3>
                                        <p className="text-foreground">{director.name}</p>
                                    </div>
                                )}

                                {isMovie && writers && writers.length > 0 && (
                                    <div>
                                        <h3 className="text-sm text-muted-foreground">Writers</h3>
                                        <p className="text-foreground">
                                            {writers.map(writer => writer.name).join(', ')}
                                        </p>
                                    </div>
                                )}

                                {!isMovie && creators && creators.length > 0 && (
                                    <div>
                                        <h3 className="text-sm text-muted-foreground">Creators</h3>
                                        <p className="text-foreground">
                                            {creators.map(creator => creator.name).join(', ')}
                                        </p>
                                    </div>
                                )}

                                {topCast.length > 0 && (
                                    <div>
                                        <h3 className="text-sm text-muted-foreground">Stars</h3>
                                        <p className="text-foreground">
                                            {topCast.map(actor => actor.name).join(', ')}
                                        </p>
                                    </div>
                                )}
                            </div>

                            {/* Action Buttons */}
                            <div className="space-y-4">
                                <motion.a
                                    href="https://www.youtube.com/watch?v=xvFZjo5PgG0"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-64 bg-primary text-primary-foreground px-6 py-3 flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <Play className="w-5 h-5" />
                                    <span>Watch now</span>
                                </motion.a>
                                <motion.button
                                    onClick={() => {
                                        setIsFavorite(prev => !prev);
                                        if (!isFavorite) {
                                            checkIconRef.current?.startAnimation();
                                        }
                                    }}
                                    className="w-64 h-[48px] border border-input bg-background hover:bg-accent hover:text-accent-foreground px-6 py-3 flex items-center justify-center gap-2"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    {isFavorite ? <CheckIcon ref={checkIconRef} /> : <Plus className="w-5 h-5" />}
                                    <span>
                                        {isFavorite ? 'Favorite' : 'Add Favorite'}
                                    </span>
                                </motion.button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
} 