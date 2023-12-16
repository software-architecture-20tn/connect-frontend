import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchApi } from "../../api";

const resetPasswordConfirmApi = (body) =>
  fetchApi.post("/users/api/auth/passwordreset/confirm/", body);

export const resetPasswordConfirm = createAsyncThunk(
  "auth/resetPasswordConfirm",
  async (data, { rejectWithValue }) => {
    try {
      const response = await resetPasswordConfirmApi(data);
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
