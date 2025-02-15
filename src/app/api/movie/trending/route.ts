import { Movie } from "@/types/movie";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetch(
      `${process.env.TMDB_API_BASE_URL}/trending/movie/day?language=en-US`,
      {
        headers: {
          Authorization: `Bearer ${process.env.TMDB_API_READ_ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();

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
        const details = await detailsResponse.json();
        return { ...movie, ...details };
      })
    );

    return NextResponse.json(moviesWithDetails);
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to fetch trending movies: ${error}` },
      { status: 500 }
    );
  }
}
