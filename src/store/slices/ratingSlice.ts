import { RootState } from "..";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { IRatingResponse } from "../../globalTypes/globalTypes";
import { options } from "../../apiConfigs/tmdb";

export const fetchRating = createAsyncThunk<IRatingResponse>(
  "ratingSlice/fetchRating",
  async function (_, { getState }) {
    const { session_id } = (getState() as RootState).user;
    try {
      const res = await axios.get(
        `https://api.themoviedb.org/3/account/20246322/rated/movies?language=en-US&page=1&session_id=${session_id}&sort_by=created_at.asc`,
        options
      );
      return res.data;
    } catch (error) {
      console.error(error);
    }
  }
);
export const addRating = createAsyncThunk(
  "ratingSlice/addRating",
  async function (
    { movieID, newRating }: { movieID: string; newRating: number },
    { getState }
  ) {
    const { session_id } = (getState() as RootState).user;
    const options = {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json;charset=utf-8",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmZDhhZTMxNTM4YTY5NmJiYTJkNGE2ZmNiZmQwMTlhOSIsInN1YiI6IjY0Y2E3Y2JmZGQ4M2ZhMDEzOWRhZTM5ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.YRbI_c1B40vA3ObEPz_nOejSEz0o5HV7FARlG0u3_EY",
      },
      body: JSON.stringify({
        movie_id: movieID,
        value: newRating,
      }),
    };
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${movieID}/rating?session_id=${session_id}`,
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
  async function ({ movieID }: { movieID: string }, { getState }) {
    const { session_id } = (getState() as RootState).user;
    const options = {
      method: "DELETE",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json;charset=utf-8",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmZDhhZTMxNTM4YTY5NmJiYTJkNGE2ZmNiZmQwMTlhOSIsInN1YiI6IjY0Y2E3Y2JmZGQ4M2ZhMDEzOWRhZTM5ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.YRbI_c1B40vA3ObEPz_nOejSEz0o5HV7FARlG0u3_EY",
      },
      body: JSON.stringify({
        movie_id: movieID,
        //value: newRating,
      }),
    };
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${movieID}/rating?session_id=${session_id}`,
        options
      );
      const data = await res.json();
      console.log(data, "dataSlice");

      //return data;
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

        state.results = action.payload.results;
        state.page = action.payload.page;
        state.total_pages = action.payload.total_pages;
        state.total_results = action.payload.total_results;
      })
      .addCase(fetchRating.rejected, (state) => {
        state.loading = false;
        state.error = "Error";
      });

    //.addCase(addRating.fulfilled, (state, action) => {
    //  console.log([...state.results], 'data');

    //})
  },
});

export const {} = ratingSlice.actions;
export default ratingSlice.reducer;
