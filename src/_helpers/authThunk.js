import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchApi } from "../api/auth";
import { setToken, removeToken } from "./authHelpers";

const loginApi = (body) => fetchApi.post("/users/login/", body);
const signupApi = (body) => fetchApi.post("/users/register/", body);

export const logIn = createAsyncThunk("auth/login", async (data, { rejectWithValue }) => {
  try {
    const response = await loginApi(data);
    console.log(data, response);
    const userData = await response.json();
    console.log(userData);
    if (response.ok) {
      setToken(userData.token);
      return {
        ...userData,
        status: response.status,
      };
    }
    else {
      return rejectWithValue(response.status);
    }
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
});

export const signUp = createAsyncThunk('auth/signup', async (data, { rejectWithValue }) => {
  try {
    const response = await signupApi(data);
    // handle response here
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
});

export const logOut = createAsyncThunk("auth/logout", async () => {
  removeToken();
});
