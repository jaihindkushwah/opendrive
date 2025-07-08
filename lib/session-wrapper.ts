import { getIronSession } from "iron-session";
import { sessionOptions } from "./session";
import { UserSessionData } from "@/types";
import { cookies } from "next/headers";


export async function  getSession() {
  const cookieStore = await cookies();
  return getIronSession<UserSessionData>(cookieStore, sessionOptions); // App router: res is not needed
}
