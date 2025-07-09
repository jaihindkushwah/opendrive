import { CarListingRepository } from "@/services/car/repository";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const {id}= await params;
  const carRepository= await CarListingRepository.init();
  const data= await carRepository.getCarById(id);
  return NextResponse.json({ message: "Successfully started aplication!!!",data });
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const {id}= await params;
  return NextResponse.json({ message: "Successfully started aplication!!!",id });
}
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const {id}= await params;
  const body = await request.json();
  const carRepository= await CarListingRepository.init();
  await carRepository.updateCar(id,body);
  return NextResponse.json({ message: "Successfully started aplication!!!",id });
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const {id}= await params;
  const body = await request.json();
  const carRepository= await CarListingRepository.init();
  await carRepository.updateCar(id,body);
  return NextResponse.json({ message: "Successfully started aplication!!!",id });
}
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const {id}= await params;
  return NextResponse.json({ message: "Successfully started aplication!!!",id });
}
