'use client'

import { Section, Wrapper } from '@/components/ui/sections'
import { motion, useInView } from 'motion/react'
import { useRef } from 'react'
import { ArrowRight, MapPin, Stethoscope, Building2 } from 'lucide-react'
import Link from 'next/link'
import { OFFICERS, COUNCIL_MEMBERS } from '@/constant/council_members'
import Image from 'next/image'

const fadeUp = {
    hidden: { opacity: 0, y: 22 },
    show: (d = 0) => ({
        opacity: 1, y: 0,
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const, delay: d },
    }),
}

/* ─── Shared avatar ──────────────────────────────────────────── */
function Avatar({
    image, initials, name, size,
    fallbackCls = 'bg-fun-blue-50 border border-fun-blue-100 text-fun-blue-700',
}: {
    image?: string
    initials: string
    name: string
    size: number          // px — used for Image width/height
    fallbackCls?: string
}) {
    const dim = `w-[${size}px] h-[${size}px]`

    if (image) {
        return (
            <div
                className='rounded-xl overflow-hidden shrink-0 border border-fun-blue-100'
                style={{ width: size, height: size }}
            >
                <Image
                    src={image}
                    alt={name}
                    width={size}
                    height={size}
                    className='w-full h-full object-cover object-top'
                />
            </div>
        )
    }

    return (
        <div
            className={`rounded-xl flex items-center justify-center shrink-0 font-serif ${fallbackCls}`}
            style={{ width: size, height: size, fontSize: size * 0.35 }}
        >
            {initials}
        </div>
    )
}

/* ─── President featured card ────────────────────────────────── */
function PresidentCard({ officer }: { officer: typeof OFFICERS[0] }) {
    return (
        <div className='relative rounded-2xl overflow-hidden bg-fun-blue-950 group h-full'>
            {/* Grid texture */}
            <div
                className='absolute inset-0 opacity-[0.04] pointer-events-none'
                style={{
                    backgroundImage: `linear-gradient(rgba(255,255,255,.9) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.9) 1px,transparent 1px)`,
                    backgroundSize: '28px 28px',
                }}
            />
            {/* Orb */}
            <div
                className='absolute -bottom-10 -right-10 w-52 h-52 rounded-full pointer-events-none transition-transform duration-700 group-hover:scale-110'
                style={{ background: 'radial-gradient(circle,rgba(24,95,165,.5) 0%,transparent 70%)' }}
            />
            {/* Top gradient bar */}
            <div className='h-1 w-full bg-linear-to-r from-fun-blue-600 via-fun-blue-400 to-transparent' />

            <div className='relative z-10 p-7 flex flex-col h-full gap-6'>

                {/* Role tag */}
                <div className='flex items-center gap-2'>
                    <div className='w-1.5 h-1.5 rounded-full bg-fun-blue-400 animate-pulse' />
                    <span className='text-[10px] font-semibold text-fun-blue-400/70 uppercase tracking-[0.18em]'>
                        {officer.role}
                    </span>
                </div>

                {/* Avatar — photo if available */}
                <Avatar
                    image={officer.image}
                    initials={officer.initials}
                    name={officer.name}
                    size={72}
                    fallbackCls='bg-fun-blue-600 border border-fun-blue-400/30 text-white'
                />

                {/* Name */}
                <div>
                    <div className='font-serif text-2xl text-fun-blue-50 leading-snug mb-1'>
                        {officer.name}
                    </div>

                    {/* Designation */}
                    {officer.designation && (
                        <div className='flex items-start gap-1.5 text-[12px] text-fun-blue-300/70 mt-2'>
                            <Stethoscope size={11} className='mt-0.5 shrink-0' />
                            <span>
                                {officer.designation.title}
                                {officer.designation.department && (
                                    <span className='text-fun-blue-400/50'> · {officer.designation.department}</span>
                                )}
                            </span>
                        </div>
                    )}

                    {officer.designation?.institution && (
                        <div className='flex items-center gap-1.5 text-[11px] text-fun-blue-400/50 mt-1'>
                            <Building2 size={10} className='shrink-0' />
                            {officer.designation.institution}
                        </div>
                    )}
                </div>

                {/* City — pinned to bottom */}
                {officer.city && (
                    <div className='flex items-center gap-1.5 text-fun-blue-400/50 text-[12px] mt-auto pt-5 border-t border-white/6'>
                        <MapPin size={11} />
                        {officer.city}
                    </div>
                )}
            </div>
        </div>
    )
}

/* ─── Officer card (non-president) ──────────────────────────── */
function OfficerCard({ officer, index, inView }: {
    officer: typeof OFFICERS[0]
    index: number
    inView: boolean
}) {
    return (
        <motion.div
            initial='hidden'
            animate={inView ? 'show' : 'hidden'}
            custom={0.15 + index * 0.08}
            variants={fadeUp}
            className='group bg-white border border-fun-blue-100 hover:border-fun-blue-200 rounded-xl p-5 hover:shadow-md transition-all duration-300 flex flex-col gap-4'
        >
            {/* Role */}
            <div className='text-[9px] font-semibold text-fun-blue-500/70 uppercase tracking-[0.16em]'>
                {officer.role}
            </div>

            {/* Avatar + name row */}
            <div className='flex items-start gap-3'>
                <div className='shrink-0 group-hover:[&>div]:bg-fun-blue-600 group-hover:[&>div]:border-fun-blue-600 transition-all duration-200'>
                    <Avatar
                        image={officer.image}
                        initials={officer.initials}
                        name={officer.name}
                        size={52}
                        fallbackCls='bg-fun-blue-50 border border-fun-blue-100 text-fun-blue-700 group-hover:bg-fun-blue-600 group-hover:text-white group-hover:border-fun-blue-600'
                    />
                </div>
                <div className='min-w-0 flex-1'>
                    <div className='font-serif text-[15px] text-fun-blue-950 leading-snug'>
                        {officer.name}
                    </div>

                    {/* Designation title */}
                    {officer.designation?.title && (
                        <div className='flex items-center gap-1 text-[11px] text-fun-blue-500/70 mt-1'>
                            <Stethoscope size={9} className='shrink-0' />
                            <span className='truncate'>{officer.designation.title}</span>
                        </div>
                    )}

                    {/* Institution */}
                    {officer.designation?.institution && (
                        <div className='flex items-center gap-1 text-[10px] text-fun-blue-400/50 mt-0.5'>
                            <Building2 size={9} className='shrink-0' />
                            <span className='truncate'>{officer.designation.institution}</span>
                        </div>
                    )}

                    {/* City */}
                    {officer.city && (
                        <div className='flex items-center gap-1 text-[10px] text-fun-blue-400/50 mt-1'>
                            <MapPin size={9} />
                            {officer.city}
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    )
}

/* ─── Council member chip ────────────────────────────────────── */
function MemberChip({ member, index, inView }: {
    member: typeof COUNCIL_MEMBERS[0]
    index: number
    inView: boolean
}) {
    return (
        <motion.div
            initial='hidden'
            animate={inView ? 'show' : 'hidden'}
            custom={0.4 + index * 0.06}
            variants={fadeUp}
            className='group flex items-center gap-3 bg-white border border-fun-blue-100 hover:border-fun-blue-200 rounded-xl px-4 py-3 hover:shadow-sm transition-all duration-200 cursor-default'
        >
            {/* Avatar */}
            <div className='shrink-0'>
                <Avatar
                    image={member.image}
                    initials={member.initials}
                    name={member.name}
                    size={36}
                    fallbackCls='bg-fun-blue-50 border border-fun-blue-100 text-fun-blue-700 group-hover:bg-fun-blue-600 group-hover:border-fun-blue-600 group-hover:text-white'
                />
            </div>

            <div className='min-w-0 flex-1'>
                <div className='text-[12px] font-medium text-fun-blue-900 truncate'>
                    {member.name}
                </div>

                {/* Show designation if available, else city */}
                {member.designation?.title ? (
                    <div className='text-[10px] text-fun-blue-500 mt-0.5 truncate'>
                        {member.designation.title}
                        {member.designation.institution && (
                            <span className='text-fun-blue-400'> · {member.designation.institution}</span>
                        )}
                    </div>
                ) : member.city ? (
                    <div className='flex items-center gap-1 text-[10px] text-fun-blue-400 mt-0.5'>
                        <MapPin size={8} />
                        {member.city}
                    </div>
                ) : null}
            </div>

            {/* City in trailing position when designation is already shown */}
            {member.designation?.title && member.city && (
                <div className='flex items-center gap-1 text-[10px] text-fun-blue-400 shrink-0'>
                    <MapPin size={8} />
                    {member.city}
                </div>
            )}
        </motion.div>
    )
}

/* ─── Divider ────────────────────────────────────────────────── */
function Divider({ label, delay, inView }: { label: string; delay: number; inView: boolean }) {
    return (
        <motion.div
            initial='hidden'
            animate={inView ? 'show' : 'hidden'}
            custom={delay}
            variants={fadeUp}
            className='flex items-center gap-3 mb-5'
        >
            <span className='text-[10px] font-semibold text-fun-blue-900/35 uppercase tracking-[0.16em] shrink-0'>
                {label}
            </span>
            <div className='flex-1 h-px bg-fun-blue-100' />
        </motion.div>
    )
}

/* ─── Main section ───────────────────────────────────────────── */
export default function CouncilSection() {
    const ref = useRef<HTMLDivElement>(null)
    const inView = useInView(ref, { once: true, margin: '-60px' })

    const president = OFFICERS[0]
    const rest = OFFICERS.slice(1)

    return (
        <Section className='bg-[#F7F6F2]'>
            <Wrapper>
                <div ref={ref}>

                    {/* Header */}
                    <div className='flex flex-col md:flex-row md:items-end justify-between gap-5 mb-12'>
                        <motion.div
                            initial='hidden'
                            animate={inView ? 'show' : 'hidden'}
                            custom={0}
                            variants={fadeUp}
                        >
                            <div className='flex items-center gap-2.5 mb-3'>
                                <div className='h-px w-5 bg-fun-blue-400/50' />
                                <span className='text-[11px] font-semibold text-fun-blue-500/70 uppercase tracking-widest'>
                                    Leadership
                                </span>
                            </div>
                            <h2 className='font-serif text-4xl md:text-5xl text-fun-blue-950 leading-tight'>
                                The <em className='not-italic text-fun-blue-500'>Council</em>
                            </h2>
                            <p className='text-fun-blue-700/45 text-[13px] mt-2 max-w-md leading-relaxed'>
                                Elected representatives guiding NZUSI's academic, clinical and governance activities.
                            </p>
                        </motion.div>

                        <motion.div
                            initial='hidden'
                            animate={inView ? 'show' : 'hidden'}
                            custom={0.1}
                            variants={fadeUp}
                        >
                            <Link
                                href='/about'
                                className='group inline-flex items-center gap-2 text-[12px] font-semibold text-fun-blue-600/70 hover:text-fun-blue-700 border border-fun-blue-200 hover:border-fun-blue-300 rounded-lg px-4 py-2.5 transition-all duration-200'
                            >
                                Full council & past executives
                                <ArrowRight size={13} className='transition-transform duration-200 group-hover:translate-x-0.5' />
                            </Link>
                        </motion.div>
                    </div>

                    {/* Executive Officers */}
                    <Divider label='Executive Officers' delay={0.08} inView={inView} />

                    <div className='grid grid-cols-1 md:grid-cols-[320px_1fr] gap-5 mb-10'>

                        {/* President — featured tall card */}
                        <motion.div
                            initial='hidden'
                            animate={inView ? 'show' : 'hidden'}
                            custom={0.12}
                            variants={fadeUp}
                            className='md:row-span-2'
                        >
                            <PresidentCard officer={president} />
                        </motion.div>

                        {/* Remaining officers */}
                        <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3'>
                            {rest.map((officer, i) => (
                                <OfficerCard
                                    key={officer.name}
                                    officer={officer}
                                    index={i}
                                    inView={inView}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Council members */}
                    <Divider label='Council Members' delay={0.35} inView={inView} />

                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3'>
                        {COUNCIL_MEMBERS.map((member, i) => (
                            <MemberChip
                                key={member.name}
                                member={member}
                                index={i}
                                inView={inView}
                            />
                        ))}
                    </div>

                    {/* Footer */}
                    <motion.p
                        initial='hidden'
                        animate={inView ? 'show' : 'hidden'}
                        custom={0.6}
                        variants={fadeUp}
                        className='mt-8 text-center text-[12px] text-fun-blue-400/50'
                    >
                        Council members are elected biennially by the NZUSI membership.{' '}
                        <Link
                            href='/about'
                            className='text-fun-blue-500 hover:text-fun-blue-600 underline underline-offset-2 transition-colors duration-200'
                        >
                            View past presidents & executives →
                        </Link>
                    </motion.p>

                </div>
            </Wrapper>
        </Section>
    )
}