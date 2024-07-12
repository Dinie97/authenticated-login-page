"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import React from "react";
import Register from "../components/Register";
import UserList from "./Users/UserList";
import Footer from "../components/Footer";

export default async function Dashboard() {
  // const Dashboard = () => {
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
}

// export default Dashboard;
