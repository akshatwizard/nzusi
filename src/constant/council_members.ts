
export type Designation = {
    title: string
    institution?: string
    department?: string
}

export type Officer = {
    initials: string
    name: string
    role: string
    city?: string
    highlight?: boolean
    image?: string
    designation?: Designation
    exOfficio?: boolean
}

export type CouncilMember = {
    initials: string
    name: string
    city?: string
    image?: string
    designation?: Designation
}

export type USIMember = CouncilMember & {
    role: string
}


export const OFFICERS: Officer[] = [
    {
        initials: 'KS',
        name: 'Dr Kamaljeet Singh',
        role: 'President',
        city: 'Amritsar',
        highlight: true,
        image: "/images/council/dr-kamaljeet.jpeg",
        designation: {
            title: 'Senior Urologist',
            institution: 'Fortis Hospital',
            department: 'Urology',
        },
    },
    {
        initials: 'AS',
        name: 'Dr Anil Kumar Sanwal',
        role: 'Past President',
        city: 'Jhansi',
        highlight: false,
        image: '/images/council/dr-anil-kumar.jpeg',
        designation: {
            title: 'Director',
            institution: 'Sanwal hospital',
            department: 'Urology',
        },
    },
    {
        initials: 'SY',
        name: 'Dr Subhash Yadav',
        role: 'President Elect',
        city: 'Meerut',
        highlight: false,
        image: '/images/council/dr-subhash-yadav.jpeg',
        designation: {
            title: 'Consultant',
            institution: 'Anand Hospital, Meerut',
            department: 'Urology',
        },
    },
    {
        initials: 'ST',
        name: 'Dr Sameer Trivedi',
        role: 'Hon Secretary',
        city: 'Varanasi',
        highlight: false,
        image: '/images/council/dr-sameer-trivedi.jpeg',
        designation: {
            title: 'Professor',
            institution: 'Institute of Medical Sciences, BHU',
            department: 'Urology',
        },
    },
    {
        initials: 'US',
        name: 'Dr Umesh Sharma',
        role: 'Hon Treasurer',
        city: 'New Delhi',
        highlight: false,
        image: '/images/council/dr-umesh-sharma.jpeg',
        designation: {
            title: 'Professor and Unit Head',
            institution: "ABVIMS & Dr RML Hospital, New Delhi",
            department: "Urology & Renal Transplant"
        },
    },
    {
        initials: 'AM',
        name: 'Dr Ankur Mittal',
        role: 'Treasurer Elect',
        city: 'Rishikesh',
        highlight: false,
        image: '/images/council/dr-ankur-mittal.jpeg',
        designation: {
            title: 'Additional Professor',
            institution: 'AIIMS Rishikesh',
            department: 'Urology',
        },
    },
]


export const COUNCIL_MEMBERS: CouncilMember[] = [
    {
        initials: 'GB',
        name: 'Dr Girdhar Bora',
        city: 'Chandigarh',
        image: '/images/council/dr-girdhar.jpeg',
        designation: {
            title: 'Addditional Professo',
            institution: 'PGIMER , Chandigarh',
            department: "Uro-Oncology, Robotic Surgery, Female Urology"
        },
    },
    {
        initials: 'KK',
        name: 'Dr Kawaljit Singh Kaura',
        city: 'Bathinda',
        image: '/images/council/dr-kawaljit.jpeg',
        designation: {
            title: 'Additional Professor & Head',
            institution: 'AIIMS Bathinda',
            department: "Urology & Renal Transplantation"
        },
    },
    {
        initials: 'LK',
        name: 'Dr Lalit Kumar',
        city: 'Varanasi',
        image: '/images/council/dr-lalit-kumar.jpeg',
        designation: {
            title: 'Assistant Professor',
            institution: 'Institute of Medical Sciences, BHU',
            department: 'Urology',
        },
    },
    {
        initials: 'RS',
        name: 'Prof Ravimohan S Mavuduru',
        city: 'Chandigarh',
        image: '/images/council/dr-ravimohan.jpeg',
        designation: {
            title: 'Surgeon',
            institution: 'Institute PGIMER Chandigarh',
            department: 'Urooncology',
        },
    },
    {
        initials: 'TB',
        name: 'Dr Tanuj Pal Bhatia',
        city: 'Faridabad',
        image: '/images/council/dr-tanuj.jpeg',
        designation: {
            title: 'Chairman',
            institution: 'ILSS Hospital',
            department: 'Urology',
        },
    },
]


export const USI_MEMBERS: USIMember[] = [
    {
        initials: 'SP',
        name: 'Dr Shivam Priyadarshi',
        city: 'Jaipur',
        role: 'Ex-Officio',
        image: undefined,
        designation: {
            title: 'Professor',
            institution: 'SMS Medical College',
            department: 'Urology',
        },
    },
    {
        initials: 'SY',
        name: 'Dr S.P. Yadav',
        city: 'Gurugram',
        role: 'Ex-Officio',
        image: undefined,
        designation: undefined,
    },
]