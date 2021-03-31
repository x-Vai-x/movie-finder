import { useSelector } from "../../redux/rootReducer";
import { shallowEqual } from "react-redux";

export default function MovieInfo() {
  const { movie } = useSelector((state) => state.movies, shallowEqual);
  return (
    <>
      <h1>Title: {movie.Title}</h1>
      <p>Rated: {movie.Rated ?? "N/A"}</p>
      <p>Released: {movie.Released ?? "N/A"}</p>
    </>
  );
}
