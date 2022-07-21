export type User = {
  id: number;
  username: string;
};

export type UserWithPasswordHash = User & {
  passwordHash: string;
};

export type Session = {
  id: number;
  token: string;
};

export type LoginResponseBody =
  | {
      errors: {
        message: string;
      }[];
    }
  | { user: { id: number; username: string } };

export type RegisterResponseBody =
  | {
      errors: {
        message: string;
      }[];
    }
  | { user: { id: number } };

export type Movie = {
  title: string;
  backdrop_path: string;
  media_type?: string;
  release_date?: string;
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
  runtime: number;
};

export type MovieResponseBody =
  | {
      errors: {
        message: string;
      }[];
    }
  | { movie: { id: number } };

export type MovieWatchlist = {
  userId: User['id'];
  movieId: Movie['id'];
  moviePoster: Movie['poster_path'];
  movieTitle: Movie['title'];
  movieRuntime: Movie['runtime'];
}[];

export type Show = {
  title: string;
  backdrop_path: string;
  media_type?: string;
  release_date?: string;
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
  episode_run_time: number;
};

export type ShowResponseBody =
  | {
      errors: {
        message: string;
      }[];
    }
  | { show: { id: number } };

export type ShowWatchlist = {
  userId: User['id'];
  showId: Show['id'];
  showPoster: Show['poster_path'];
  showTitle: Show['name'];
  showRuntime: Show['episode_run_time'];
}[];
