import { Movie } from "@/types/movie";
import { Show } from "@/types/show";

const baseUrl =
  process.env.NODE_ENV === "production"
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000";

async function fetchFromApi<T>(
  endpoint: string,
  revalidate: number = 1800,
  errorMessage: string
): Promise<T | null> {
  try {
    const res = await fetch(`${baseUrl}${endpoint}`, {
      next: { revalidate },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch: ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.error(errorMessage, error);
    return endpoint.includes("/movies/") || endpoint.includes("/tv/")
      ? null
      : ([] as unknown as T);
  }
}

export async function getPopularMovies(): Promise<Movie[]> {
  return (
    (await fetchFromApi<Movie[]>(
      "/api/movies/popular",
      1800,
      "Error fetching popular movies:"
    )) || []
  );
}

export async function getTrendingMovies(): Promise<Movie[]> {
  return (
    (await fetchFromApi<Movie[]>(
      "/api/movies/trending",
      1800,
      "Error fetching trending movies:"
    )) || []
  );
}

export async function getPopularTv(): Promise<Show[]> {
  return (
    (await fetchFromApi<Show[]>(
      "/api/tv/popular",
      1800,
      "Error fetching popular TV shows:"
    )) || []
  );
}

export async function getTrendingTv(): Promise<Show[]> {
  return (
    (await fetchFromApi<Show[]>(
      "/api/tv/trending",
      1800,
      "Error fetching trending TV shows:"
    )) || []
  );
}

export async function getSearchResults(
  query: string
): Promise<{ movies: Movie[]; tvShows: Show[] }> {
  return (
    (await fetchFromApi<{ movies: Movie[]; tvShows: Show[] }>(
      `/api/search?query=${query}`,
      60,
      "Error fetching search results:"
    )) || { movies: [], tvShows: [] }
  );
}

export async function getMovieDetails(id: string): Promise<Movie | null> {
  return await fetchFromApi<Movie>(
    `/api/movies/${id}`,
    3600,
    "Error fetching movie details:"
  );
}

export async function getTvShowDetails(id: string): Promise<Show | null> {
  return await fetchFromApi<Show>(
    `/api/tv/${id}`,
    3600,
    "Error fetching TV show details:"
  );
}
