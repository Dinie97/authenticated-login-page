"use client";
// pages/index.tsx
import { filterUsers } from "@/app/GlobalRedux/Features/user/userSlice";
import useUsers from "@/app/GlobalRedux/hooks/useUser";
import Head from "next/head";
import { useDispatch } from "react-redux";

const UserList = () => {
  const { users, isLoading, error } = useUsers();

  const dispatch = useDispatch();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <Head>
        <title>Users</title>
      </Head>
      <h1>Users</h1>
      <ul>
        {users.map((user: any) => (
          <li key={user.id}>
            {user.first_name} {user.last_name}
          </li>
        ))}
      </ul>
      <button onClick={() => dispatch(filterUsers(users))}>Filter</button>
    </div>
  );
};

export default UserList;
