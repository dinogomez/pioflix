const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://pioflix.vercel.app"
    : "http://localhost:3000";

export async function getPopularMovies() {
  const res = await fetch(`${baseUrl}/api/movies/popular`);
  const data = await res.json();
  return data;
}

export async function getTrendingMovies() {
  const res = await fetch(`${baseUrl}/api/movies/trending`);
  const data = await res.json();
  return data;
}

export async function getPopularTv() {
  const res = await fetch(`${baseUrl}/api/tv/popular`);
  const data = await res.json();
  return data;
}

export async function getTrendingTv() {
  const res = await fetch(`${baseUrl}/api/tv/trending`);
  const data = await res.json();
  return data;
}

export async function getSearchResults(query: string) {
  const res = await fetch(`${baseUrl}/api/search?query=${query}`);
  const data = await res.json();
  return data;
}
