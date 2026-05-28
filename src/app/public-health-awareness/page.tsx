'use client'

import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'motion/react'
import { Section, Wrapper } from '@/components/ui/sections'
import { ChevronDown, ArrowRight, AlertCircle, BookOpen, ShieldCheck, Phone } from 'lucide-react'
import {
    URGENT_SYMPTOMS, EMERGENCY_SIGNS,
    LIFESTYLE_HABITS,
    KIDNEY_STONE, PROSTATE_HEALTH, UTI_INFO,
    BLADDER_HEALTH, MENS_HEALTH, WOMENS_HEALTH,
    CHILDRENS_HEALTH, CANCER_INFO, PREVENTIVE_CHECKS,
    FAQS, FAQ_CATEGORIES, type FAQCategory,
    PUBLIC_HEALTH_SECTIONS,
} from '@/constant/public-health'

const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    show: (d = 0) => ({
        opacity: 1, y: 0,
        transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const, delay: d },
    }),
}

function SectionHeader({
    eyebrow, title, accent, body, id
}: {
    eyebrow: string; title: string; accent: string; body?: string; id?: string
}) {
    const ref = useRef(null)
    const inView = useInView(ref, { once: true, margin: '-60px' })
    return (
        <motion.div
            id={id}
            ref={ref}
            initial='hidden'
            animate={inView ? 'show' : 'hidden'}
            custom={0}
            variants={fadeUp}
            className='mb-10 scroll-mt-24'
        >
            <div className='flex items-center gap-3 mb-3'>
                <div className='h-px w-6 bg-fun-blue-400' />
                <span className='text-[11px] font-semibold tracking-[0.2em] uppercase text-fun-blue-500'>
                    {eyebrow}
                </span>
            </div>
            <h2 className='font-serif text-3xl md:text-4xl text-fun-blue-950 leading-tight mb-3'>
                {title}{' '}
                <em className='not-italic text-fun-blue-500'>{accent}</em>
            </h2>
            {body && (
                <p className='text-fun-blue-800/60 text-sm leading-relaxed max-w-2xl'>{body}</p>
            )}
        </motion.div>
    )
}

function PillList({
    items, variant = 'blue'
}: {
    items: string[];
    variant?: 'blue' | 'red' | 'amber' | 'emerald'
}) {
    const colors = {
        blue: 'bg-fun-blue-50 text-fun-blue-700 border-fun-blue-200',
        red: 'bg-red-50 text-red-700 border-red-200',
        amber: 'bg-amber-50 text-amber-700 border-amber-200',
        emerald: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    }
    return (
        <div className='flex flex-wrap gap-2'>
            {items.map(item => (
                <span key={item} className={`text-[12px] font-medium px-3 py-1 rounded-full border ${colors[variant]}`}>
                    {item}
                </span>
            ))}
        </div>
    )
}

function TipList({ items, color = 'fun-blue' }: { items: string[]; color?: string }) {
    return (
        <ul className='space-y-2.5'>
            {items.map(item => (
                <li key={item} className='flex items-start gap-2.5 text-[13px] text-fun-blue-800/70 leading-snug'>
                    <span className='mt-1.5 w-1.5 h-1.5 rounded-full bg-fun-blue-400 shrink-0' />
                    {item}
                </li>
            ))}
        </ul>
    )
}

function TwoColCard({
    left, right, accentLeft, accentRight
}: {
    left: { title: string; items: string[] }
    right: { title: string; items: string[] }
    accentLeft?: string
    accentRight?: string
}) {
    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-5'>
            <div className={`rounded-xl border p-5 ${accentLeft ?? 'border-fun-blue-100 bg-fun-blue-50/40'}`}>
                <div className='text-[11px] font-semibold text-fun-blue-500 uppercase tracking-widest mb-3'>{left.title}</div>
                <TipList items={left.items} />
            </div>
            <div className={`rounded-xl border p-5 ${accentRight ?? 'border-fun-blue-100 bg-white'}`}>
                <div className='text-[11px] font-semibold text-fun-blue-500 uppercase tracking-widest mb-3'>{right.title}</div>
                <TipList items={right.items} />
            </div>
        </div>
    )
}

/* ─── FAQ accordion item ────────────────────────────────────── */
function FAQItem({ faq, index }: { faq: typeof FAQS[0]; index: number }) {
    const [open, setOpen] = useState(false)
    const ref = useRef(null)
    const inView = useInView(ref, { once: true, margin: '-30px' })

    return (
        <motion.div
            ref={ref}
            initial='hidden'
            animate={inView ? 'show' : 'hidden'}
            custom={index * 0.03}
            variants={fadeUp}
            className={`rounded-xl border overflow-hidden transition-all duration-200 ${open ? 'border-fun-blue-300 bg-white shadow-sm' : 'border-fun-blue-100 bg-white/70 hover:bg-white hover:border-fun-blue-200'
                }`}
        >
            <button
                onClick={() => setOpen(v => !v)}
                className='w-full text-left flex items-start gap-4 p-5 cursor-pointer'
            >
                <span className='text-[10px] font-bold text-fun-blue-200 tabular-nums mt-0.5 w-6 shrink-0'>
                    {String(faq.id).padStart(2, '0')}
                </span>
                <div className='flex-1 min-w-0'>
                    <p className={`font-medium text-sm leading-snug transition-colors ${open ? 'text-fun-blue-700' : 'text-fun-blue-950'}`}>
                        {faq.q}
                    </p>
                    {!open && (
                        <p className='text-[12px] text-zinc-400 mt-1 line-clamp-1'>{faq.a.slice(0, 80)}…</p>
                    )}
                </div>
                <motion.div
                    animate={{ rotate: open ? 180 : 0 }}
                    transition={{ duration: 0.22 }}
                    className={`shrink-0 w-6 h-6 rounded-full flex items-center justify-center mt-0.5 ${open ? 'bg-fun-blue-100' : 'bg-fun-blue-50'}`}
                >
                    <ChevronDown size={13} className={open ? 'text-fun-blue-600' : 'text-fun-blue-400'} />
                </motion.div>
            </button>

            <AnimatePresence initial={false}>
                {open && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                        className='overflow-hidden'
                    >
                        <div className='px-5 pb-5 border-t border-fun-blue-100 ml-10'>
                            <p className='text-[13px] text-fun-blue-800/70 leading-relaxed mt-4'>{faq.a}</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    )
}

/* ─── Warning banner ────────────────────────────────────────── */
function WarningBanner({ message }: { message: string }) {
    return (
        <div className='flex items-start gap-3 px-5 py-4 rounded-xl bg-amber-50 border border-amber-200 mt-5'>
            <AlertCircle size={14} className='text-amber-600 mt-0.5 shrink-0' />
            <p className='text-amber-800 text-[13px] leading-relaxed font-medium'>{message}</p>
        </div>
    )
}

/* ─── Lifestyle habit card ──────────────────────────────────── */
function LifestyleCard({ habit, index }: { habit: typeof LIFESTYLE_HABITS[0]; index: number }) {
    const [open, setOpen] = useState(false)
    const ref = useRef(null)
    const inView = useInView(ref, { once: true, margin: '-40px' })

    return (
        <motion.div
            ref={ref}
            initial='hidden'
            animate={inView ? 'show' : 'hidden'}
            custom={index * 0.06}
            variants={fadeUp}
            className={`rounded-2xl border overflow-hidden transition-all duration-200 ${open ? 'border-fun-blue-300 bg-white shadow-md' : 'border-fun-blue-100 bg-white hover:border-fun-blue-200'
                }`}
        >
            <button
                onClick={() => setOpen(v => !v)}
                className='w-full text-left flex items-center gap-4 p-5 cursor-pointer'
            >
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center text-2xl shrink-0 transition-colors ${open ? 'bg-fun-blue-600' : 'bg-fun-blue-50'}`}>
                    {habit.emoji}
                </div>
                <div className='flex-1 min-w-0'>
                    <div className={`font-semibold text-sm transition-colors ${open ? 'text-fun-blue-700' : 'text-fun-blue-950'}`}>
                        {habit.title}
                    </div>
                    <div className='text-[12px] text-fun-blue-400/70 mt-0.5'>{habit.subtitle}</div>
                </div>
                <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.22 }}>
                    <ChevronDown size={15} className={open ? 'text-fun-blue-600' : 'text-fun-blue-300'} />
                </motion.div>
            </button>

            <AnimatePresence initial={false}>
                {open && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className='overflow-hidden'
                    >
                        <div className='px-5 pb-5 border-t border-fun-blue-100'>
                            <div className='grid grid-cols-1 sm:grid-cols-2 gap-5 mt-4'>
                                {habit.why.length > 0 && (
                                    <div>
                                        <div className='text-[10px] font-semibold text-fun-blue-500 uppercase tracking-widest mb-3'>Why it matters</div>
                                        <TipList items={habit.why} />
                                    </div>
                                )}
                                {habit.tips.length > 0 && (
                                    <div>
                                        <div className='text-[10px] font-semibold text-fun-blue-500 uppercase tracking-widest mb-3'>Practical tips</div>
                                        <TipList items={habit.tips} />
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    )
}

/* ─── Myths & facts table ───────────────────────────────────── */
function MythsTable({ myths }: { myths: { myth: string; fact: string }[] }) {
    return (
        <div className='rounded-xl border border-fun-blue-100 overflow-hidden'>
            <div className='grid grid-cols-2 bg-fun-blue-950 text-white text-[11px] font-semibold uppercase tracking-widest px-5 py-3'>
                <span>Myth</span>
                <span>Fact</span>
            </div>
            {myths.map((row, i) => (
                <div key={i} className={`grid grid-cols-2 px-5 py-4 gap-4 ${i % 2 === 0 ? 'bg-white' : 'bg-fun-blue-50/40'} border-b border-fun-blue-100 last:border-none`}>
                    <div className='flex items-start gap-2 text-[13px] text-red-600/80'>
                        <span className='mt-1 shrink-0 text-red-300'>✕</span>
                        {row.myth}
                    </div>
                    <div className='flex items-start gap-2 text-[13px] text-emerald-700'>
                        <span className='mt-1 shrink-0 text-emerald-500'>✓</span>
                        {row.fact}
                    </div>
                </div>
            ))}
        </div>
    )
}

/* ─── Table of contents floating strip ─────────────────────── */
function TableOfContents() {
    return (
        <div className='flex flex-wrap gap-2 mt-10'>
            {PUBLIC_HEALTH_SECTIONS.map(s => (
                <a
                    key={s.id}
                    href={`#${s.id}`}
                    className='inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 border border-white/15 text-fun-blue-200 text-[11px] font-medium hover:bg-white/20 hover:text-white transition-all'
                >
                    <span>{s.emoji}</span>
                    {s.label}
                </a>
            ))}
        </div>
    )
}

/* ─── Section card wrapper ──────────────────────────────────── */
function ContentCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
    return (
        <div className={`rounded-2xl border border-fun-blue-100 bg-white p-6 md:p-8 ${className}`}>
            {children}
        </div>
    )
}

/* ─── Main page ─────────────────────────────────────────────── */
export default function PublicHealthPage() {
    const [faqFilter, setFaqFilter] = useState<FAQCategory>('All')
    const heroRef = useRef(null)
    const heroInView = useInView(heroRef, { once: true })

    const filteredFAQs = faqFilter === 'All' ? FAQS : FAQS.filter(f => f.category === faqFilter)

    return (
        <main className='w-full bg-fun-blue-50'>

            <Section className='relative overflow-hidden bg-fun-blue-950'>
                <div
                    className='pointer-events-none absolute inset-0 bg-cover bg-center opacity-15'
                    style={{ backgroundImage: `url('/images/hero/hero-bg.jpg')` }}
                />
                <div className='pointer-events-none absolute inset-0'
                    style={{ background: 'linear-gradient(105deg,rgba(16,38,65,0.97) 0%,rgba(16,38,65,0.88) 45%,rgba(16,38,65,0.60) 100%)' }} />
                <div className='pointer-events-none absolute inset-0'
                    style={{ background: 'radial-gradient(ellipse at 60% 0%,rgba(40,129,207,0.12) 0%,transparent 60%)' }} />
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
                                <ShieldCheck size={11} className='text-fun-blue-300' />
                                <span className='text-fun-blue-200 text-[11px] font-semibold tracking-widest uppercase'>
                                    Public Health & Urology Awareness · NZUSI
                                </span>
                            </motion.div>

                            <motion.h1
                                initial={{ opacity: 0, y: 28 }}
                                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                                className='font-serif text-4xl md:text-5xl lg:text-6xl text-white leading-[1.05] mb-5'
                            >
                                Welcome to<br />
                                <em className='not-italic text-fun-blue-300'>Urology Awareness</em>
                            </motion.h1>

                            <motion.p
                                initial={{ opacity: 0, y: 16 }}
                                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.55, delay: 0.2 }}
                                className='text-fun-blue-300/80 text-sm leading-relaxed max-w-lg mb-4'
                            >
                                Urology focuses on diseases of the urinary tract in both men and women, and disorders of the male reproductive system. Many urological disorders are preventable or treatable if detected early.
                            </motion.p>

                            <motion.p
                                initial={{ opacity: 0, y: 12 }}
                                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.5, delay: 0.28 }}
                                className='text-fun-blue-200/55 text-[13px] leading-relaxed max-w-lg'
                            >
                                Good urological health is essential for overall well-being, quality of life, healthy ageing, and prevention of chronic disease.
                            </motion.p>
                        </div>

                        <motion.div
                            initial={{ opacity: 0, x: 24 }}
                            animate={heroInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                            className='flex flex-row lg:flex-col gap-3 flex-wrap'
                        >
                            {[
                                { val: '11', label: 'Health sections' },
                                { val: '44', label: 'FAQs answered' },
                                { val: '6+', label: 'Lifestyle factors' },
                                { val: '4', label: 'Cancer types covered' },
                            ].map(s => (
                                <div key={s.label} className='flex items-center gap-3 px-4 py-3 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm'>
                                    <span className='font-serif text-2xl text-white tabular-nums'>{s.val}</span>
                                    <span className='text-fun-blue-400 text-xs leading-tight'>{s.label}</span>
                                </div>
                            ))}
                        </motion.div>
                    </div>

                    <TableOfContents />
                </Wrapper>
            </Section>

            <Section id='intro' className='bg-white scroll-mt-24'>
                <Wrapper>
                    <SectionHeader
                        eyebrow='Understanding Urology'
                        title='Common Symptoms That Need'
                        accent='Medical Attention'
                        body='Do not ignore persistent urinary symptoms. Early consultation can prevent complications.'
                    />

                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
                        <div>
                            <div className='text-[11px] font-semibold text-fun-blue-500 uppercase tracking-widest mb-4'>Symptoms to watch for</div>
                            <div className='flex flex-col gap-2'>
                                {URGENT_SYMPTOMS.map((s, i) => (
                                    <motion.div
                                        key={s}
                                        initial={{ opacity: 0, x: -16 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.35, delay: i * 0.05 }}
                                        className='flex items-center gap-3 px-4 py-3 rounded-xl border border-fun-blue-100 bg-fun-blue-50/50'
                                    >
                                        <div className='w-1.5 h-1.5 rounded-full bg-fun-blue-400 shrink-0' />
                                        <span className='text-[13px] text-fun-blue-900'>{s}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        <div className='flex flex-col gap-5'>
                            <div className='rounded-2xl bg-red-50 border border-red-200 p-6'>
                                <div className='flex items-center gap-2 mb-4'>
                                    <AlertCircle size={16} className='text-red-500' />
                                    <span className='text-[11px] font-bold text-red-600 uppercase tracking-widest'>Emergency warning signs</span>
                                </div>
                                <p className='text-[12px] text-red-700/70 mb-4'>Seek immediate medical attention if you have:</p>
                                <div className='flex flex-col gap-2'>
                                    {EMERGENCY_SIGNS.map(s => (
                                        <div key={s} className='flex items-center gap-2.5 text-[13px] text-red-700 font-medium'>
                                            <span className='text-red-400'>!</span> {s}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className='rounded-2xl bg-fun-blue-950 p-6'>
                                <BookOpen size={20} className='text-fun-blue-400 mb-4' />
                                <h3 className='font-serif text-xl text-white mb-2'>About the Urinary System</h3>
                                <p className='text-fun-blue-300/70 text-[13px] leading-relaxed'>
                                    Urologists diagnose and treat conditions involving the kidneys, ureters, bladder, prostate, urethra, and male reproductive organs.
                                </p>
                            </div>
                        </div>
                    </div>
                </Wrapper>
            </Section>

            <Section id='lifestyle' className='bg-fun-blue-50 scroll-mt-24'>
                <Wrapper>
                    <SectionHeader
                        eyebrow='Section 1'
                        title='Healthy Lifestyle &'
                        accent='Urological Wellness'
                        body='Healthy daily habits play a major role in preventing kidney disease, urinary infections, stones, prostate problems, bladder dysfunction, and sexual health disorders.'
                    />
                    <div className='flex flex-col gap-3'>
                        {LIFESTYLE_HABITS.map((habit, i) => (
                            <LifestyleCard key={habit.id} habit={habit} index={i} />
                        ))}
                    </div>
                </Wrapper>
            </Section>

            <Section id='kidney' className='bg-white scroll-mt-24'>
                <Wrapper>
                    <SectionHeader eyebrow='Section 2' title='Kidney Stone' accent='Awareness' body={KIDNEY_STONE.description} />
                    <div className='flex flex-col gap-6'>
                        <TwoColCard
                            left={{ title: 'Common Symptoms', items: KIDNEY_STONE.symptoms }}
                            right={{ title: 'Prevention Tips', items: KIDNEY_STONE.prevention }}
                        />
                        <div>
                            <div className='text-[11px] font-semibold text-fun-blue-500 uppercase tracking-widest mb-4'>Myths & Facts</div>
                            <MythsTable myths={KIDNEY_STONE.myths} />
                        </div>
                    </div>
                </Wrapper>
            </Section>

            <Section id='prostate' className='bg-fun-blue-50 scroll-mt-24'>
                <Wrapper>
                    <SectionHeader eyebrow='Section 3' title='Prostate Health' accent='Awareness' body={PROSTATE_HEALTH.description} />
                    <div className='flex flex-col gap-6'>
                        <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
                            <ContentCard>
                                <div className='text-[11px] font-semibold text-fun-blue-500 uppercase tracking-widest mb-4'>Common Conditions</div>
                                <TipList items={PROSTATE_HEALTH.conditions} />
                            </ContentCard>
                            <ContentCard>
                                <div className='text-[11px] font-semibold text-fun-blue-500 uppercase tracking-widest mb-4'>Symptoms Needing Evaluation</div>
                                <TipList items={PROSTATE_HEALTH.symptoms} />
                            </ContentCard>
                            <ContentCard>
                                <div className='text-[11px] font-semibold text-fun-blue-500 uppercase tracking-widest mb-4'>Healthy Prostate Tips</div>
                                <TipList items={PROSTATE_HEALTH.tips} />
                            </ContentCard>
                        </div>
                        <div className='rounded-2xl bg-fun-blue-950 px-6 py-5 flex items-center gap-4'>
                            <ShieldCheck size={20} className='text-fun-blue-400 shrink-0' />
                            <p className='text-fun-blue-100 text-[13px] font-medium'>{PROSTATE_HEALTH.keyMessage}</p>
                        </div>
                    </div>
                </Wrapper>
            </Section>

            <Section id='uti' className='bg-white scroll-mt-24'>
                <Wrapper>
                    <SectionHeader eyebrow='Section 4' title='Urinary Tract Infection' accent='(UTI) Awareness' body={UTI_INFO.description} />
                    <div className='flex flex-col gap-5'>
                        <TwoColCard
                            left={{ title: 'Common Symptoms', items: UTI_INFO.symptoms }}
                            right={{ title: 'Prevention Tips', items: UTI_INFO.prevention }}
                        />
                        <WarningBanner message={UTI_INFO.warning} />
                    </div>
                </Wrapper>
            </Section>

            <Section id='bladder' className='bg-fun-blue-50 scroll-mt-24'>
                <Wrapper>
                    <SectionHeader eyebrow='Section 5' title='Bladder Health &' accent='Urinary Incontinence' body={BLADDER_HEALTH.description} />
                    <TwoColCard
                        left={{ title: 'Common Causes', items: BLADDER_HEALTH.causes }}
                        right={{ title: 'Lifestyle Measures', items: BLADDER_HEALTH.lifestyle }}
                    />
                </Wrapper>
            </Section>

            <Section id='mens' className='bg-white scroll-mt-24'>
                <Wrapper>
                    <SectionHeader eyebrow='Sections 6 & 7' title="Men's & Women's" accent='Urological Health' />
                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
                        {/* Men's */}
                        <div id='mens-content'>
                            <div className='flex items-center gap-2 mb-5'>
                                <span className='text-xl'>♂️</span>
                                <h3 className='font-serif text-xl text-fun-blue-950'>Men's Health</h3>
                            </div>
                            <p className='text-fun-blue-800/60 text-[13px] leading-relaxed mb-5'>{MENS_HEALTH.description}</p>
                            <div className='flex flex-col gap-4'>
                                <ContentCard>
                                    <div className='text-[11px] font-semibold text-fun-blue-500 uppercase tracking-widest mb-3'>Common Concerns</div>
                                    <TipList items={MENS_HEALTH.concerns} />
                                </ContentCard>
                                <ContentCard>
                                    <div className='text-[11px] font-semibold text-fun-blue-500 uppercase tracking-widest mb-3'>Lifestyle Factors Affecting Sexual Health</div>
                                    <TipList items={MENS_HEALTH.lifestyleFactors} />
                                </ContentCard>
                            </div>
                        </div>
                        {/* Women's */}
                        <div id='womens'>
                            <div className='flex items-center gap-2 mb-5'>
                                <span className='text-xl'>♀️</span>
                                <h3 className='font-serif text-xl text-fun-blue-950'>Women's Health</h3>
                            </div>
                            <p className='text-fun-blue-800/60 text-[13px] leading-relaxed mb-5'>{WOMENS_HEALTH.description}</p>
                            <div className='flex flex-col gap-4'>
                                <ContentCard>
                                    <div className='text-[11px] font-semibold text-fun-blue-500 uppercase tracking-widest mb-3'>Common Conditions</div>
                                    <PillList items={WOMENS_HEALTH.conditions} />
                                </ContentCard>
                                <ContentCard>
                                    <div className='text-[11px] font-semibold text-fun-blue-500 uppercase tracking-widest mb-3'>Important Advice</div>
                                    <TipList items={WOMENS_HEALTH.advice} />
                                </ContentCard>
                            </div>
                        </div>
                    </div>
                </Wrapper>
            </Section>

            <Section id='children' className='bg-fun-blue-50 scroll-mt-24'>
                <Wrapper>
                    <SectionHeader eyebrow='Section 8' title="Children's" accent='Urological Health' />
                    <TwoColCard
                        left={{ title: 'Common Conditions', items: CHILDRENS_HEALTH.conditions }}
                        right={{ title: 'Advice for Parents', items: CHILDRENS_HEALTH.advice }}
                    />
                </Wrapper>
            </Section>

            <Section id='cancer' className='bg-white scroll-mt-24'>
                <Wrapper>
                    <SectionHeader eyebrow='Section 9' title='Urological Cancer' accent='Awareness' />
                    <div className='flex flex-col gap-6'>
                        <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
                            <ContentCard>
                                <div className='text-[11px] font-semibold text-fun-blue-500 uppercase tracking-widest mb-4'>Common Cancers</div>
                                <PillList items={CANCER_INFO.cancers} />
                            </ContentCard>
                            <ContentCard>
                                <div className='text-[11px] font-semibold text-red-500 uppercase tracking-widest mb-4'>Warning Signs</div>
                                <TipList items={CANCER_INFO.warningSigns} />
                            </ContentCard>
                            <ContentCard>
                                <div className='text-[11px] font-semibold text-emerald-600 uppercase tracking-widest mb-4'>Prevention Strategies</div>
                                <TipList items={CANCER_INFO.prevention} />
                            </ContentCard>
                        </div>
                        <div className='rounded-2xl bg-fun-blue-950 px-6 py-5 flex items-center gap-4'>
                            <ShieldCheck size={20} className='text-emerald-400 shrink-0' />
                            <p className='text-fun-blue-100 text-[13px] font-medium'>{CANCER_INFO.keyMessage}</p>
                        </div>
                    </div>
                </Wrapper>
            </Section>

            <Section id='screening' className='bg-fun-blue-50 scroll-mt-24'>
                <Wrapper>
                    <SectionHeader
                        eyebrow='Section 10'
                        title='Preventive'
                        accent='Health Check-ups'
                        body='Regular health check-ups can detect disease early. These are the recommended areas of monitoring.'
                    />
                    <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4'>
                        {PREVENTIVE_CHECKS.map((check, i) => (
                            <motion.div
                                key={check}
                                initial={{ opacity: 0, y: 16 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: i * 0.07 }}
                                className='flex flex-col items-center text-center gap-3 p-5 rounded-2xl border border-fun-blue-100 bg-white'
                            >
                                <div className='w-10 h-10 rounded-xl bg-fun-blue-50 border border-fun-blue-100 flex items-center justify-center'>
                                    <ShieldCheck size={16} className='text-fun-blue-500' />
                                </div>
                                <span className='text-[12px] font-medium text-fun-blue-900 leading-snug'>{check}</span>
                            </motion.div>
                        ))}
                    </div>

                    {/* NZUSI CTA */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className='mt-10 rounded-2xl bg-fun-blue-950 p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6'
                    >
                        <div>
                            <p className='font-serif text-xl text-white mb-2'>Find a Urologist in North Zone</p>
                            <p className='text-fun-blue-400 text-[13px] leading-relaxed max-w-md'>
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

            <Section id='faqs' className='bg-white scroll-mt-24'>
                <Wrapper>
                    <SectionHeader
                        eyebrow='Section 11'
                        title='Frequently Asked'
                        accent='Questions'
                        body='44 questions answered by NZUSI urologists covering all common urological concerns.'
                    />

                    {/* Category filter */}
                    <div className='flex flex-wrap gap-2 mb-8'>
                        {FAQ_CATEGORIES.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setFaqFilter(cat)}
                                className={`text-[11px] font-semibold px-3 py-1.5 rounded-full border transition-all duration-200 cursor-pointer ${faqFilter === cat
                                        ? 'bg-fun-blue-950 text-white border-fun-blue-950'
                                        : 'text-fun-blue-600/60 border-fun-blue-200 hover:border-fun-blue-300 hover:text-fun-blue-700'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    <AnimatePresence mode='popLayout'>
                        <motion.div
                            key={faqFilter}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className='flex flex-col gap-2'
                        >
                            {filteredFAQs.map((faq, i) => (
                                <FAQItem key={faq.id} faq={faq} index={i} />
                            ))}
                        </motion.div>
                    </AnimatePresence>

                    <div className='text-center mt-6 text-[12px] text-fun-blue-400/50'>
                        Showing {filteredFAQs.length} of {FAQS.length} questions
                    </div>
                </Wrapper>
            </Section>

            <Section className='bg-fun-blue-50'>
                <Wrapper>
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className='flex items-start gap-3 px-5 py-4 rounded-xl bg-zinc-50 border border-zinc-100'
                    >
                        <AlertCircle size={13} className='text-zinc-400 mt-0.5 shrink-0' />
                        <div>
                            <p className='text-zinc-600 text-[12px] font-semibold mb-1'>Medical Disclaimer</p>
                            <p className='text-zinc-500 text-[12px] leading-relaxed'>
                                The information provided on this page is intended for public education and awareness only. It should not replace professional medical consultation, diagnosis, or treatment. Please consult a qualified healthcare professional for personalised medical advice.
                            </p>
                        </div>
                    </motion.div>
                </Wrapper>
            </Section>
        </main>
    )
}