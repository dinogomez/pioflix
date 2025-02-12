const baseUrl =
  process.env.NODE_ENV === "production"
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000";

export async function getPopularMovies() {
  try {
    const res = await fetch(`${baseUrl}/api/movies/popular`, {
      next: { revalidate: 1800 },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch: ${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching popular movies:", error);
    return [];
  }
}

export async function getTrendingMovies() {
  try {
    const res = await fetch(`${baseUrl}/api/movies/trending`, {
      next: { revalidate: 1800 },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch: ${res.status}`);
    }

    const data = await res.json();

    return data;
  } catch (error) {
    console.error("Error fetching trending movies:", error);
    return [];
  }
}

export async function getPopularTv() {
  try {
    const res = await fetch(`${baseUrl}/api/tv/popular`, {
      next: { revalidate: 1800 },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch: ${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching popular TV shows:", error);
    return [];
  }
}

export async function getTrendingTv() {
  try {
    const res = await fetch(`${baseUrl}/api/tv/trending`, {
      next: { revalidate: 1800 },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch: ${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching trending TV shows:", error);
    return [];
  }
}

export async function getSearchResults(query: string) {
  try {
    const res = await fetch(`${baseUrl}/api/search?query=${query}`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch: ${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching search results:", error);
    return [];
  }
}

export async function getMovieDetails(id: string) {
  try {
    const res = await fetch(`${baseUrl}/api/movies/${id}`, {
      next: { revalidate: 3600 },
    });

    if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`);
    return await res.json();
  } catch (error) {
    console.error("Error fetching movie details:", error);
    return null;
  }
}

export async function getTvShowDetails(id: string) {
  try {
    const res = await fetch(`${baseUrl}/api/tv/${id}`, {
      next: { revalidate: 3600 },
    });

    if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`);
    return await res.json();
  } catch (error) {
    console.error("Error fetching TV show details:", error);
    return null;
  }
}
