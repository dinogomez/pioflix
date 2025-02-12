import { Show } from "@/types/show";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetch(
      `${process.env.TMDB_API_BASE_URL}/tv/popular?language=en-US&page=1`,
      {
        headers: {
          Authorization: `Bearer ${process.env.TMDB_API_READ_ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();

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
        const details = await detailsResponse.json();
        return { ...show, number_of_seasons: details.number_of_seasons };
      })
    );

    return NextResponse.json(showsWithDetails);
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to fetch popular TV shows: ${error}` },
      { status: 500 }
    );
  }
}
