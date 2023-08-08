import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IMovieResponse } from "../../components/MainSection/types";
import axios from "axios";
import { options } from "../../apiConfigs/tmdb";

const baseUrlMoviePopular = "https://api.themoviedb.org/3/movie/popular";

export const fetchPopularMovie = createAsyncThunk<IMovieResponse, number, {}>(
  "popular/movie",
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

interface IPopularMovieState extends IMovieResponse {
  loading: boolean;
  error: null | string;
}
const initialState: IPopularMovieState = {
  page: 1,
  results: [],
  total_pages: 1,
  total_results: 10,
  error: null,
  loading: false,
};
export const popularMovieSlice = createSlice({
  name: "popularMovies",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchPopularMovie.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPopularMovie.fulfilled, (state, action) => {
        const data = action.payload;
        state.loading = false;
		  
		  state.results = data.results
		  state.page = data.page
      })
		.addCase(fetchPopularMovie.rejected, (state) => {
			state.loading = false;
		 })
  },
});

export const {} = popularMovieSlice.actions
export default popularMovieSlice.reducer