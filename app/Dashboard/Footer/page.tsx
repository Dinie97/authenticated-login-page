"use client";

import { useSession } from "next-auth/react";

export default function Footer() {
  const { data: session } = useSession();
  const currentYear = new Date().getFullYear();
  return (
    <>
      {session ? (
        <>
          <footer className="footer bg-black text-white">
            <div className="container w-fit h-10">
              <div className="p-2 font-bold">
                <p>&copy; {currentYear} DINIE SYAHIRAH</p>
              </div>
            </div>
          </footer>
        </>
      ) : (
        <></>
      )}
    </>
  );
}
