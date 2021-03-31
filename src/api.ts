import { Movie, MovieData } from "./dataTypes";
const apikey = "5b52930c";

export default class API {
  static async getMovie(title: string): Promise<Movie> {
    title = title ?? "";
    title = title.replace(" ", "+");
    const movie = await fetch(
      `http://www.omdbapi.com/?t=${title}&plot=full&apikey=${apikey}`
    );

    const movieJSON = ((await movie.json()) as unknown) as MovieData;

    if (movieJSON.Response === "False") {
      return Promise.reject(movieJSON.Error);
    } else {
      return (movieJSON as unknown) as Movie;
    }
  }
}
