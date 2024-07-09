"use client";
// pages/index.tsx
import {
  filteredUser,
  getAllUsers,
} from "@/app/GlobalRedux/Features/user/userSlice";
import useUsers from "@/app/GlobalRedux/hooks/useUser";
import Head from "next/head";
import { useDispatch } from "react-redux";

const UserList = () => {
  const { users, filter, isLoading, error } = useUsers();
  const dispatch = useDispatch();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex flex-col m-8">
      <Head>
        <title>Users</title>
      </Head>
      <span className="text-2xl font-bold">USERS LIST</span>
      <div className="flex justify-start items-center flex-col w-fit min-h-screen">
        {filter.map((user: any) => (
          <div
            className="w-80 border border-black rounded-md flex justify-start m-2 p-2 hover:bg-zinc-200"
            key={user.id}
          >
            <div className="mr-4">
              <img
                src={user.avatar}
                alt="Profile Avatar"
                className="w-20 h-auto border rounded-full"
              />
            </div>
            <div className="flex flex-col justify-center items-start">
              <p className="font-bold">
                {user.first_name} {user.last_name}
              </p>
              <small className="text-gray-700">{user.email}</small>
            </div>
          </div>
        ))}
        <div className="flex justify-between mt-4">
          <button
            className="border border-black rounded text-md font-bold px-4 mr-4"
            onClick={() => dispatch(filteredUser(users))}
          >
            FILTER USER
          </button>
          <button
            className="border border-black rounded text-md font-bold px-4 "
            onClick={() => dispatch(getAllUsers(users))}
          >
            ALL USER
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserList;
