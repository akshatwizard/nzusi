'use client'

import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'motion/react'
import { Section, Wrapper } from '@/components/ui/sections'
import {
    ChevronDown, ExternalLink, BookOpen, AlertCircle, Users, ArrowRight, Info
} from 'lucide-react'
import { ANATOMY_PARTS, DISORDERS, DIAGNOSTICS, HOW_IT_WORKS, SPECIALISTS } from '@/constant/education'

const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    show: (d = 0) => ({
        opacity: 1, y: 0,
        transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const, delay: d },
    }),
}

function SectionHeader({ eyebrow, title, accent, body }: {
    eyebrow: string; title: string; accent: string; body?: string
}) {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: '-60px' })
    return (
        <motion.div ref={ref} initial='hidden' animate={isInView ? 'show' : 'hidden'} variants={fadeUp} className='mb-10'>
            <div className='flex items-center gap-3 mb-3'>
                <div className='h-px w-6 bg-fun-blue-400' />
                <span className='text-[11px] font-semibold tracking-[0.2em] uppercase text-fun-blue-500'>{eyebrow}</span>
            </div>
            <h2 className='text-3xl md:text-4xl text-fun-blue-950 leading-tight mb-3'>
                {title} <em className='not-italic text-fun-blue-400'>{accent}</em>
            </h2>
            {body && <p className='text-fun-blue-800/60 text-sm leading-relaxed max-w-2xl'>{body}</p>}
        </motion.div>
    )
}

function DisorderCard({ disorder, index }: { disorder: typeof DISORDERS[number]; index: number }) {
    const [open, setOpen] = useState(false)
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: '-40px' })

    return (
        <motion.div
            ref={ref}
            initial='hidden'
            animate={isInView ? 'show' : 'hidden'}
            custom={index * 0.05}
            variants={fadeUp}
            className={`rounded-2xl border overflow-hidden transition-colors duration-200 ${open
                ? 'border-fun-blue-200 bg-white shadow-md shadow-fun-blue-100/50'
                : 'border-fun-blue-100 bg-white/70 hover:bg-white hover:border-fun-blue-200'
                }`}
        >
            <button onClick={() => setOpen(v => !v)} className='w-full text-left'>
                <div className='flex items-start gap-4 p-5'>
                    {/* Index */}
                    <span className='text-[11px] font-bold text-fun-blue-200 tabular-nums mt-0.5 w-5 shrink-0'>
                        {String(index + 1).padStart(2, '0')}
                    </span>

                    <div className='flex-1 min-w-0'>
                        <div className='flex flex-wrap items-center gap-2 mb-2'>
                            <h3 className={`font-semibold text-sm leading-snug transition-colors ${open ? 'text-fun-blue-700' : 'text-fun-blue-950'}`}>
                                {disorder.name}
                            </h3>
                        </div>
                        <div className='flex flex-wrap gap-2'>
                            <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${disorder.severityColor}`}>
                                {disorder.severity}
                            </span>
                            <span className='text-[10px] text-zinc-500 bg-zinc-50 border border-zinc-100 px-2 py-0.5 rounded-full'>
                                {disorder.affectsIcon} {disorder.affects}
                            </span>
                        </div>
                        {!open && (
                            <p className='text-[13px] text-zinc-500 leading-snug mt-2 line-clamp-1'>
                                {disorder.summary}
                            </p>
                        )}
                    </div>

                    <motion.div
                        animate={{ rotate: open ? 180 : 0 }}
                        transition={{ duration: 0.25 }}
                        className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center mt-0.5 ${open ? 'bg-fun-blue-100' : 'bg-fun-blue-50'}`}
                    >
                        <ChevronDown size={14} className={open ? 'text-fun-blue-600' : 'text-fun-blue-400'} />
                    </motion.div>
                </div>
            </button>

            <AnimatePresence initial={false}>
                {open && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className='overflow-hidden'
                    >
                        <div className='px-5 pb-5 border-t border-fun-blue-100 ml-9'>
                            <p className='text-[13px] text-fun-blue-800/65 leading-relaxed mt-4'>
                                {disorder.detail}
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    )
}

export default function EducationPatientPage() {
    const [activeOrgan, setActiveOrgan] = useState<string | null>(null)
    const heroRef = useRef(null)
    const heroInView = useInView(heroRef, { once: true })

    const selectedOrgan = ANATOMY_PARTS.find(p => p.id === activeOrgan)

    return (
        <main className='w-full bg-fun-blue-50'>

            {/* ═══ HERO ═══════════════════════════════════════════════ */}
            <Section className='relative overflow-hidden bg-fun-blue-950'>
                {/* Background image */}
                <div
                    className='pointer-events-none absolute inset-0 bg-cover bg-center'
                    style={{
                        backgroundImage: `url('/images/hero/hero-bg.jpg')`,
                        backgroundPosition: 'center 30%',
                    }}
                />

                <div
                    className='pointer-events-none absolute inset-0'
                    style={{
                        background:
                            'linear-gradient(105deg, rgba(16,38,65,0.97) 0%, rgba(16,38,65,0.88) 45%, rgba(16,38,65,0.60) 100%)',
                    }}
                />

                <div
                    className='pointer-events-none absolute inset-0'
                    style={{
                        background:
                            'radial-gradient(ellipse at 60% 0%, rgba(40,129,207,0.12) 0%, transparent 60%)',
                    }}
                />

                {/* Bottom separator */}
                <div className='pointer-events-none absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent via-fun-blue-700/50 to-transparent' />

                <Wrapper ref={heroRef} className='relative z-10 lg:pt-44 md:pt-40 pt-38'>
                    <div className='flex flex-col lg:flex-row items-start lg:items-end justify-between gap-10'>
                        <div className='max-w-2xl'>
                            <motion.div
                                initial={{ opacity: 0, y: 16 }}
                                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.5 }}
                                className='inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 mb-6'
                            >
                                <BookOpen size={11} className='text-fun-blue-300' />
                                <span className='text-fun-blue-200 text-[11px] font-semibold tracking-widest uppercase'>
                                    Patient Education · NZUSI
                                </span>
                            </motion.div>

                            <motion.h1
                                initial={{ opacity: 0, y: 28 }}
                                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                                className='text-4xl md:text-5xl lg:text-6xl text-white leading-[1.05] mb-5'
                            >
                                Understanding Your<br />
                                <em className='not-italic text-fun-blue-300'>Urinary System</em>
                            </motion.h1>

                            <motion.p
                                initial={{ opacity: 0, y: 16 }}
                                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.55, delay: 0.2 }}
                                className='text-fun-blue-300/80 text-sm leading-relaxed max-w-lg'
                            >
                                A comprehensive guide to how the urinary system works, common disorders, diagnostic tests, and when to see a specialist. Written for patients and their families by NZUSI urologists.
                            </motion.p>
                        </div>

                        {/* Quick-stat cards */}
                        <motion.div
                            initial={{ opacity: 0, x: 24 }}
                            animate={heroInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                            className='flex flex-row lg:flex-col gap-3 flex-wrap'
                        >
                            {[
                                { val: '5', label: 'Key Organs' },
                                { val: '9', label: 'Common Disorders' },
                                { val: '3', label: 'Diagnostic Tests' },
                                { val: '6', label: 'Specialist Types' },
                            ].map(s => (
                                <div key={s.label} className='flex items-center gap-3 px-4 py-3 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm'>
                                    <span className='text-2xl font-bold text-white tabular-nums'>{s.val}</span>
                                    <span className='text-fun-blue-400 text-xs leading-tight'>{s.label}</span>
                                </div>
                            ))}
                        </motion.div>
                    </div>

                    {/* Table of contents strip */}
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={heroInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className='flex flex-wrap gap-2 mt-12'
                    >
                        {[
                            ['#anatomy', 'Anatomy'],
                            ['#how-it-works', 'How It Works'],
                            ['#causes', 'Causes of Problems'],
                            ['#diagnosis', 'Diagnosis'],
                            ['#disorders', 'Disorders'],
                            ['#specialists', 'Specialists'],
                        ].map(([href, label]) => (
                            <a
                                key={href}
                                href={href}
                                className='inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/8 border border-white/10 text-fun-blue-300 text-[11px] font-medium hover:bg-white/15 hover:text-white transition-all'
                            >
                                {label} <ArrowRight size={10} />
                            </a>
                        ))}
                    </motion.div>
                </Wrapper>
            </Section>

            {/* ═══ ANATOMY ════════════════════════════════════════════ */}
            <Section id='anatomy' className='bg-white'>
                <Wrapper>
                    <SectionHeader
                        eyebrow='Anatomy'
                        title='The Five'
                        accent='Key Organs'
                        body='The urinary system consists of two kidneys, two ureters, the bladder, two sphincter muscles, and the urethra — all working together to create, store, and eliminate urine.'
                    />

                    <div className='grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8 items-start'>
                        {/* Organ selector */}
                        <div className='flex flex-col gap-3'>
                            {ANATOMY_PARTS.map((part, i) => {
                                const isActive = activeOrgan === part.id
                                return (
                                    <motion.button
                                        key={part.id}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.4, delay: i * 0.07 }}
                                        onClick={() => setActiveOrgan(isActive ? null : part.id)}
                                        className={`group w-full text-left flex items-start gap-4 p-5 rounded-2xl border transition-all duration-300 cursor-pointer ${isActive
                                            ? 'bg-fun-blue-600 border-fun-blue-600 shadow-lg shadow-fun-blue-200'
                                            : 'bg-fun-blue-50 border-fun-blue-100 hover:border-fun-blue-300 hover:bg-fun-blue-100/60'
                                            }`}
                                    >
                                        <div className={`text-2xl shrink-0 w-10 h-10 flex items-center justify-center rounded-xl transition-colors ${isActive ? 'bg-white/15' : 'bg-white'}`}>
                                            {part.icon}
                                        </div>
                                        <div className='flex-1 min-w-0'>
                                            <div className='flex items-center justify-between gap-2'>
                                                <span className={`font-semibold text-sm ${isActive ? 'text-white' : 'text-fun-blue-950'}`}>
                                                    {part.label}
                                                </span>
                                                <motion.div
                                                    animate={{ rotate: isActive ? 180 : 0 }}
                                                    transition={{ duration: 0.25 }}
                                                >
                                                    <ChevronDown size={14} className={isActive ? 'text-white/60' : 'text-fun-blue-300'} />
                                                </motion.div>
                                            </div>
                                            <AnimatePresence initial={false}>
                                                {isActive && (
                                                    <motion.div
                                                        initial={{ height: 0, opacity: 0 }}
                                                        animate={{ height: 'auto', opacity: 1 }}
                                                        exit={{ height: 0, opacity: 0 }}
                                                        transition={{ duration: 0.3 }}
                                                        className='overflow-hidden'
                                                    >
                                                        <p className='text-white/80 text-xs leading-relaxed mt-2'>
                                                            {part.desc}
                                                        </p>
                                                        <div className='mt-3 flex items-start gap-2 px-3 py-2 bg-white/10 rounded-lg'>
                                                            <Info size={11} className='text-white/60 mt-0.5 shrink-0' />
                                                            <span className='text-white/70 text-[11px] leading-snug'>{part.fact}</span>
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                            {!isActive && (
                                                <p className='text-fun-blue-500 text-[12px] mt-0.5 line-clamp-1'>{part.desc.slice(0, 60)}…</p>
                                            )}
                                        </div>
                                    </motion.button>
                                )
                            })}
                        </div>

                        {/* Side info panel */}
                        <div className='lg:sticky lg:top-28'>
                            <AnimatePresence mode='wait'>
                                {selectedOrgan ? (
                                    <motion.div
                                        key={selectedOrgan.id}
                                        initial={{ opacity: 0, y: 12 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -8 }}
                                        transition={{ duration: 0.3 }}
                                        className='rounded-2xl bg-fun-blue-950 p-7 text-white'
                                    >
                                        <div className='text-4xl mb-4'>{selectedOrgan.icon}</div>
                                        <h3 className='text-xl mb-3 text-white'>{selectedOrgan.label}</h3>
                                        <p className='text-fun-blue-200/80 text-sm leading-relaxed mb-5'>{selectedOrgan.desc}</p>
                                        <div className='border-t border-fun-blue-800 pt-4 flex items-start gap-2'>
                                            <Info size={12} className='text-fun-blue-400 mt-0.5 shrink-0' />
                                            <p className='text-fun-blue-300 text-xs leading-snug'>{selectedOrgan.fact}</p>
                                        </div>
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key='empty'
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className='rounded-2xl border-2 border-dashed border-fun-blue-100 p-10 flex flex-col items-center text-center gap-3'
                                    >
                                        <div className='w-14 h-14 rounded-2xl bg-fun-blue-50 flex items-center justify-center text-2xl'>🫘</div>
                                        <p className='text-fun-blue-400 text-sm font-medium'>Select an organ</p>
                                        <p className='text-fun-blue-300 text-xs leading-relaxed'>Click any organ above to see detailed information about its role in the urinary system.</p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </Wrapper>
            </Section>

            {/* ═══ HOW IT WORKS ═══════════════════════════════════════ */}
            <Section id='how-it-works' className='bg-fun-blue-50'>
                <Wrapper>
                    <SectionHeader
                        eyebrow='Function'
                        title='How the Urinary'
                        accent='System Works'
                        body='Your body eliminates about 1–2 litres of urine each day. The amount depends on fluid and food intake, sweat, medications, and activity level. Here is the 5-step process.'
                    />

                    <div className='flex flex-col gap-0'>
                        {HOW_IT_WORKS.map((step, i) => {
                            const ref = useRef(null)
                            const isInView = useInView(ref, { once: true, margin: '-40px' })
                            return (
                                <motion.div
                                    key={step.num}
                                    ref={ref}
                                    initial={{ opacity: 0, x: -24 }}
                                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                                    transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                                    className='flex gap-6 items-start relative'
                                >
                                    {/* Timeline spine */}
                                    <div className='flex flex-col items-center shrink-0'>
                                        <div className='w-10 h-10 rounded-full bg-fun-blue-600 text-white flex items-center justify-center text-xs font-bold shrink-0 z-10'>
                                            {step.num}
                                        </div>
                                        {i < HOW_IT_WORKS.length - 1 && (
                                            <div className='w-px flex-1 bg-fun-blue-200 my-1 min-h-10' />
                                        )}
                                    </div>
                                    <div className='pb-10 flex-1 pt-1.5'>
                                        <h3 className='font-semibold text-fun-blue-950 text-base mb-2'>{step.title}</h3>
                                        <p className='text-fun-blue-800/65 text-sm leading-relaxed'>{step.body}</p>
                                    </div>
                                </motion.div>
                            )
                        })}
                    </div>
                </Wrapper>
            </Section>

            {/* ═══ CAUSES ═════════════════════════════════════════════ */}
            <Section id='causes' className='bg-white'>
                <Wrapper>
                    <SectionHeader
                        eyebrow='Causes'
                        title='What Causes'
                        accent='Problems?'
                    />

                    <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
                        {[
                            {
                                icon: '⏳',
                                title: 'Ageing',
                                body: 'As you get older, changes in kidney structure reduce their ability to remove wastes. Muscles in your ureters, bladder, and urethra lose strength, leading to incomplete emptying and incontinence.',
                            },
                            {
                                icon: '🦠',
                                title: 'Illness',
                                body: 'Diseases including diabetes, hypertension, and autoimmune conditions can damage the kidneys. Bacterial infections can affect the bladder (cystitis) or spread to the kidneys (pyelonephritis).',
                            },
                            {
                                icon: '🩹',
                                title: 'Injury',
                                body: 'Trauma to the kidneys, bladder, or urethra — from accidents or surgery — can disrupt normal function. Nerve damage from spinal injury can also impair bladder control.',
                            },
                        ].map((card, i) => {
                            const ref = useRef(null)
                            const isInView = useInView(ref, { once: true, margin: '-40px' })
                            return (
                                <motion.div
                                    key={card.title}
                                    ref={ref}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                                    transition={{ duration: 0.5, delay: i * 0.1 }}
                                    className='rounded-2xl border border-fun-blue-100 bg-fun-blue-50 p-6'
                                >
                                    <div className='text-3xl mb-4'>{card.icon}</div>
                                    <h3 className='font-semibold text-fun-blue-950 text-base mb-2'>{card.title}</h3>
                                    <p className='text-fun-blue-800/65 text-sm leading-relaxed'>{card.body}</p>
                                </motion.div>
                            )
                        })}
                    </div>
                </Wrapper>
            </Section>

            {/* ═══ DIAGNOSIS ══════════════════════════════════════════ */}
            <Section id='diagnosis' className='bg-fun-blue-50'>
                <Wrapper>
                    <SectionHeader
                        eyebrow='Diagnostics'
                        title='How Problems Are'
                        accent='Detected'
                        body='Urinary problems are diagnosed using a combination of simple urine tests and specialised bladder function studies.'
                    />

                    <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
                        {DIAGNOSTICS.map((d, i) => {
                            const Icon = d.icon
                            const ref = useRef(null)
                            const isInView = useInView(ref, { once: true, margin: '-40px' })
                            return (
                                <motion.div
                                    key={d.name}
                                    ref={ref}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                                    transition={{ duration: 0.5, delay: i * 0.1 }}
                                    className='rounded-2xl border border-fun-blue-100 bg-white p-6 shadow-sm'
                                >
                                    <div className='w-10 h-10 rounded-xl bg-fun-blue-50 border border-fun-blue-100 flex items-center justify-center mb-4'>
                                        <Icon size={18} className='text-fun-blue-600' />
                                    </div>
                                    <h3 className='font-semibold text-fun-blue-950 text-sm mb-2'>{d.name}</h3>
                                    <p className='text-fun-blue-800/60 text-[13px] leading-relaxed'>{d.desc}</p>
                                </motion.div>
                            )
                        })}
                    </div>
                </Wrapper>
            </Section>

            {/* ═══ DISORDERS ══════════════════════════════════════════ */}
            <Section id='disorders' className='bg-white'>
                <Wrapper>
                    <SectionHeader
                        eyebrow='Conditions'
                        title='Common'
                        accent='Disorders'
                        body='Urological disorders range from easily treatable conditions to serious, life-threatening diseases. Click any condition to learn more.'
                    />

                    {/* Severity legend */}
                    <div className='flex flex-wrap gap-2 mb-8'>
                        {[
                            { label: 'Serious', color: 'bg-red-50 text-red-700 border border-red-200' },
                            { label: 'Chronic', color: 'bg-red-50 text-red-700 border border-red-200' },
                            { label: 'Moderate', color: 'bg-amber-50 text-amber-700 border border-amber-200' },
                            { label: 'Variable', color: 'bg-orange-50 text-orange-700 border border-orange-200' },
                            { label: 'Common', color: 'bg-sky-50 text-sky-700 border border-sky-200' },
                            { label: 'Indicator', color: 'bg-purple-50 text-purple-700 border border-purple-200' },
                        ].map(s => (
                            <span key={s.label} className={`text-[10px] font-semibold px-2.5 py-1 rounded-full ${s.color}`}>
                                {s.label}
                            </span>
                        ))}
                        <span className='text-[11px] text-fun-blue-400 self-center ml-1'>— severity classification</span>
                    </div>

                    <div className='flex flex-col gap-2.5'>
                        {DISORDERS.map((disorder, i) => (
                            <DisorderCard key={disorder.id} disorder={disorder} index={i} />
                        ))}
                    </div>
                </Wrapper>
            </Section>

            {/* ═══ SPECIALISTS ════════════════════════════════════════ */}
            <Section id='specialists' className='bg-fun-blue-50'>
                <Wrapper>
                    <SectionHeader
                        eyebrow='Who Can Help'
                        title='Finding the Right'
                        accent='Specialist'
                        body='Different urinary problems require different specialists. Here is who to see and when.'
                    />

                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
                        {SPECIALISTS.map((s, i) => {
                            const ref = useRef(null)
                            const isInView = useInView(ref, { once: true, margin: '-40px' })
                            return (
                                <motion.div
                                    key={s.role}
                                    ref={ref}
                                    initial={{ opacity: 0, y: 16 }}
                                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                                    transition={{ duration: 0.4, delay: i * 0.07 }}
                                    className='group rounded-2xl border border-fun-blue-100 bg-white p-5 hover:border-fun-blue-200 hover:shadow-sm transition-all duration-200'
                                >
                                    <div className='flex items-center gap-3 mb-3'>
                                        <div className='w-9 h-9 rounded-xl bg-fun-blue-50 border border-fun-blue-100 flex items-center justify-center'>
                                            <Users size={15} className='text-fun-blue-600' />
                                        </div>
                                        <h3 className='font-semibold text-fun-blue-950 text-sm'>{s.role}</h3>
                                    </div>
                                    <p className='text-fun-blue-800/60 text-[13px] leading-relaxed'>{s.desc}</p>
                                </motion.div>
                            )
                        })}
                    </div>

                    {/* NZUSI CTA */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className='mt-10 rounded-2xl bg-fun-blue-950 p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6'
                    >
                        <div>
                            <p className='text-white font-semibold text-base mb-1'>Find a Urologist in North Zone</p>
                            <p className='text-fun-blue-400 text-sm leading-relaxed max-w-md'>
                                NZUSI connects you with qualified urologists across Haryana, Punjab, Himachal Pradesh, J&K, Uttarakhand, and Delhi.
                            </p>
                        </div>
                        <a
                            href='mailto:nzusioffice@gmail.com'
                            className='shrink-0 inline-flex items-center gap-2 px-6 py-3 bg-fun-blue-100 text-fun-blue-900 rounded-xl font-semibold text-sm hover:bg-white transition-colors'
                        >
                            Contact NZUSI <ArrowRight size={14} />
                        </a>
                    </motion.div>
                </Wrapper>
            </Section>

            {/* ═══ KEY POINTS + RESOURCES ═════════════════════════════ */}
            <Section className='bg-white'>
                <Wrapper>
                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-10'>

                        {/* Key points */}
                        <div>
                            <div className='flex items-center gap-3 mb-6'>
                                <div className='h-px w-6 bg-fun-blue-400' />
                                <span className='text-[11px] font-semibold tracking-[0.2em] uppercase text-fun-blue-500'>Summary</span>
                            </div>
                            <h3 className='text-2xl text-fun-blue-950 mb-5'>
                                Key Points to <em className='not-italic text-fun-blue-400'>Remember</em>
                            </h3>
                            <ul className='space-y-3'>
                                {[
                                    'Your urinary system filters waste and extra fluid from your blood.',
                                    'Problems include kidney failure, urinary tract infections, kidney stones, prostate enlargement, and bladder control issues.',
                                    'Adults normally eliminate about 1–2 litres of urine per day.',
                                    'Many urinary disorders are treatable — early detection is key.',
                                    'Health professionals include GPs, urologists, nephrologists, gynecologists, urogynecologists, and pediatricians.',
                                    'Staying well-hydrated helps prevent UTIs and kidney stones.',
                                ].map((point, i) => (
                                    <motion.li
                                        key={i}
                                        initial={{ opacity: 0, x: -12 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.4, delay: i * 0.06 }}
                                        className='flex gap-3 text-sm text-fun-blue-800/70 leading-relaxed'
                                    >
                                        <span className='mt-1.5 w-1.5 h-1.5 rounded-full bg-fun-blue-400 shrink-0' />
                                        {point}
                                    </motion.li>
                                ))}
                            </ul>
                        </div>

                        {/* Resources */}
                        <div>
                            <div className='flex items-center gap-3 mb-6'>
                                <div className='h-px w-6 bg-fun-blue-400' />
                                <span className='text-[11px] font-semibold tracking-[0.2em] uppercase text-fun-blue-500'>Further Reading</span>
                            </div>
                            <h3 className='text-2xl text-fun-blue-950 mb-5'>
                                Trusted <em className='not-italic text-fun-blue-400'>Resources</em>
                            </h3>
                            <div className='flex flex-col gap-2.5'>
                                {[
                                    { name: 'National Kidney Foundation', url: 'https://www.kidney.org/', desc: 'Comprehensive kidney disease information and support.' },
                                    { name: 'American Foundation for Urologic Disease', url: 'https://www.urologyhealth.org/', desc: 'Patient education on urological conditions.' },
                                    { name: 'Interstitial Cystitis Association', url: 'https://www.ichelp.org/', desc: 'Support and research for IC/painful bladder syndrome.' },
                                    { name: 'National Association for Continence (NAFC)', url: 'https://www.nafc.org/', desc: 'Resources for bladder and bowel health.' },
                                    { name: 'NKUDIC / NIDDK', url: 'https://www.niddk.nih.gov/', desc: 'NIH clearinghouse for kidney and urologic diseases.' },
                                ].map((r, i) => (
                                    <motion.a
                                        key={r.name}
                                        href={r.url}
                                        target='_blank'
                                        rel='noopener noreferrer'
                                        initial={{ opacity: 0, y: 10 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.4, delay: i * 0.07 }}
                                        className='group flex items-start gap-3 p-4 rounded-xl border border-fun-blue-100 bg-fun-blue-50 hover:border-fun-blue-300 hover:bg-white transition-all duration-200'
                                    >
                                        <ExternalLink size={13} className='text-fun-blue-400 mt-0.5 shrink-0 group-hover:text-fun-blue-600 transition-colors' />
                                        <div>
                                            <p className='font-medium text-fun-blue-900 text-sm group-hover:text-fun-blue-700 transition-colors'>{r.name}</p>
                                            <p className='text-fun-blue-500 text-[12px] mt-0.5'>{r.desc}</p>
                                        </div>
                                    </motion.a>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Source note */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className='mt-10 flex items-start gap-3 px-5 py-4 rounded-xl bg-zinc-50 border border-zinc-100'
                    >
                        <AlertCircle size={13} className='text-zinc-400 mt-0.5 shrink-0' />
                        <p className='text-zinc-500 text-[12px] leading-relaxed'>
                            Content sourced from NIH Publication No. 98-3195 (National Kidney and Urologic Diseases Information Clearinghouse) and updated for patient readability by NZUSI. This page is for educational purposes only and does not constitute medical advice. Always consult a qualified urologist for diagnosis and treatment.
                        </p>
                    </motion.div>
                </Wrapper>
            </Section>
        </main>
    )
}