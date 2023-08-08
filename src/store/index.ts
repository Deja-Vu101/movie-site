import trendingReducer from "./slices/trendingSlice";
import userReducer from "./slices/userSlice";
import popularMoviesReducer from "./slices/popularMoviesSlice";
import popularSeriesReducer from "./slices/popularSeriesSlice";
import searchReducer from "./slices/searchSlice";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    user: userReducer,
    trending: trendingReducer,
    popularMovies: popularMoviesReducer,
    popularSeries: popularSeriesReducer,
    search: searchReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
