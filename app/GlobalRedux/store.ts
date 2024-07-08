"use client";

import { configureStore } from "@reduxjs/toolkit";

import counterReducer from "./Features/counter/counterSlice";
import usersReducer from "./Features/user/userSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    users: usersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
