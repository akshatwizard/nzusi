export type Category = 'Events' | 'Adyatan' | 'Academic'

export type Post = {
    slug: string
    title: string
    excerpt: string
    body: string          // longer description for the post page
    category: Category
    date: string
    dateISO: string
    readTime: string
    featured?: boolean
    author?: string
}

export const POSTS: Post[] = [
    {
        slug: 'nzusi-midterm-live-workshop-may-2026-karnal',
        title: 'NZUSI Midterm Live Workshop May 2026, Karnal',
        excerpt:
            'Hands-on live surgery workshop bringing together North Zone urologists for skill enhancement, case demonstrations and faculty-led technique sessions.',
        body: 'The NZUSI Midterm Live Workshop is a flagship mid-year event that brings together urologists from across the North Zone for an intensive day of live surgery demonstrations, expert faculty sessions, and hands-on skill development. The 2026 edition will be held at Karnal, Haryana.',
        category: 'Events',
        date: 'Mar 2026',
        dateISO: '2026-03-01',
        readTime: '1 min read',
        featured: true,
        author: 'NZUSI Secretariat',
    },
    {
        slug: 'rapid-review-of-robotic-instruments',
        title: 'Rapid Review of Robotic Instruments',
        excerpt:
            'A concise review of the latest robotic systems — da Vinci, Hugo and Versius — comparing capabilities, learning curves, and clinical outcomes in urology.',
        body: 'Robotic surgery has transformed the field of urology over the past two decades. This rapid review compares the three leading platforms currently available — Intuitive Surgical\'s da Vinci Xi, Medtronic\'s Hugo RAS system, and CMR Surgical\'s Versius — across key clinical and practical dimensions.',
        category: 'Adyatan',
        date: 'Oct 4, 2025',
        dateISO: '2025-10-04',
        readTime: '1 min read',
        author: 'Dr Sameer Trivedi',
    },
    {
        slug: 'immediate-second-resection-during-turbt',
        title: 'Immediate Second Resection During TURBT',
        excerpt:
            'A RCT comparing re-stage TURBT vs immediate second resection for detection of deep muscle invasion in non-muscle-invasive bladder cancer.',
        body: 'This article reviews a randomised controlled trial examining whether immediate second resection (ISR) at the time of the initial TURBT provides equivalent staging accuracy to a planned re-stage TURBT performed 4–6 weeks later in patients with non-muscle-invasive bladder cancer.',
        category: 'Adyatan',
        date: 'Oct 4, 2025',
        dateISO: '2025-10-04',
        readTime: '2 min read',
        author: 'Dr Lalit Kumar',
    },
    {
        slug: 'uro-vista-nzusi-scientific-magazine',
        title: 'URO-Vista — NZUSI Scientific Magazine',
        excerpt:
            'The official scientific magazine of NZUSI. URO-Vista brings peer-reviewed articles, case reports and expert commentary to the North Zone community.',
        body: 'URO-Vista is the official scientific publication of the North Zone Urological Society of India. Published periodically, it features original research, case reports, surgical technique articles, and expert opinion pieces contributed by NZUSI members.',
        category: 'Academic',
        date: 'Mar 2026',
        dateISO: '2026-03-01',
        readTime: '1 min read',
        author: 'NZUSI Editorial Board',
    },
    {
        slug: 'copy-of-urology-across-the-globe',
        title: 'Urology in 2026 — Global Conference & Events Calendar',
        excerpt:
            'Full calendar of national and international urology conferences, workshops and CME events scheduled throughout 2026 — including NZUSICON in Amritsar.',
        body: 'A comprehensive guide to the major urology events of 2026, curated for NZUSI members. From EAU26 in London to AUA 2026 in Washington DC, and from USICON in Indore to NZUSICON in Amritsar — plan your academic year with this full calendar.',
        category: 'Events',
        date: 'Jan 2026',
        dateISO: '2026-01-01',
        readTime: '1 min read',
        author: 'NZUSI Secretariat',
    },
    {
        slug: 'nzusi-academic-series',
        title: 'ASCENT — NZUSI Academic Series Launch',
        excerpt:
            'North Zone launches its flagship digital academic series: live Zoom CMEs, case discussions and expert sessions open to all NZUSI members.',
        body: 'NZUSI is proud to launch ASCENT — its flagship online academic series. ASCENT brings expert faculty directly to members through live Zoom sessions, covering clinical topics, surgical techniques, emerging research, and professional development.',
        category: 'Academic',
        date: 'Jan 11, 2026',
        dateISO: '2026-01-11',
        readTime: '1 min read',
        author: 'NZUSI Secretariat',
    },
]

export const CATEGORY_META: Record<Category, {
    color: string         // tailwind text
    bg: string            // tailwind bg
    border: string        // tailwind border
    dot: string           // hex for the dot
    accent: string        // hex for accents
}> = {
    Events: {
        color:  'text-fun-blue-700',
        bg:     'bg-fun-blue-100',
        border: 'border-fun-blue-200',
        dot:    '#185FA5',
        accent: '#185FA5',
    },
    Adyatan: {
        color:  'text-emerald-700',
        bg:     'bg-emerald-50',
        border: 'border-emerald-200',
        dot:    '#059669',
        accent: '#059669',
    },
    Academic: {
        color:  'text-amber-700',
        bg:     'bg-amber-50',
        border: 'border-amber-200',
        dot:    '#D97706',
        accent: '#D97706',
    },
}