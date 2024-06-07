import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    isLoggedIn: false,
    token: "",
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setLoggedIn(state, action) {
      state.isLoggedIn = action.payload.isLoggedIn;
      state.token = action.payload.token;
    },
    setLoggedOut: (state, action) => {
      state.isLoggedIn = false;
      state.token = "";
      state.user = null;
    },
  },
});
export const { setUser } = userSlice.actions;
export const { setLoggedIn } = userSlice.actions;
