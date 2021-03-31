import { createSlice } from "@reduxjs/toolkit";
import { Movie, VisibleValues } from "../../dataTypes";
import { getMovie } from "../thunkActions/movieThunk";

type SliceState = {
  movie: Movie;
  error: string;
  visibleValues: VisibleValues;
  furtherInfo: boolean;
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
  },
  error: "",

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
    });

    builder.addCase(getMovie.rejected, (state, action) => {
      state.error = action.payload as string;
      state.movie = initialState.movie;
      state.furtherInfo = false;
    });
  },
});

export default movieSlice.reducer;
export const { setVisibleValues, hideFurtherInfo } = movieSlice.actions;
