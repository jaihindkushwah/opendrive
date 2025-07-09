
import { getCarListings } from "@/lib/data";
import { NextResponse } from "next/server";

export async function GET(){
    try {
        const data=getCarListings(1,10);
        return NextResponse.json(data)
    } catch (error) {
        return NextResponse.json({message:"Failed to get Data"})
    }
}
export async function POST(request: Request) {
    return NextResponse.json({message:"Successfully started aplication!!!"})
}