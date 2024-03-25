import { options } from "../../apiConfigs/tmdb";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  IMovie,
  IMovieAndSeries,
  IMovieResponse,
} from "../../components/MainSection/types";
import axios from "axios";
import { RootState } from "..";

interface IFavoriteListState extends IMovieResponse {
  loading: boolean;
  error: null | string;
  removedItem: any;
  typedFavoriteResults: IMovieAndSeries[];
  typedFavoriteLoading: boolean;
}
export const fetchFavoriteList = createAsyncThunk(
  "favoriteList/fetchFavouriteList",
  async function (_, { getState }) {
    const { session_id, guest_session_id } = (getState() as RootState).user;

    const session_ID =
      session_id !== null
        ? `session_id=${session_id}`
        : `guest_session_id=${guest_session_id}`;
    try {
      const [movies, tv] = await Promise.all([
        axios.get(
          `https://api.themoviedb.org/3/account/20246322/favorite/movies?language=en-US&page=1&${session_ID}&sort_by=created_at.asc`,
          options
        ),
        axios.get(
          `https://api.themoviedb.org/3/account/20246322/favorite/tv?language=en-US&page=1&${session_ID}&sort_by=created_at.asc`,
          options
        ),
      ]);

      return [...movies.data.results, ...tv.data.results];
    } catch (error) {
      console.error(error);
    }
  }
);

export const addToFavoritelist = createAsyncThunk(
  "favouriteList/addToFavouritelist",
  async (
    { id, mediaType }: { id: number; mediaType: string },
    { getState }
  ) => {
    const { session_id, guest_session_id } = (getState() as RootState).user;

    const session_ID =
      session_id !== null
        ? `session_id=${session_id}`
        : `guest_session_id=${guest_session_id}`;

    const options = {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmZDhhZTMxNTM4YTY5NmJiYTJkNGE2ZmNiZmQwMTlhOSIsInN1YiI6IjY0Y2E3Y2JmZGQ4M2ZhMDEzOWRhZTM5ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.YRbI_c1B40vA3ObEPz_nOejSEz0o5HV7FARlG0u3_EY",
      },
      body: JSON.stringify({
        media_type: mediaType,
        media_id: id,
        favorite: true,
      }),
    };

    const res = await fetch(
      `https://api.themoviedb.org/3/account/20246322/favorite?${session_ID}`,
      options
    );
  }
);

export const deleteFavoriteItem = createAsyncThunk(
  "favouriteList/addToFavouritelist",
  async (
    { id, mediaType }: { id: number; mediaType: string },
    { getState }
  ) => {
    const { session_id, guest_session_id } = (getState() as RootState).user;

    const session_ID =
      session_id !== null
        ? `session_id=${session_id}`
        : `guest_session_id=${guest_session_id}`;

    const options = {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmZDhhZTMxNTM4YTY5NmJiYTJkNGE2ZmNiZmQwMTlhOSIsInN1YiI6IjY0Y2E3Y2JmZGQ4M2ZhMDEzOWRhZTM5ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.YRbI_c1B40vA3ObEPz_nOejSEz0o5HV7FARlG0u3_EY",
      },
      body: JSON.stringify({
        media_type: mediaType,
        media_id: id,
        favorite: false,
      }),
    };

    await fetch(
      `https://api.themoviedb.org/3/account/20246322/favorite?${session_ID}`,
      options
    );
  }
);
export const fetchForTypeFavorite = createAsyncThunk<
  IMovieResponse,
  "movies" | "tv"
>(
  "favoriteList/fetchForTypeFavorite",
  async function (mediaType, { getState }) {
    const { session_id, guest_session_id } = (getState() as RootState).user;

    const session_ID =
      session_id !== null
        ? `session_id=${session_id}`
        : `guest_session_id=${guest_session_id}`;
    try {
      const res = await axios.get(
        `https://api.themoviedb.org/3/account/20246322/favorite/${mediaType}?language=en-US&page=1&${session_ID}&sort_by=created_at.asc`,
        options
      );

      return res.data;
    } catch (error) {
      console.error(error);
    }
  }
);
const storedFavoriteState = localStorage.getItem("favoriteState");
const initialState: IFavoriteListState = storedFavoriteState
  ? JSON.parse(storedFavoriteState)
  : {
      page: 1,
      results: [],
      total_pages: 0,
      total_results: 0,
      loading: false,
      error: null,
      removedItem: [],
      typedFavoriteResults: [],
      typedFavoriteLoading: false,
    };

const favoriteList = createSlice({
  name: "favoriteList",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchFavoriteList.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchFavoriteList.fulfilled, (state, action) => {
        state.loading = false;
        state.results = action.payload ?? [];
      })
      .addCase(fetchFavoriteList.rejected, (state) => {
        state.loading = false;
      })
      .addCase(fetchForTypeFavorite.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchForTypeFavorite.fulfilled, (state, action) => {
        state.loading = false;
        state.typedFavoriteResults = action.payload.results;
      })
      .addCase(fetchForTypeFavorite.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const {} = favoriteList.actions;
export default favoriteList.reducer;
