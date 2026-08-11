import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
    const token = req.cookies.get("bloggy_session")?.value;
    const isAuthPage = req.nextUrl.pathname.startsWith("/login") || req.nextUrl.pathname.startsWith("/register");
    const isProtectedPage = req.nextUrl.pathname.startsWith("/dashboard") || req.nextUrl.pathname.startsWith("/onboarding");

    // Redirect unauthenticated users away from protected pages to /login
    if (isProtectedPage && !token) {
        const loginUrl = new URL("/login", req.url);
        return NextResponse.redirect(loginUrl);
    }

    // Redirect authenticated users away from /login or /register directly to /dashboard
    if (isAuthPage && token) {
        const dashboardUrl = new URL("/dashboard", req.url);
        return NextResponse.redirect(dashboardUrl);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/dashboard/:path*", "/onboarding/:path*", "/login", "/register"],
};