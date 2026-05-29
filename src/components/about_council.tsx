'use client'

import { motion } from 'motion/react'
import { MapPin, Stethoscope } from 'lucide-react'
import Image from 'next/image'
import { OFFICERS, COUNCIL_MEMBERS, USI_MEMBERS, Officer, CouncilMember, USIMember } from '@/constant/council_members'

/* ─── Variants ───────────────────────────────────────────────── */
const fadeUp = {
    hidden: { opacity: 0, y: 16 },
    show: (d = 0) => ({
        opacity: 1, y: 0,
        transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const, delay: d },
    }),
}

/* ─── Avatar ─────────────────────────────────────────────────── */
function Avatar({
    image,
    initials,
    name,
    size = 'md',
    colorCls = 'bg-fun-blue-700 text-fun-blue-100',
}: {
    image?: string
    initials: string
    name: string
    size?: 'sm' | 'md'
    colorCls?: string
}) {
    const dim = size === 'sm' ? 'w-9 h-9 text-[11px]' : 'w-11 h-11 text-sm'

    if (image) {
        return (
            <div className={`${dim} rounded-full overflow-hidden shrink-0 border-2 border-fun-blue-100`}>
                <Image
                    src={image}
                    alt={name}
                    width={size === 'sm' ? 36 : 44}
                    height={size === 'sm' ? 36 : 44}
                    className='w-full h-full object-cover object-top'
                />
            </div>
        )
    }

    return (
        <div className={`${dim} rounded-full flex items-center justify-center font-semibold shrink-0 ${colorCls}`}>
            {initials}
        </div>
    )
}

/* ─── Officer card ───────────────────────────────────────────── */
function OfficerCard({ officer, index }: { officer: Officer; index: number }) {
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
            {/* Top bar */}
            <div className={`h-1.5 w-full ${officer.highlight
                ? 'bg-linear-to-r from-fun-blue-600 via-fun-blue-400 to-transparent'
                : 'bg-fun-blue-50'
                }`}
            />

            <div className='p-5'>
                {/* Avatar */}
                <Avatar
                    image={officer.image}
                    initials={officer.initials}
                    name={officer.name}
                    size='md'
                    colorCls={officer.highlight
                        ? 'bg-fun-blue-700 text-fun-blue-100'
                        : 'bg-fun-blue-100 text-fun-blue-700'
                    }
                />

                {/* Role badge */}
                <div className={`inline-block text-[10px] font-semibold px-2 py-0.5 rounded-full mb-2 mt-4 tracking-wide ${officer.highlight
                    ? 'bg-fun-blue-600/20 text-fun-blue-300 border border-fun-blue-500/20'
                    : 'bg-fun-blue-50 text-fun-blue-600 border border-fun-blue-100'
                    }`}
                >
                    {officer.role}
                </div>

                {/* Name */}
                <div className={`font-serif text-[17px] leading-snug mb-2 ${officer.highlight ? 'text-fun-blue-50' : 'text-fun-blue-950'}`}>
                    {officer.name}
                </div>

                {/* Designation */}
                {officer.designation && (
                    <div className={`flex items-start gap-1 text-[11px] mb-1.5 ${officer.highlight ? 'text-fun-blue-300/70' : 'text-fun-blue-500/80'}`}>
                        <Stethoscope size={10} className='mt-0.5 shrink-0' />
                        <span>
                            {officer.designation.title}
                            {officer.designation.institution && (
                                <>, {officer.designation.institution}</>
                            )}
                        </span>
                    </div>
                )}

                {/* City */}
                {officer.city && (
                    <div className={`flex items-center gap-1 text-[11px] ${officer.highlight ? 'text-fun-blue-400/50' : 'text-fun-blue-400/70'}`}>
                        <MapPin size={10} />
                        {officer.city}
                    </div>
                )}
            </div>
        </motion.div>
    )
}

/* ─── Member row (council + USI) ─────────────────────────────── */
function MemberRow({
    member,
    index,
    role,
}: {
    member: CouncilMember | USIMember
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
            <Avatar
                image={member.image}
                initials={member.initials}
                name={member.name}
                size='sm'
                colorCls='bg-fun-blue-50 border border-fun-blue-100 text-fun-blue-700'
            />

            <div className='flex-1 min-w-0'>
                <div className='font-medium text-[13px] text-fun-blue-950 truncate'>{member.name}</div>

                {/* Designation if available */}
                {member.designation && (
                    <div className='text-[11px] text-fun-blue-500/70 mt-0.5 truncate'>
                        {member.designation.title}
                        {member.designation.institution && ` · ${member.designation.institution}`}
                    </div>
                )}

                {/* Ex-Officio role */}
                {role && !member.designation && (
                    <div className='text-[10px] text-fun-blue-500/70 mt-0.5'>{role}</div>
                )}
            </div>

            {/* City */}
            {member.city && (
                <div className='flex items-center gap-1 text-[11px] text-fun-blue-400/55 shrink-0'>
                    <MapPin size={9} />
                    {member.city}
                </div>
            )}
        </motion.div>
    )
}

/* ─── Section header ─────────────────────────────────────────── */
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

/* ─── Main component ─────────────────────────────────────────── */
export default function AboutCouncil() {
    return (
        <div className='flex flex-col gap-12'>

            {/* Intro */}
            <motion.div initial='hidden' animate='show' custom={0} variants={fadeUp} className='max-w-2xl'>
                <h2 className='font-serif text-2xl text-fun-blue-950 mb-3 leading-snug'>
                    Executive Council — Current Term
                </h2>
                <p className='text-fun-blue-800/55 text-[13px] leading-relaxed'>
                    The NZUSI Executive Council oversees the functioning of the North Zone chapter,
                    organises academic activities, and represents the interests of urologists across
                    Haryana, Himachal Pradesh, J&amp;K, Punjab, Rajasthan and Uttar Pradesh.
                </p>
            </motion.div>

            {/* Executive Officers */}
            <div>
                <SectionHeader label='Executive Officers' delay={0.05} />
                <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4'>
                    {OFFICERS.map((officer, i) => (
                        <OfficerCard key={officer.name} officer={officer} index={i} />
                    ))}
                </div>
            </div>

            {/* Council members */}
            <div>
                <SectionHeader label='Council Members' delay={0.1} />
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-2.5'>
                    {COUNCIL_MEMBERS.map((m, i) => (
                        <MemberRow key={m.name} member={m} index={i} />
                    ))}
                </div>
            </div>

            {/* USI Council members from North Zone */}
            <div>
                <SectionHeader label='USI Council Members from North Zone' delay={0.15} />
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-2.5'>
                    {USI_MEMBERS.map((m, i) => (
                        <MemberRow key={m.name} member={m} index={i} role={m.role} />
                    ))}
                </div>
            </div>

            {/* Info note */}
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
                    </a>.
                </p>
            </motion.div>

        </div>
    )
}