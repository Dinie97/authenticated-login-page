import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
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

export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("userId");

  const session = await getServerSession(authOptions);
  if (session) {
    const response = await fetch(`https://reqres.in/api/users/${id}`); // Use the 'id' parameter in the API URL
    const data = response.json() as Promise<UsersResponse>;
    let res = (await data).data;
    return NextResponse.json({ success: res }, { status: 200 });
  } else {
    return NextResponse.json({ error: "Not Authorized" }, { status: 400 });
  }
}
