import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

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

export async function GET() {
  const session = await getServerSession(authOptions);
  if (session) {
    const response = await fetch("https://reqres.in/api/users");
    const data = response.json() as Promise<UsersResponse>;
    let res = await data;
    return NextResponse.json({ success: res }, { status: 200 });
  } else {
    return NextResponse.json({ error: "Not Authorized" }, { status: 400 });
  }
}
