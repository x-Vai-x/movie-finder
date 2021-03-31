import API from "../../api";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getMovie = createAsyncThunk(
  "movies/",
  async (title: string, { rejectWithValue }) => {
    const movie = await API.getMovie(title).catch((err) => {
      return rejectWithValue(err);
    });
    return movie;
  }
);
