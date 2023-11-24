import { createSlice } from "@reduxjs/toolkit";
import { logIn, logOut } from "../_helpers/authThunk";

const initialState = {
  token: null,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: {
    [logIn.fulfilled]: (state, action) => {
      state.token = action.payload.token;
      state.error = null;
    },
    [logIn.rejected]: (state, action) => {
      state.error = action.payload;
    },
    [logOut.fulfilled]: (state, action) => {
      state.token = null;
      state.error = null;
    },
    [logOut.rejected]: (state, action) => {
      state.error = action.error.message;
      state.token = null;
    },
  },
});

export default authSlice.reducer;
