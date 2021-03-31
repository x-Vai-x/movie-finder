export interface Movie {
  Title: string;
  Rated: string;
  Released: string;
  Runtime: string;
  imdbRating: string;
  Genre: string;
  Ratings: string;
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
  imbdRating: boolean;
  Genre: boolean;
  Ratings: boolean;
}
