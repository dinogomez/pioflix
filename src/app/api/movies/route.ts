import { NextResponse } from "next/server";

const BASE_URL = "https://api.themoviedb.org/3";

export async function GET() {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/popular?language=en-US&page=1`,
      {
        headers: {
          Authorization: `Bearer ${process.env.TMDB_API_READ_ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();
    return NextResponse.json(data.results.slice(0, 6));
  } catch (error) {
    return NextResponse.json({ error: `Failed to fetch movies ${error}` }, { status: 500 });
  }
}
