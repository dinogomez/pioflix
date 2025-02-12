import { MovieDetails, TMDBResponse } from "@/types/api";
import { Movie } from "@/types/movie";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ page: string }> }
) {
  try {
    const { page } = await params;
    const pageNumber = page || "1";

    const response = await fetch(
      `${process.env.TMDB_API_BASE_URL}/trending/movie/day?language=en-US&page=${pageNumber}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.TMDB_API_READ_ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    const data = (await response.json()) as TMDBResponse<Movie>;

    const moviesWithDetails = await Promise.all(
      data.results.map(async (movie: Movie) => {
        const detailsResponse = await fetch(
          `${process.env.TMDB_API_BASE_URL}/movie/${movie.id}?language=en-US`,
          {
            headers: {
              Authorization: `Bearer ${process.env.TMDB_API_READ_ACCESS_TOKEN}`,
              "Content-Type": "application/json",
            },
          }
        );
        const details = (await detailsResponse.json()) as MovieDetails;
        return { ...movie, ...details };
      })
    );

    return NextResponse.json({
      results: moviesWithDetails,
      total_pages: Math.min(data.total_pages, 20),
      current_page: Number(pageNumber),
    });
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to fetch trending movies: ${error}` },
      { status: 500 }
    );
  }
}
