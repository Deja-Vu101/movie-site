import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { options } from "../../apiConfigs/tmdb";
import axios from "axios";
import {
  IReviewsFirebase,
  IReviewsResponse,
} from "../../globalTypes/globalTypes";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../apiConfigs/firebase";

interface AllReviewsResponse {
  firebaseReviews: IReviewsFirebase[];
  reviews: IReviewsResponse;
}

interface IReviewsSliceState extends IReviewsResponse {
  loading: boolean;
  error: null | string;
  reviewsFirebase: IReviewsFirebase[];
}

export const fetchReviews = createAsyncThunk<
  AllReviewsResponse,
  { id: string; mediaType: string },
  {}
>(
  "reviewsSlice/fetchReviews",
  async function ({ id, mediaType }, { rejectWithValue }) {
    try {
      const resMovieDBReviews = await axios.get(
        `https://api.themoviedb.org/3/${mediaType}/${id}/reviews?language=en-US&page=1`,
        options
      );

      const docRef = doc(db, "/reviews/all");
      const docSnap = await getDoc(docRef);

      const [reviewsMovieDb] = await axios.all([resMovieDBReviews]);

      const reviewsMovieDB = reviewsMovieDb.data;
      let firebaseReviewsDB = [];

      if (docSnap.exists()) {
        firebaseReviewsDB = docSnap.data().results;
      }

      return { reviews: reviewsMovieDB, firebaseReviews: firebaseReviewsDB };
      //return { firebaseReviews: firebaseReviewsDB };
    } catch (error: any) {
      console.error(error);
      return rejectWithValue(error.message);
    }
  }
);

export const addReviews = createAsyncThunk(
  "reviewsSlice/addReviews",
  async function (commentData: IReviewsFirebase) {
    try {
      const docRef = doc(db, "reviews/all");
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const currentData = docSnap.data();
        const updatedResults = [...currentData.results, commentData];

        await updateDoc(docRef, { results: updatedResults });
      }
      return commentData;
    } catch (error: any) {
      console.error(error);
    }
  }
);

export const deleteReviews = createAsyncThunk(
  "reviewsSlice/deleteReviews",
  async function ({
    movieID,
    reviewID,
  }: {
    movieID: string;
    reviewID: string;
  }) {
    try {
      const docRef = doc(db, "reviews/all");
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const currentData: IReviewsFirebase[] = docSnap.data().results;
        const newData = currentData.filter(
          (review) => review.idReview !== reviewID
        );
        await updateDoc(docRef, { results: newData });

        return newData;
      }
    } catch (error: any) {
      console.error(error);
    }
  }
);

export function isIReviewsFirebase(obj: any): obj is IReviewsFirebase {
  return (
    typeof obj === "object" &&
    "idUser" in obj &&
    "idReview" in obj &&
    "author" in obj &&
    "content" in obj &&
    "created_at" in obj
  );
}
const initialState: IReviewsSliceState = {
  error: null,
  loading: false,
  id: 0,
  page: 1,
  results: [],
  total_pages: 1,
  total_results: 1,
  reviewsFirebase: [],
};

const reviewsSlice = createSlice({
  name: "reviewsSlice",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchReviews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchReviews.fulfilled, (state, action) => {
        state.loading = false;

        state.results = action.payload.reviews.results;
        state.id = action.payload.reviews.id;
        state.page = action.payload.reviews.page;
        state.total_pages = action.payload.reviews.total_pages;
        state.total_results = action.payload.reviews.total_results;

        state.reviewsFirebase = action.payload.firebaseReviews;
      })
      .addCase(fetchReviews.rejected, (state) => {
        state.loading = false;
        state.error = "Error";
      })
      .addCase(addReviews.fulfilled, (state, action) => {
        if (isIReviewsFirebase(action.payload)) {
          state.reviewsFirebase = [...state.reviewsFirebase, action.payload];
        }
      })

      .addCase(deleteReviews.fulfilled, (state, action) => {
        if (isIReviewsFirebase(action.payload)) {
          state.reviewsFirebase = [...state.reviewsFirebase, action.payload];
        }
      });
  },
});

export const {} = reviewsSlice.actions;
export default reviewsSlice.reducer;
