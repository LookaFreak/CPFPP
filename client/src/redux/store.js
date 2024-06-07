import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./actions/dataSlice";
import { alertSlice } from "./actions/alertSlice";
import { blogSlice } from "./actions/blogAlerts";
export default configureStore({
  reducer: {
    alert: alertSlice.reducer,
    user: userSlice.reducer,
    blogs: blogSlice.reducer,
  },
});
