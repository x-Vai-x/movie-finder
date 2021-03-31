import { useSelector } from "../../redux/rootReducer";
import { shallowEqual } from "react-redux";
import { RatingData } from "../../dataTypes";

export default function FurtherMovieInfo() {
  const { usableMovieData, visibleValues } = useSelector(
    (state) => state.movies,
    shallowEqual
  );

  return (
    <>
      {visibleValues.Runtime ? (
        <p>`Runtime: {usableMovieData.Runtime ?? "Runtime not listed"}`</p>
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
