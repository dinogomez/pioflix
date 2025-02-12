const baseUrl =
  process.env.NODE_ENV === "production"
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000";

async function fetchFromApi<T>(
  endpoint: string,
  revalidate: number = 1800,
  errorMessage: string
): Promise<T | null | []> {
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
      : [];
  }
}

// Simplified endpoint functions
export async function getPopularMovies() {
  return fetchFromApi(
    "/api/movies/popular",
    1800,
    "Error fetching popular movies:"
  );
}

export async function getTrendingMovies() {
  return fetchFromApi(
    "/api/movies/trending",
    1800,
    "Error fetching trending movies:"
  );
}

export async function getPopularTv() {
  return fetchFromApi(
    "/api/tv/popular",
    1800,
    "Error fetching popular TV shows:"
  );
}

export async function getTrendingTv() {
  return fetchFromApi(
    "/api/tv/trending",
    1800,
    "Error fetching trending TV shows:"
  );
}

export async function getSearchResults(query: string) {
  return fetchFromApi(
    `/api/search?query=${query}`,
    60,
    "Error fetching search results:"
  );
}

export async function getMovieDetails(id: string) {
  return fetchFromApi(
    `/api/movies/${id}`,
    3600,
    "Error fetching movie details:"
  );
}

export async function getTvShowDetails(id: string) {
  return fetchFromApi(`/api/tv/${id}`, 3600, "Error fetching TV show details:");
}
