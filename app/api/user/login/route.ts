import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        console.log(body);
        return NextResponse.json({message:"Successfully started aplication!!!"},{status:200})
    } catch (error) {
        console.log(error)
        return NextResponse.json({message:"Failed to get Data"},{status:500})
    }
    
}