import { createSlice } from "@reduxjs/toolkit";

export interface IUserState {
  email: string | null;
  token: string | null;
  id: string | null;
  name: string | null
}

const storedUserState = localStorage.getItem("userState");
const initialState: IUserState = storedUserState
  ? JSON.parse(storedUserState)
  : {
      email: null,
      token: null,
      id: null,
      name: null
    };

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      state.email = action.payload.email;
      state.token = action.payload.token;
      state.id = action.payload.id;
      state.name = action.payload.name

      localStorage.setItem("userState", JSON.stringify(state));
    },
    logout(state) {
      state.email = null;
      state.token = null;
      state.id = null;

      localStorage.setItem("userState", JSON.stringify(state));
    },
  },
});

export const { logout, setUser } = userSlice.actions;

export default userSlice.reducer;
