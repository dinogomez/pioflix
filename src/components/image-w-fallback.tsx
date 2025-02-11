'use client';

import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import Image, { ImageProps } from 'next/image';
import { useEffect, useState } from 'react';

interface ImageWithFallbackProps extends ImageProps {
    fallbackSrc?: string;
    alt: string;
}

export const ImageWithFallback = ({
    src,
    fallbackSrc = '/404.png',
    alt,
    ...props
}: ImageWithFallbackProps) => {
    const [imgSrc, setImgSrc] = useState<string | StaticImport | null>(null);

    useEffect(() => {
        setImgSrc(src);
    }, [src]);

    return (
        <Image
            {...props}
            src={imgSrc || fallbackSrc}
            alt={alt ? alt : 'Image with Fallback'}
            onError={() => {
                setImgSrc(fallbackSrc);
            }}
            loading='lazy'
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRoaHSQtJSAyUC0zLyYuLy0xPDZCNzIrLjM9RUVQWUJFTVJPUlVeYV5RTl9wdXD/2wBDARUXFyAeIBohHiAuIjUyLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi7/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
        />
    );
};