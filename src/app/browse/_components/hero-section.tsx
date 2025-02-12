"use client"

import { CircleChevronRightIcon } from "@/components/icons/chevron-right-icon";
import { Movie } from "@/types/movie";
import { Show } from "@/types/show";
import { Link } from 'next-view-transitions';
import Image from "next/image";
import React, { useEffect, useState } from "react";

interface HeroSectionProps {
    content: Movie | Show;
}

const HeroSection: React.FC<HeroSectionProps> = ({ content }) => {
    const [hasError, setHasError] = useState(false);
    const isMovie = 'title' in content;
    const title = isMovie ? content.title : content.name;
    const route = isMovie ? `/browse/movie/${content.id}` : `/browse/tv/${content.id}`;

    useEffect(() => {
        setHasError(false);
    }, [content.backdrop_path]);

    return (
        <Link href={route}>
            <section className="relative h-[40vh] w-full group cursor-pointer">
                <div className="relative h-full w-full">
                    <Image
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
                        <CircleChevronRightIcon className="!p-0 text-muted-foreground hover:text-foreground scale-150 hover:!bg-transparent" />
                    </div>
                </div>
            </section>
        </Link>
    );
};

export default HeroSection;