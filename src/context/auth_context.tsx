'use client';
import { api } from "@/services/api";
import { tokenStore } from "@/services/tokenStore";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import React, { createContext, useContext, useState } from "react";
import toast from "react-hot-toast";

type User = {
    id: number;
    name: string;
    email: string;
    customer_id: string;
};

type AuthContextType = {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    loading: boolean;
    isLoggingOut: boolean;
    login: (data: any) => void;
    logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [token, setToken] = useState<string | null>(() => tokenStore.getAccessToken());
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const router = useRouter();
    const queryClient = useQueryClient();

    const { data: user, isLoading } = useQuery<User | null, AxiosError>({
        queryKey: ["user_profile"],
        queryFn: async () => {
            const res = await api.get("");
            const userRaw = res.data.data;
            return {
                ...userRaw,
                customer_id: userRaw.customer_id || userRaw.id,
            };
        },
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

    const login = (data: any) => {
        const accessToken = data.access_token;
        const userRaw = data.customer;

        const user = {
            ...userRaw,
            customer_id: userRaw.customer_id || userRaw.id,
        };

        tokenStore.setAccessToken(accessToken);
        setToken(accessToken);
        queryClient.setQueryData(["user_profile"], user);

        router.push(`/profile/${user.customer_id}`);
    };

    const logout = async () => {
        if (isLoggingOut) return;
        setIsLoggingOut(true);

        try {
            if (token) {
                await api.post("")
            }
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