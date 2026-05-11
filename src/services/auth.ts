import { LoginResponse, Member } from "@/types/user.types";
import { api } from "./api"
import { BASE_URI } from "./blog";

export type LoginPayload = {
    contact: string;
    otp: string;
}


export const authService = {
    getOtp: async ({ email }: { email: string }) => {
        const { data } = await api.post(`${BASE_URI}/member/login`, { contact: email });
        return data
    },
    login: async (payload: LoginPayload): Promise<LoginResponse> => {
        const { data } = await api.post(`${BASE_URI}/member/verify-otp`, payload)
        return data
    },
    logout: async (): Promise<void> => {
        await api.post("/auth/logout")
    },
    getProfile: async (): Promise<Member> => {
        const { data } = await api.get(`${BASE_URI}/member/profile`)
        const userRaw = data.data
        return userRaw
    }
}