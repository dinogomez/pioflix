import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { getPopularTvByPage } from '@/lib/tmdb';
import { redirect } from 'next/navigation';
import { use } from 'react';
import { MediaGrid } from "../../_components/media-grid";

interface PageProps {
    searchParams: Promise<{ page?: string }>;
}

export default function PopularTvPage({
    searchParams,
}: PageProps) {
    const { page } = use(searchParams);
    const currentPage = Number(page) || 1;
    const { shows: validShows, totalPages: originalTotalPages } = use(getPopularTvByPage(currentPage));
    const totalPages = Math.min(originalTotalPages, 20);

    if (currentPage > totalPages) {
        redirect('/browse/tv/popular?page=1');
    }

    return (
        <div className="min-h-screen bg-background pt-5">
            <div className="px-4">
                <h1 className="text-3xl font-bold px-4 pt-4">Popular TV Shows</h1>
                <MediaGrid
                    title=""
                    items={validShows}
                />
                <div className="pt-20 pb-10">
                    <Pagination>
                        <PaginationContent>
                            {currentPage > 1 && (
                                <PaginationItem>
                                    <PaginationPrevious href={`/browse/tv/popular?page=${currentPage - 1}`} />
                                </PaginationItem>
                            )}

                            {[...Array(totalPages)].map((_, i) => {
                                const pageNumber = i + 1;
                                if (
                                    pageNumber === 1 ||
                                    pageNumber === totalPages ||
                                    (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
                                ) {
                                    return (
                                        <PaginationItem key={pageNumber}>
                                            <PaginationLink
                                                href={`/browse/tv/popular?page=${pageNumber}`}
                                                isActive={pageNumber === currentPage}
                                            >
                                                {pageNumber}
                                            </PaginationLink>
                                        </PaginationItem>
                                    );
                                } else if (
                                    pageNumber === currentPage - 2 ||
                                    pageNumber === currentPage + 2
                                ) {
                                    return (
                                        <PaginationItem key={pageNumber}>
                                            <PaginationEllipsis />
                                        </PaginationItem>
                                    );
                                }
                                return null;
                            })}

                            {currentPage < totalPages && (
                                <PaginationItem>
                                    <PaginationNext href={`/browse/tv/popular?page=${currentPage + 1}`} />
                                </PaginationItem>
                            )}
                        </PaginationContent>
                    </Pagination>
                </div>
            </div>
        </div>
    );
} 