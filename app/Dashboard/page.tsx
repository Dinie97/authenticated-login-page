"use client";

import UserList from "./Users/page";

export default function Dashboard() {
  return (
    <>
      <div className="flex justify-start items-start">
        <UserList />
      </div>
    </>
  );
}
