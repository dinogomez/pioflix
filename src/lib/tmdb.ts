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
      "/api/movie/popular",
      1800,
      "Error fetching popular movies:"
    )) || []
  );
}

export async function getTrendingMovies(): Promise<Movie[]> {
  return (
    (await fetchFromApi<Movie[]>(
      "/api/movie/trending",
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
    `/api/movie/${id}`,
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

export async function getPopularMoviesByPage(page: number = 1): Promise<{
  movies: Movie[];
  totalPages: number;
  currentPage: number;
}> {
  const data = await fetchFromApi<{
    results: Movie[];
    total_pages: number;
    current_page: number;
  }>(`/api/movie/popular/${page}`, 1800, "Error fetching popular movies:");

  return {
    movies: data?.results || [],
    totalPages: data?.total_pages || 1,
    currentPage: data?.current_page || 1,
  };
}

export async function getTrendingMoviesByPage(page: number = 1): Promise<{
  movies: Movie[];
  totalPages: number;
  currentPage: number;
}> {
  const data = await fetchFromApi<{
    results: Movie[];
    total_pages: number;
    current_page: number;
  }>(`/api/movie/trending/${page}`, 1800, "Error fetching trending movies:");

  return {
    movies: data?.results || [],
    totalPages: data?.total_pages || 1,
    currentPage: data?.current_page || 1,
  };
}

export async function getPopularTvByPage(page: number = 1): Promise<{
  shows: Show[];
  totalPages: number;
  currentPage: number;
}> {
  const data = await fetchFromApi<{
    results: Show[];
    total_pages: number;
    current_page: number;
  }>(`/api/tv/popular/${page}`, 1800, "Error fetching popular TV shows:");

  return {
    shows: data?.results || [],
    totalPages: data?.total_pages || 1,
    currentPage: data?.current_page || 1,
  };
}

export async function getTrendingTvByPage(page: number = 1): Promise<{
  shows: Show[];
  totalPages: number;
  currentPage: number;
}> {
  const data = await fetchFromApi<{
    results: Show[];
    total_pages: number;
    current_page: number;
  }>(`/api/tv/trending/${page}`, 1800, "Error fetching trending TV shows:");

  return {
    shows: data?.results || [],
    totalPages: data?.total_pages || 1,
    currentPage: data?.current_page || 1,
  };
}
