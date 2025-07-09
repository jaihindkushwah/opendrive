import { encryptUserPassword } from "@/lib/helper";
import { saveSessionWithSignedToken } from "@/lib/session";
import { UserRepository } from "@/services/user/repository";
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
    const hashPassword = encryptUserPassword(body.password);
    const userRepository = await UserRepository.init();
    const existingUser = await userRepository.findUserByEmail(body.email);
    if (existingUser) {
      return NextResponse.json(
        { message: "User already registered" },
        { status: 400 }
      );
    }
    await userRepository.createUser({ ...body, password: hashPassword });
    const { password, ...data } = await userRepository.findUserByEmail(
      body.email
    );
    await saveSessionWithSignedToken(data);
    return NextResponse.json(
      { message: "Successfully register user!", data },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
