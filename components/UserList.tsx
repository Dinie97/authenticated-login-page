"use client";
// pages/index.tsx
import { filterUsers } from "@/app/GlobalRedux/Features/user/userSlice";
import useUsers from "@/app/GlobalRedux/hooks/useUser";
import Head from "next/head";
import { useDispatch } from "react-redux";

const UserList = () => {
  const { users, isLoading, error } = useUsers();
  const dispatch = useDispatch();
  let FilterUser = filterUsers(users);
  console.log(FilterUser);
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex flex-col">
      <Head>
        <title>Users</title>
      </Head>
      <h1>Users</h1>
      <div className="flex justify-start items-start grid gap-4 grid-cols-2 w-fit">
        {FilterUser.payload.map((user: any) => (
          <div
            className="w-80 border border-black rounded-md flex justify-start m-2 p-2"
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
              <p>
                {user.first_name} {user.last_name}
              </p>
              <p>{user.email}</p>
            </div>
          </div>
        ))}
      </div>

      <button onClick={() => dispatch(filterUsers(users))}>Filter</button>
    </div>
  );
};

export default UserList;
