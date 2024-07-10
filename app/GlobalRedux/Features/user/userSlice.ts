"use client";

// slices/usersSlice.ts
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

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const response = await fetch("https://reqres.in/api/users");

  return response.json() as Promise<UsersResponse>;
});

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    getAllUsers(state) {
      state.users.forEach((user) => {
        user.maskEmail = user.email.replace(/.(?=.*@)/g, "*");
      });
      state.filteredUser = state.users;
    },
    filteredUser(state, action) {
      state.filteredUser = state.users.filter(
        (user) =>
          user.first_name.startsWith("G") || user.last_name.startsWith("W")
      );
    },
    MaskedEmail(state, action) {
      state.users.forEach((user) => {
        user.maskEmail = user.email.replace(/.(?=.*@)/g, "*");
      });
      state.filteredUser.forEach((user) => {
        user.maskEmail = user.email.replace(/.(?=.*@)/g, "*");
      });
    },
    unmaskEmails(state) {
      state.users.forEach((user) => {
        user.maskEmail = user.email;
      });
      state.filteredUser = state.users;
    },
    displayEmailById(state, action) {
      const userId = action.payload;

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
    builder.addCase(fetchUsers.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.isLoading = false;
      state.users = action.payload.data;
      state.users.forEach((user) => {
        user.maskEmail = user.email.replace(/.(?=.*@)/g, "*");
        user.viewMail = false;
      });
      state.filteredUser = state.users;
    });
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message as string;
    });
  },
});

export const {
  getAllUsers,
  filteredUser,
  MaskedEmail,
  unmaskEmails,
  displayEmailById,
} = usersSlice.actions;
export default usersSlice.reducer;
