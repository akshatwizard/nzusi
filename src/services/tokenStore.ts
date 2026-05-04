const TOKEN_NAME = "user_access_token";
const MAX_AGE = 7 * 24 * 60 * 60;
const isProd = process.env.NODE_ENV === "production";

export const tokenStore = {

    setAccessToken: (token: string) => {
        if (typeof document === "undefined") return;

        document.cookie = [
            `${TOKEN_NAME}=${encodeURIComponent(token)}`,
            `path=/`,
            `max-age=${MAX_AGE}`,
            `SameSite=Lax`,
            isProd ? "Secure" : "",
        ]
            .filter(Boolean)
            .join("; ");
    },

    getAccessToken: (cookieHeader?: string): string | null => {
        const source = cookieHeader ?? (typeof document !== "undefined" ? document.cookie : "");
        if (!source) return null;

        const match = source.match(new RegExp("(^| )" + TOKEN_NAME + "=([^;]+)"));
        return match ? decodeURIComponent(match[2]) : null;
    },
    removeAccessToken: () => {
        if (typeof document === "undefined") return;

        document.cookie = [
            `${TOKEN_NAME}=`,
            `path=/`,
            `max-age=0`,
            `SameSite=Lax`,
            isProd ? "Secure" : "",
        ]
            .filter(Boolean)
            .join("; ");
    },
};