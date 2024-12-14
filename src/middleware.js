import { NextResponse } from "next/server";

export function middleware(request) {

  const token = request.cookies.get("authToken")?.value;
  const protectedRoutes = ["/", "/setting", "/archive"];
  if (protectedRoutes.some((route) => request.nextUrl.pathname === route)) {

    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }


  return NextResponse.next();
}


export const config = {
  matcher: ["/", "/setting", "/archive"],
};
