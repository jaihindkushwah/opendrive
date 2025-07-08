import { getIronSession } from "iron-session";
import { sessionOptions } from "@/lib/session";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  const cookieStore = await cookies();
  const session = await getIronSession(cookieStore, sessionOptions);

  session.destroy();

  return NextResponse.json(
    { message: "Logged out successfully" },
    { status: 200 }
  );
}
