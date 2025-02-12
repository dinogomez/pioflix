import { Creator, Credits, Genre } from "./misc";

export interface Show {
  adult: boolean;
  id: number;
  name: string;
  original_name: string;
  backdrop_path: string;
  poster_path: string;
  overview: string;
  vote_average: number;
  first_air_date: string;
  number_of_seasons?: number;
  number_of_episodes?: number;
  vote_count: number;
  genres: Genre[];
  credits?: Credits;
  created_by?: Creator[];
}
