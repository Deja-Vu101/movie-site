export interface IMovieResponse {
  page: number;
  results: IMovie[];
  total_pages: number;
  total_results: number;
}

export interface IMovie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface ISeriesResponse {
  page: number;
  results: ISeries[];
  total_pages: number;
  total_results: number;
}

export interface ISeries {
  backdrop_path?: string;
  first_air_date: string;
  genre_ids: number[];
  id: number;
  name: string;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  vote_average: number;
  vote_count: number;
}

export interface IPerson {
  page: number;
  results: IPersonItem[];
  total_pages: number;
  total_results: number;
}

export interface IPersonItem {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: any;
  known_for: IMovie[] | ISeries[];
}

export interface ITopRatedResponse {
  page: number;
  results: ISeries[];
  total_pages: number;
  total_results: number;
}
