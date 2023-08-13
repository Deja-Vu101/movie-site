import axios from "axios";
import { ITrending } from "../../components/Trending/types";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { options } from "../../apiConfigs/tmdb";

export const fetchTrending = createAsyncThunk<ITrending, string, {}>(
  "trending/fetchTrending",
  async function (path) {
    let pageTrend;
    switch (path) {
      case "/movie":
        pageTrend = "movie";
        break;
      case "/tv":
        pageTrend = "tv";
        break;
      default:
        pageTrend = "all";
    }

    try {
      const res = await axios.get(
        `https://api.themoviedb.org/3/trending/${pageTrend}/day?language=en-US`,
        options
      );
      
      return res.data;
    } catch (error) {
      console.error(error);
    }
  }
);

interface ITrendingState extends ITrending {
  loading: boolean;
  error: null | string;
}

const initialState: ITrendingState = {
  page: 1,
  results: [],
  total_pages: 1,
  total_results: 10,
  error: null,
  loading: false,
};

const trendingSlice = createSlice({
  name: "trending",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchTrending.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTrending.fulfilled, (state, action) => {
        state.loading = false;
        const data = action.payload;

        state.results = data.results;

        state.page = data.page;
      })
      .addCase(fetchTrending.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const {} = trendingSlice.actions;
export default trendingSlice.reducer;
