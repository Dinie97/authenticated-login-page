"use client";

import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

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
  allUsers: User[];
  filteredUser: User[];
  isLoading: boolean;
  error: string | null;
}

const initialState: UsersState = {
  users: [],
  allUsers: [],
  filteredUser: [],
  isLoading: false,
  error: null,
};

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const allUser = await fetch(`/api/auth/getAllUser/`);
  const userData = await allUser.json();
  const page = userData.success.page;
  const maxPage = userData.success.total_pages;

  const response = await fetch(
    `/api/auth/getUser/?page=${page}&pageSize=${maxPage}`
  );
  const data = await response.json();

  if (!data.success) {
    throw new Error("API not authorized");
  }

  return data.success;
});

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    displayEmailById(
      state,
      action: PayloadAction<{
        success: { userId: number; email: string };
      }>
    ) {
      const { userId, email } = action.payload.success;

      const user = state.users.find((user) => user.id === userId);
      if (user) {
        user.email = email;

        const viewEmail = state.allUsers.map((item: any) =>
          item.id === userId ? { ...item, email } : item
        );

        state.users = viewEmail;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.isLoading = false;
      state.users = action.payload;
      state.allUsers = state.users;
    });
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message as string;
    });
  },
});

export const { displayEmailById } = usersSlice.actions;
export default usersSlice.reducer;
