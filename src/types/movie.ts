import { Credits, Genre } from "./misc";

export interface Movie {
  adult: boolean;
  id: number;
  title: string;
  backdrop_path: string;
  overview: string;
  poster_path: string;
  vote_average: number;
  release_date: string;
  vote_count: number;
  genres: Genre[];
  credits?: Credits;
  runtime?: number;
}
