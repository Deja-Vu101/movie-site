import { Dispatch, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  IMovie,
  IMovieResponse,
  IPerson,
  IPersonItem,
} from "../../components/MainSection/types";
import axios from "axios";
import { options } from "../../apiConfigs/tmdb";
import { RootState } from "..";

export type Response = IMovieResponse | IPerson;
export type ResponseItem = IMovie | IPersonItem;

export const fetchSearch = createAsyncThunk<
  Response,
  { page: number; filter: string; query: string; dispatch: Dispatch },
  {}
>("fetchSearch", async function ({ page, filter, query, dispatch }) {
  try {
    const res = await axios.get(
      `https://api.themoviedb.org/3/search/${filter}?query=${query}&language=en-US&page=${page}`,
      options
    );

    dispatch(setLastHistorySearch(query));
    return res.data;
  } catch (error) {
    console.error(error);
  }
});

export const fetchNewPageSearch = createAsyncThunk<
  Response,
  { page: number; filter: string; query: string },
  {}
>("fetchNewPageSearch", async function ({ page, filter, query }, { getState }) {
  const lastHistory = (getState() as RootState).search.lastHistorySearch;
  const searchQueryText = query ? query : lastHistory;
  try {
    const res = await axios.get(
      `https://api.themoviedb.org/3/search/${filter}?query=${searchQueryText}&language=en-US&page=${page}`,
      options
    );
    return res.data;
  } catch (error) {
    console.error(error);
  }
});

interface ISearchState {
  founded: ResponseItem[];
  loading: boolean;
  error: null | string;
  filter: string;
  page: number;
  lastHistorySearch: string;
}
const initialState: ISearchState = {
  founded: [],
  loading: false,
  error: null,
  filter: "movie",
  page: 1,
  lastHistorySearch: "",
};

export const searchSlice = createSlice({
  name: "searchSlice",
  initialState,
  reducers: {
    setFilter(state, action) {
      state.founded = [];
      state.filter = action.payload;
    },
    setPage(state) {
      state.page += 1;
    },
    setLastHistorySearch(state, action) {
      state.lastHistorySearch = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchSearch.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSearch.fulfilled, (state, action) => {
        const data = action.payload;

        state.loading = false;
        state.founded = data.results;
      })
      .addCase(fetchSearch.rejected, (state) => {
        state.loading = false;
        state.error = "Something went wrong...";
      })

      .addCase(fetchNewPageSearch.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNewPageSearch.fulfilled, (state, action) => {
        const data = action.payload;

        state.loading = false;
        state.founded = [...state.founded, ...data.results];
      })
      .addCase(fetchNewPageSearch.rejected, (state) => {
        state.loading = false;
        state.error = "Something went wrong...";
      });
  },
});

export const { setFilter, setPage, setLastHistorySearch } = searchSlice.actions;
export default searchSlice.reducer;
