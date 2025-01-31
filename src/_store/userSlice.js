import { createSlice } from "@reduxjs/toolkit";
import { logIn, logOut } from "../_helpers/authThunk";

const initialState = {
  user: null,
  message: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: {
    [logIn.fulfilled]: (state, action) => {
      state.user = action.payload;
    },
    [logIn.rejected]: (state, action) => {
      state.user = action.payload;
    },
    [logOut]: (state, action) => {
      state.user = null;
    },
  },
});

export default userSlice.reducer;
