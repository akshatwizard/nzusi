
export type ProfileUpdate = {
    payload: {
        name: string,
        email: string,
        gender: string | null,
        city_name: string | null,
        mobile_no: string | null,
        dob: string | Date | null
    }
}

export type ProfileUpdateResponse = {
    success: boolean,
    message: string
}