import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IMovie, IMovieResponse, IPerson, IPersonItem, ISeriesResponse } from "../../components/MainSection/types";
import axios from "axios";
import { options } from "../../apiConfigs/tmdb";

export type Response = IMovieResponse | IPerson

export const fetchSearch = createAsyncThunk<Response, {page: number, filter: string, query: string}, {}>(
  "fetchSearch",
  async function ({page, filter, query}) {
    try {
      const res = await axios.get(
        `https://api.themoviedb.org/3/search/${filter}?query=${query}&language=en-US&${page}=1`,
		  options
      );
      return res.data;
    } catch (error) {
      console.error(error);
    }
  }
);

interface ISearchState {
  found: IMovie[] | IPersonItem[];
  loading: boolean;
  error: null | string;
  filter: string
}
const initialState: ISearchState = {
  found: [

  ] as IMovie[] | IPersonItem[],
  loading: false,
  error: null,
  filter: 'movie'
};

export const searchSlice = createSlice({
  name: "searchSlice",
  initialState,
  reducers: {
    setFilter(state, action){
      state.filter = action.payload
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchSearch.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSearch.fulfilled, (state, action) => {
        state.loading = false;
        state.found = action.payload.results;
      })
      .addCase(fetchSearch.rejected, (state) => {
        state.loading = false;
        state.error = "Something went wrong...";
      });
  },
});

export const {setFilter} = searchSlice.actions;
export default searchSlice.reducer;
