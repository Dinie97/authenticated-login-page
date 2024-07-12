"use client";

import { useSession } from "next-auth/react";
import Register from "../Guest/Register/page";
import UserList from "./Users/page";

export default function Dashboard() {
  const { data: session } = useSession();

  return (
    <>
      {session ? (
        <>
          <UserList />
        </>
      ) : (
        <>
          <Register />
        </>
      )}
    </>
  );
}
