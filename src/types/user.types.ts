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

export type Address = {
    state: string | null
    city: string | null
    pin: string | null
    address: string | null
    phone: string | null
    email: string | null
    website: string | null
}

export type Designation = {
    id: number
    designation: string
    institution: string
    year_of_joining: string
}

export type AcademicQualification = {
    id: number
    degree: string
    institution: string
    year_of_passing: string
}

export type UrologyTraining = {
    id: number
    institution: string
    from_date: string
    to_date: string
}

export type Member = {
    id: number
    membership_no: string | null
    name: string
    email: string
    gender: string | null
    city_name: string | null
    mobile_no: string | null
    membership_type: string | null
    dob: string | null
    usi_member: 'yes' | 'no'
    usi_number: string | null
    preferred_address: 'office' | 'residence'
    membership_approved_date: string | null
    status: 'approved' | 'pending' | 'rejected'
    is_active: boolean
    is_verified: boolean
    last_login_at: string | null
    designation_status: 'done' | 'pending'
    academic_status: 'done' | 'pending'
    training_status: 'done' | 'pending'
    office_address: Address | null
    residence_address: Address | null
    present_designations: Designation[]
    academic_qualifications: AcademicQualification[]
    urology_trainings: UrologyTraining[]
}

export function getPreferredAddress(member: Member): Address | null {
    if (member.preferred_address === 'office') {
        return member.office_address ?? member.residence_address ?? null
    }
    return member.residence_address ?? member.office_address ?? null
}

export function hasAddress(addr: Address | null): boolean {
    if (!addr) return false
    return Object.values(addr).some(v => v !== null && v !== '')
}