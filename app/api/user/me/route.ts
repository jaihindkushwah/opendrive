import { getSession } from "@/lib/session-wrapper";
import { UserRepository } from "@/services/user/repository";
import { NextResponse } from "next/server";


export async function GET() {
    try {
        const session= await getSession();
        if(!session.user?.email){
            return NextResponse.json({message:"User not found"},{status:500})
        }
        const userRepository= await UserRepository.init();
        const {password,...data}= await userRepository.findUserByEmail(session.user.email);
        return NextResponse.json({message:"Successfully started aplication!!!",data},{status:200})
    } catch (error) {
        if(error instanceof Error){
            return NextResponse.json({message:error.message},{status:500})
        }
        return NextResponse.json({message:"Failed to get Data"},{status:500})
    }
}