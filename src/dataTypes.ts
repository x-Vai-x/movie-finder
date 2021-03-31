export interface Movie {
  Title: string;
  Rated: string;
  Released: string;
  Runtime: string;
  imdbRating: string;
  Genre: string;
  Ratings: string;
}

export interface RatingData {
  Source: string;
  Value: string;
}

export interface UsableMovieData {
  Title: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genres: string[];
  Ratings: RatingData[];
}

export interface MovieData {
  Title?: string;
  Year?: string;
  Rated?: string;
  Released?: string;
  Genre?: string;
  Response: string;
  Error?: string;
}

export interface VisibleValues {
  Runtime: boolean;
  Genres: boolean;
  Ratings: boolean;
}
