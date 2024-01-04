import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  IMoviePageResponse,
  ISeriesPageResponse,
} from "../../globalTypes/globalTypes";
import axios from "axios";
import { options } from "../../apiConfigs/tmdb";

interface ISeriesSliceState {
  loading: boolean;
  error: null | string;
  results: ISeriesPageResponse;
}

export const fetchSeries = createAsyncThunk<ISeriesPageResponse, string, {}>(
  "seriesSlice/fetchSeries",
  async function (id) {
    try {
      const res = await axios.get(
        `https://api.themoviedb.org/3/tv/${id}?language=en-US`,
        options
      );
      return res.data;
    } catch (error) {
      console.error(error);
    }
  }
);

const initialState: ISeriesSliceState = {
  loading: false,
  error: null,
  results: {} as ISeriesPageResponse,
};

const seriesSlice = createSlice({
  name: "seriesSlice",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchSeries.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSeries.fulfilled, (state, action) => {
        state.loading = false;
        state.results = action.payload;
      })
      .addCase(fetchSeries.rejected, (state) => {
        state.loading = false;
        state.error = "Error load series";
      });
  },
});

const {} = seriesSlice.actions;
export default seriesSlice.reducer;
