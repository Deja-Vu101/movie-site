export interface CreateRequestToken {
  success: boolean;
  expires_at: string;
  request_token: string;
}

export interface CreateSession {
  success: boolean;
  session_id: string;
}

export interface IMoviePageResponse {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: any;
  budget: number;
  genres: Genre[];
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: SpokenLanguage[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface Genre {
  id: number;
  name: string;
}

export interface ProductionCompany {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
}

export interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}

export interface SpokenLanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}

export interface IResponseCredits {
  id: number;
  cast: Cast[];
  crew: Crew[];
}

export interface Cast {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path?: string;
  cast_id: number;
  character: string;
  credit_id: string;
  order: number;
}

export interface Crew {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path?: string;
  credit_id: string;
  department: string;
  job: string;
}

export interface IVideosResponse {
  id: number;
  results: IVideos[] | undefined;
}

export interface IVideos {
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published_at: string;
  id: string;
}

export interface IPhotosResponse {
  backdrops: Backdrop[];
  id: number;
  logos: Logo[];
  posters: Poster[];
}

export interface Backdrop {
  aspect_ratio: number;
  height: number;
  iso_639_1: any;
  file_path: string;
  vote_average: number;
  vote_count: number;
  width: number;
}

export interface Logo {
  aspect_ratio: number;
  height: number;
  iso_639_1: string;
  file_path: string;
  vote_average: number;
  vote_count: number;
  width: number;
}

export interface Poster {
  aspect_ratio: number;
  height: number;
  iso_639_1: string;
  file_path: string;
  vote_average: number;
  vote_count: number;
  width: number;
}

export interface IReviewsResponse {
  id: number;
  page: number;
  results: (IReviewsFirebase | IReviews)[];
  total_pages: number;
  total_results: number;
}

export interface IReviews {
  author: string;
  author_details: AuthorDetails;
  content: string;
  created_at: string;
  id: string;
  updated_at: string;
  url: string;
  idUser: string;
  idReview: string;
  idMovie: string;
}

export interface AuthorDetails {
  name: string;
  username: string;
  avatar_path?: string;
  rating?: number;
}

export interface IReviewsFirebase {
  idUser: string;
  idReview: string;
  idMovie: string;
  author: string;
  content: string;
  created_at: string;
}

export interface IRatingResponse {
  page: number;
  results: IRating[];
  total_pages: number;
  total_results: number;
}

export interface IRating {
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
  rating: number;
}
