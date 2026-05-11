import { NextRequest, NextResponse } from 'next/server';

const TOKEN_NAME = "user_access_token";

export default async function proxy(req: NextRequest) {
    const token = req.cookies.get(TOKEN_NAME)?.value;
    if (!token) return NextResponse.redirect(new URL("/", req.url));

    const res = NextResponse.next();
    return res;
}

export const config = {
    matcher: [
        "/profile/:path*",
    ],
};