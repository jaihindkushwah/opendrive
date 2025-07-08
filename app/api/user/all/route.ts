import { openSqliteDb } from "@/lib/db";
import { NextResponse } from "next/server";


export async function GET(request: Request) {
    try {
        console.log("hello");
        const db= await openSqliteDb();
        const data= await db.all(`SELECT * FROM USER`);
        // console.log(data);
        return NextResponse.json({message:"Successfully started aplication!!!",data},{status:200})
    } catch (error) {
        console.log(error)
        return NextResponse.json({message:"Failed to get Data"},{status:500})
    }
}