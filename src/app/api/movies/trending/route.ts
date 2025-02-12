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
    return NextResponse.json(data.results);
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to fetch trending movies: ${error}` },
      { status: 500 }
    );
  }
}
