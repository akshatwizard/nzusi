
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

export type ProfileDesignation = {
    payload: {
        designation: string
        institution: string
        year_of_joining: string
    }
}

export type ProfileDesignationResponse = {
    success: boolean,
    message: string
}

export type ProfileAcademic = {
    qualifications: {
        degree: string,
        institution: string,
        year_of_passing: number
    }[]
}
export type ProfileAcademicResponse = {
    success: boolean,
    message: string
}

export type ProfileUrologyTrainings = {
    trainings: {
        institution: string,
        from_date: string | Date,
        to_date: string | Date
    }[]
}
export type ProfileUrologyTrainingsResponse = {
    success: boolean,
    message: string
}