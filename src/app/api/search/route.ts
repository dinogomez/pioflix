import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query");

  if (!query) {
    return NextResponse.json({ movies: [], tvShows: [] });
  }

  try {
    const [moviesResponse, tvShowsResponse] = await Promise.all([
      fetch(
        `${process.env.TMDB_API_BASE_URL}/search/movie?query=${query}&language=en-US&page=1&sort_by=popularity.desc`,
        {
          headers: {
            Authorization: `Bearer ${process.env.TMDB_API_READ_ACCESS_TOKEN}`,
            "Content-Type": "application/json",
          },
        }
      ),
      fetch(
        `${process.env.TMDB_API_BASE_URL}/search/tv?query=${query}&language=en-US&page=1&sort_by=popularity.desc`,
        {
          headers: {
            Authorization: `Bearer ${process.env.TMDB_API_READ_ACCESS_TOKEN}`,
            "Content-Type": "application/json",
          },
        }
      ),
    ]);

    const [movies, tvShows] = await Promise.all([
      moviesResponse.json(),
      tvShowsResponse.json(),
    ]);

    return NextResponse.json({
      movies: movies.results,
      tvShows: tvShows.results,
    });
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to fetch search results ${error}` },
      { status: 500 }
    );
  }
}
