import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { options } from "../../apiConfigs/tmdb";
import { IResponseCredits } from "../../globalTypes/globalTypes";

interface IActorsSliceState {
  loading: boolean;
  error: null | string;
  results: IResponseCredits;
}

export const fetchActors = createAsyncThunk(
  "actorsSlice/fetchActors",
  async function (id: string) {
    try {
      const res = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}/credits?language=en-US`,
        options
      );
      return res.data;
    } catch (error) {
      console.error(error);
    }
  }
);

const initialState: IActorsSliceState = {
  loading: false,
  error: null,
  results: {} as IResponseCredits,
};

const actorsSlice = createSlice({
  name: "actorsSlice",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchActors.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchActors.fulfilled, (state, action) => {
        state.loading = false;

        state.results = action.payload;
      })
      .addCase(fetchActors.rejected, (state) => {
        state.loading = false;
        state.error = "Error";
      });
  },
});

export const {} = actorsSlice.actions;
export default actorsSlice.reducer;
