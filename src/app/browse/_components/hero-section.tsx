"use client"

import { CircleChevronRightIcon } from "@/components/icons/chevron-right-icon";
import { Movie } from "@/types/movie";
import { Show } from "@/types/show";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from 'next-view-transitions';
import NextImage from "next/image";
import React, { useEffect, useState } from "react";

interface HeroSectionProps {
    content: Movie | Show;
}

const HeroSection: React.FC<HeroSectionProps> = ({ content: initialContent }) => {
    const [content, setContent] = useState(initialContent);
    const [nextContent, setNextContent] = useState<Movie | Show | null>(null);
    const [hasError, setHasError] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const [prefetchedContent, setPrefetchedContent] = useState<Movie | Show | null>(null);
    const isMovie = 'title' in content;
    const title = isMovie ? content.title : content.name;
    const route = isMovie ? `/browse/movie/${content.id}` : `/browse/tv/${content.id}`;

    useEffect(() => {
        setHasError(false);
    }, [content.backdrop_path]);

    const prefetchContent = async () => {
        if (prefetchedContent || isAnimating) return;

        try {
            const type = isMovie ? 'movie' : 'tv';
            const response = await fetch(`/api/random/${type}`);
            const data = await response.json();
            if (data) {
                setPrefetchedContent(data);
                const img = new Image();
                img.src = `https://image.tmdb.org/t/p/original${data.backdrop_path}`;
            }
        } catch (error) {
            console.error('Error prefetching content:', error);
        }
    };

    const fetchNewContent = async () => {
        if (isAnimating) return;

        try {
            let newContent;
            if (prefetchedContent) {
                newContent = prefetchedContent;
                setPrefetchedContent(null);
            } else {
                const type = isMovie ? 'movie' : 'tv';
                const response = await fetch(`/api/random/${type}`);
                newContent = await response.json();
            }

            if (newContent) {
                setIsAnimating(true);
                setNextContent(newContent);
                setTimeout(() => {
                    setContent(newContent);
                    setNextContent(null);
                    setIsAnimating(false);
                }, 500);
            }
        } catch (error) {
            console.error('Error fetching new content:', error);
        }
    };

    return (
        <div className="relative h-[40vh] w-full group cursor-pointer overflow-hidden">
            <div className="relative h-full w-full">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={`current-${content.id}`}
                        initial={{ x: "0%" }}
                        animate={{ x: isAnimating ? "-100%" : "0%" }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                        className="absolute top-0 left-0 w-full h-full"
                    >
                        <Link href={route}>
                            <NextImage
                                src={hasError ? "/404.png" : `https://image.tmdb.org/t/p/original${content.backdrop_path}`}
                                alt={title || "Hero Image"}
                                width={0}
                                height={0}
                                sizes="100vw"
                                className="w-full h-full object-cover rounded-md"
                                placeholder="blur"
                                blurDataURL="/load.png"
                                onError={() => setHasError(true)}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
                            <div className="absolute bottom-0 left-0 right-0 p-8 flex justify-between items-end">
                                <div>
                                    <h1 className="text-4xl font-bold mb-4">{title || "Featured Content"}</h1>
                                    <p className="text-lg max-w-2xl line-clamp-3">{content.overview}</p>
                                </div>
                            </div>
                        </Link>
                    </motion.div>
                    {nextContent && (
                        <motion.div
                            key={`next-${nextContent.id}`}
                            initial={{ x: "100%" }}
                            animate={{ x: "0%" }}
                            transition={{ duration: 0.5, ease: "easeInOut" }}
                            className="absolute top-0 left-0 w-full h-full"
                        >
                            <NextImage
                                src={`https://image.tmdb.org/t/p/original${nextContent.backdrop_path}`}
                                alt={('title' in nextContent ? nextContent.title : nextContent.name) || "Next Hero Image"}
                                width={0}
                                height={0}
                                sizes="100vw"
                                className="w-full h-full object-cover rounded-md"
                                placeholder="blur"
                                blurDataURL="/load.png"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
                            <div className="absolute bottom-0 left-0 right-0 p-8 flex justify-between items-end">
                                <div>
                                    <h1 className="text-4xl font-bold mb-4">
                                        {('title' in nextContent ? nextContent.title : nextContent.name) || "Featured Content"}
                                    </h1>
                                    <p className="text-lg max-w-2xl line-clamp-3">{nextContent.overview}</p>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
            <CircleChevronRightIcon
                className="absolute right-8 bottom-8 !p-0 text-muted-foreground hover:text-foreground scale-150 hover:!bg-transparent z-10"
                onClick={(e) => {
                    e.preventDefault();
                    if (!isAnimating) {
                        fetchNewContent();
                    }
                }}
                onMouseEnter={prefetchContent}
            />
        </div>
    );
};

export default HeroSection;