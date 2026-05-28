import { LoginResponse, Member, MemberListResponse, MembersList } from "@/types/user.types";
import { api } from "./api";

export type LoginPayload = {
    contact: string;
    otp: string;
};

type GetMembersParams = {
    page?: number
    search?: string
    type?: string
}

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

    getMembersList: async ({ page = 1, search = '', type = 'All', }: GetMembersParams = {}): Promise<MemberListResponse> => {
        const params: Record<string, string | number> = { page }

        // if (search.trim()) params.search = search.trim()
        // if (type && type !== 'All') params.type = type

        const { data } = await api.get<MemberListResponse>('/member/member-list', { params })
        return data
    }
};