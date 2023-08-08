import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IMovieResponse } from "../../components/MainSection/types";
import axios from "axios";
import { options } from "../../apiConfigs/tmdb";

export const fetchSearch = createAsyncThunk<IMovieResponse, {page: number, query: string}, {}>(
  "fetchSearch",
  async function ({page, query}) {
    try {
      const res = await axios.get(
        `https://api.themoviedb.org/3/search/movie?query=${query}&language=en-US&${page}=1`,
		  options
      );
      return res.data;
    } catch (error) {
      console.error(error);
    }
  }
);

interface ISearchState {
  foundMovies: IMovieResponse;
  loading: boolean;
  error: null | string;
}
const initialState: ISearchState = {
  foundMovies: {
    page: 1,
  } as IMovieResponse,
  loading: false,
  error: null,
};

export const searchSlice = createSlice({
  name: "searchSlice",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchSearch.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSearch.fulfilled, (state, action) => {
        state.loading = false;
        state.foundMovies.results = action.payload.results;
      })
      .addCase(fetchSearch.rejected, (state) => {
        state.loading = false;
        state.error = "Something went wrong...";
      });
  },
});

export const {} = searchSlice.actions;
export default searchSlice.reducer;
