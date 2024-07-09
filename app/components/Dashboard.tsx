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
        </>
      ) : (
        <>
          <Register />
        </>
      )}
    </>
  );
};

export default Dashboard;
