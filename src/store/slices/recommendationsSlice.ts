import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { options } from "../../apiConfigs/tmdb";
import { IResponseRecommendations } from "../../globalTypes/globalTypes";

interface IRecommendationsState extends IResponseRecommendations {
  loading: boolean;
  error: null | string;
}

export const fetchRecommendations = createAsyncThunk<
  IResponseRecommendations,
  { id: string; mediaType: string },
  {}
>("recommendations/fetchRecommendations", async function ({ id, mediaType }) {
  try {
    const res = await axios.get(
      `https://api.themoviedb.org/3/${mediaType}/${id}/recommendations?language=en-US&page=1`,
      options
    );

    return res.data;
  } catch (error) {
    console.error(error);
  }
});

const initialState: IRecommendationsState = {
  error: null,
  loading: false,
  page: 1,
  results: [],
  total_pages: 1,
  total_results: 20,
};

const recommendationsSlice = createSlice({
  name: "recommendations",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchRecommendations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRecommendations.fulfilled, (state, action) => {
        state.loading = false;

        state.results = action.payload.results;
        state.page = action.payload.page;
        state.total_pages = action.payload.total_pages;
        state.total_results = action.payload.total_results;
      })
      .addCase(fetchRecommendations.rejected, (state) => {
        state.loading = false;
        state.error = "Error";
      });
  },
});

export const {} = recommendationsSlice.actions;
export default recommendationsSlice.reducer;
