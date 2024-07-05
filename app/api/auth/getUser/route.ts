import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getServerSession(authOptions);
  // return error response if the user not login
  if (!session) {
    return NextResponse.json({ error: "Not Authorized" }, { status: 400 });
  }

  // Display the data if the user is login and authenticated
  return NextResponse.json({ success: session }, { status: 200 });
}
