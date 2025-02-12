import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetch(
      `${process.env.TMDB_API_BASE_URL}/trending/tv/day?language=en-US`,
      {
        headers: {
          Authorization: `Bearer ${process.env.TMDB_API_READ_ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();

    const showsWithDetails = await Promise.all(
      data.results.map(async (show: any) => {
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
      { error: `Failed to fetch trending TV shows: ${error}` },
      { status: 500 }
    );
  }
}
