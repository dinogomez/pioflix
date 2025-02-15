import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    const [showResponse, creditsResponse] = await Promise.all([
      fetch(`${process.env.TMDB_API_BASE_URL}/tv/${id}?language=en-US`, {
        headers: {
          Authorization: `Bearer ${process.env.TMDB_API_READ_ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
      }),
      fetch(
        `${process.env.TMDB_API_BASE_URL}/tv/${id}/credits?language=en-US`,
        {
          headers: {
            Authorization: `Bearer ${process.env.TMDB_API_READ_ACCESS_TOKEN}`,
            "Content-Type": "application/json",
          },
        }
      ),
    ]);

    const [showData, creditsData] = await Promise.all([
      showResponse.json(),
      creditsResponse.json(),
    ]);

    return NextResponse.json({
      ...showData,
      credits: creditsData,
    });
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to fetch TV show details: ${error}` },
      { status: 500 }
    );
  }
}
