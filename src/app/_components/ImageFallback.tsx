"use client";

import Image from 'next/image';
import { useEffect, useState } from 'react';

interface ImageFallbackProps {
    src: string;
    fallbackSrc: string;
    [key: string]: string;
}

const ImageFallback: React.FC<ImageFallbackProps> = (props) => {
    const { src, fallbackSrc, ...rest } = props;
    const [imgSrc, setImgSrc] = useState(false);
    const [oldSrc, setOldSrc] = useState(src);

    // Update imgSrc and oldSrc when src changes
    useEffect(() => {
        if (oldSrc !== src) {
            setImgSrc(false);
            setOldSrc(src);
        }
    }, [src, oldSrc]);

    return (
        <Image
            {...rest}
            src={imgSrc ? fallbackSrc : src}
            alt={rest.alt || 'Image fallback'}
            onError={() => {
                setImgSrc(true);
            }}
        />
    );
}
export default ImageFallback;


//Sourced from https://stackoverflow.com/questions/66949606/what-is-the-best-way-to-have-a-fallback-image-in-nextjs