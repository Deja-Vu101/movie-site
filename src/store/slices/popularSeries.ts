import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IPopularSeries } from "../../components/MainSection/types";
import axios from "axios";
import { options } from "../../apiConfigs/tmdb";

const baseUrlMoviePopular = "https://api.themoviedb.org/3/tv/popular";

export const fetchPopularSeries = createAsyncThunk<IPopularSeries, number, {}>(
  "popular/series",
  async function (page) {
    try {
      const res = await axios.get(
        baseUrlMoviePopular + `?language=en-US&page=${page}`,
        options
      );
      return res.data;
    } catch (error) {
      console.error(error);
    }
  }
);

interface IPopularSeriesState extends IPopularSeries {
  error: null | string;
  loading: boolean;
}

const initialState: IPopularSeriesState = {
  page: 1,
  results: [],
  total_pages: 0,
  total_results: 0,
  error: null,
  loading: false,
};

export const popularSeries = createSlice({
  name: "popularSeries",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchPopularSeries.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPopularSeries.fulfilled, (state, action) => {
        state.loading = false;
        state.results = action.payload.results;
      })
      .addCase(fetchPopularSeries.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

export const {} = popularSeries.actions;
export default popularSeries.reducer;
