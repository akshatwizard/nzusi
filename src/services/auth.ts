import { LoginResponse, Member } from "@/types/user.types";
import { api } from "./api";

export type LoginPayload = {
    contact: string;
    otp: string;
};

export const authService = {
    getOtp: async ({ email }: { email: string }) => {
        const { data } = await api.post(`/member/login`, { contact: email });
        return data;
    },

    login: async (payload: LoginPayload): Promise<LoginResponse> => {
        const { data } = await api.post(`/member/verify-otp`, payload);
        return data;
    },

    logout: async (): Promise<void> => {
        await api.post(`/member/logout`);
    },

    getProfile: async (): Promise<Member> => {
        const { data } = await api.get(`/member/profile`);
        return data.data;
    },
};