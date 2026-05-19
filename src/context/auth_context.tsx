'use client';
import { authService } from "@/services/auth";
import { tokenStore } from "@/services/tokenStore";
import { Member } from "@/types/user.types";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import React, { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

const USER_STORAGE_KEY = "nzusi_user";

const userStorage = {
    get: (): Member | null => {
        try {
            const raw = localStorage.getItem(USER_STORAGE_KEY);
            return raw ? (JSON.parse(raw) as Member) : null;
        } catch {
            return null;
        }
    },
    set: (user: Member) => {
        try {
            localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
        } catch { }
    },
    remove: () => {
        try {
            localStorage.removeItem(USER_STORAGE_KEY);
        } catch { }
    },
};

type AuthContextType = {
    user: Member | null;
    token: string | null;
    isAuthenticated: boolean;
    isMounted: boolean;
    loading: boolean;
    isLoggingOut: boolean;
    login: (email: string, otp: string) => Promise<{ message: string }>;
    logout: () => Promise<void>;
    refreshUser: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [token, setToken] = useState<string | null>(null);
    const [cachedUser, setCachedUser] = useState<Member | null>(null);
    const [isMounted, setIsMounted] = useState(false);
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const router = useRouter();
    const queryClient = useQueryClient();

    useEffect(() => {
        const storedToken = tokenStore.getAccessToken();
        const storedUser = userStorage.get();
        setToken(storedToken);
        setCachedUser(storedUser);
        setIsMounted(true);
    }, []);

    const { data: user, isLoading } = useQuery<Member | null, AxiosError>({
        queryKey: ["user_profile"],
        queryFn: authService.getProfile,
        enabled: isMounted && !!token && !cachedUser,
        placeholderData: () => cachedUser,
        retry: (failureCount, error: AxiosError) => {
            if (error?.response?.status === 401) return false;
            return failureCount < 2;
        },
        throwOnError: (error: AxiosError) => {
            if (error?.response?.status === 401) {
                tokenStore.removeAccessToken();
                setToken(null);
                setCachedUser(null);
                userStorage.remove();
                queryClient.removeQueries({ queryKey: ["user_profile"] });
            }
            return false;
        },
    });

    useEffect(() => {
        if (user && !cachedUser) {
            userStorage.set(user);
            setCachedUser(user);
        }
    }, [user, cachedUser]);

    const login = async (email: string, otp: string) => {
        const data = await authService.login({ contact: email, otp });

        const accessToken = data.data.access_token;
        const userRaw = data.data.member;
        tokenStore.setAccessToken(accessToken);
        setToken(accessToken);
        setCachedUser(userRaw);
        userStorage.set(userRaw);
        queryClient.setQueryData(["user_profile"], userRaw);

        router.push(`/profile/${userRaw.name.toLocaleLowerCase().split(" ").join("-")}`);
        return { message: data.message };
    };

    const logout = async () => {
        if (isLoggingOut) return;
        setIsLoggingOut(true);

        try {
            await authService.logout();
        } catch (e) {
            console.error("Logout error", e);
        }

        tokenStore.removeAccessToken();
        setToken(null);
        setCachedUser(null);
        userStorage.remove();
        queryClient.removeQueries({ queryKey: ["user_profile"] });

        router.push("/");
        toast.success("Logout Successful...!!");
        setIsLoggingOut(false);
    };


    const refreshUser = async () => {
        try {
            const freshUser = await authService.getProfile();
            setCachedUser(freshUser);
            userStorage.set(freshUser);
            queryClient.setQueryData(["user_profile"], freshUser);
        } catch (error) {
            console.error("Failed to refresh user", error);
        }
    };

    const resolvedUser = user ?? cachedUser ?? null;
    const isAuthLoading = isMounted && !!token && !cachedUser && isLoading;

    return (
        <AuthContext.Provider
            value={{
                user: resolvedUser,
                token,
                isAuthenticated: !!token && !!resolvedUser,
                loading: isAuthLoading,
                isMounted,
                isLoggingOut,
                login,
                logout,
                refreshUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within AuthProvider");
    return context;
};