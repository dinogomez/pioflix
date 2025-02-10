// app/page.tsx
import { MovieCard } from "@/components/movie-card";
import { Movie } from "@/types/movie";

export default async function Home() {
  const movies = await fetch("http://localhost:3000/api/movies", {
    next: { revalidate: 3600 },
  }).then((res) => res.json());

  return (
    <main className="container mx-auto py-8">
      <h1 className="mb-8 text-3xl font-bold">Upcoming Movies</h1>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {movies.results.map((movie: Movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </main>
  );
}
