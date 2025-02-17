import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

/**
 * This function checks if the request has the needed jwt token.
 * @param {NextRequest} next - The NextRequest object required for middleware to work. We extract the token from the cookies,
 * and in the case if the token is not present, then it redirects to the login page.
 */

export function middleware(req: NextRequest) {
  try {
    const token = req.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
    return NextResponse.next();
  } catch (error) {
    console.error("Invalid token or failed to verify:", error);
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: ["/products/:path*", "/profile/:path*", "/products/:id"],
};
