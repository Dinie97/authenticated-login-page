"use client";
// pages/index.tsx
import {
  displayEmailById,
  filteredUser,
  getAllUsers,
  MaskedEmail,
  unmaskEmails,
} from "@/app/GlobalRedux/Features/user/userSlice";
import useUsers from "@/app/GlobalRedux/hooks/useUser";
import Head from "next/head";
import { FaEye, FaEyeSlash, FaRegEyeSlash } from "react-icons/fa";
import { useDispatch } from "react-redux";

export default async function UserList() {
  // const UserList = () => {
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
      <div className="flex justify-end mt-4">
        <button
          className="border rounded-lg text-md font-bold py-2 px-4 mr-4 bg-indigo-700 text-white hover:bg-indigo-500"
          onClick={() => dispatch(filteredUser(users))}
        >
          FILTER USER
        </button>
        <button
          className="border rounded-lg text-md font-bold px-4 bg-sky-700 text-white hover:bg-sky-600"
          onClick={() => dispatch(getAllUsers(users))}
        >
          ALL USER
        </button>
      </div>
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
            {filter.map((user: any) => (
              <tr key={user.id}>
                <td className="border border-slate-600 p-2 m-2">
                  {user.first_name}
                </td>
                <td className="border border-slate-600 p-2 m-2">
                  {user.last_name}
                </td>
                <td className="border border-slate-600 p-2 m-2 flex justify-between">
                  {user.maskEmail}
                  <button
                    className="ml-2"
                    onClick={() => dispatch(displayEmailById(user.id))}
                  >
                    {user.viewMail ? <FaEye /> : <FaEyeSlash />}
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

// export default UserList;
