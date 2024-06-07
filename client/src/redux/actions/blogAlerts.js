import { createSlice } from "@reduxjs/toolkit";

export const blogSlice = createSlice({
  name: "alerts",
  initialState: {
    blog: null,
  },
  reducers: {
    setBlogs: (state, action) => {
      state.blog = action.payload;
    },
  },
});

export const { setBlogs } = blogSlice.actions;
