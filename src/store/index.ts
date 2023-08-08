import trendingReducer from "./slices/trendingSlice";
import userReducer from "./slices/userSlice";
import popularMoviesReducer from "./slices/popularMovies";
import popularSeriesReducer from "./slices/popularSeries";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    user: userReducer,
    trending: trendingReducer,
    popularMovies: popularMoviesReducer,
    popularSeries: popularSeriesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
