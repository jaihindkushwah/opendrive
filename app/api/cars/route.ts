import { getSession } from "@/lib/session-wrapper";
import { CarListingRepository } from "@/services/car/repository";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const status = searchParams.get("status")||"all";
    const search= searchParams.get("search")||"";
    const carRepository = await CarListingRepository.init();
    const data = await carRepository.getCarListings(page, limit,status,search);
    const totalPages = Math.ceil(data.length / limit);
    return NextResponse.json({ data:data.slice((page - 1) * limit, page * limit), total: data.length, page: page, totalPages: totalPages  });
  } catch (error) {
    console.error("Error fetching car listings:", error);
    return NextResponse.json(
      { message: "Failed to get data" },
      { status: 500 }
    );
  }
}
export async function POST(request: Request) {
  try {
    const session = await getSession();
    const data = await request.json();
    const carRepository = await CarListingRepository.init();
    await carRepository.insertManyCarsByUserId(session.user.id, data);
    return NextResponse.json({ message: "Successfully started aplication!!!" });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Failed to get Data" });
  }
}
