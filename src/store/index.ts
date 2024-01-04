import trendingReducer from "./slices/trendingSlice";
import userReducer from "./slices/userSlice";
import popularMoviesReducer from "./slices/popularMoviesSlice";
import popularSeriesReducer from "./slices/popularSeriesSlice";
import searchReducer from "./slices/searchSlice";
import genresReducer from "./slices/genresSlice";
import topSeriesReducer from "./slices/topRatedSeriesSlice";
import topMoviesReducer from "./slices/topRatedMoviesSlice";
import watchListReducer from "./slices/watchListSlice";
import favoriteListReducer from "./slices/favoriteSlice";
import movieReducer from "./slices/movieSlice";
import seriesReducer from "./slices/seriesSlice";
import actorsReducer from "./slices/actorsSlice";
import videosReducer from "./slices/videosSlice";
import photosReducer from "./slices/photosSlice";
import reviewsReducer from "./slices/reviewsSlice";
import ratingReducer from "./slices/ratingSlice";
import recommendationsReducer from "./slices/recommendationsSlice";
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
    favoriteList: favoriteListReducer,
    movie: movieReducer,
    series: seriesReducer,
    actors: actorsReducer,
    video: videosReducer,
    photos: photosReducer,
    reviews: reviewsReducer,
    rating: ratingReducer,
    recommendations: recommendationsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
