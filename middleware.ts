"use client";

import { auth } from "./auth";

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const { nextUrl } = req;

  const isPublicRoute = nextUrl.pathname === "/";
  const isProtectedRoute = nextUrl.pathname.startsWith("/dashboard");

  if (isPublicRoute && isLoggedIn) {
    return Response.redirect(new URL("/dashboard", nextUrl));
  }
  if (isProtectedRoute && !isLoggedIn) {
    return Response.redirect(new URL("/", nextUrl));
  }
});

//matcher config 

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}