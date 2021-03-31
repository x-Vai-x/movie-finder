import { createSlice } from "@reduxjs/toolkit";
import { Movie, VisibleValues } from "../../dataTypes";
import { getMovie } from "../thunkActions/movieThunk";

type SliceState = { movie: Movie; error: string; visibleValues: VisibleValues };

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
    imbdRating: false,
    Genre: false,
    Ratings: false,
  },
};

const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    setVisibleValues(state, action) {
      state.visibleValues = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getMovie.fulfilled, (state, action) => {
      state.error = "";
      state.movie = action.payload;
    });

    builder.addCase(getMovie.rejected, (state, action) => {
      state.error = action.payload as string;
      state.movie = initialState.movie;
    });
  },
});

export default movieSlice.reducer;
