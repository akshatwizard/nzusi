'use client'

import { Section, Wrapper } from '@/components/ui/sections'
import { motion, useInView } from 'motion/react'
import { useRef } from 'react'
import { ArrowRight, MapPin } from 'lucide-react'
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

/* ─── President featured card ────────────────────────────── */
function PresidentCard({ officer }: { officer: typeof OFFICERS[0] }) {
    return (
        <div className='relative rounded-2xl overflow-hidden bg-fun-blue-950 group'>
            {/* Decorative grid */}
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

            <div className='relative z-10 p-7 flex flex-col h-full'>
                {/* Role tag */}
                <div className='flex items-center gap-2 mb-8'>
                    <div className='w-1.5 h-1.5 rounded-full bg-fun-blue-400 animate-pulse' />
                    <span className='text-[10px] font-semibold text-fun-blue-400/70 uppercase tracking-[0.18em]'>
                        {officer.role}
                    </span>
                </div>

                {/* Avatar */}
                <div className='w-16 h-16 rounded-xl bg-fun-blue-600 flex items-center justify-center mb-6 border border-fun-blue-400/30'>
                    <span className='font-serif text-2xl text-white'>{officer.initials}</span>
                </div>

                {/* Name */}
                <div className='font-serif text-3xl text-fun-blue-50 leading-tight mb-1.5'>
                    {officer.name}
                </div>

                {/* City */}
                <div className='flex items-center gap-1.5 text-fun-blue-400/50 text-[12px] mt-auto pt-6 border-t border-white/6'>
                    <MapPin size={11} />
                    {officer.city}
                </div>
            </div>
        </div>
    )
}

/* ─── Officer card (non-president) ──────────────────────── */
function OfficerCard({ officer, index, inView, }: {
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
            className='group bg-white border border-fun-blue-100 hover:border-fun-blue-200 rounded-xl p-5 hover:shadow-md transition-all duration-300 flex flex-col'
        >
            {/* Role */}
            <div className='text-[9px] font-semibold text-fun-blue-500/70 uppercase tracking-[0.16em] mb-4'>
                {officer.role}
            </div>

            {/* Avatar + name row */}
            <div className='flex items-center gap-3'>
                <div className='w-14 h-14 rounded-lg bg-fun-blue-50 border border-fun-blue-100 flex items-center justify-center shrink-0 group-hover:bg-fun-blue-600 group-hover:border-fun-blue-600 transition-all duration-200 overflow-hidden'>
                    {
                        officer.image ? (
                            <Image
                                src={officer.image}
                                alt={officer.name}
                                width={50}
                                height={50}
                                className='object-cover w-full h-full object-top'
                            />
                        ) : (
                            <span className='font-serif text-xl text-fun-blue-700 group-hover:text-white transition-colors duration-200'>
                                {officer.initials}
                            </span>
                        )
                    }
                </div>
                <div className='min-w-0'>
                    <div className='font-serif text-[15px] text-fun-blue-950 leading-snug truncate'>
                        {officer.name}
                    </div>
                    <div className='flex items-center gap-1 text-[10px] text-fun-blue-400/50 mt-0.5'>
                        <MapPin size={9} />
                        {officer.city}
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

/* ─── Council member chip ─────────────────────────────────── */
function MemberChip({ member, index, inView, }: {
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
            <div className='w-8 h-8 rounded-lg bg-fun-blue-50 border border-fun-blue-100 flex items-center justify-center shrink-0 group-hover:bg-fun-blue-600 group-hover:border-fun-blue-600 transition-all duration-200'>
                <span className='font-serif text-[11px] text-fun-blue-700 group-hover:text-white transition-colors duration-200'>
                    {member.initials}
                </span>
            </div>
            <div className='min-w-0 flex-1'>
                <div className='text-[12px] font-medium text-fun-blue-900 truncate'>
                    {member.name}
                </div>
                <div className='flex items-center gap-1 text-[11px] text-fun-blue-400 mt-0.5'>
                    <MapPin size={8} />
                    {member.city}
                </div>
            </div>
        </motion.div>
    )
}

/* ─── Section divider with label ─────────────────────────── */
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

/* ─── Main section ────────────────────────────────────────── */
export default function CouncilSection() {
    const ref = useRef<HTMLDivElement>(null)
    const inView = useInView(ref, { once: true, margin: '-60px' })

    const president = OFFICERS[0]
    const rest = OFFICERS.slice(1)

    return (
        <Section className='bg-[#F7F6F2]'>
            <Wrapper>
                <div ref={ref}>

                    {/* ── Header ── */}
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

                    {/* ── Executive officers ── */}
                    <Divider label='Executive Officers' delay={0.08} inView={inView} />

                    <div className='grid grid-cols-1 md:grid-cols-[350px_1fr] gap-5 mb-8'>

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

                        {/* 5 officers in 2+3 grid */}
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

                    {/* ── Council members ── */}
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

                    {/* ── Footer note ── */}
                    <motion.p
                        initial='hidden'
                        animate={inView ? 'show' : 'hidden'}
                        custom={0.6}
                        variants={fadeUp}
                        className='mt-8 text-center text-[12px] text-fun-blue-400/50'
                    >
                        Council members are elected biennially by the NZUSI membership.{' '}
                        <Link href='/about' className='text-fun-blue-500 hover:text-fun-blue-600 underline underline-offset-2 transition-colors duration-200'>
                            View past presidents & executives →
                        </Link>
                    </motion.p>

                </div>
            </Wrapper>
        </Section>
    )
}