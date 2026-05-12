import { NextRequest, NextResponse } from 'next/server';
import { tokenStore } from './services/tokenStore';

export default async function proxy(req: NextRequest) {
    const token = tokenStore.getFromRequest(req);
    if (!token) return NextResponse.redirect(new URL("/", req.url));

    const res = NextResponse.next();
    return res;
}

export const config = {
    matcher: [
        "/profile/:path*",
    ],
};