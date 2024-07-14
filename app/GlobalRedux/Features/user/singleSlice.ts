"use client";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface User {
  id: number;
  email: string;
  maskEmail: string;
  viewMail: boolean;
  first_name: string;
  last_name: string;
  avatar: string;
}

interface UsersResponse {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: User[];
}

interface UsersState {
  users: User[];
  filteredUser: User[];
  isLoading: boolean;
  error: string | null;
}

const initialState: UsersState = {
  users: [],
  filteredUser: [],
  isLoading: false,
  error: null,
};

export const fetchSingle = createAsyncThunk(
  "users/fetchSingle",
  async (userId: any) => {
    const response = await fetch(`/api/auth/singleUser?userId=${userId}`);
    const data = await response.json();

    if (!data.success) {
      throw new Error("API not authorized");
    }

    return data.success;
  }
);

const singleSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    filterId(state, action) {
      const userId = action.payload;
      console.log(state);
      debugger;
      state.filteredUser.forEach((data) => {
        if (data.id === userId) {
          if (data.viewMail == false) {
            data.maskEmail = data.email;
            data.viewMail = true;
          } else {
            data.maskEmail = data.email.replace(/.(?=.*@)/g, "*");
            data.viewMail = false;
          }
        }
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSingle.pending, (state) => {
      debugger;
      state.isLoading = true;
    });
    builder.addCase(fetchSingle.fulfilled, (state, action) => {
      debugger;
      state.isLoading = false;
      state.users = action.payload;
    });
    builder.addCase(fetchSingle.rejected, (state, action) => {
      debugger;
      state.isLoading = false;
      state.error = action.error.message as string;
    });
  },
});

export const { filterId } = singleSlice.actions;
export default singleSlice.reducer;
