import { options } from "./../../apiConfigs/tmdb";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IMovieResponse } from "../../components/MainSection/types";
import axios from "axios";
import { RootState } from "..";

interface IWatchListState extends IMovieResponse {
  loading: boolean;
  error: null | string;
}

export const fetchWatchList = createAsyncThunk<IMovieResponse, number, {}>(
  "watchList/fetchWatchList",
  async function (session_id) {
    try {
      const res = await axios.get(
        `https://api.themoviedb.org/3/account/20246322/watchlist/movies?language=en-US&page=1&session_id=${session_id}&sort_by=created_at.asc`,
        options
      );
      return res.data;
    } catch (error) {
      console.error(error);
    }
  }
);

export const addToWatchlist = createAsyncThunk(
  "watchList/addToWatchlist",
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
        watchlist: true,
      }),
    };

    const response = await fetch(
      `https://api.themoviedb.org/3/account/20246322/watchlist?session_id=${session_id}`,
      options
    );

    const data = await response.json();
    return data;
  }
);

const initialState: IWatchListState = {
  page: 1,
  results: [],
  total_pages: 0,
  total_results: 0,
  loading: false,
  error: null,
};

const watchListSlice = createSlice({
  name: "watchList",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchWatchList.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchWatchList.fulfilled, (state, action) => {
        state.loading = false;

        state.page = action.payload.page;
        state.results = action.payload.results;
        state.total_pages = action.payload.total_pages;
        state.total_results = action.payload.total_results;
      })
      .addCase(fetchWatchList.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const {} = watchListSlice.actions;
export default watchListSlice.reducer;
