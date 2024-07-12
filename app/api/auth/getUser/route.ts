//

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { NextResponse } from "next/server";
import fetch from "node-fetch";
interface User {
  id: number;
  email: string;
  maskEmail: string;
  viewMail: boolean;
  first_name: string;
  last_name: string;
  avatar: string;
}

interface UsersResponse {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: User[];
}

interface UsersState {
  users: User[];
  filteredUser: User[];
  isLoading: boolean;
  error: string | null;
}

const initialState: UsersState = {
  users: [],
  filteredUser: [],
  isLoading: false,
  error: null,
};

export async function GET() {
  const session = await getServerSession(authOptions);
  // return error response if the user not login
  if (!session) {
    return NextResponse.json({ error: "Not Authorized" }, { status: 400 });
  }

  // Call the API from https://reqres.in/api/users
  const response = await fetch("https://reqres.in/api/users");
  // console.log(response.json());
  const data = response.json() as Promise<UsersResponse>;
  let res = (await data).data;

  // Mask email data
  res.forEach((user) => {
    user.email = user.email.replace(/.(?=.*@)/g, "*");
  });

  // Display the data if the user is login and authenticated
  return NextResponse.json({ success: res }, { status: 200 });
}
