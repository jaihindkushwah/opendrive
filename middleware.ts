import { NextResponse, NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
// export function middleware(request: NextRequest) {
//     console.log("Welcome to message")
//   return NextResponse.redirect(new URL('/home', request.url))
// }
export function middleware(request: NextRequest) {
//   console.log("Welcome to middleware");
  if (request.nextUrl.pathname.startsWith("/about")) {
    return NextResponse.rewrite(new URL("/about-2", request.url));
  }

  if (request.nextUrl.pathname.startsWith("/dashboard")) {
    return NextResponse.rewrite(new URL("/dashboard/user", request.url));
  }
}
export const config = {
  matcher: ["/"],
};
