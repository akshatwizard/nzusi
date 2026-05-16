'use client'

import { motion } from 'motion/react'
import {
    CalendarDays,
    FileText,
    ShieldAlert,
    ImageIcon,
    Video,
    ClipboardList,
    Users,
    CheckCircle2,
    AlertCircle,
    BookOpen,
    Microscope,
    ArrowRight
} from 'lucide-react'
import { Section, Wrapper } from '@/components/ui/sections'
import { IMPORTANT_DATES, ABSTRACT_STRUCTURE, VIDEO_GUIDELINES, SCIENTIFIC_CATEGORIES, PRESENTATION_CATEGORIES, POSTER_GUIDELINES, IMPORTANT_NOTES } from '@/constant/abstracts'


function SectionHeader({ icon: Icon, title, description }: { icon: any, title: string, description: string }) {
    return (
        <div className="flex md:flex-row flex-col items-start gap-4">

            <div className="w-12 h-12 rounded-2xl bg-fun-blue-100 flex items-center justify-center shrink-0">
                <Icon
                    size={20}
                    className="text-fun-blue-700"
                />
            </div>

            <div className="flex flex-col gap-2">
                <h2 className="md:text-3xl text-2xl text-fun-blue-950 leading-tight">
                    {title}
                </h2>

                <p className="text-fun-blue-900/60 text-sm leading-relaxed max-w-2xl">
                    {description}
                </p>
            </div>

        </div>
    )
}

export default function AbstractGuidelinesPage() {
    return (
        <main className="bg-fun-blue-50 overflow-hidden">
            <Section className="bg-fun-blue-950 relative">
                <div
                    className='absolute inset-0 opacity-[0.03] pointer-events-none'
                    style={{
                        backgroundImage: `linear-gradient(rgba(255,255,255,.8) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.8) 1px,transparent 1px)`,
                        backgroundSize: '36px 36px',
                    }}
                />
                <Wrapper className="lg:pt-40 pt-36 md:pt-38">

                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="max-w-5xl flex flex-col gap-6"
                    >

                        <div className="flex items-center gap-3">
                            <div className="w-10 h-px bg-fun-blue-400" />

                            <span className="uppercase tracking-[0.25em] text-xs font-semibold text-fun-blue-300">
                                NZUSICON 2026
                            </span>
                        </div>

                        <div className="flex flex-col gap-4">

                            <h1 className="text-4xl md:text-6xl text-white leading-tight">
                                Abstract Submission Guidelines
                            </h1>

                            <p className="text-fun-blue-100 text-sm md:text-base leading-relaxed max-w-3xl">
                                Official scientific abstract submission guidelines for NZUSICON 2026.
                                Please read all instructions carefully before submitting abstracts,
                                podium papers, videos, or e-posters.
                            </p>

                        </div>

                        <div className="flex flex-wrap gap-3 pt-2">

                            <button className="inline-flex items-center gap-2 px-5 py-3 bg-white text-fun-blue-950 rounded-2xl font-semibold text-sm hover:bg-fun-blue-100 transition-colors">
                                Submit Abstract
                                <ArrowRight size={15} />
                            </button>

                            <button className="inline-flex items-center gap-2 px-5 py-3 border border-fun-blue-700 text-fun-blue-200 rounded-2xl font-semibold text-sm hover:border-fun-blue-500 transition-colors">
                                Download PDF
                            </button>

                        </div>

                    </motion.div>

                </Wrapper>
            </Section>

            {/* IMPORTANT DATES */}
            <Section>
                <Wrapper className="gap-8">

                    <SectionHeader
                        icon={CalendarDays}
                        title="Important Dates"
                        description="Please ensure all submissions are completed before the deadlines mentioned below."
                    />

                    <div className="grid md:grid-cols-3 gap-4">

                        {IMPORTANT_DATES.map((item, index) => (
                            <motion.div
                                key={item.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="relative bg-white rounded-2xl border border-fun-blue-100 p-5 overflow-hidden"
                            >

                                {/* Accent */}
                                <div className={`absolute top-0 left-0 w-full h-1 ${item.border}`} />

                                <div className="flex flex-col gap-4">

                                    <div className={`w-11 h-11 rounded-xl ${item.bg} flex items-center justify-center`}>
                                        <CalendarDays
                                            size={18}
                                            className={item.color}
                                        />
                                    </div>

                                    <div className="flex flex-col gap-1">
                                        <p className="text-[11px] uppercase tracking-[0.2em] text-zinc-400 font-semibold">
                                            {item.title}
                                        </p>

                                        <h3 className={`text-2xl font-semibold ${item.color}`}>
                                            {item.date}
                                        </h3>
                                    </div>

                                </div>

                            </motion.div>
                        ))}

                    </div>

                </Wrapper>
            </Section>

            {/* PRE REGISTRATION */}
            <Section className="bg-white">
                <Wrapper className="max-w-5xl gap-14">

                    <div className="flex flex-col gap-8">

                        <SectionHeader
                            icon={ClipboardList}
                            title="Pre-registration & Submission"
                            description="All abstracts must be submitted through the official NZUSI submission portal."
                        />

                        <div className="flex flex-col gap-4 lg:pl-16 md:pl-8 pl-0">

                            <div className="relative bg-fun-blue-50 border border-fun-blue-100 rounded-2xl px-5 py-4">

                                <div className="absolute left-0 top-0 h-full w-1 bg-fun-blue-500 rounded-l-2xl" />

                                <p className="text-[15px] leading-7 text-fun-blue-900/80">
                                    Pre-registration is mandatory for the conference.
                                    Presenting authors should register for the conference;
                                    else the abstract submission shall not be completed
                                    on the NZUSI website.
                                </p>

                            </div>

                            <div className="relative bg-white border border-fun-blue-100 rounded-2xl px-5 py-4">

                                <div className="absolute left-0 top-0 h-full w-1 bg-emerald-500 rounded-l-2xl" />

                                <p className="text-[15px] leading-7 text-fun-blue-900/80">
                                    The abstracts should be uploaded online through the
                                    official NZUSI website.
                                </p>

                            </div>

                            <div className="relative bg-white border border-fun-blue-100 rounded-2xl px-5 py-4">

                                <div className="absolute left-0 top-0 h-full w-1 bg-red-500 rounded-l-2xl" />

                                <p className="text-[15px] leading-7 text-fun-blue-900/80">
                                    Abstracts will not be accepted on emails or through any other mode.
                                </p>

                            </div>

                        </div>

                    </div>

                    {/* PRESENTATION CATEGORY */}
                    <div className="flex flex-col gap-8">

                        <SectionHeader
                            icon={BookOpen}
                            title="Presentation Categories"
                            description="One abstract can be submitted under only one presentation category."
                        />

                        <div className="grid md:grid-cols-2 gap-3 lg:pl-16 md:pl-8 pl-0">

                            {PRESENTATION_CATEGORIES.map((item) => (
                                <div
                                    key={item}
                                    className="group flex items-start gap-3 bg-white border border-fun-blue-100 rounded-2xl px-4 py-4 hover:border-fun-blue-300 transition-colors"
                                >

                                    <div className="w-7 h-7 rounded-full bg-fun-blue-100 flex items-center justify-center shrink-0 mt-0.5">
                                        <div className="w-2 h-2 rounded-full bg-fun-blue-600" />
                                    </div>

                                    <p className="text-sm leading-6 text-fun-blue-900">
                                        {item}
                                    </p>

                                </div>
                            ))}

                        </div>

                    </div>

                    {/* SCIENTIFIC CATEGORY */}
                    <div className="flex flex-col gap-8">

                        <SectionHeader
                            icon={Microscope}
                            title="Scientific Categories"
                            description="Choose only one scientific category while submitting your abstract."
                        />

                        <div className="grid md:grid-cols-2 gap-3 lg:pl-16 md:pl-8 pl-0">

                            {SCIENTIFIC_CATEGORIES.map((item) => (
                                <div
                                    key={item}
                                    className="group flex items-center gap-3 bg-white border border-fun-blue-100 rounded-xl px-4 py-3 hover:border-fun-blue-300 transition-colors"
                                >

                                    <div className="w-7 h-7 rounded-full bg-fun-blue-100 flex items-center justify-center shrink-0">
                                        <CheckCircle2
                                            size={14}
                                            className="text-fun-blue-600"
                                        />
                                    </div>

                                    <p className="text-sm text-fun-blue-900">
                                        {item}
                                    </p>

                                </div>
                            ))}

                        </div>

                    </div>

                    {/* WORD COUNT */}
                    <div className="flex flex-col gap-8">

                        <SectionHeader
                            icon={FileText}
                            title="Word Count & Formatting"
                            description="Please follow all abstract formatting requirements carefully."
                        />

                        <div className="flex flex-col gap-4 lg:pl-16 md:pl-8 pl-0">

                            <div className="relative bg-white border border-fun-blue-100 rounded-2xl px-5 py-4">

                                <div className="absolute left-0 top-0 h-full w-1 bg-fun-blue-500 rounded-l-2xl" />

                                <p className="text-[15px] leading-7 text-fun-blue-900/80">
                                    Submit informative abstracts up to
                                    <span className="font-semibold text-fun-blue-950">
                                        {' '}300 words
                                    </span>,
                                    excluding the title of the abstract, author affiliations
                                    and other headings.
                                </p>

                            </div>

                            <div className="relative bg-white border border-fun-blue-100 rounded-2xl px-5 py-4">

                                <div className="absolute left-0 top-0 h-full w-1 bg-amber-500 rounded-l-2xl" />

                                <p className="text-[15px] leading-7 text-fun-blue-900/80">
                                    The abstract may include a maximum of one image,
                                    equivalent of 50 words deducted from the abstract body.
                                </p>

                            </div>

                            <div className="relative bg-white border border-fun-blue-100 rounded-2xl px-5 py-4">

                                <div className="absolute left-0 top-0 h-full w-1 bg-emerald-500 rounded-l-2xl" />

                                <p className="text-[15px] leading-7 text-fun-blue-900/80">
                                    Videos can be shared via YouTube, Dropbox or Google Drive.
                                    The link should be included during abstract submission.
                                </p>

                            </div>

                        </div>

                    </div>

                    {/* AUTHORS */}
                    <div className="flex flex-col gap-8">

                        <SectionHeader
                            icon={Users}
                            title="Authors & Affiliations"
                            description="Please ensure all author details are correctly entered during submission."
                        />

                        <div className="grid gap-4 lg:pl-16 md:pl-8 pl-0">

                            {[
                                'The corresponding author will receive all official communication.',
                                'Presenting author details should be entered in the provided fields.',
                                'Up to 6 co-authors can be added through the portal.',
                                'Affiliations must be mentioned for each author.'
                            ].map((item, index) => (
                                <div
                                    key={item}
                                    className="flex items-start gap-4 bg-white border border-fun-blue-100 rounded-2xl p-5"
                                >

                                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${index % 2 === 0
                                        ? 'bg-fun-blue-100'
                                        : 'bg-amber-100'
                                        }`}>
                                        <Users
                                            size={16}
                                            className={index % 2 === 0
                                                ? 'text-fun-blue-700'
                                                : 'text-amber-700'
                                            }
                                        />
                                    </div>

                                    <p className="text-[15px] leading-7 text-fun-blue-900/80">
                                        {item}
                                    </p>

                                </div>
                            ))}

                        </div>

                    </div>

                    {/* ABSTRACT STRUCTURE */}
                    <div className="flex flex-col gap-8">

                        <SectionHeader
                            icon={ClipboardList}
                            title="Abstract Structure"
                            description="Abstracts should be submitted under the following structured headings."
                        />

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:pl-16 md:pl-8 pl-0">

                            {ABSTRACT_STRUCTURE.map((item) => (
                                <div
                                    key={item}
                                    className="bg-fun-blue-950 rounded-2xl px-5 py-5 flex flex-col items-center justify-center text-center"
                                >

                                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mb-3">
                                        <CheckCircle2
                                            size={18}
                                            className="text-fun-blue-300"
                                        />
                                    </div>

                                    <p className="text-white font-medium">
                                        {item}
                                    </p>

                                </div>
                            ))}

                        </div>

                    </div>

                    {/* IMPORTANT NOTES */}
                    <div className="bg-red-50 border border-red-100 rounded-3xl lg:p-8 md:p-5 p-3 flex flex-col gap-6">

                        <div className="flex md:items-center gap-4 md:flex-row flex-col">

                            <div className="w-12 h-12 shrink-0 rounded-2xl bg-red-100 flex items-center justify-center">
                                <ShieldAlert
                                    size={20}
                                    className="text-red-600"
                                />
                            </div>

                            <div>
                                <h2 className="text-3xl text-fun-blue-950">
                                    Important Notes
                                </h2>

                                <p className="text-sm text-fun-blue-900/60 mt-1">
                                    Please carefully review all conference policies before submission.
                                </p>
                            </div>

                        </div>

                        <div className="grid gap-3">

                            {IMPORTANT_NOTES.map((item) => (
                                <div
                                    key={item}
                                    className="flex items-start gap-3 bg-white rounded-2xl px-4 py-4 border border-red-100"
                                >

                                    <div className="w-7 h-7 rounded-full bg-red-100 flex items-center justify-center mt-0.5 shrink-0">
                                        <AlertCircle
                                            size={14}
                                            className="text-red-600"
                                        />
                                    </div>

                                    <p className="text-[15px] leading-7 text-fun-blue-900/80">
                                        {item}
                                    </p>

                                </div>
                            ))}

                        </div>

                    </div>

                    {/* E POSTER */}
                    <div className="flex flex-col gap-8">

                        <SectionHeader
                            icon={ImageIcon}
                            title="e-Poster Making Guidelines"
                            description="Please follow all e-poster specifications and formatting requirements."
                        />

                        <div className="grid md:grid-cols-2 gap-4 lg:pl-16 md:pl-8 pl-0">

                            {POSTER_GUIDELINES.map((item, index) => (
                                <div
                                    key={item}
                                    className="flex items-start gap-4 bg-white border border-fun-blue-100 rounded-2xl p-5"
                                >

                                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${index % 2 === 0
                                        ? 'bg-fun-blue-100'
                                        : 'bg-emerald-100'
                                        }`}>
                                        <ImageIcon
                                            size={16}
                                            className={index % 2 === 0
                                                ? 'text-fun-blue-700'
                                                : 'text-emerald-700'
                                            }
                                        />
                                    </div>

                                    <p className="text-[15px] leading-7 text-fun-blue-900/80">
                                        {item}
                                    </p>

                                </div>
                            ))}

                        </div>

                    </div>

                    {/* VIDEO */}
                    <div className="flex flex-col gap-8">

                        <SectionHeader
                            icon={Video}
                            title="Video Making Guidelines"
                            description="All submitted videos should follow the technical and presentation specifications."
                        />

                        <div className="grid md:grid-cols-2 gap-4 lg:pl-16 md:pl-8 pl-0">

                            {VIDEO_GUIDELINES.map((item, index) => (
                                <div
                                    key={item}
                                    className="flex items-start gap-4 bg-white border border-fun-blue-100 rounded-2xl p-5"
                                >

                                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${index % 2 === 0
                                        ? 'bg-purple-100'
                                        : 'bg-fun-blue-100'
                                        }`}>
                                        <Video
                                            size={16}
                                            className={index % 2 === 0
                                                ? 'text-purple-700'
                                                : 'text-fun-blue-700'
                                            }
                                        />
                                    </div>

                                    <p className="text-[15px] leading-7 text-fun-blue-900/80">
                                        {item}
                                    </p>

                                </div>
                            ))}

                        </div>

                    </div>

                </Wrapper>
            </Section>

        </main>
    )
}