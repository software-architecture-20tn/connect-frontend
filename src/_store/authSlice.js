import { createSlice } from "@reduxjs/toolkit";
import { logIn, logOut } from "../_helpers/authThunk";

const initialState = {
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: {
    [logIn.fulfilled]: (state, action) => {
      state.token = action.payload.token;
    },
    [logOut.fulfilled]: (state, action) => {
      state.token = null;
    },
  },
});

export default authSlice.reducer;
