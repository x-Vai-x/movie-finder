import { createSlice } from "@reduxjs/toolkit";
import { Movie } from "../../dataTypes";
import { getMovie } from "../thunkActions/movieThunk";

type SliceState = { movie: Movie; error: string };

const initialState: SliceState = {
  movie: { Title: "", Rated: "", Released: "", Genre: "" },
  error: "",
};

const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {},
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
