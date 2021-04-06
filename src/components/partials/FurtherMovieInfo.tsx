import { useSelector } from "../../redux/rootReducer";
import { shallowEqual, useDispatch } from "react-redux";
import { RatingData } from "../../dataTypes";
import MoviePlot from "./MoviePlot";
import { setVisibleValues } from "../../redux/slices/movieSlice";
import { Button, IconButton } from "@material-ui/core";

export default function FurtherMovieInfo() {
  const { usableMovieData, visibleValues } = useSelector(
    (state) => state.movies,
    shallowEqual
  );
  const dispatch = useDispatch();

  function display(name: string) {
    dispatch(setVisibleValues({ ...visibleValues, [name]: true }));
  }

  function hide(name: string) {
    dispatch(setVisibleValues({ ...visibleValues, [name]: false }));
  }

  return (
    <>
      <IconButton
        onClick={() =>
          visibleValues.Runtime ? hide("Runtime") : display("Runtime")
        }
      >
        <Button>{visibleValues.Runtime ? "Hide" : "View"} runtime.</Button>
      </IconButton>

      <IconButton
        name="Genres"
        onClick={() =>
          visibleValues.Genres ? hide("Genres") : display("Genres")
        }
      >
        <Button>{visibleValues.Genres ? "Hide" : "View"} genres.</Button>
      </IconButton>

      <IconButton
        name="Ratings"
        onClick={() =>
          visibleValues.Ratings ? hide("Ratings") : display("Ratings")
        }
      >
        <Button>{visibleValues.Ratings ? "Hide" : "View"} ratings.</Button>
      </IconButton>

      <IconButton
        onClick={() => (visibleValues.Plot ? hide("Plot") : display("Plot"))}
      >
        <Button>{visibleValues.Plot ? "Hide" : "View"} plot.</Button>
      </IconButton>

      {visibleValues.Plot ? <MoviePlot /> : ""}

      {visibleValues.Runtime ? (
        <p>Runtime: {usableMovieData.Runtime ?? "Runtime not listed"}</p>
      ) : (
        ""
      )}

      {visibleValues.Genres
        ? [
            <h2>Genres</h2>,
            <ul>
              {usableMovieData.Genres?.map((genre: string) => (
                <li key={genre}>{genre?.trim()}</li>
              )) ?? "Genres not listed"}
            </ul>,
          ]
        : ""}

      {visibleValues.Ratings
        ? [
            <h2>Ratings</h2>,
            <ul>
              {usableMovieData.Ratings?.map((rating: RatingData) => (
                <li>
                  {[
                    rating?.Source?.trim() ?? "N/A ",
                    " : ",
                    rating?.Value?.trim() ?? "N/A",
                  ]}
                </li>
              )) ?? "Other ratings not listed"}
            </ul>,
          ]
        : ""}
    </>
  );
}
