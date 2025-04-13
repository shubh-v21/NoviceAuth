import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    // If the user is authenticated and trying to access the auth page, redirect to dashboard
    if (
      req.nextUrl.pathname === "/auth" &&
      req.nextauth.token
    ) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Allow access to auth page without authentication
        if (req.nextUrl.pathname === "/auth") {
          return true;
        }

        // Require authentication for all other pages
        return !!token;
      },
    },
  }
);

export const config = {
  matcher: ["/dashboard/:path*", "/auth"],
}; 