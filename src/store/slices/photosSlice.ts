import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { options } from "../../apiConfigs/tmdb";
import { IPhotosResponse } from "../../globalTypes/globalTypes";

export const fetchPhotos = createAsyncThunk<
  IPhotosResponse,
  { id: string; mediaType: string },
  {}
>("photosSlice/fetchPhotos", async function ({ id, mediaType }) {
  try {
    const res = await axios.get(
      `https://api.themoviedb.org/3/${mediaType}/${id}/images`,
      options
    );
    return res.data;
  } catch (error) {
    console.error(error);
  }
});

interface IPhotosSliceState extends IPhotosResponse {
  loading: boolean;
  error: null | string;
}

const initialState: IPhotosSliceState = {
  loading: false,
  error: null,
  backdrops: [],
  id: 0,
  logos: [],
  posters: [],
};

const photosSlice = createSlice({
  name: "photosSlice",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchPhotos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPhotos.fulfilled, (state, action) => {
        state.loading = false;

        state.backdrops = action.payload.backdrops;
        state.logos = action.payload.logos;
        state.posters = action.payload.posters;
      })
      .addCase(fetchPhotos.rejected, (state) => {
        state.loading = false;
        state.error = "Error";
      });
  },
});

export const {} = photosSlice.actions;
export default photosSlice.reducer;
