import { Member, hasAddress } from '@/types/user.types'

export type ProfileField = {
    key: string
    label: string
    weight: number
    section: string
    filled: (m: Member) => boolean
}

export const PROFILE_FIELDS: ProfileField[] = [
    { key: 'name', label: 'Full name', weight: 10, section: 'Personal', filled: m => !!m.name },
    { key: 'email', label: 'Email address', weight: 8, section: 'Personal', filled: m => !!m.email },
    { key: 'mobile_no', label: 'Phone number', weight: 8, section: 'Personal', filled: m => !!m.mobile_no },
    { key: 'gender', label: 'Gender', weight: 5, section: 'Personal', filled: m => !!m.gender },
    { key: 'dob', label: 'Date of birth', weight: 5, section: 'Personal', filled: m => !!m.dob },
    { key: 'address', label: 'Address', weight: 8, section: 'Personal', filled: m => hasAddress(m.office_address) || hasAddress(m.residence_address) },
    { key: 'designation', label: 'Current designation', weight: 12, section: 'Professional', filled: m => m.present_designations.length > 0 },
    { key: 'academic', label: 'Academic qualification', weight: 12, section: 'Professional', filled: m => m.academic_qualifications.length > 0 },
    { key: 'training', label: 'Urology training', weight: 10, section: 'Professional', filled: m => m.urology_trainings.length > 0 },
    { key: 'usi_member', label: 'USI membership info', weight: 5, section: 'Membership', filled: m => m.usi_member === 'yes' ? !!m.usi_number : true },
    { key: 'membership_no', label: 'Membership number', weight: 10, section: 'Membership', filled: m => !!m.membership_no },
    { key: 'membership_type', label: 'Membership type', weight: 7, section: 'Membership', filled: m => !!m.membership_type },
]

export type CompletionResult = {
    percent: number
    filledCount: number
    total: number
    missing: ProfileField[]
}

export function getProfileCompletion(member: Member): CompletionResult {
    const totalWeight = PROFILE_FIELDS.reduce((s, f) => s + f.weight, 0)
    const filledFields = PROFILE_FIELDS.filter(f => f.filled(member))
    const filledWeight = filledFields.reduce((s, f) => s + f.weight, 0)
    const missing = PROFILE_FIELDS.filter(f => !f.filled(member))
    return {
        percent: Math.round((filledWeight / totalWeight) * 100),
        filledCount: filledFields.length,
        total: PROFILE_FIELDS.length,
        missing,
    }
}