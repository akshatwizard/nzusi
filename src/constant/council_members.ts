type OFFICERSDATA = {
    initials: string,
    name: string,
    role: string,
    city: string,
    highlight: boolean,
    image?: string
}

export const OFFICERS: OFFICERSDATA[] = [
    {
        initials: 'KS',
        name: 'Dr Kamaljeet Singh',
        role: 'President',
        city: 'Amritsar',
        highlight: true,
    },
    {
        initials: 'SY',
        name: 'Dr Subhash Yadav',
        role: 'President Elect',
        city: 'Meerut',
        highlight: false,
        image: "/images/council/dr-subhash-yadav.jpeg"
    },
    {
        initials: 'PP',
        name: 'Dr P.P. Singh',
        role: 'Immediate Past President',
        city: 'New Delhi',
        highlight: false,
    },
    {
        initials: 'ST',
        name: 'Dr Sameer Trivedi',
        role: 'Hon Secretary',
        city: 'Varanasi',
        highlight: false,
        image: "/images/council/dr-sameer-trivedi.jpeg"
    },
    {
        initials: 'US',
        name: 'Dr Umesh Sharma',
        role: 'Hon Treasurer',
        city: 'New Delhi',
        highlight: false,
        image: "/images/council/dr-umesh-sharma.jpeg"
    },
    {
        initials: 'AM',
        name: 'Dr Ankur Mittal',
        role: 'Treasurer Elect',
        city: 'Rishikesh',
        highlight: false,
        image: "/images/council/dr-ankur-mittal.jpeg"
    },
]

export const COUNCIL_MEMBERS = [
    { initials: 'GB', name: 'Dr Girdhar Bora', city: 'Chandigarh' },
    { initials: 'KK', name: 'Dr Kawaljit Singh Kaura', city: 'Bathinda' },
    { initials: 'LK', name: 'Dr Lalit Kumar', city: 'Varanasi' },
    { initials: 'RS', name: 'Dr Ravimohan S.', city: 'Chandigarh' },
    { initials: 'TB', name: 'Dr Tanuj Pal Bhatia', city: 'Faridabad' },
]