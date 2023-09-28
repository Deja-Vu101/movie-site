import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { options } from "../../apiConfigs/tmdb";
import { IVideosResponse } from "../../globalTypes/globalTypes";

interface IVideosSliceState extends IVideosResponse {
  loading: boolean;
  error: null | string;
}

export const fetchVideo = createAsyncThunk(
  "videosSlice/fetchVideo",
  async function (id: string) {
    try {
      const res = await axios.get<IVideosResponse>(
        `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`,
        options
      );
      return res.data;
    } catch (error) {
      console.error(error);
    }
  }
);

const initialState: IVideosSliceState = {
  error: null,
  id: 0,
  loading: false,
  results: [],
};

const videosSlice = createSlice({
  name: "videosSlice",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchVideo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchVideo.fulfilled, (state, action) => {
        state.loading = false;

        state.results = action.payload?.results;
      })
      .addCase(fetchVideo.rejected, (state) => {
        state.loading = false;
        state.error = "Error";
      });
  },
});

export const {} = videosSlice.actions;
export default videosSlice.reducer;
