import trendingReducer from "./slices/trendingSlice";
import userReducer from "./slices/userSlice";
import popularMoviesReducer from "./slices/popularMoviesSlice";
import popularSeriesReducer from "./slices/popularSeriesSlice";
import searchReducer from "./slices/searchSlice";
import genresReducer from "./slices/genresSlice";
import topSeriesReducer from "./slices/topRatedSeriesSlice";
import topMoviesReducer from "./slices/topRatedMoviesSlice";
import watchListReducer from "./slices/watchListSlice";
import favouriteListReducer from "./slices/favouriteList";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    user: userReducer,
    trending: trendingReducer,
    popularMovies: popularMoviesReducer,
    popularSeries: popularSeriesReducer,
    search: searchReducer,
    genres: genresReducer,
    topRatedSeries: topSeriesReducer,
    topRatedMovies: topMoviesReducer,
    watchList: watchListReducer,
    favouriteList: favouriteListReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
