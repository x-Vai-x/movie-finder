import { combineReducers } from "redux";
import { createSelectorHook } from "react-redux";

import movieReducer from "./slices/movieSlice";

const rootReducer = combineReducers({
  movies: movieReducer,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
export const useSelector = createSelectorHook<RootState>();
