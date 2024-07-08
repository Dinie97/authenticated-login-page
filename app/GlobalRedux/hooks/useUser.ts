"use client";

// hooks/useUsers.ts
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../Features/user/userSlice";
// import { fetchUsers } from '../slices/usersSlice';

const useUsers = () => {
  const dispatch = useDispatch();
  const users = useSelector((state: any) => state.users.users);
  const isLoading = useSelector((state: any) => state.users.isLoading);
  const error = useSelector((state: any) => state.users.error);

  useEffect(() => {
    dispatch(fetchUsers() as any);
  }, [dispatch]);

  return { users, isLoading, error };
};

export default useUsers;
