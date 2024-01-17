import { options } from "./../../apiConfigs/tmdb";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CreateRequestToken } from "../../globalTypes/globalTypes";
import axios from "axios";

import { doc, getDoc } from "firebase/firestore";
import { db } from "../../apiConfigs/firebase";

export interface IUserState {
  email: string | null;
  token: string | null;
  id: string | null;
  name: string | null;
  success: boolean | null;
  expires_at: string | null;
  request_token: string | null;
  session_id: any;
  loading: boolean;
  createDate: string | undefined;
  avatarURL: any;
  guest_session_id: any;
}

export const fetchUrl = createAsyncThunk(
  "user/fetchUrl",
  async function (id, { rejectWithValue }) {
    try {
      const docRef = doc(db, `/avatars`);
      const docSnap = await getDoc(docRef);

      let firebaseReviewsDB = [];

      if (docSnap.exists()) {
        firebaseReviewsDB = docSnap.data().results;
      }

      return firebaseReviewsDB;
    } catch (error: any) {
      console.error(error);
      return rejectWithValue(error.message);
    }
  }
);

export const fetchRequestToken = createAsyncThunk<
  CreateRequestToken,
  undefined,
  {}
>("fetchRequestToken", async function (_) {
  try {
    const res = await axios.get(
      "https://api.themoviedb.org/3/authentication/token/new",
      options
    );

    return res.data;
  } catch (error) {
    console.error(error);
  }
});

const storedUserState = localStorage.getItem("userState");
export const initialState: IUserState = storedUserState
  ? JSON.parse(storedUserState)
  : {
      email: null,
      token: null,
      id: null,
      name: null,
      expires_at: null,
      request_token: null,
      success: null,
      session_id: null,
      loading: false,
      createDate: "",
      avatarURL: "",
    };

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      state.email = action.payload.email;
      state.token = action.payload.token;
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.createDate = action.payload.createDate;

      localStorage.setItem("userState", JSON.stringify(state));
    },
    setGuest(
      state,
      action: PayloadAction<{
        guest_session_id: string;
        expires_at: string | null;
        success: boolean;
      }>
    ) {
      state.guest_session_id = action.payload.guest_session_id;
      state.expires_at = action.payload.expires_at;
      state.success = action.payload.success;

      localStorage.setItem("userState", JSON.stringify(state));
    },
    setUserAvatar(state, action) {
      state.avatarURL = action.payload;

      localStorage.setItem("userState", JSON.stringify(state));
    },
    setSessionId(state, action) {
      state.session_id = action.payload;

      localStorage.setItem("userState", JSON.stringify(state));
    },
    setRequestToken(state, action) {
      state.request_token = action.payload;

      localStorage.setItem("userState", JSON.stringify(state));
    },
    logout(state) {
      state.email = null;
      state.token = null;
      state.id = null;
      state.name = null;
      state.guest_session_id = null;
      state.expires_at = null;
      state.request_token = null;
      state.success = null;
      state.session_id = null;
      localStorage.setItem("userState", JSON.stringify(state));
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchRequestToken.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRequestToken.fulfilled, (state, action) => {
        state.loading = false;
        state.request_token = action.payload.request_token;
        state.expires_at = action.payload.expires_at;
        state.success = action.payload.success;

        localStorage.setItem("userState", JSON.stringify(state));
      })
      .addCase(fetchRequestToken.rejected, (state) => {
        state.loading = false;
        state.success = false;
      })
      .addCase(fetchUrl.fulfilled, (state, action) => {
        state.avatarURL = action.payload;
      });
  },
});

export const {
  logout,
  setUser,
  setGuest,
  setSessionId,
  setUserAvatar,
  setRequestToken,
} = userSlice.actions;

export default userSlice.reducer;
