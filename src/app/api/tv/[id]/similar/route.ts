import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    const response = await fetch(
      `${process.env.TMDB_API_BASE_URL}/tv/${id}/similar?language=en-US&page=1`,
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
      { error: `Failed to fetch similar TV shows: ${error}` },
      { status: 500 }
    );
  }
}
