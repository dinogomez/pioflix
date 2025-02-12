import { ShowDetails, TMDBResponse } from "@/types/api";
import { Show } from "@/types/show";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { page: string } }
) {
  try {
    const page = params.page || "1";

    const response = await fetch(
      `${process.env.TMDB_API_BASE_URL}/trending/tv/day?language=en-US&page=${page}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.TMDB_API_READ_ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    const data = (await response.json()) as TMDBResponse<Show>;

    const showsWithDetails = await Promise.all(
      data.results.map(async (show: Show) => {
        const detailsResponse = await fetch(
          `${process.env.TMDB_API_BASE_URL}/tv/${show.id}?language=en-US`,
          {
            headers: {
              Authorization: `Bearer ${process.env.TMDB_API_READ_ACCESS_TOKEN}`,
              "Content-Type": "application/json",
            },
          }
        );
        const details = (await detailsResponse.json()) as ShowDetails;
        return { ...show, ...details };
      })
    );

    return NextResponse.json({
      results: showsWithDetails,
      total_pages: Math.min(data.total_pages, 20),
      current_page: Number(page),
    });
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to fetch trending TV shows: ${error}` },
      { status: 500 }
    );
  }
}
