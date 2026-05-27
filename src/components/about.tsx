'use client'

import { useRef } from 'react'
import { motion, useInView } from 'motion/react'
import Link from 'next/link'
import { ArrowRight, ExternalLink, Users, BookOpen, Microscope } from 'lucide-react'
import { Section, Wrapper } from './ui/sections'

/* ─── Data ──────────────────────────────────────────────── */
const VALUE_PROPS = [
    {
        icon: <Users size={16} />,
        title: 'Peer Support',
        body: 'Discuss cases and everyday problems with competent, updated peers for innovative and practical solutions.',
    },
    {
        icon: <BookOpen size={16} />,
        title: 'Value Addition for Your Practice',
        body: 'Whether you are a freelancing urologist, corporate consultant or faculty — our programs are designed for all needs.',
    },
    {
        icon: <Microscope size={16} />,
        title: 'Network with Leaders',
        body: 'The North Zone is home to legends in urology. Your membership is the platform to interact and learn from them.',
    },
]

const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    show: (d = 0) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const, delay: d },
    }),
}

/* ─── Left column ───────────────────────────────────────── */
function AboutLeft({ inView }: { inView: boolean }) {
    return (
        <div className="flex flex-col justify-center lg:pr-16 xl:pr-24">
            {/* Eyebrow */}
            <motion.div
                initial="hidden" animate={inView ? 'show' : 'hidden'} custom={0}
                variants={fadeUp}
                className="flex items-center gap-2.5 mb-6"
            >
                <div className="h-px w-6 bg-fun-blue-600/40" />
                <span className="text-fun-blue-600 text-[11px] font-medium tracking-widest uppercase">
                    About NZUSI
                </span>
            </motion.div>

            {/* Heading */}
            <motion.h2
                initial="hidden" animate={inView ? 'show' : 'hidden'} custom={0.08}
                variants={fadeUp}
                className="font-serif text-4xl lg:text-[2.75rem] text-fun-blue-950 leading-[1.1] mb-6"
            >
                A Zone of{' '}
                <em className="text-fun-blue-600">
                    Leaders,
                </em>
                <br />
                Advancing Indian{' '}
                <em className="text-fun-blue-600">Urology</em>
            </motion.h2>

            {/* Body copy — real text from site */}
            <motion.p
                initial="hidden" animate={inView ? 'show' : 'hidden'} custom={0.15}
                variants={fadeUp}
                className="text-fun-blue-800/60 text-[15px] leading-[1.75] mb-10 max-w-120"
            >
                The North Zone Urological Society of India collectively ushers in this new
                digitalized era with a vision to bring various activities being held under
                its umbrella. North zone has been a leading zone of USI with many of its
                members being the beacon of Indian Urology — both nationally and
                internationally.
            </motion.p>

            {/* Value props */}
            <div className="flex flex-col gap-0">
                {VALUE_PROPS.map((v, i) => (
                    <motion.div
                        key={v.title}
                        initial="hidden" animate={inView ? 'show' : 'hidden'} custom={0.2 + i * 0.1}
                        variants={fadeUp}
                        className="group flex gap-4 py-5 border-b border-fun-blue-100 last:border-b-0"
                    >
                        {/* Icon */}
                        <div className="mt-0.5 w-8 h-8 min-w-8 rounded-lg bg-fun-blue-50 border border-fun-blue-100 flex items-center justify-center text-fun-blue-600 group-hover:bg-fun-blue-600 group-hover:text-white group-hover:border-fun-blue-600 transition-all duration-200">
                            {v.icon}
                        </div>
                        <div>
                            <div className="text-fun-blue-900 font-medium text-[13px] mb-1">
                                {v.title}
                            </div>
                            <div className="text-fun-blue-700/55 text-[13px] leading-relaxed">
                                {v.body}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    )
}

/* ─── ASCENT card ───────────────────────────────────────── */
function AscentCard({ inView }: { inView: boolean }) {
    return (
        <motion.div
            initial="hidden" animate={inView ? 'show' : 'hidden'} custom={0.18}
            variants={fadeUp}
            className="flex flex-col h-full"
        >
            {/* Main ASCENT promo card */}
            <div className="relative rounded-2xl overflow-hidden bg-fun-blue-950 flex flex-col flex-1">

                {/* Subtle grid overlay */}
                <div
                    className="absolute inset-0 opacity-[0.04] pointer-events-none"
                    style={{
                        backgroundImage: `linear-gradient(rgba(255,255,255,.9) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.9) 1px,transparent 1px)`,
                        backgroundSize: '32px 32px',
                    }}
                />

                {/* Glow orb */}
                <div
                    className="absolute -bottom-24 -right-16 w-64 h-64 rounded-full pointer-events-none"
                    style={{ background: 'radial-gradient(circle, rgba(24,95,165,0.45) 0%, transparent 70%)' }}
                />

                {/* Top accent bar */}
                <div className="h-1 w-full bg-linear-to-r from-fun-blue-600 via-fun-blue-400 to-fun-blue-600" />

                <div className="relative z-10 p-8 flex flex-col flex-1">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 bg-fun-blue-600/20 border border-fun-blue-400/25 rounded-full px-3 py-1.5 w-max mb-6">
                        <div className="w-1.5 h-1.5 rounded-full bg-fun-blue-400 animate-pulse" />
                        <span className="text-fun-blue-300 text-[10px] font-medium tracking-widest uppercase">
                            Academic Series
                        </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-serif text-3xl text-fun-blue-50 leading-tight mb-2">
                        ASCENT
                    </h3>
                    <p className="text-fun-blue-400/70 text-xs font-medium tracking-wide uppercase mb-5">
                        NZUSI Academic Series
                    </p>

                    {/* Description */}
                    <p className="text-fun-blue-200/60 text-[13px] leading-relaxed mb-8">
                        North Zone ushers in the digitalized era with a vision to bring collaborative
                        work at the research, clinical and academic level — keeping in view the
                        greater good of society and country at large.
                    </p>

                    {/* Feature list */}
                    <div className="flex flex-col gap-3 mb-8">
                        {[
                            'Live case discussions with expert faculty',
                            'Monthly online CME sessions via Zoom',
                            'Access to recorded webinar library',
                        ].map((feat) => (
                            <div key={feat} className="flex items-start gap-3">
                                <div className="mt-1.5 w-1 h-1 min-w-1 rounded-full bg-fun-blue-400/60" />
                                <span className="text-fun-blue-200/55 text-[12px] leading-snug">
                                    {feat}
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* Spacer to push buttons to bottom */}
                    <div className="flex-1" />

                    {/* CTAs */}
                    <div className="flex flex-col gap-2.5">
                        <Link
                            href="https://youtu.be/q4o8F8pDtVg"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex items-center justify-center gap-2 bg-fun-blue-600 hover:bg-fun-blue-500 text-fun-blue-50 text-[13px] font-semibold py-3 px-5 rounded-xl border border-fun-blue-400/30 transition-all duration-200"
                        >
                            View Latest Webinar
                            <ExternalLink
                                size={13}
                                className="opacity-70 group-hover:opacity-100 transition-opacity"
                            />
                        </Link>
                        <Link
                            href="https://us02web.zoom.us/j/85025121941"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2 text-fun-blue-300/70 hover:text-fun-blue-200 text-[12px] font-medium py-2.5 px-5 rounded-xl border border-white/[0.07] hover:border-white/[0.14] transition-all duration-200"
                        >
                            Join on Zoom
                        </Link>
                    </div>
                </div>
            </div>

            {/* NZUSICON 2026 mini card below */}
            <motion.div
                initial="hidden" animate={inView ? 'show' : 'hidden'} custom={0.3}
                variants={fadeUp}
                className="mt-4 rounded-xl border border-fun-blue-100 bg-fun-blue-50/60 p-5 flex items-center justify-between gap-4"
            >
                <div>
                    <div className="text-[10px] font-medium text-fun-blue-600/60 uppercase tracking-widest mb-1.5">
                        Flagship Event
                    </div>
                    <div className="font-serif text-lg text-fun-blue-950 leading-snug mb-0.5">
                        NZUSICON 2026
                    </div>
                    <div className="text-fun-blue-700/55 text-xs">
                        Nov 27–29 · Amritsar, Punjab
                    </div>
                </div>
                <Link
                    href="/events"
                    className="group shrink-0 flex items-center gap-1.5 text-[12px] font-semibold text-fun-blue-600 hover:text-fun-blue-700 whitespace-nowrap"
                >
                    Register
                    <ArrowRight
                        size={13}
                        className="transition-transform duration-200 group-hover:translate-x-0.5"
                    />
                </Link>
            </motion.div>
        </motion.div>
    )
}

export default function AboutSection() {
    const ref = useRef<HTMLDivElement>(null)
    const inView = useInView(ref, { once: true, margin: '-60px' })

    return (
        <Section
            className='relative overflow-hidden'
            ref={ref}
            aria-label="About NZUSI and ASCENT Academic Series"
        >
            {/* Faint decorative circle — top left */}
            <div
                className="absolute -top-32 -left-32 w-96 h-96 rounded-full border border-fun-blue-400/40 pointer-events-none"
            />
            <div
                className="absolute -top-20 -left-20 w-56 h-56 rounded-full border border-fun-blue-400/25 pointer-events-none"
            />

            {/* Faint dot grid — right side */}
            <div
                className="absolute right-0 top-0 bottom-0 w-1/3 opacity-[0.1] pointer-events-none"
                style={{
                    backgroundImage: 'radial-gradient(circle, #102641 1px, transparent 1px)',
                    backgroundSize: '24px 24px',
                }}
            />
            <Wrapper>
                {/* Content */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-10 items-start">
                    <AboutLeft inView={inView} />
                    <AscentCard inView={inView} />
                </div>

                {/* Bottom edge wave into next dark section */}
                <div
                    className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-fun-blue-200/60 to-transparent"
                />
            </Wrapper>
        </Section>
    )
}