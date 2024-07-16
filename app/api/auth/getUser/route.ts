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

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const params = req.nextUrl.searchParams;
  const page = params.get("page");
  const pageSize = params.get("pageSize");

  var maxNum = 0;
  var num = 0;

  if (pageSize) {
    maxNum = parseInt(pageSize);
  }
  if (page) {
    num = parseInt(page);
  }
  var filterList: User[] = [];

  if (session) {
    for (let i = num; i <= maxNum; i++) {
      const response = await fetch(`https://reqres.in/api/users?page=${i}`);
      const data = response.json() as Promise<UsersResponse>;
      let res = (await data).data;
      console.log(res);
      res.map((user) => {
        user.email = user.email.replace(/.(?=.*@)/g, "*");

        if (user.first_name.startsWith("G") || user.last_name.startsWith("W")) {
          filterList.push(user);
        }
      });
    }
    return NextResponse.json({ success: filterList }, { status: 200 });
  } else {
    return NextResponse.json({ error: "Not Authorized" }, { status: 400 });
  }
}
