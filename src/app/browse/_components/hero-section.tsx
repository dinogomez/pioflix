"use client"

import Image from "next/image";
import React, { useEffect, useState } from "react";

interface HeroSectionProps {
    imageSrc: string;
    title: string;
    overview: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({ imageSrc, title, overview }) => {
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        setHasError(false); // Reset error state when imageSrc changes
    }, [imageSrc]);

    return (
        <section className="relative h-[40vh] w-full">
            <div className="relative h-full w-full">
                <Image
                    src={hasError ? "/404.png" : imageSrc}
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
                <div className="absolute bottom-0 left-0 p-8">
                    <h1 className="text-4xl font-bold mb-4">{title || "Featured Content"}</h1>
                    <p className="text-lg max-w-2xl line-clamp-3">{overview}</p>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;