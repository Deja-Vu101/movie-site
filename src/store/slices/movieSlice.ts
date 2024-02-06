import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { options } from "../../apiConfigs/tmdb";
import { IMoviePageResponse } from "../../globalTypes/globalTypes";

interface IMovieSliceState {
  loading: boolean;
  error: null | string;
  results: IMoviePageResponse;
}

export const fetchMovie = createAsyncThunk<IMoviePageResponse, string, {}>(
  "movieSlice/fetchMovie",
  async function (id) {
    try {
      const res = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}?language=en-US`,
        options
      );
      return res.data;
    } catch (error) {
      console.error(error);
    }
  }
);

const initialState: IMovieSliceState = {
  loading: false,
  error: null,
  results: {} as IMoviePageResponse,
};

const movieSlice = createSlice({
  name: "movieSlice",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchMovie.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMovie.fulfilled, (state, action) => {
        state.loading = false;

        state.results = action.payload;
      })
      .addCase(fetchMovie.rejected, (state) => {
        state.loading = false;
        state.error = "Error";
      });
  },
});

export const {} = movieSlice.actions;
export default movieSlice.reducer;
