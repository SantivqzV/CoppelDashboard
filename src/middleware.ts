import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { decryptData } from "./lib/crypto";
import useAuth from "./hooks/useAuth";

export function middleware(request: NextRequest) {
  const userCookie = request.cookies.get("user")?.value;

  // If cookie exists, user is considered authenticated
  if (userCookie) {
    if (request.nextUrl.pathname === "/") {
      return NextResponse.redirect(new URL("/home", request.url));
    }
  } else {
    // If not authenticated, redirect to login for protected routes
    if (request.nextUrl.pathname !== "/" && request.nextUrl.pathname !== "/signup") {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|logo.png|robots.txt).*)",
  ],
};