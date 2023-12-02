import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchApi } from "../api/auth";
import { setToken, removeToken } from "./authHelpers";

const loginApi = (body) => fetchApi.post("/users/login/", body);

export const logIn = createAsyncThunk(
  "auth/login",
  async (data, { rejectWithValue }) => {
    try {
      const response = await loginApi(data);
      const userData = await response.json();
      if (response.ok) {
        setToken(userData.token);
        return {
          ...userData,
          status: response.status,
        };
      } else {
        return rejectWithValue(response.status);
      }
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  },
);

export const logOut = createAsyncThunk("auth/logout", async () => {
  removeToken();
});
