import { createSlice } from "@reduxjs/toolkit";
import {
  Movie,
  VisibleValues,
  UsableMovieData,
  RatingData,
} from "../../dataTypes";
import { getMovie } from "../thunkActions/movieThunk";

type SliceState = {
  movie: Movie;
  usableMovieData: UsableMovieData;
  error: string;
  visibleValues: VisibleValues;
  furtherInfo: boolean;
  searched: boolean;
};

const initialState: SliceState = {
  movie: {
    Title: "",
    Rated: "",
    Released: "",
    Runtime: "",
    imdbRating: "",
    Genre: "",
    Ratings: "",
    Plot: "",
  },
  usableMovieData: {
    Title: "",
    Rated: "",
    Released: "",
    Runtime: "",
    Genres: [],
    Ratings: [],
    Plot: [],
  },
  error: "",
  searched: false,

  visibleValues: {
    Runtime: false,
    Genres: false,
    Ratings: false,
  },
  furtherInfo: false,
};

const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    setVisibleValues(state, action) {
      state.visibleValues = action.payload;
      state.furtherInfo = true;

      state.usableMovieData = {
        ...state.movie,
        Genres: state.movie.Genre?.replace(/['"]+/g, "")?.split(",") ?? [],
        Plot:
          state.movie.Plot?.match(/.{1,200}(?=(.{200})+(?!.))|.{1,200}$/g) ??
          null,
        Ratings:
          JSON.stringify(state.movie.Ratings)
            ?.replace("[", "")
            ?.replace("]", "")
            ?.split("}")
            ?.filter((rating) => {
              return rating.replace("{", "")?.replace("}", "")?.trim();
            })
            ?.map((rating) => {
              return (JSON.parse(
                "{" +
                  rating
                    .replace(/,+/g, "")
                    ?.replace("}", "")
                    ?.replace("{", "")
                    ?.replace(/""/, `","`)
                    ?.trim() +
                  "}"
              ) as unknown) as RatingData;
            }) ?? [],
      };
    },

    hideFurtherInfo(state) {
      state.furtherInfo = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getMovie.fulfilled, (state, action) => {
      state.error = "";
      state.movie = action.payload;
      state.furtherInfo = false;
      state.searched = true;
    });

    builder.addCase(getMovie.rejected, (state, action) => {
      state.error = action.payload as string;
      state.movie = initialState.movie;
      state.furtherInfo = false;
      state.searched = false;
    });
  },
});

export default movieSlice.reducer;
export const { setVisibleValues, hideFurtherInfo } = movieSlice.actions;
