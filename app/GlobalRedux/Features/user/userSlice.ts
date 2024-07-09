"use client";

// slices/usersSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface User {
  id: number;
  email: string;
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

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const response = await fetch("https://reqres.in/api/users");

  return response.json() as Promise<UsersResponse>;
});

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    getAllUsers(state) {
      state.filteredUser = state.users;
    },
    filteredUser(state, action) {
      state.filteredUser = state.users.filter(
        (user) =>
          user.first_name.startsWith("G") || user.last_name.startsWith("W")
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.isLoading = false;
      state.users = action.payload.data;
      state.filteredUser = state.users;
    });
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message as string;
    });
  },
});

export const { getAllUsers, filteredUser } = usersSlice.actions;
export default usersSlice.reducer;
