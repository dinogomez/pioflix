const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://pioflix.vercel.app/"
    : "http://localhost:3000";

export async function getPopularMovies() {
  const res = await fetch(
    `${baseUrl}/movie/popular?api_key=${process.env.TMDB_API_KEY}&language=en-US&page=1`
  );
  const data = await res.json();
  return data.results;
}

export async function getTrendingMovies() {
  const res = await fetch(
    `${process.env.TMDB_API_BASE_URL}/trending/movie/day?api_key=${process.env.TMDB_API_KEY}&language=en-US`
  );
  const data = await res.json();
  return data.results;
}
export async function getPopularTv() {
  const res = await fetch(
    `${process.env.TMDB_API_BASE_URL}/tv/popular?api_key=${process.env.TMDB_API_KEY}&language=en-US&page=1`
  );
  const data = await res.json();
  return data.results;
}

export async function getTrendingTv() {
  const res = await fetch(
    `${process.env.TMDB_API_BASE_URL}/trending/tv/day?api_key=${process.env.TMDB_API_KEY}&language=en-US`
  );
  const data = await res.json();
  return data.results;
}

export async function getSearchResults(query: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/search?query=${query}`
  );
  const data = await res.json();
  return data;
}
