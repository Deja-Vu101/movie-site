import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ISeriesResponse } from "../../components/MainSection/types";
import axios from "axios";
import { options } from "../../apiConfigs/tmdb";

const baseUrlSeriesPopular = "https://api.themoviedb.org/3/tv/popular";

export const fetchPopularSeries = createAsyncThunk<ISeriesResponse, number, {}>(
  "popular/series",
  async function (page) {
    try {
      const res = await axios.get(
        baseUrlSeriesPopular + `?language=en-US&page=${page}`,
        options
      );
      return res.data;
    } catch (error) {
      console.error(error);
    }
  }
);

interface IPopularSeriesState extends ISeriesResponse {
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
  reducers: {
    setPage(state) {
      state.page += 1;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPopularSeries.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPopularSeries.fulfilled, (state, action) => {
        const data = action.payload;
        state.loading = false;
        const newResults = data.results.filter(
          (newItem) =>
            !state.results.some(
              (existingItem) => existingItem.id === newItem.id
            )
        );
        state.results = [...state.results, ...newResults];
      })
      .addCase(fetchPopularSeries.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { setPage } = popularSeries.actions;
export default popularSeries.reducer;
