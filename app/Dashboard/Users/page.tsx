"use client";

import useUsers from "@/app/GlobalRedux/hooks/useUser";
import Head from "next/head";
import { useEffect, useState } from "react";
import { FaEye, FaEyeSlash, FaRegEyeSlash } from "react-icons/fa";
import { useDispatch } from "react-redux";

export default function UserList() {
  const { users, filter, isLoading, error } = useUsers();
  const dispatch = useDispatch();
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    setUserData(users);
  }, [users]);

  const handleButtonClick = async (userId: any) => {
    try {
      const response = await fetch(`/api/auth/singleUser?userId=${userId}`);
      const data = await response.json();
      const updatedUser = users.map((item: any) =>
        item.id === userId ? { ...item, email: data.success?.email } : item
      );
      setUserData(updatedUser);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchSingleUser = async (id: any) => {
    const response = await fetch(`/api/auth/singleUser/?id=${id}`);
    const data = await response.json();
    return data;
  };

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
      <div className="flex justify-start items-start mt-4 w-fit min-h-screen">
        <table className="table-fixed text-left border-collapse border border-slate-500">
          <thead className="bg-black text-white">
            <tr>
              <th className="border border-slate-600 p-2 mx-4 w-40">
                First Name
              </th>
              <th className="border border-slate-600 p-2 mx-4 w-40">
                Last Name
              </th>
              <th className="border border-slate-600 p-2 mx-4 w-80">Email</th>
            </tr>
          </thead>
          <tbody>
            {userData.map((user: any) => (
              <tr key={user.id}>
                <td className="border border-slate-600 p-2 m-2">
                  {user.first_name}
                </td>
                <td className="border border-slate-600 p-2 m-2">
                  {user.last_name}
                </td>
                <td className="border border-slate-600 p-2 m-2 flex justify-between">
                  {user.email}
                  <button
                    className="ml-2"
                    onClick={() => handleButtonClick(user.id)}
                  >
                    <FaEye />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
