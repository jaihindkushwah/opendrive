import { openSqliteDb } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        if(!body.name || !body.email || !body.password){return NextResponse.json({message:"All fields are required"},{status:500})}
        console.log(body);
        const db= await openSqliteDb();
        const newUser= await db.all(`INSERT INTO USER(name,email,password) VALUES('${body.name}','${body.email}','${body.password}')`);
        console.log(newUser);
        return NextResponse.json({message:"Successfully started aplication!!!"},{status:200})
        
    } catch (error) {
          console.log(error)
        return NextResponse.json({message:"Failed to get Data"},{status:500})
    }
}