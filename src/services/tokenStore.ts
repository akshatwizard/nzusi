import { NextRequest } from "next/server";

const TOKEN_NAME = "user_access_token";
const MAX_AGE = 7 * 24 * 60 * 60;
const isProd = process.env.NODE_ENV === "production";

const buildCookieString = (value: string, maxAge: number): string => {
    return [
        `${TOKEN_NAME}=${value}`,
        `path=/`,
        `max-age=${maxAge}`,
        `SameSite=Lax`,
        // isProd ? "Secure" : "",
    ].filter(Boolean).join("; ");
};

export const tokenStore = {
    setAccessToken: (token: string): void => {
        if (typeof document === "undefined") {
            console.log("setAccessToken: skipped — no document");
            return;
        }
        const cookieString = buildCookieString(token, MAX_AGE);
        document.cookie = cookieString;
    },

    getAccessToken: (cookieHeader?: string): string | null => {
        const source = cookieHeader ?? (typeof document !== "undefined" ? document.cookie : "");
        if (!source) return null;
        for (const cookie of source.split(";")) {
            const [key, ...rest] = cookie.trim().split("=");
            if (key === TOKEN_NAME) {
                return rest.join("=") || null; 
            }
        }
        return null;
    },

    getFromRequest: (req: NextRequest): string | null => {
        return req.cookies.get(TOKEN_NAME)?.value ?? null;
    },

    removeAccessToken: (): void => {
        if (typeof document === "undefined") return;
        document.cookie = buildCookieString("", 0);
    },
};