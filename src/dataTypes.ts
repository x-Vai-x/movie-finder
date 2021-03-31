export interface Movie {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Genre: string;
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
