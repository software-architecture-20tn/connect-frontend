import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchApi } from "../api/auth";
import { setToken, removeToken } from "./authHelpers";

const loginApi = (body) => fetchApi.post("/users/login/", body);

export const logIn = createAsyncThunk("auth/login", async (data) => {
  try {
    const response = await loginApi(data);
    console.log(data, response);
    const userData = await response.json();
    console.log(userData);
    if (response.ok) {
      setToken(userData.token);
    }
    return {
      ...userData,
      status: response.status,
    };
  } catch (err) {
    console.log(err);
  }
});

export const logOut = createAsyncThunk("auth/logout", async () => {
  removeToken();
});
