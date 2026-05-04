import { QueryClient } from "@tanstack/react-query";

export function makeQueryClient() {
    return new QueryClient({
        defaultOptions: {
            queries: {
                retry: false,
                staleTime: 1000 * 60 * 5,
                gcTime: 1000 * 60 * 5,
                refetchOnWindowFocus: false,
            },
            mutations: {
                retry: false,
            },
        },
    });
}

let browserQueryClient: QueryClient | undefined = undefined;

export function getQueryClient() {
    if (typeof window === "undefined") {
        return makeQueryClient();
    }

    if (!browserQueryClient) {
        browserQueryClient = makeQueryClient();
    }
    return browserQueryClient;
}