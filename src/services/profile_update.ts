import { ProfileAcademic, ProfileAcademicResponse, ProfileAddressPayload, ProfileAddressResponse, ProfileDesignation, ProfileDesignationResponse, ProfileUpdate, ProfileUpdateResponse, ProfileUrologyTrainings, ProfileUrologyTrainingsResponse } from "@/types/profile_update.types"
import { api } from "./api"


export const profileUpdateService = {

    updateProfilePic: async ({ profile_picture }: { profile_picture: File }) => {
        const formData = new FormData()
        formData.append('profile_picture', profile_picture)

        const { data } = await api.post('/member/profile-image', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        })
        return data
    },

    updateProfile: async ({ payload }: ProfileUpdate): Promise<ProfileUpdateResponse> => {
        const { data } = await api.post<ProfileUpdateResponse>("/member/update-profile", payload)
        return data
    },

    updateDesignation: async ({ payload }: ProfileDesignation): Promise<ProfileDesignationResponse> => {
        const { data } = await api.put("/member/present-appointment-designation", payload)
        return data
    },

    updateAcademicDetails: async ({ qualifications }: ProfileAcademic): Promise<ProfileAcademicResponse> => {
        const { data } = await api.put("/member/academic-qualification", { qualifications })
        return data
    },

    updateUrologyTrainings: async ({ trainings }: ProfileUrologyTrainings): Promise<ProfileUrologyTrainingsResponse> => {
        const { data } = await api.put("/member/training-in-urology", { trainings })
        return data
    },

    updateAddress: async ({ address }: { address: ProfileAddressPayload }): Promise<ProfileAddressResponse> => {
        const { data } = await api.put("member/profile/address", address)
        return data
    },
}
