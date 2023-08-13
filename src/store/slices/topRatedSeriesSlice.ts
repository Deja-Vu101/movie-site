import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ITopRatedResponse } from "../../components/MainSection/types";
import axios from "axios";
import { options } from "../../apiConfigs/tmdb";

const baseUrlTopRated = "https://api.themoviedb.org/3/tv/top_rated";

interface ITopRatedSeriesState extends ITopRatedResponse {
  error: null | string;
  loading: boolean;
}

export const fetchTopRatedSeries = createAsyncThunk<
  ITopRatedResponse,
  number,
  {}
>("fetchTopSeries", async function (page) {
  try {
    const res = await axios.get(
      baseUrlTopRated + `?language=en-US&page=${page}`,
      options
    );
    return res.data;
  } catch (error) {
    console.error(error);
  }
});

const initialState: ITopRatedSeriesState = {
  page: 1,
  results: [],
  total_pages: 0,
  total_results: 0,
  error: null,
  loading: false,
};

const topRatedSeries = createSlice({
  name: "topRatedSeries",
  initialState,
  reducers: {
    setPageRatedSeries(state) {
      state.page += 1;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchTopRatedSeries.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTopRatedSeries.fulfilled, (state, action) => {
        const data = action.payload;
        state.loading = false;
        const newResults = data.results.filter(newItem => !state.results.some(existingItem => existingItem.id === newItem.id ))
        state.results = [...state.results, ...newResults];
      })
      .addCase(fetchTopRatedSeries.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const {setPageRatedSeries} = topRatedSeries.actions;
export default topRatedSeries.reducer;
