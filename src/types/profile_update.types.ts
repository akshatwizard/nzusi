
export type ProfileUpdate = {
    payload: {
        name: string,
        // email: string,
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

// profile_update.types.ts

export type ProfileAddressPayload =
    | {
        preferred_address: 'office' | 'residence';
        office_state: string;
        office_city: string;
        office_pin: string;
        office_address: string;
        office_phone: string;
        office_email: string;
        office_website: string;
    }
    | {
        preferred_address: 'office' | 'residence';
        residence_state: string;
        residence_city: string;
        residence_pin: string;
        residence_address: string;
        residence_phone: string;
        residence_email: string;
        residence_website: string;
    };

export type ProfileAddressResponse = {
    success: boolean;
    message: string;
};