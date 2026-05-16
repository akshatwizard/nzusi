'use client'

import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'motion/react'
import { Section, Wrapper } from '@/components/ui/sections'
import { FileText, Download, ArrowRight } from 'lucide-react'
import RegisterModal from './abstracts_reg_modal'
import { CATEGORIES } from '@/constant/abstracts'

function CategoryCard({ cat, index, isInView }: {
    cat: typeof CATEGORIES[number]; index: number; isInView: boolean
}) {
    const Icon = cat.icon
    return (
        <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.1 + index * 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="group relative bg-white rounded-2xl border border-zinc-200 p-6 hover:border-fun-blue-200 hover:shadow-lg hover:shadow-fun-blue-50 transition-all duration-300 flex flex-col gap-5"
        >
            {/* Top accent line */}
            <div className="absolute inset-x-0 top-0 h-0.5 rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: `linear-gradient(to right, transparent, ${cat.accent}, transparent)` }} />

            <div className="flex items-start justify-between">
                <div className={`w-11 h-11 rounded-xl ${cat.iconBg} flex items-center justify-center`}>
                    <Icon size={20} className={cat.iconColor} />
                </div>
                <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${cat.color}`}>
                        {cat.code}
                    </span>
                    <span className="text-[11px] font-bold text-zinc-300 tabular-nums">{String(cat.count).padStart(2, '0')}</span>
                </div>
            </div>

            <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-1">{cat.longLabel}</p>
                <h3 className="font-bold text-fun-blue-950 text-lg mb-2">{cat.label} Abstracts</h3>
                <p className="text-zinc-500 text-[13px] leading-relaxed">{cat.description}</p>
            </div>

            {/* Topic pills */}
            <div className="flex flex-wrap gap-1.5">
                {cat.highlights.map(h => (
                    <span key={h} className="text-[10px] px-2 py-0.5 rounded-full bg-zinc-100 text-zinc-500 border border-zinc-200">
                        {h}
                    </span>
                ))}
            </div>

            {/* Download */}
            <a
                href={cat.downloadUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`mt-auto flex items-center justify-between px-4 py-2.5 rounded-xl border text-sm font-semibold transition-all duration-200 ${cat.color} hover:opacity-80`}
            >
                <span>Download Book</span>
                <Download size={13} />
            </a>
        </motion.div>
    )
}

export default function AbstractsSection() {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: '-80px' })
    const [modalOpen, setModalOpen] = useState(false)

    const totalAbstracts = CATEGORIES.reduce((s, c) => s + c.count, 0)

    return (
        <>
            <Section className="bg-[#F7F6F2]">
                <Wrapper>
                    <div ref={ref} className="w-full flex flex-col gap-12">

                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                            <motion.div
                                initial={{ opacity: 0, y: 24 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                            >
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-6 h-px bg-fun-blue-400" />
                                    <span className="text-xs font-semibold tracking-[0.2em] uppercase text-fun-blue-500">
                                        NZUSICON 2025
                                    </span>
                                </div>
                                <h2 className="text-4xl md:text-5xl text-fun-blue-950 leading-tight">
                                    Scientific <em className="not-italic text-fun-blue-400">Abstracts</em>
                                </h2>
                                <p className="text-zinc-500 text-sm leading-relaxed mt-3 max-w-lg">
                                    Browse all {totalAbstracts} peer-reviewed abstracts presented at NZUSICON 2025 across four presentation formats — from best video sessions to e-poster exhibitions.
                                </p>
                            </motion.div>

                            {/* Stat + CTA */}
                            <motion.div
                                initial={{ opacity: 0, y: 16 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                className="flex flex-col sm:flex-row gap-3 items-start sm:items-center"
                            >
                                <div className="flex items-center gap-4 px-5 py-3 bg-white rounded-2xl border border-zinc-200 shadow-sm">
                                    {CATEGORIES.map((c, i) => (
                                        <div key={c.id} className="flex flex-col items-center">
                                            <span className="text-xl font-bold text-fun-blue-950 tabular-nums">{c.count}</span>
                                            <span className="text-[10px] text-zinc-400 font-medium">{c.label}</span>
                                        </div>
                                    ))}
                                </div>

                                <button
                                    onClick={() => setModalOpen(true)}
                                    className="group inline-flex items-center gap-2.5 px-6 py-3 bg-fun-blue-950 text-white rounded-2xl font-semibold text-sm hover:bg-fun-blue-800 transition-colors duration-200 whitespace-nowrap"
                                >
                                    Submit Abstract
                                    <span className="w-5 h-5 rounded-full bg-white/15 flex items-center justify-center group-hover:bg-white/25 transition-colors">
                                        <ArrowRight size={11} />
                                    </span>
                                </button>
                            </motion.div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                            {CATEGORIES.map((cat, i) => (
                                <CategoryCard key={cat.id} cat={cat} index={i} isInView={isInView} />
                            ))}
                        </div>

                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5, delay: 0.6 }}
                            className="rounded-2xl bg-fun-blue-950 px-7 py-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-5"
                        >
                            <div className="flex flex-col gap-1">
                                <p className="text-white font-semibold text-sm">Submitting for NZUSICON 2026?</p>
                                <p className="text-fun-blue-400 text-xs leading-relaxed max-w-md">
                                    Abstract submissions for NZUSICON 2026, Amritsar (Nov 27–29) are now open. All formats welcome — video, podium, poster, and e-poster.
                                </p>
                            </div>
                            <div className="flex flex-wrap gap-3 shrink-0">
                                <a
                                    href="mailto:nzusioffice@gmail.com"
                                    className="inline-flex items-center gap-2 px-5 py-2.5 border border-fun-blue-700 text-fun-blue-300 rounded-xl font-semibold text-xs hover:border-fun-blue-500 transition-colors"
                                >
                                    <FileText size={12} />
                                    Guidelines
                                </a>
                                <button
                                    onClick={() => setModalOpen(true)}
                                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-fun-blue-100 text-fun-blue-900 rounded-xl font-semibold text-xs hover:bg-white transition-colors"
                                >
                                    Submit Now <ArrowRight size={12} />
                                </button>
                            </div>
                        </motion.div>
                    </div>
                </Wrapper>
            </Section>

            <AnimatePresence>
                {modalOpen && <RegisterModal onClose={() => setModalOpen(false)} />}
            </AnimatePresence>
        </>
    )
}