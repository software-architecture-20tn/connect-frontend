import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchApi } from "../../api";

const resetPasswordApi = (body) =>
  fetchApi.post("/users/api/auth/passwordreset/", body);

export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async (data, { rejectWithValue }) => {
    try {
      const response = await resetPasswordApi(data);
      const userData = await response.json();
      if (response.ok) {
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
