"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import React from "react";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

const Register = () => {
  const { data: session } = useSession();

  return (
    <div className="w-full max-w-md p-8 space-y-6 bg-white border border-black rounded-lg shadow-lg">
      <div className="flex items-center justify-center">
        <h2 className="text-xl font-bold text-zinc-900 text-black">SIGN UP</h2>
      </div>
      <div className="space-y-4 text-black">
        <button
          className="w-full flex items-center justify-center py-2 px-4 border border-zinc-300 dark:border-zinc-700 rounded-md shadow-sm text-sm font-medium  bg-gray-200 hover:bg-black hover:text-white "
          onClick={() => signIn("github")}
        >
          <FaGithub className="mx-2" />
          Sign in with Github
        </button>
        <button
          onClick={() => signIn("google")}
          className="w-full flex items-center justify-center py-2 px-4 border border-zinc-300 dark:border-zinc-700 rounded-md shadow-sm text-sm font-medium  bg-gray-200 hover:bg-indigo-700 hover:text-white"
        >
          <FcGoogle className="mx-2" />
          Sign in with Google
        </button>
      </div>
      <hr className="border-zinc-300 dark:border-zinc-700" />
      <form className="space-y-4">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-black"
          >
            Name
          </label>
          <input
            id="name"
            name="name"
            placeholder="..."
            type="text"
            required
            className="mt-1 block w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-md shadow-sm text-black"
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-black"
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="..."
            required
            className="mt-1 block w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-md shadow-sm text-black"
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-black"
          >
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="..."
            required
            className="mt-1 block w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-md shadow-sm text-black"
          />
        </div>
        <div>
          <label
            htmlFor="confirm-password"
            className="block text-sm font-medium text-black"
          >
            Confirm Password
          </label>
          <input
            id="confirm-password"
            name="confirm-password"
            type="password"
            placeholder="..."
            required
            className="mt-1 block w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-md shadow-sm text-black "
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
        >
          Sign up
        </button>
      </form>
      <p className="text-sm text-center text-black ">
        Already have an account?{" "}
        <a href="#" className="text-blue-500 hover:underline">
          Login here
        </a>
      </p>
    </div>
  );
};

export default Register;
