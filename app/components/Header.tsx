"use client";

import { signOut, useSession } from "next-auth/react";

export default function Header() {
  const { data: session } = useSession();

  return (
    <>
      {session ? (
        <>
          <header className="bg-background text-foreground p-4 shadow-md text-white bg-black">
            <div className="container mx-auto flex justify-between items-center">
              <h1 className="text-xl font-bold">DINIE SYAHIRAH</h1>

              <nav>
                <ul className="flex justify-center items-center flex-row space-x-4">
                  {/* <li>
                    <a href="#" className="text-primary hover:text-primary/80">
                      Home
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-primary hover:text-primary/80">
                      About
                    </a>
                  </li> */}
                  <li>
                    <span>Hi, {session.user?.name} </span>
                  </li>
                  <li>
                    <button
                      onClick={() => signOut({ callbackUrl: "/" })}
                      className="border border-white rounded-lg p-2  hover:bg-zinc-500"
                    >
                      Signout
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          </header>
        </>
      ) : (
        <></>
      )}
    </>
  );
}
