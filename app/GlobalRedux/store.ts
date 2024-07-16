"use client";

import { configureStore } from "@reduxjs/toolkit";

import usersReducer from "./Features/user/userSlice";
import singleReducer from "./Features/user/singleSlice";

export const store = configureStore({
  reducer: {
    users: usersReducer,
    singleUser: singleReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
