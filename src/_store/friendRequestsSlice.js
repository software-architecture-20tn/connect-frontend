import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  friendRequests: [],
};

const friendRequestsSlice = createSlice({
  name: "friendRequests",
  initialState,
  reducers: {
    setFriendRequests: (state, action) => {
      state.friendRequests = action.payload;
    },
  },
});

export const { setFriendRequests } = friendRequestsSlice.actions;

export default friendRequestsSlice.reducer;
