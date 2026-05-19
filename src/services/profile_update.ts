import { ProfileUpdate, ProfileUpdateResponse } from "@/types/profile_update.types"
import { api } from "./api"


export const profileUpdateService = {
    updateProfile: async ({ payload }: ProfileUpdate): Promise<ProfileUpdateResponse> => {
        const { data } = await api.post<ProfileUpdateResponse>("/member/update-profile", payload)
        return data
    },
}