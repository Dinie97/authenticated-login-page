"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../Features/user/userSlice";

const useUsers = () => {
  const dispatch = useDispatch();
  const users = useSelector((state: any) => state.users.users);
  const filter = useSelector((state: any) => state.users.users);
  const isLoading = useSelector((state: any) => state.users.isLoading);
  const error = useSelector((state: any) => state.users.error);

  useEffect(() => {
    dispatch(fetchUsers() as any);
  }, [dispatch]);

  return { users, filter, isLoading, error };
};

export default useUsers;
