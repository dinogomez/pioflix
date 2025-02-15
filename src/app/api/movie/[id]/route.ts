import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    const [movieResponse, creditsResponse] = await Promise.all([
      fetch(`${process.env.TMDB_API_BASE_URL}/movie/${id}?language=en-US`, {
        headers: {
          Authorization: `Bearer ${process.env.TMDB_API_READ_ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
      }),
      fetch(
        `${process.env.TMDB_API_BASE_URL}/movie/${id}/credits?language=en-US`,
        {
          headers: {
            Authorization: `Bearer ${process.env.TMDB_API_READ_ACCESS_TOKEN}`,
            "Content-Type": "application/json",
          },
        }
      ),
    ]);

    const [movieData, creditsData] = await Promise.all([
      movieResponse.json(),
      creditsResponse.json(),
    ]);

    return NextResponse.json({
      ...movieData,
      credits: creditsData,
    });
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to fetch movie details: ${error}` },
      { status: 500 }
    );
  }
}
