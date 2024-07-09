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
  isLoading: boolean;
  error: string | null;
}

const initialState: UsersState = {
  users: [],
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
    filterUsers(state, action) {
      state.users = state.users.filter(
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
    });
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message as string;
    });
  },
});

// const usersReducer = createReducer(initialState, {
//   'users/fetchUsers': (state, action) => {
//     const filteredUsers = action.payload.data.filter((user) => {
//       return user.first_name.startsWith('G') || user.last_name.startsWith('W');
//     });
//     return {...state, data: filteredUsers };
//   },
// });
export const { filterUsers } = usersSlice.actions;
export default usersSlice.reducer;
