'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'motion/react'
import { Section, Wrapper } from '@/components/ui/sections'
import {
    Calendar, AlertCircle, FileText, Video,
    LayoutGrid, BookOpen, Users, CheckCircle2,
    ArrowRight, Mail, Monitor, Mic, ChevronRight,
    Info, Clock, Award
} from 'lucide-react'
import Link from 'next/link'

/* ─── Nav categories ─────────────────────────────────────────── */
const NAV_ITEMS = [
    { id: 'dates', label: 'Important Dates', icon: Calendar },
    { id: 'categories', label: 'Categories', icon: LayoutGrid },
    { id: 'word-count', label: 'Word Count', icon: FileText },
    { id: 'authors', label: 'Authors', icon: Users },
    { id: 'structure', label: 'Abstract Structure', icon: BookOpen },
    { id: 'conflict', label: 'Conflict of Interest', icon: AlertCircle },
    { id: 'notes', label: 'Important Notes', icon: Info },
    { id: 'eposter', label: 'e-Poster Guidelines', icon: Monitor },
    { id: 'video', label: 'Video Guidelines', icon: Video },
]

/* ─── Data ─────────────────────────────────────────────────────── */
const IMPORTANT_DATES = [
    { date: '31st May 2026', label: 'Submission Opens', icon: '🟢', color: 'border-emerald-200 bg-emerald-50 text-emerald-700', dot: 'bg-emerald-500' },
    { date: '15th Aug 2026', label: 'Submission Closes', icon: '🔴', color: 'border-red-200 bg-red-50 text-red-700', dot: 'bg-red-500' },
    { date: '31st Aug 2026', label: 'Acceptance Notification', icon: '📬', color: 'border-fun-blue-200 bg-fun-blue-50 text-fun-blue-700', dot: 'bg-fun-blue-500' },
    { date: '15th Oct 2026', label: 'Withdrawal Deadline', icon: '⚠️', color: 'border-amber-200 bg-amber-50 text-amber-700', dot: 'bg-amber-500' },
]

const COMPETITION_CATEGORIES = [
    { name: 'Marudhara Jodhpur Urology Trust Best Paper Session', code: 'BP', badge: 'Competition', badgeColor: 'bg-violet-50 text-violet-700 border border-violet-200' },
    { name: 'Agra Urological Best Video Session 1 — Robotic Urology Videos', code: 'BV1', badge: 'Competition', badgeColor: 'bg-violet-50 text-violet-700 border border-violet-200' },
    { name: 'Agra Urological Best Video Session 2 — Non-Robotic Urology Videos', code: 'BV2', badge: 'Competition', badgeColor: 'bg-violet-50 text-violet-700 border border-violet-200' },
    { name: 'CMC Ludhiana Best Poster Session', code: 'BPos', badge: 'Competition', badgeColor: 'bg-violet-50 text-violet-700 border border-violet-200' },
]

const OPEN_CATEGORIES = [
    { name: 'Moderated Podium Session', code: 'Pod', badge: 'Open', badgeColor: 'bg-fun-blue-50 text-fun-blue-700 border border-fun-blue-200' },
    { name: 'Moderated Video Session', code: 'Vid', badge: 'Open', badgeColor: 'bg-fun-blue-50 text-fun-blue-700 border border-fun-blue-200' },
    { name: 'Moderated Poster Session', code: 'Pos', badge: 'Open', badgeColor: 'bg-fun-blue-50 text-fun-blue-700 border border-fun-blue-200' },
    { name: 'Un-moderated e-Poster', code: 'ePos', badge: 'Open', badgeColor: 'bg-fun-blue-50 text-fun-blue-700 border border-fun-blue-200' },
]

const SCIENTIFIC_CATEGORIES = [
    'Stones / EndoUrology', 'Oncology', 'Pediatric Urology',
    'Reconstructive Urology', 'UTI and Infections', 'Female and Functional Urology',
    'Organ Transplant', 'Andrology', 'Others',
]

const IMPORTANT_NOTES = [
    'Previously published abstracts shall be summarily rejected.',
    'Submission carries an obligation to present the accepted abstract in person without any change in scientific content during the allotted time.',
    'Withdrawal of presentation must be intimated to the scientific committee on or before 15th Oct, 2026.',
    'If the presenting author is unable to present, prior permission must be obtained from the Scientific Committee regarding change of presenting author.',
    'More than one abstract can be submitted by any individual author, except for the same prize competition category.',
    'One best poster/podium/video from each non-competition category shall be awarded with a certificate.',
    'NZUSI reserves the right to use uploaded content on its website platform for promotional/educational purposes after it has been presented at the conference.',
]

const EPOSTER_SPECS = [
    { label: 'Display', value: 'Standard 42" LCD TV (Landscape) or Poster Size' },
    { label: 'File Format', value: 'PowerPoint (.PPT / .PPTX) in 16:9 ratio' },
    { label: 'Max Slides', value: '01 (One slide only)' },
    { label: 'Max File Size', value: '5 MB' },
    { label: 'Animation', value: 'Not supported — static format only' },
    { label: 'Font', value: 'Simple fonts: Helvetica / Calibri / Tahoma — min 28pt' },
]

const VIDEO_SPECS = [
    { label: 'Originality', value: 'Must be an original production' },
    { label: 'Opening', value: 'Must include title, authors and affiliations at the beginning' },
    { label: 'Language', value: 'Speech or voice-over must be in clear English' },
    { label: 'Music', value: 'Avoid background music' },
    { label: 'Format', value: 'MP4 / H.264 preferred — min 1920×1080 resolution' },
    { label: 'Naming', value: 'nzusi_[YourName]_[VideoTitle] — e.g. nzusi_Renorrhaphy_in_partial_nephrectomy' },
    { label: 'Upload', value: 'YouTube / Dropbox / Google Drive — share link during submission and email to nzusioffice@gmail.com' },
]

/* ─── Section wrapper ─────────────────────────────────────────── */
function GuidelineSection({ id, title, eyebrow, children }: {
    id: string; title: string; eyebrow: string; children: React.ReactNode
}) {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: '-60px' })

    return (
        <motion.section
            id={id}
            ref={ref}
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="scroll-mt-28"
        >
            <div className="flex items-center gap-3 mb-2">
                <div className="h-px w-5 bg-fun-blue-300" />
                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-fun-blue-400">{eyebrow}</span>
            </div>
            <h2 className="text-2xl md:text-3xl text-fun-blue-950 mb-6 leading-snug">{title}</h2>
            {children}
        </motion.section>
    )
}

/* ─── Main page ───────────────────────────────────────────────── */
export default function AbstractGuidelinesPage() {
    const [activeSection, setActiveSection] = useState('dates')

    /* Track which section is in viewport for nav highlight */
    useEffect(() => {
        const observers: IntersectionObserver[] = []

        NAV_ITEMS.forEach(({ id }) => {
            const el = document.getElementById(id)
            if (!el) return
            const obs = new IntersectionObserver(
                ([entry]) => { if (entry.isIntersecting) setActiveSection(id) },
                { rootMargin: '-30% 0px -60% 0px' }
            )
            obs.observe(el)
            observers.push(obs)
        })

        return () => observers.forEach(o => o.disconnect())
    }, [])

    const scrollTo = (id: string) => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }

    return (
        <main className="w-full bg-fun-blue-50">

            {/* ── HERO ──────────────────────────────────────────────── */}
            <Section className="bg-fun-blue-950 relative overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-75 rounded-full bg-fun-blue-600/15 blur-[100px]" />
                    <div
                        className="absolute inset-0 opacity-[0.035]"
                        style={{
                            backgroundImage: 'radial-gradient(circle, #c2dcf5 1px, transparent 1px)',
                            backgroundSize: '28px 28px',
                        }}
                    />
                    <div className="absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent via-fun-blue-700/50 to-transparent" />
                </div>

                <Wrapper className="relative z-10 lg:pt-44 md:pt-40 pt-38">
                    <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10">
                        <div className="max-w-2xl">
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 mb-6">
                                <FileText size={11} className="text-fun-blue-300" />
                                <span className="text-fun-blue-200 text-[11px] font-semibold tracking-widest uppercase">
                                    Abstract Submission · NZUSICON 2026
                                </span>
                            </div>

                            <h1 className="text-4xl md:text-5xl lg:text-6xl text-white leading-[1.05] mb-5">
                                Submission <em className="not-italic text-fun-blue-300">Guidelines</em>
                            </h1>
                            <p className="text-fun-blue-300/80 text-sm leading-relaxed max-w-lg">
                                Complete guidelines for abstract submission to NZUSICON 2026, Amritsar (Nov 27–29). Read all sections carefully before submitting. Pre-registration is mandatory.
                            </p>
                        </div>

                        {/* Key dates snapshot */}
                        <div className="flex flex-col gap-2.5 shrink-0">
                            <p className="text-fun-blue-500 text-[10px] font-bold uppercase tracking-widest">Key Dates</p>
                            {IMPORTANT_DATES.slice(0, 3).map(d => (
                                <div key={d.label} className="flex items-center gap-3 px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl">
                                    <span className={`w-2 h-2 rounded-full shrink-0 ${d.dot}`} />
                                    <div>
                                        <p className="text-white text-[12px] font-semibold">{d.date}</p>
                                        <p className="text-fun-blue-400 text-[11px]">{d.label}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Quick nav pills */}
                    <div className="flex flex-wrap gap-2 mt-10">
                        {NAV_ITEMS.map(({ id, label, icon: Icon }) => (
                            <button
                                key={id}
                                onClick={() => scrollTo(id)}
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/8 border border-white/10 text-fun-blue-300 text-[11px] font-medium hover:bg-white/15 hover:text-white transition-all"
                            >
                                <Icon size={10} />
                                {label}
                            </button>
                        ))}
                    </div>
                </Wrapper>
            </Section>

            {/* ── BODY ──────────────────────────────────────────────── */}
            <div className="w-full max-w-7xl mx-auto px-4 md:px-8 lg:px-12 py-14">
                <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-10 items-start">

                    {/* ── Sticky sidebar nav ──────────────────────── */}
                    <aside className="lg:sticky lg:top-24 hidden lg:block">
                        <div className="rounded-2xl border border-fun-blue-100 bg-white p-4">
                            <p className="text-[10px] font-bold uppercase tracking-widest text-fun-blue-400 mb-3 px-2">
                                Contents
                            </p>
                            <nav className="flex flex-col gap-0.5">
                                {NAV_ITEMS.map(({ id, label, icon: Icon }) => {
                                    const isActive = activeSection === id
                                    return (
                                        <button
                                            key={id}
                                            onClick={() => scrollTo(id)}
                                            className={`group relative w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-left text-[12px] font-medium transition-all duration-150 cursor-pointer ${isActive
                                                ? 'bg-fun-blue-600 text-white'
                                                : 'text-fun-blue-700 hover:bg-fun-blue-50 hover:text-fun-blue-900'
                                                }`}
                                        >
                                            <Icon size={12} className={isActive ? 'text-fun-blue-200' : 'text-fun-blue-400'} />
                                            <span className="flex-1 leading-tight">{label}</span>
                                            {isActive && <ChevronRight size={11} className="text-white/60" />}
                                        </button>
                                    )
                                })}
                            </nav>

                            {/* Submit CTA */}
                            <div className="mt-4 pt-4 border-t border-fun-blue-100">
                                <Link
                                    href="/abstracts/submit"
                                    className="flex items-center justify-center gap-2 w-full py-2.5 bg-fun-blue-950 text-white rounded-xl text-xs font-semibold hover:bg-fun-blue-800 transition-colors"
                                >
                                    Submit Abstract <ArrowRight size={11} />
                                </Link>
                            </div>
                        </div>
                    </aside>

                    {/* ── Content ─────────────────────────────────── */}
                    <div className="flex flex-col gap-14">

                        {/* ① Important Dates */}
                        <GuidelineSection id="dates" eyebrow="Timeline" title="Important Dates">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {IMPORTANT_DATES.map((d, i) => (
                                    <div key={i} className={`flex items-start gap-4 p-5 rounded-2xl border ${d.color}`}>
                                        <Calendar size={18} className="shrink-0 mt-0.5" />
                                        <div>
                                            <p className="font-bold text-sm">{d.date}</p>
                                            <p className="text-[12px] opacity-80 mt-0.5">{d.label}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-5 p-4 rounded-xl border border-amber-200 bg-amber-50 flex items-start gap-3">
                                <AlertCircle size={15} className="text-amber-600 shrink-0 mt-0.5" />
                                <p className="text-amber-800 text-[13px] leading-relaxed">
                                    <strong>Pre-registration is mandatory.</strong> Presenting authors must register for the conference; else the abstract submission shall not be completed on the NZUSI website. Abstracts will not be accepted on emails or through any other mode.
                                </p>
                            </div>
                        </GuidelineSection>

                        {/* ② Categories */}
                        <GuidelineSection id="categories" eyebrow="Submission Categories" title="Presentation & Scientific Categories">
                            <p className="text-zinc-500 text-sm leading-relaxed mb-6">
                                One abstract can be submitted under only one presentation category and one scientific category. The organizing/scientific committee reserves the right to alter the presentation category based on peer review.
                            </p>

                            {/* Competition */}
                            <div className="mb-6">
                                <div className="flex items-center gap-2 mb-3">
                                    <Award size={14} className="text-violet-500" />
                                    <h3 className="text-sm font-bold text-fun-blue-950 uppercase tracking-wide">Competition Categories</h3>
                                </div>
                                <div className="flex flex-col gap-2">
                                    {COMPETITION_CATEGORIES.map((c, i) => (
                                        <div key={i} className="flex items-center gap-3 px-4 py-3 rounded-xl border border-zinc-200 bg-white">
                                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-violet-50 text-violet-700 border border-violet-200 shrink-0 tabular-nums">
                                                {c.code}
                                            </span>
                                            <span className="text-fun-blue-950 text-[13px] font-medium">{c.name}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Open */}
                            <div className="mb-8">
                                <div className="flex items-center gap-2 mb-3">
                                    <Mic size={14} className="text-fun-blue-500" />
                                    <h3 className="text-sm font-bold text-fun-blue-950 uppercase tracking-wide">Open Categories</h3>
                                </div>
                                <div className="flex flex-col gap-2">
                                    {OPEN_CATEGORIES.map((c, i) => (
                                        <div key={i} className="flex items-center gap-3 px-4 py-3 rounded-xl border border-zinc-200 bg-white">
                                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-fun-blue-50 text-fun-blue-700 border border-fun-blue-200 shrink-0 tabular-nums">
                                                {c.code}
                                            </span>
                                            <span className="text-fun-blue-950 text-[13px] font-medium">{c.name}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Scientific */}
                            <div>
                                <div className="flex items-center gap-2 mb-3">
                                    <BookOpen size={14} className="text-fun-blue-500" />
                                    <h3 className="text-sm font-bold text-fun-blue-950 uppercase tracking-wide">Scientific Categories</h3>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {SCIENTIFIC_CATEGORIES.map((c, i) => (
                                        <span key={i} className="px-3 py-1.5 rounded-full bg-white border border-fun-blue-100 text-fun-blue-700 text-[12px] font-medium">
                                            {c}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </GuidelineSection>

                        {/* ③ Word Count */}
                        <GuidelineSection id="word-count" eyebrow="Length" title="Word Count & Format">
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                                {[
                                    { val: '300', label: 'Max words', sub: 'excluding title, affiliations & subheadings' },
                                    { val: '−50', label: 'Image deduction', sub: 'per image included (max 1 image allowed)' },
                                    { val: '6', label: 'Max co-authors', sub: 'contact secretariat for more' },
                                ].map(s => (
                                    <div key={s.label} className="flex flex-col gap-1 p-5 rounded-2xl bg-white border border-fun-blue-100">
                                        <span className="text-3xl font-bold text-fun-blue-950 tabular-nums">{s.val}</span>
                                        <span className="text-sm font-semibold text-fun-blue-700">{s.label}</span>
                                        <span className="text-[12px] text-zinc-400 leading-snug">{s.sub}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="p-4 rounded-xl bg-fun-blue-50 border border-fun-blue-100 text-[13px] text-fun-blue-700 leading-relaxed">
                                The abstract may include a maximum of <strong>one image</strong> (table or graph), with 50 words deducted from the body. Videos should be shared via YouTube, Dropbox, or Google Drive — include the link during submission and email it to{' '}
                                <a href="mailto:nzusioffice@gmail.com" className="underline">nzusioffice@gmail.com</a>.
                            </div>
                        </GuidelineSection>

                        {/* ④ Authors */}
                        <GuidelineSection id="authors" eyebrow="Authorship" title="Authors & Affiliations">
                            <div className="flex flex-col gap-3">
                                {[
                                    {
                                        title: 'Corresponding / Submitting Author',
                                        body: 'The person submitting the abstract (whose email is used to create the profile) will be the single point of contact for all correspondence and communication.'
                                    },
                                    {
                                        title: 'Presenting Author',
                                        body: 'Details should be entered in the provided fields, even if the corresponding author is the same as the presenting author.'
                                    },
                                    {
                                        title: 'Co-authors',
                                        body: 'The system allows up to 6 co-authors. For more, write to the conference secretariat. Affiliations must be mentioned for each author as shown on the portal.'
                                    },
                                    {
                                        title: 'Abstract Title',
                                        body: 'Write in Sentence Case. Do not use quotation marks. The text will be used as-is wherever the abstract title is printed or mentioned.'
                                    },
                                ].map((item, i) => (
                                    <div key={i} className="flex gap-4 p-5 rounded-2xl border border-fun-blue-100 bg-white">
                                        <div className="w-7 h-7 rounded-full bg-fun-blue-100 flex items-center justify-center text-[11px] font-bold text-fun-blue-600 shrink-0">
                                            {String(i + 1).padStart(2, '0')}
                                        </div>
                                        <div>
                                            <p className="font-semibold text-fun-blue-950 text-sm mb-1">{item.title}</p>
                                            <p className="text-zinc-500 text-[13px] leading-relaxed">{item.body}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </GuidelineSection>

                        {/* ⑤ Abstract Structure */}
                        <GuidelineSection id="structure" eyebrow="Format" title="Abstract Text Structure">
                            <p className="text-zinc-500 text-sm leading-relaxed mb-5">
                                All abstracts must be structured under the following four subheadings. Incomplete abstracts will be subject to rejection. All abstracts are reviewed by the Scientific Committee and acceptance is not guaranteed.
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {[
                                    { label: 'Aims', desc: 'State the purpose or hypothesis of the study clearly and concisely.', num: '01' },
                                    { label: 'Methods', desc: 'Describe the study design, patient population, interventions, and outcome measures.', num: '02' },
                                    { label: 'Results', desc: 'Summarise the key findings with relevant data, statistics, and comparisons.', num: '03' },
                                    { label: 'Conclusions', desc: 'Interpret the significance of the results and their implications for urological practice.', num: '04' },
                                ].map(s => (
                                    <div key={s.label} className="relative p-5 rounded-2xl border border-fun-blue-100 bg-white overflow-hidden">
                                        <span className="absolute top-3 right-4 text-[32px] font-black text-fun-blue-50 tabular-nums select-none">
                                            {s.num}
                                        </span>
                                        <p className="font-bold text-fun-blue-950 text-sm mb-1.5">{s.label}</p>
                                        <p className="text-zinc-500 text-[13px] leading-relaxed relative z-10">{s.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </GuidelineSection>

                        {/* ⑥ Conflict of Interest */}
                        <GuidelineSection id="conflict" eyebrow="Ethics" title="Conflict of Interest Statement">
                            <p className="text-zinc-500 text-sm leading-relaxed mb-5">
                                If the research was supported by a commercial company, you must indicate the company's role. This statement is <strong>mandatory for all abstracts</strong> and will appear wherever abstracts are published. Use one of the following:
                            </p>
                            <div className="flex flex-col gap-2.5">
                                {[
                                    'No conflict of interest to disclose.',
                                    'This research was supported by [Company Name]. The company had no role in analyzing the data or preparing the abstract.',
                                    'This research was supported by [Company Name]. [Describe company\'s role in data analysis or abstract preparation.]',
                                ].map((text, i) => (
                                    <div key={i} className="flex items-start gap-3 p-4 rounded-xl border border-zinc-200 bg-white">
                                        <div className="w-5 h-5 rounded-full border-2 border-fun-blue-300 flex items-center justify-center shrink-0 mt-0.5">
                                            <div className="w-2 h-2 rounded-full bg-fun-blue-400" />
                                        </div>
                                        <p className="text-[13px] text-zinc-600 leading-relaxed italic">{text}</p>
                                    </div>
                                ))}
                            </div>
                        </GuidelineSection>

                        {/* ⑦ Important Notes */}
                        <GuidelineSection id="notes" eyebrow="Rules" title="Important Notes">
                            <div className="flex flex-col gap-2">
                                {IMPORTANT_NOTES.map((note, i) => (
                                    <div key={i} className="flex items-start gap-3 p-4 rounded-xl border border-zinc-200 bg-white">
                                        <CheckCircle2 size={14} className="text-fun-blue-400 shrink-0 mt-0.5" />
                                        <p className="text-[13px] text-zinc-600 leading-relaxed">{note}</p>
                                    </div>
                                ))}
                            </div>
                        </GuidelineSection>

                        {/* ⑧ e-Poster Guidelines */}
                        <GuidelineSection id="eposter" eyebrow="e-Poster" title="e-Poster Making Guidelines">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                                {EPOSTER_SPECS.map((s, i) => (
                                    <div key={i} className="flex items-start gap-3 p-4 rounded-xl border border-fun-blue-100 bg-white">
                                        <Monitor size={13} className="text-fun-blue-400 shrink-0 mt-0.5" />
                                        <div>
                                            <p className="text-[11px] font-bold uppercase tracking-wider text-fun-blue-400 mb-0.5">{s.label}</p>
                                            <p className="text-[13px] text-fun-blue-950 font-medium">{s.value}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Colour guide */}
                            <div className="p-5 rounded-2xl bg-fun-blue-50 border border-fun-blue-100">
                                <p className="text-[12px] font-bold uppercase tracking-wider text-fun-blue-500 mb-3">Colour Suggestions</p>
                                <div className="flex flex-col gap-2">
                                    {[
                                        { bg: 'Light background (white, yellow, light blue)', font: 'Dark fonts (black & navy blue)', ok: true },
                                        { bg: 'Dark background (blue & purple)', font: 'Light fonts (white or cyan)', ok: true },
                                        { bg: 'Red or green backgrounds', font: 'Avoid — difficult to read', ok: false },
                                    ].map((c, i) => (
                                        <div key={i} className={`flex items-start gap-2 text-[12px] ${c.ok ? 'text-fun-blue-700' : 'text-red-600'}`}>
                                            <span className="shrink-0 mt-0.5">{c.ok ? '✓' : '✗'}</span>
                                            <span><strong>{c.bg}</strong> → {c.font}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </GuidelineSection>

                        {/* ⑨ Video Guidelines */}
                        <GuidelineSection id="video" eyebrow="Video" title="Video Making Guidelines">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                                {VIDEO_SPECS.map((s, i) => (
                                    <div key={i} className="flex items-start gap-3 p-4 rounded-xl border border-fun-blue-100 bg-white">
                                        <Video size={13} className="text-fun-blue-400 shrink-0 mt-0.5" />
                                        <div>
                                            <p className="text-[11px] font-bold uppercase tracking-wider text-fun-blue-400 mb-0.5">{s.label}</p>
                                            <p className="text-[13px] text-fun-blue-950 font-medium">{s.value}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </GuidelineSection>

                        {/* CTA block */}
                        <div className="rounded-2xl bg-fun-blue-950 p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
                            <div>
                                <p className="text-white font-bold text-base mb-1">Ready to submit?</p>
                                <p className="text-fun-blue-400 text-sm">
                                    Submissions open 31st May 2026 via the NZUSI member portal. Pre-registration required.
                                </p>
                            </div>
                            <div className="flex flex-wrap gap-3 shrink-0">
                                <a href="mailto:nzusioffice@gmail.com"
                                    className="inline-flex items-center gap-2 px-5 py-2.5 border border-fun-blue-700 text-fun-blue-300 rounded-xl font-semibold text-xs hover:border-fun-blue-500 transition-colors">
                                    <Mail size={12} />
                                    Contact Secretariat
                                </a>
                                <Link href="/abstracts/submit"
                                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-fun-blue-100 text-fun-blue-900 rounded-xl font-bold text-xs hover:bg-white transition-colors">
                                    Submit Abstract <ArrowRight size={12} />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}