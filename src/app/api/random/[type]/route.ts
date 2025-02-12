import { getPopularMovies, getPopularTv } from "@/lib/tmdb";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { type: string } }
) {
  try {
    const type = params.type;
    let content;

    if (type === "movie") {
      const movies = await getPopularMovies();
      content = movies?.filter((movie) => movie?.backdrop_path && movie?.title);
    } else {
      const shows = await getPopularTv();
      content = shows?.filter((show) => show?.backdrop_path && show?.name);
    }

    if (!content || content.length === 0) {
      return NextResponse.json({ error: "No content found" }, { status: 404 });
    }

    const randomContent = content[Math.floor(Math.random() * content.length)];
    return NextResponse.json(randomContent);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
