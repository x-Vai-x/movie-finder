import React from "react";
import MovieFinder from "../partials/MovieFinder";
import { useSelector } from "../../redux/rootReducer";
import { shallowEqual } from "react-redux";
import MovieInfo from "../partials/MovieInfo";

export default function MoviesPage() {
  const { error } = useSelector((state) => state.movies, shallowEqual);
  return (
    <>
      <MovieFinder />
      {error && error !== "" ? error : <MovieInfo />}
    </>
  );
}
