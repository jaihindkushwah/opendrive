import { NextResponse, NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/about")) {
    return NextResponse.rewrite(new URL("/about-2", request.url));
  }
  const session = request.cookies.get("car_rental_session");
  // console.log(session);
  if(!session) return NextResponse.rewrite(new URL("/auth", request.url));
  if (request.nextUrl.pathname.startsWith("/dashboard")) {
    return NextResponse.rewrite(new URL("/dashboard/user", request.url));
  }
}
export const config = {
  matcher: ["/"],
};
