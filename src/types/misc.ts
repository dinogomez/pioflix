export interface Genre {
  id: number;
  name: string;
}

export interface Credits {
  cast: Cast[];
  crew: Crew[];
}

export interface Cast {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
  order: number;
}

export interface Crew {
  id: number;
  name: string;
  job: string;
  department: string;
  profile_path: string | null;
}

export interface Creator {
  id: number;
  name: string;
  profile_path: string | null;
}
