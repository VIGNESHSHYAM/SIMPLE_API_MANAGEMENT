import { NextResponse } from "next/server";
import { verifyJWT } from "./lib/jwt";

const protectedRoutes = ["/dashboard"];
const publicAuthPages = ["/login","/sign-up"]; 
export async function middleware(req) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get("auth-token")?.value;

  let isAuthenticated = false;
  if (token) {
    try {
      await verifyJWT(token);
      isAuthenticated = true;
    } catch (err) {
      console.error("JWT verification failed:", err.message);
    }
  }

  if (protectedRoutes.some((path) => pathname.startsWith(path)) && !isAuthenticated) {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  if (publicAuthPages.includes(pathname) && isAuthenticated) {
    const url = req.nextUrl.clone();
    url.pathname = "/dashboard"; 
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}
