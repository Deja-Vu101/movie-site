import { IGenreItem } from "./../../components/Genres/type";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { options } from "../../apiConfigs/tmdb";

export const fetchGenres = createAsyncThunk("fetchGenres", async function () {
  try {
    const [moviesResponse, seriesResponse] = await Promise.all([
      axios.get("https://api.themoviedb.org/3/genre/movie/list", options),
      axios.get("https://api.themoviedb.org/3/genre/tv/list", options),
    ]);

    const mergedGenres: ICombineGenres = {
      genres: {
        movies: [...moviesResponse.data.genres],
        series: [...seriesResponse.data.genres],
      },
    };

    return mergedGenres;
  } catch (error) {
    console.error(error);
  }
});

interface ICombineGenres {
  genres: {
    movies: IGenreItem[];
    series: IGenreItem[];
  };
}

interface IGenresSliceState {
  loading: boolean;
  error: null | string;
  genres: {
    movies: IGenreItem[] | undefined;
    series: IGenreItem[] | undefined;
  };
}

const initialState: IGenresSliceState = {
  loading: false,
  genres: {
    movies: [],
    series: [],
  },
  error: null,
};

const genresSlice = createSlice({
  name: "genresSlice",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchGenres.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGenres.fulfilled, (state, action) => {
        state.loading = false;
        state.genres.movies = action.payload?.genres.movies;
        state.genres.series = action.payload?.genres.series;
      })
      .addCase(fetchGenres.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const {} = genresSlice.actions;
export default genresSlice.reducer;
