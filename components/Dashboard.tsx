"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import React from "react";
import Register from "./Register";
import User from "./User";
import UserList from "./UserList";
import Footer from "./Footer";

const Dashboard = () => {
  const { data: session } = useSession();

  return (
    <>
      {session ? (
        <>
          <div className="flex justify-start items-start">
            <UserList />
          </div>

          {/* <p>{JSON.stringify(session)}</p> */}
        </>
      ) : (
        <>
          <Register />
          {/* <<h1 className="text-3xl text-red-500 text-bold">You Are Not Login</h1>
          <button
            onClick={() => signIn("google")}
            className="border border-black rounded-lg"
          >
            Sign in With Google
          </button>
          <button
            onClick={() => signIn("github")}
            className="border border-black rounded-lg"
          >
            Sign in With Github
          </button>> */}
        </>
      )}
    </>
  );
};

export default Dashboard;
