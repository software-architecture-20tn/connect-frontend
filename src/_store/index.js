import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";

// configure store with authSlice
export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});
