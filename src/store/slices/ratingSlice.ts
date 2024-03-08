import { RootState } from "..";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { IRatingResponse } from "../../globalTypes/globalTypes";
import { options } from "../../apiConfigs/tmdb";
import { IMovieAndSeries } from "../../components/MainSection/types";

export const fetchRating = createAsyncThunk<
  IMovieAndSeries[],
  void,
  { rejectValue: unknown }
>("ratingSlice/fetchRating", async function (_, { getState, rejectWithValue }) {
  const { session_id, guest_session_id } = (getState() as RootState).user;

  const session_ID =
    session_id !== null
      ? `session_id=${session_id}`
      : `guest_session_id=${guest_session_id}`;

  try {
    const [moviesRes, seriesRes] = await Promise.all([
      axios.get(
        `https://api.themoviedb.org/3/account/20246322/rated/movies?language=en-US&page=1&${session_ID}&sort_by=created_at.asc`,
        options
      ),
      axios.get(
        `https://api.themoviedb.org/3/account/20246322/rated/tv?language=en-US&page=1&${session_ID}&sort_by=created_at.asc`,
        options
      ),
    ]);
    const moviesData = moviesRes.data.results;
    const seriesData = seriesRes.data.results;

    const ratingResults: IMovieAndSeries[] = [...moviesData, ...seriesData];

    return ratingResults;
  } catch (error) {
    console.error(error);
    return rejectWithValue(error);
  }
});
export const addRating = createAsyncThunk(
  "ratingSlice/addRating",
  async function (
    {
      filmID,
      mediaType,
      newRating,
    }: { filmID: string; mediaType: string; newRating: number },
    { getState }
  ) {
    const { session_id, guest_session_id } = (getState() as RootState).user;

    const session_ID =
      session_id !== null
        ? `session_id=${session_id}`
        : `guest_session_id=${guest_session_id}`;

    const options = {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json;charset=utf-8",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmZDhhZTMxNTM4YTY5NmJiYTJkNGE2ZmNiZmQwMTlhOSIsInN1YiI6IjY0Y2E3Y2JmZGQ4M2ZhMDEzOWRhZTM5ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.YRbI_c1B40vA3ObEPz_nOejSEz0o5HV7FARlG0u3_EY",
      },
      body: JSON.stringify({
        movie_id: filmID,
        value: newRating,
      }),
    };
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/${mediaType}/${filmID}/rating?${session_ID}`,
        options
      );
      const data = await res.json();

      return data;
    } catch (error) {
      console.error(error);
    }
  }
);

export const deleteRating = createAsyncThunk(
  "ratingSlice/deleteRating",
  async function (
    { filmID, mediaType }: { filmID: string; mediaType: string },
    { getState }
  ) {
    const { session_id, guest_session_id } = (getState() as RootState).user;

    const session_ID =
      session_id !== null
        ? `session_id=${session_id}`
        : `guest_session_id=${guest_session_id}`;

    const options = {
      method: "DELETE",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json;charset=utf-8",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmZDhhZTMxNTM4YTY5NmJiYTJkNGE2ZmNiZmQwMTlhOSIsInN1YiI6IjY0Y2E3Y2JmZGQ4M2ZhMDEzOWRhZTM5ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.YRbI_c1B40vA3ObEPz_nOejSEz0o5HV7FARlG0u3_EY",
      },
      body: JSON.stringify({
        movie_id: filmID,
      }),
    };
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/${mediaType}/${filmID}/rating?${session_ID}`,
        options
      );
      const data = await res.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  }
);

interface IRatingSliceState extends IRatingResponse {
  loading: boolean;
  error: null | string;
}

const initialState: IRatingSliceState = {
  page: 1,
  results: [],
  total_pages: 1,
  total_results: 1,
  error: null,
  loading: false,
};

const ratingSlice = createSlice({
  name: "ratingSlice",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchRating.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRating.fulfilled, (state, action) => {
        state.loading = false;

        state.results = action.payload;
        //state.page = action.payload.page;
        //state.total_pages = action.payload.total_pages;
        //state.total_results = action.payload.total_results;
      })
      .addCase(fetchRating.rejected, (state) => {
        state.loading = false;
        state.error = "Error";
      });
  },
});

export const {} = ratingSlice.actions;
export default ratingSlice.reducer;
