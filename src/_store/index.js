import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import userReducer from "./userSlice";
import friendRequestsReducer from "./friendRequestsSlice";
import themeSliceReducer from "./themeSlice";

// configure store with authSlice
export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    friendRequests: friendRequestsReducer,
    theme: themeSliceReducer,
  },
});
