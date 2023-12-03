import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import userReducer from "./userSlice";

// configure store with authSlice
export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
  },
});
