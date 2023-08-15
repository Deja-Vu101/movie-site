import { options } from "./../../apiConfigs/tmdb";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  IMovieResponse,
  ISeriesResponse,
} from "../../components/MainSection/types";
import axios from "axios";
import { RootState } from "..";

interface IFavouriteListState extends IMovieResponse {
  loading: boolean;
  error: null | string;
}

export const fetchFavouriteList = createAsyncThunk(
  "favouriteList/fetchFavouriteList",
  async function (_, { getState }) {
    const { session_id } = (getState() as RootState).user;

    try {
      const res = await axios.get(
        `https://api.themoviedb.org/3/account/20246322/favorite/movies?language=en-US&page=1&session_id=${session_id}&sort_by=created_at.asc`,
        options
      );

      return res.data;
    } catch (error) {
      console.error(error);
    }
  }
);

export const addToFavouritelist = createAsyncThunk(
  "favouriteList/addToFavouritelist",
  async (
    { id, mediaType }: { id: number; mediaType: string },
    { getState }
  ) => {
    const { session_id } = (getState() as RootState).user;

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
      `https://api.themoviedb.org/3/account/20246322/favorite?session_id=${session_id}`,
      options
    );

    const data = await res.json();
    return data;
  }
);
const initialState: IFavouriteListState = {
  page: 1,
  results: [],
  total_pages: 0,
  total_results: 0,
  loading: false,
  error: null,
};

const favouriteList = createSlice({
  name: "favouriteList",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchFavouriteList.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchFavouriteList.fulfilled, (state, action) => {
        state.loading = false;

        state.page = action.payload.page;
        state.results = action.payload.results;
        state.total_pages = action.payload.total_pages;
        state.total_results = action.payload.total_results;
      })
      .addCase(fetchFavouriteList.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const {} = favouriteList.actions;
export default favouriteList.reducer;
