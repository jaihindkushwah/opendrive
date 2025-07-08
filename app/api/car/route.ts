import { openSqliteDb } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(){
    try {
        const db= await openSqliteDb();

        const data= await db.exec("")


        return NextResponse.json({message:"Successfully started aplication!!!"})
        
    } catch (error) {
        return NextResponse.json({message:"Failed to get Data"})
    }
}
export async function POST(request: Request) {
    return NextResponse.json({message:"Successfully started aplication!!!"})
}