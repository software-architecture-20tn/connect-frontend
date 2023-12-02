import { createSlice } from "@reduxjs/toolkit";
import { logIn, logOut } from "../_helpers/authThunk";
import { getToken } from "../_helpers/authHelpers";
const initialState = {
  token: getToken(),
  error: null,
  isLogin: getToken() !== null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogin: (state) => {
      state.isLogin = getToken() !== null;
      state.token = getToken();
    },
  },
  extraReducers: {
    [logIn.fulfilled]: (state, action) => {
      state.token = action.payload.token;
      state.error = null;
      state.isLogin = getToken() !== null;
    },
    [logIn.rejected]: (state, action) => {
      state.error = action.payload;
      state.isLogin = false;
      state.token = null;
    },
    [logOut.fulfilled]: (state, action) => {
      state.token = null;
      state.error = null;
      state.isLogin = false;
    },
    [logOut.rejected]: (state, action) => {
      state.error = action.error.message;
      state.token = null;
      state.isLogin = false;
    },
  },
});

export default authSlice.reducer;
