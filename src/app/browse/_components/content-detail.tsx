"use client";

import { CheckIcon, CheckIconHandle } from "@/components/icons/check-icon";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import { Movie } from "@/types/movie";
import { Show } from "@/types/show";
import { motion } from "framer-motion";
import { Calendar, Clock, Play, Plus, Star, ThumbsUp, Tv } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import ImageFallback from "../../_components/ImageFallback";

interface ContentDetailProps {
    content: Movie | Show;
}

export default function ContentDetail({ content }: ContentDetailProps) {
    const isMovie = 'title' in content;
    const title = isMovie ? content.title : content.name;
    const releaseDate = isMovie ? content.release_date : content.first_air_date;
    const year = releaseDate ? new Date(releaseDate).getFullYear() : null;

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

    const [similarContent, setSimilarContent] = useState<(Movie | Show)[]>([]);
    const [isLoadingSimilar, setIsLoadingSimilar] = useState(true);

    useEffect(() => {
        const fetchSimilarContent = async () => {
            try {
                const type = isMovie ? 'movie' : 'tv';
                const response = await fetch(`/api/${type}/${content.id}/similar`);
                const data = await response.json();
                setSimilarContent(data.slice(0, 6));
            } catch (error) {
                console.error('Error fetching similar content:', error);
            } finally {
                setIsLoadingSimilar(false);
            }
        };

        fetchSimilarContent();
    }, [content.id, isMovie]);

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
                        <h1 className="text-3xl sm:text-4xl font-bold mb-4">{title}</h1>

                        {/* Stats and Genres in one line */}
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0 mb-6">
                            <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-muted-foreground">
                                {year && (
                                    <span className="flex items-center gap-2">
                                        <Calendar className="w-4 h-4" />
                                        {year}
                                    </span>
                                )}
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
                                    <Badge key={genre.id} variant="secondary" className="rounded-none bg-transparent border border-muted-foreground hover:border-transparent hover:bg-muted-foreground/10">
                                        {genre.name}
                                    </Badge>
                                ))}
                            </div>
                        </div>

                        <p className="text-lg mb-8">{content.overview}</p>

                        {/* Credits and Buttons */}
                        <div className="flex flex-col lg:flex-row justify-between gap-8">
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
                            <div className="space-y-4 w-full lg:w-auto flex flex-col items-center lg:items-end">
                                <motion.a
                                    href="https://www.youtube.com/watch?v=xvFZjo5PgG0"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full sm:w-64 bg-primary text-primary-foreground px-6 py-3 flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors"
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
                                    className="w-full sm:w-64 h-[48px] border border-input bg-background hover:bg-accent hover:text-accent-foreground px-6 py-3 flex items-center justify-center gap-2"
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

            {/* Additional Content Sections */}
            <div className="mt-16 space-y-12">
                {/* Cast & Crew Section */}
                <section>
                    <h2 className="text-2xl font-bold mb-6">Cast & Crew</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                        {content.credits?.cast?.slice(0, 6).map((person) => (
                            <div key={person.id} className="space-y-2">
                                <AspectRatio ratio={2 / 3}>
                                    <ImageFallback
                                        src={person.profile_path
                                            ? `https://image.tmdb.org/t/p/w500${person.profile_path}`
                                            : "/placeholder-avatar.png"}
                                        alt={person.name}
                                        fill
                                        className="rounded-lg object-cover"
                                    />
                                </AspectRatio>
                                <div>
                                    <p className="font-medium line-clamp-1">{person.name}</p>
                                    <p className="text-sm text-muted-foreground line-clamp-1">{person.character}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Similar Content Section */}
                <section className="pb-4">
                    {similarContent.length > 0 && (
                        <>
                            <h2 className="text-2xl font-bold mb-6">More Like This</h2>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                                {isLoadingSimilar ? (
                                    Array.from({ length: 6 }).map((_, index) => (
                                        <div key={index} className="space-y-2">
                                            <AspectRatio ratio={2 / 3}>
                                                <div className="rounded-lg bg-muted animate-pulse" />
                                            </AspectRatio>
                                            <div className="space-y-2">
                                                <div className="h-4 w-3/4 bg-muted rounded animate-pulse" />
                                                <div className="h-3 w-1/2 bg-muted rounded animate-pulse" />
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    similarContent.map((item) => {
                                        const itemYear = isMovie
                                            ? (item as Movie).release_date
                                                ? new Date((item as Movie).release_date).getFullYear()
                                                : null
                                            : (item as Show).first_air_date
                                                ? new Date((item as Show).first_air_date).getFullYear()
                                                : null;

                                        return (
                                            <Link
                                                key={item.id}
                                                href={`/browse/${isMovie ? 'movie' : 'tv'}/${item.id}`}
                                                className="space-y-2 transition-opacity hover:opacity-70"
                                            >
                                                <AspectRatio ratio={2 / 3}>
                                                    <ImageFallback
                                                        src={item.poster_path
                                                            ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
                                                            : "/placeholder-poster.png"}
                                                        alt={isMovie ? (item as Movie).title : (item as Show).name}
                                                        fill
                                                        className="rounded-lg object-cover"
                                                    />
                                                </AspectRatio>
                                                <div>
                                                    <p className="font-medium line-clamp-1">
                                                        {isMovie ? (item as Movie).title : (item as Show).name}
                                                    </p>
                                                    {itemYear && (
                                                        <p className="text-sm text-muted-foreground">
                                                            {itemYear}
                                                        </p>
                                                    )}
                                                </div>
                                            </Link>
                                        );
                                    })
                                )}
                            </div>
                        </>
                    )}
                </section>
            </div>
        </div>
    );
} 