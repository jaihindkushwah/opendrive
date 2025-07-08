import { openSqliteDb } from "@/lib/db";
import { encryptUserPassword } from "@/lib/helper";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body.name || !body.email || !body.password) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 500 }
      );
    }
    // console.log(body);
    const db = await openSqliteDb();
    const hashPassword = encryptUserPassword(body.password);
     await db.all(
      `INSERT INTO USER(name,email,password) VALUES('${
        body.name
      }','${body.email.toLowerCase()}','${hashPassword}')`
    );
    // console.log(newUser);
    return NextResponse.json(
      { message: "Successfully started aplication!!!" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
    return NextResponse.json(
      { message: "Failed to get Data" },
      { status: 500 }
    );
  }
}
