"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import React from "react";
import Register from "./Register";
import User from "./User";
import UserList from "./UserList";

const Dashboard = () => {
  const { data: session } = useSession();

  return (
    <>
      {session ? (
        <>
          {/* <img
            src={session.user?.image as string}
            className="rounded-full h-10"
          ></img>
          <h1>Welcome Back {session.user?.name}</h1> */}

          <User />
          <UserList />
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="border border-black rounded-lg"
          >
            Signout
          </button>
          <p>{JSON.stringify(session)}</p>
          {/* get user signin details */}
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
