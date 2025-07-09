import { comparePassword } from "@/lib/helper";
import { saveSessionWithSignedToken } from "@/lib/session";
import { UserRepository } from "@/services/user/repository";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body.email || !body.password) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 500 }
      );
    }
    const userRepository= await UserRepository.init();
    const data= await userRepository.findUserByEmail(body.email);
    if (!data?.email) {
      return NextResponse.json({ message: "User not found" }, { status: 500 });
    }
    const matchPass = comparePassword(body.password, data.password);
    if (!matchPass) {
      return NextResponse.json(
        { message: "Password not match" },
        { status: 500 }
      );
    }
    const { password, ...newData } = data;
    await saveSessionWithSignedToken(newData);
    return NextResponse.json(
      { message: "Successfully login aplication!!!", data: newData },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
