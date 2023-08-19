import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IMovie, IMovieResponse, ITopRatedResponse } from "../../components/MainSection/types";
import axios from "axios";
import { options } from "../../apiConfigs/tmdb";

const BASE_URL_TOP_RATED_MOVIES =
  "https://api.themoviedb.org/3/movie/top_rated";

interface ITopRatedMoviesState extends IMovieResponse {
  loading: boolean;
  error: null | string;
}

export const fetchTopRatedMovies = createAsyncThunk<
  IMovieResponse,
  number,
  {}
>("fetchTopRatedMovies", async function (page) {
  try {
    const res = await axios.get(
      BASE_URL_TOP_RATED_MOVIES + `?language=en-US&page=${page}`,
      options
    );

    return res.data;
  } catch (error) {
    console.error(error);
  }
});

const initialState: ITopRatedMoviesState = {
  page: 1,
  results: [],
  total_pages: 0,
  total_results: 0,
  error: null,
  loading: false,
};

const topRatedMoviesSlice = createSlice({
  name: "topRatedMovies",
  initialState,
  reducers: {
	setPageRatedMovies(state){
		state.page += 1
	}
  },
  extraReducers(builder) {
    builder
      .addCase(fetchTopRatedMovies.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTopRatedMovies.fulfilled, (state, action) => {
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
      .addCase(fetchTopRatedMovies.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const {setPageRatedMovies} = topRatedMoviesSlice.actions;
export default topRatedMoviesSlice.reducer;
