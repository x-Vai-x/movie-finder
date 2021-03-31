import { useSelector } from "../../redux/rootReducer";
import { shallowEqual } from "react-redux";
import GenreInfo from "./GenreInfo";

export default function FurtherMovieInfo() {
  const { movie, visibleValues } = useSelector(
    (state) => state.movies,
    shallowEqual
  );

  return (
    <>
      {visibleValues.Runtime ? (
        <p>`Runtime: {movie.Runtime ?? "Runtime not listed"}`</p>
      ) : (
        ""
      )}
      {visibleValues.Genres
        ? "Genres: " +
          (
            <ul>
              {movie.Genre?.split(",")?.map((genre: string) => (
                <li key={genre}>{genre}</li>
              )) ?? "Genres not listed"}
            </ul>
          )
        : ""}

      {visibleValues.Ratings
        ? "Ratings " +
          (
            <ul>
              <li>
                Imbd rating: {movie.imdbRating ?? "No IMBD rating listed"}
              </li>
              {movie.Ratings?.replace("[", "")
                ?.replace("]", "")
                ?.split(",")
                ?.map((rating) => (
                  <li>
                    {JSON.parse(rating).Source.trim() +
                      " : " +
                      JSON.parse(rating).Value.trim()}
                  </li>
                )) ?? "Other ratings not listed"}
            </ul>
          )
        : ""}
    </>
  );
}
