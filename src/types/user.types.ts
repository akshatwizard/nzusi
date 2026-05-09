export type LoginResponse = {
    success: boolean;
    message: string;
    data: UserData
}
export type UserData = {
    member: Member;
    access_token: string,
    token_type: string,
    is_profile_complete: boolean,
    expires_in: number
}

export type Member = {
    id: number,
    membership_no: string,
    name: string,
    email: string,
    gender: string,
    city_name: string,
    mobile_no: string,
    membership_type_id: string,
    dob: null | string,
    preferred_address: string | null,
    membership_approved_date: string | null,
    status: string,
    user_id: string,
    login_attempts: number,
    last_login_at: string,
    last_login_ip: string | null,
    is_active: boolean,
    is_verified: boolean,
    password_changed_at: string | null,
    created_at: string | null,
    updated_at: string | null
}
