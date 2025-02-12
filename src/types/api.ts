import { Movie } from "./movie";
import { Show } from "./show";

export interface TMDBResponse<T> {
  results: T[];
  total_pages: number;
  page: number;
}

export interface MovieDetails extends Movie {
  runtime: number;
  budget: number;
  revenue: number;
}

export interface ShowDetails extends Show {
  episode_run_time: number[];
  number_of_episodes: number;
  number_of_seasons: number;
}
