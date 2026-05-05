import { api } from "./api"

export type User = {
    id: number;
    name: string;
    email: string;
    customer_id: string | number;
}

export type LoginPayload = {
    email: string;
    otp: string;
}

export type LoginResponse = {
    access_token: string;
    customer: User;
}

export const authService = {
    getOtp: async ({ email }: { email: string }) => {
        const { data } = await api.post("/get-opt", { email });
        return data
    },
    login: async (payload: LoginPayload): Promise<LoginResponse> => {
        const { data } = await api.post("/auth/login", payload)
        return data
    },
    logout: async (): Promise<void> => {
        await api.post("/auth/logout")
    },
    getProfile: async (): Promise<User> => {
        const { data } = await api.get("/customer/profile")
        const userRaw = data.data
        return {
            ...userRaw,
            customer_id: userRaw.customer_id || userRaw.id,
        }
    },
}