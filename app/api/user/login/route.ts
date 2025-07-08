import { openSqliteDb } from "@/lib/db";
import { comparePassword } from "@/lib/helper";
import { sessionOptions } from "@/lib/session";
import { UserSessionData } from "@/types";
import { getIronSession } from "iron-session";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body.email || !body.password) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 500 }
      );
    }
    const db = await openSqliteDb();
    const data = await db.all(
      `SELECT * FROM USER WHERE email='${body.email.toLowerCase()}'`
    );
    if (!data.length) {
      return NextResponse.json({ message: "User not found" }, { status: 500 });
    }
    const matchPass = comparePassword(body.password, data[0].password);
    if (!matchPass) {
      return NextResponse.json(
        { message: "Password not match" },
        { status: 500 }
      );
    }
    // console.log(body);
    const { password, ...newData } = { ...data[0] };

    const cookieStore = await cookies(); // ✅
    const session = await getIronSession<UserSessionData>(
      cookieStore,
      sessionOptions
    );
    const jwtToken = jwt.sign(
      { id: newData.id, email: newData.email, role: newData.role },
      process.env.JWT_SECRET as string ||"admin",
      { expiresIn: "1d" }
    );
    session.user = {
      id: newData.id,
      email: newData.email,
      role: newData.role,
      token: jwtToken,
      name: newData.name
    };
    await session.save();
    return NextResponse.json(
      { message: "Successfully login aplication!!!", data: newData },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Failed to get Data" },
      { status: 500 }
    );
  }
}
