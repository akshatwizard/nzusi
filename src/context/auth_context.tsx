'use client';
import { authService, } from "@/services/auth";
import { tokenStore } from "@/services/tokenStore";
import { Member } from "@/types/user.types";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import React, { createContext, useContext, useState } from "react";
import toast from "react-hot-toast";

type AuthContextType = {
    user: Member | null;
    token: string | null;
    isAuthenticated: boolean;
    loading: boolean;
    isLoggingOut: boolean;
    login: (email: string, otp: string) => Promise<{ message: string }>;
    logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [token, setToken] = useState<string | null>(() => tokenStore.getAccessToken());
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const router = useRouter();
    const queryClient = useQueryClient();

    const { data: user, isLoading } = useQuery<Member | null, AxiosError>({
        queryKey: ["user_profile"],
        queryFn: authService.getProfile,
        enabled: !!token,
        placeholderData: null,
        retry: (failureCount, error: AxiosError) => {
            if (error?.response?.status === 401) return false;
            return failureCount < 2;
        },
        throwOnError: (error: AxiosError) => {
            if (error?.response?.status === 401) {
                tokenStore.removeAccessToken();
                setToken(null);
                queryClient.removeQueries({ queryKey: ["user_profile"] });
            }
            return false;
        },
    });

    const login = async (email: string, otp: string) => {
        const data = await authService.login({ contact: email, otp });

        const accessToken = data.data.access_token;
        const userRaw = data.data.member;
        const user: Member = {
            ...userRaw,
            id: userRaw.id || userRaw.id,
        };

        tokenStore.setAccessToken(accessToken);
        setToken(accessToken);
        queryClient.setQueryData(["user_profile"], user);
        router.push(`/profile/${user.id}`);
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
        queryClient.removeQueries({ queryKey: ["user_profile"] });

        router.push("/");
        toast.success("Logout Successful...!!");
        setIsLoggingOut(false);
    };

    return (
        <AuthContext.Provider
            value={{
                user: user ?? null,
                token,
                isAuthenticated: !!token,
                loading: isLoading,
                login,
                logout,
                isLoggingOut,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within AuthProvider");
    }
    return context;
};