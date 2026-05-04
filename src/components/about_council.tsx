'use client'

import { motion } from 'motion/react'
import { MapPin } from 'lucide-react'

const OFFICERS = [
    {
        initials: 'KS',
        name: 'Dr Kamaljeet Singh',
        role: 'President',
        city: 'Amritsar',
        color: 'bg-fun-blue-700 text-fun-blue-100',
        highlight: true,
    },
    {
        initials: 'SY',
        name: 'Dr Subhash Yadav',
        role: 'President Elect',
        city: 'Meerut',
        color: 'bg-fun-blue-800 text-fun-blue-200',
        highlight: false,
    },
    {
        initials: 'PP',
        name: 'Dr P.P. Singh',
        role: 'Immediate Past President',
        city: 'New Delhi',
        color: 'bg-fun-blue-900 text-fun-blue-300',
        highlight: false,
    },
    {
        initials: 'ST',
        name: 'Dr Sameer Trivedi',
        role: 'Hon Secretary',
        city: 'Varanasi',
        color: 'bg-fun-blue-800 text-fun-blue-200',
        highlight: false,
    },
    {
        initials: 'US',
        name: 'Dr Umesh Sharma',
        role: 'Hon Treasurer',
        city: 'New Delhi',
        color: 'bg-fun-blue-900 text-fun-blue-300',
        highlight: false,
    },
    {
        initials: 'AM',
        name: 'Dr Ankur Mittal',
        role: 'Treasurer Elect',
        city: 'Rishikesh',
        color: 'bg-fun-blue-900 text-fun-blue-300',
        highlight: false,
    },
]

const COUNCIL_MEMBERS = [
    { initials: 'GB', name: 'Dr Girdhar Bora', city: 'Chandigarh' },
    { initials: 'KK', name: 'Dr Kawaljit Singh Kaura', city: 'Bathinda' },
    { initials: 'LK', name: 'Dr Lalit Kumar', city: 'Varanasi' },
    { initials: 'RS', name: 'Dr Ravimohan S.', city: 'Chandigarh' },
    { initials: 'TB', name: 'Dr Tanuj Pal Bhatia', city: 'Faridabad' },
]

const USI_MEMBERS = [
    { initials: 'SP', name: 'Dr Shivam Priyadarshi', city: 'Jaipur', role: 'Ex-Officio' },
    { initials: 'SY', name: 'Dr S.P. Yadav', city: 'Gurugram', role: 'Ex-Officio' },
]

const fadeUp = {
    hidden: { opacity: 0, y: 16 },
    show: (d = 0) => ({
        opacity: 1, y: 0,
        transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const, delay: d },
    }),
}

function OfficerCard({ officer, index }: { officer: (typeof OFFICERS)[number], index: number }) {
    return (
        <motion.div
            initial='hidden'
            animate='show'
            custom={index * 0.07}
            variants={fadeUp}
            className={`relative rounded-xl border overflow-hidden ${officer.highlight
                ? 'border-fun-blue-400/30 bg-fun-blue-950'
                : 'border-fun-blue-100 bg-white'
                }`}
        >
            <div className={`h-1.5 w-full ${officer.highlight ? 'bg-linear-to-r from-fun-blue-600 via-fun-blue-400 to-transparent' : 'bg-fun-blue-50'}`} />

            <div className='p-5'>
                {/* Avatar */}
                <div className={`w-11 h-11 rounded-full flex items-center justify-center text-sm font-semibold mb-4 ${officer.color}`}>
                    {officer.initials}
                </div>

                {/* Role badge */}
                <div className={`inline-block text-[10px] font-semibold px-2 py-0.5 rounded-full mb-2 tracking-wide ${officer.highlight
                    ? 'bg-fun-blue-600/20 text-fun-blue-300 border border-fun-blue-500/20'
                    : 'bg-fun-blue-50 text-fun-blue-600 border border-fun-blue-100'
                    }
        `}>
                    {officer.role}
                </div>

                {/* Name */}
                <div className={`font-serif text-[17px] leading-snug mb-2 ${officer.highlight ? 'text-fun-blue-50' : 'text-fun-blue-950'}`}>
                    {officer.name}
                </div>

                {/* City */}
                <div className={`flex items-center gap-1 text-[11px] ${officer.highlight ? 'text-fun-blue-400/50' : 'text-fun-blue-400/70'}`}>
                    <MapPin size={10} />
                    {officer.city}
                </div>
            </div>
        </motion.div>
    )
}

function MemberRow({
    member,
    index,
    role,
}: {
    member: { initials: string; name: string; city: string; role?: string }
    index: number
    role?: string
}) {
    return (
        <motion.div
            initial='hidden'
            animate='show'
            custom={index * 0.06}
            variants={fadeUp}
            className='group flex items-center gap-4 p-3.5 rounded-xl border border-fun-blue-100 bg-white hover:border-fun-blue-200 hover:bg-fun-blue-50/50 transition-all duration-200'
        >
            <div className='w-9 h-9 rounded-full bg-fun-blue-50 border border-fun-blue-100 flex items-center justify-center text-[11px] font-semibold text-fun-blue-700 shrink-0'>
                {member.initials}
            </div>
            <div className='flex-1 min-w-0'>
                <div className='font-medium text-[13px] text-fun-blue-950 truncate'>{member.name}</div>
                {role && (
                    <div className='text-[10px] text-fun-blue-500/70 mt-0.5'>{role}</div>
                )}
            </div>
            <div className='flex items-center gap-1 text-[11px] text-fun-blue-400/55 shrink-0'>
                <MapPin size={9} />
                {member.city}
            </div>
        </motion.div>
    )
}

function SectionHeader({ label, delay = 0 }: { label: string; delay?: number }) {
    return (
        <motion.div
            initial='hidden'
            animate='show'
            custom={delay}
            variants={fadeUp}
            className='flex items-center gap-3 mb-5'
        >
            <div className='h-px w-4 bg-fun-blue-300/40' />
            <h2 className='text-[11px] font-semibold text-fun-blue-900/45 uppercase tracking-widest'>
                {label}
            </h2>
            <div className='flex-1 h-px bg-fun-blue-100' />
        </motion.div>
    )
}

export default function AboutCouncil() {
    return (
        <div className='flex flex-col gap-12'>

            <motion.div
                initial='hidden' animate='show' custom={0}
                variants={fadeUp}
                className='max-w-2xl'
            >
                <h2 className='font-serif text-2xl text-fun-blue-950 mb-3 leading-snug'>
                    Executive Council — Current Term
                </h2>
                <p className='text-fun-blue-800/55 text-[13px] leading-relaxed'>
                    The NZUSI Executive Council oversees the functioning of the North Zone chapter,
                    organises academic activities, and represents the interests of urologists across
                    Haryana, Himachal Pradesh, J&amp;K, Punjab, Rajasthan and Uttar Pradesh.
                </p>
            </motion.div>

            <div>
                <SectionHeader label='Executive Officers' delay={0.05} />
                <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4'>
                    {OFFICERS.map((officer, i) => (
                        <OfficerCard key={officer.name} officer={officer} index={i} />
                    ))}
                </div>
            </div>

            {/* ── Council members ── */}
            <div>
                <SectionHeader label='Council Members' delay={0.1} />
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-2.5'>
                    {COUNCIL_MEMBERS.map((m, i) => (
                        <MemberRow key={m.name} member={m} index={i} />
                    ))}
                </div>
            </div>

            {/* ── USI Council members from North Zone ── */}
            <div>
                <SectionHeader label='USI Council Members from North Zone' delay={0.15} />
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-2.5'>
                    {USI_MEMBERS.map((m, i) => (
                        <MemberRow key={m.name} member={m} index={i} role={m.role} />
                    ))}
                </div>
            </div>

            {/* ── Info note ── */}
            <motion.div
                initial='hidden' animate='show' custom={0.2}
                variants={fadeUp}
                className='rounded-xl bg-fun-blue-50 border border-fun-blue-100 px-5 py-4 flex items-start gap-3'
            >
                <div className='w-1 h-1 min-w-1 rounded-full bg-fun-blue-400 mt-2' />
                <p className='text-fun-blue-700/65 text-[12px] leading-relaxed'>
                    Council membership is renewed annually at NZUSICON. For corrections or updates
                    to council details, contact{' '}
                    <a
                        href='mailto:nzusioffice@gmail.com'
                        className='text-fun-blue-600 underline underline-offset-2 hover:text-fun-blue-700'
                    >
                        nzusioffice@gmail.com
                    </a>
                    .
                </p>
            </motion.div>

        </div>
    )
}