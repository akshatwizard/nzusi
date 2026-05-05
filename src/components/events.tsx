'use client'

import { Section, Wrapper } from "@/components/ui/sections"
import { motion, useInView, AnimatePresence } from "motion/react"
import { useRef, useState } from "react"
import { Calendar, MapPin, ArrowUpRight, Users, Tag, ChevronRight } from "lucide-react"
import { ALL_EVENTS } from "@/constant/events"

const FILTERS = ["All", "NZUSI", "USI"]
const CATEGORIES = ["All Categories", "Conference", "CME", "Academic", "Conclave"]

/* ─── Style maps ────────────────────────────────────────────── */
const tagStyle: Record<string, { dot: string; pill: string; text: string }> = {
    Completed: {
        dot: "bg-zinc-300",
        pill: "bg-zinc-100 text-zinc-500 border border-zinc-200",
        text: "text-zinc-400",
    },
    Upcoming: {
        dot: "bg-fun-blue-400",
        pill: "bg-fun-blue-50 text-fun-blue-600 border border-fun-blue-200",
        text: "text-fun-blue-600",
    },
    Flagship: {
        dot: "bg-amber-500 animate-pulse",
        pill: "bg-amber-50 text-amber-700 border border-amber-200",
        text: "text-amber-600",
    },
}

/** Big featured card for NZUSICON */
function FeaturedCard({ event }: { event: typeof ALL_EVENTS[number] }) {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: "-60px" })

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 32 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative rounded-3xl overflow-hidden bg-fun-blue-950 border border-fun-blue-800 group"
        >
            {/* Background texture */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-fun-blue-600/15 blur-[80px]" />
                <div
                    className="absolute inset-0 opacity-[0.04]"
                    style={{
                        backgroundImage: "radial-gradient(circle, #c2dcf5 1px, transparent 1px)",
                        backgroundSize: "28px 28px",
                    }}
                />
                {/* Amber top border */}
                <div className="absolute inset-x-0 top-0 h-0.5 bg-linear-to-r from-transparent via-amber-400 to-transparent" />
            </div>

            <div className="relative z-10 p-8 md:p-10 grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 items-center">
                {/* Left */}
                <div>
                    <div className="flex items-center gap-3 mb-5">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-400 text-xs font-bold tracking-widest uppercase">
                            <span className="w-1 h-1 rounded-full bg-amber-400 animate-pulse" />
                            Flagship · {event.type}
                        </span>
                        <span className="text-fun-blue-600 text-xs font-semibold tabular-nums">{event.index}</span>
                    </div>

                    <h3 className="text-3xl md:text-4xl text-white mb-1 leading-tight">
                        {event.title}
                    </h3>
                    <p className="text-fun-blue-400 text-sm mb-5">{event.subtitle}</p>

                    <p className="text-fun-blue-300/70 text-sm leading-relaxed mb-6 max-w-lg">
                        {event.description}
                    </p>

                    <div className="flex flex-wrap gap-4 mb-8">
                        <div className="flex items-center gap-2 text-fun-blue-200 text-sm">
                            <Calendar size={13} className="text-fun-blue-500" />
                            {event.date}
                        </div>
                        <div className="w-px h-4 bg-fun-blue-800 self-center hidden sm:block" />
                        <div className="flex items-center gap-2 text-fun-blue-200 text-sm">
                            <MapPin size={13} className="text-fun-blue-500" />
                            {event.location}
                        </div>
                        <div className="w-px h-4 bg-fun-blue-800 self-center hidden sm:block" />
                        <div className="flex items-center gap-2 text-fun-blue-200 text-sm">
                            <Users size={13} className="text-fun-blue-500" />
                            {event.attendees} expected
                        </div>
                    </div>

                    <div className="flex gap-3">
                        <a
                            href={event.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-white rounded-xl font-bold text-sm transition-colors"
                        >
                            Register Now <ArrowUpRight size={14} />
                        </a>
                        <a
                            href="#"
                            className="inline-flex items-center gap-2 px-5 py-2.5 border border-fun-blue-700 text-fun-blue-300 hover:bg-fun-blue-800 rounded-xl font-semibold text-sm transition-colors"
                        >
                            Learn More
                        </a>
                    </div>
                </div>

                {/* Right — large date block */}
                <div className="hidden lg:flex flex-col items-center justify-center w-36 h-36 rounded-2xl bg-white/5 border border-white/10 shrink-0">
                    <span className="text-fun-blue-400 text-xs font-bold tracking-widest uppercase mb-1">{event.month}</span>
                    <span className="text-6xl font-bold text-white leading-none tabular-nums">{event.day}</span>
                    <span className="text-fun-blue-500 text-xs mt-1">2026</span>
                </div>
            </div>
        </motion.div>
    )
}

/** Regular event row (list view) */
function EventRow({ event, idx, isInView }: {
    event: typeof ALL_EVENTS[number]
    idx: number
    isInView: boolean
}) {
    const [expanded, setExpanded] = useState(false)
    const ts = tagStyle[event.tag]

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4, delay: idx * 0.07, ease: [0.22, 1, 0.36, 1] }}
            className={`rounded-2xl border transition-all duration-300 overflow-hidden ${event.highlight
                ? "border-fun-blue-200 bg-white shadow-sm shadow-fun-blue-100"
                : "border-zinc-200 bg-white hover:border-fun-blue-200 hover:shadow-sm"
                }`}
        >
            <button
                className="w-full text-left"
                onClick={() => setExpanded(v => !v)}
            >
                <div className="flex items-center gap-4 p-5">
                    {/* Date block */}
                    <div className="hidden sm:flex flex-col items-center justify-center w-14 h-14 rounded-xl bg-fun-blue-50 border border-fun-blue-100 shrink-0">
                        <span className="text-[10px] font-bold text-fun-blue-400 tracking-widest uppercase">{event.month}</span>
                        <span className="text-xl font-bold text-fun-blue-950 leading-none tabular-nums">{event.day}</span>
                    </div>

                    {/* Main content */}
                    <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0">
                                <div className="flex items-center gap-2 mb-1 flex-wrap">
                                    <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full ${ts.pill}`}>
                                        <span className={`w-1 h-1 rounded-full ${ts.dot}`} />
                                        {event.tag}
                                    </span>
                                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${event.type === "NZUSI"
                                        ? "bg-fun-blue-100 text-fun-blue-600"
                                        : "bg-slate-100 text-slate-500"
                                        }`}>
                                        {event.type}
                                    </span>
                                    <span className="text-[10px] text-zinc-400 bg-zinc-50 px-2 py-0.5 rounded-md border border-zinc-100">
                                        {event.category}
                                    </span>
                                </div>

                                <h3 className="text-fun-blue-950 text-lg leading-snug truncate">
                                    {event.title}
                                    <span className="text-zinc-400 font-normal text-sm ml-1.5">— {event.subtitle}</span>
                                </h3>
                            </div>

                            <motion.div
                                animate={{ rotate: expanded ? 90 : 0 }}
                                transition={{ duration: 0.2 }}
                                className="shrink-0 mt-0.5"
                            >
                                <ChevronRight size={15} className="text-fun-blue-300" />
                            </motion.div>
                        </div>

                        {/* Meta row */}
                        <div className="flex flex-wrap gap-4 mt-2">
                            <div className="flex items-center gap-1.5 text-xs text-zinc-500">
                                <Calendar size={11} className="text-fun-blue-300 shrink-0" />
                                <span className="font-medium">{event.date}</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-xs text-zinc-500">
                                <MapPin size={11} className="text-fun-blue-300 shrink-0" />
                                <span>{event.location}</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-xs text-zinc-500">
                                <Users size={11} className="text-fun-blue-300 shrink-0" />
                                <span>{event.attendees} expected</span>
                            </div>
                        </div>
                    </div>
                </div>
            </button>

            {/* Expanded detail panel */}
            <AnimatePresence initial={false}>
                {expanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                    >
                        <div className="px-5 pb-5 pt-0 border-t border-zinc-100 ml-0 sm:ml-18">
                            <p className="text-zinc-500 text-sm leading-relaxed mt-4 mb-4">
                                {event.description}
                            </p>
                            <a
                                href={event.link}
                                target={event.link !== "#" ? "_blank" : undefined}
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 text-xs font-semibold text-fun-blue-600 hover:text-fun-blue-800 transition-colors"
                            >
                                {event.tag === "Completed" ? "View Summary" : "More Details"} <ArrowUpRight size={12} />
                            </a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    )
}

export default function EventsSection() {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: "-80px" })

    const [typeFilter, setTypeFilter] = useState("All")
    const [catFilter, setCatFilter] = useState("All Categories")

    const featured = ALL_EVENTS.find(e => e.tag === "Flagship")!

    const rest = ALL_EVENTS.filter(e => {
        if (e.tag === "Flagship") return false
        if (typeFilter !== "All" && e.type !== typeFilter) return false
        if (catFilter !== "All Categories" && e.category !== catFilter) return false
        return true
    })

    /* Stats */
    const nzusiCount = ALL_EVENTS.filter(e => e.type === "NZUSI").length
    const usiCount = ALL_EVENTS.filter(e => e.type === "USI").length
    const upcomingCount = ALL_EVENTS.filter(e => e.tag === "Upcoming" || e.tag === "Flagship").length

    return (
        <Section className="bg-fun-blue-50">
            <Wrapper>
                <div ref={ref} className="w-full flex flex-col gap-12">

                    {/* ── Page header ── */}
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <motion.div
                            initial={{ opacity: 0, y: 24 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        >
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-6 h-px bg-fun-blue-400" />
                                <span className="text-xs font-semibold tracking-[0.2em] uppercase text-fun-blue-500">
                                    Full Calendar · 2026
                                </span>
                            </div>
                            <h2 className="text-3xl md:text-4xl lg:text-5xl text-fun-blue-950 leading-tight">
                                Events &{" "}
                                <em className="not-italic text-fun-blue-400">Conferences</em>
                            </h2>
                        </motion.div>

                        {/* Stat chips */}
                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="flex flex-wrap gap-2"
                        >
                            {[
                                { label: "Total Events", val: ALL_EVENTS.length },
                                { label: "Upcoming", val: upcomingCount },
                                { label: "NZUSI", val: nzusiCount },
                                { label: "USI", val: usiCount },
                            ].map(s => (
                                <div key={s.label} className="flex items-center gap-2 px-3 py-1.5 bg-white border border-fun-blue-100 rounded-xl shadow-sm">
                                    <span className="font-bold text-fun-blue-700 text-sm">{s.val}</span>
                                    <span className="text-[11px] text-fun-blue-400">{s.label}</span>
                                </div>
                            ))}
                        </motion.div>
                    </div>

                    {/* ── Year timeline strip ── */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : {}}
                        transition={{ duration: 0.5, delay: 0.15 }}
                        className="flex items-center gap-0 overflow-x-auto pb-1 scrollbar-hide"
                    >
                        {ALL_EVENTS.map((e, i) => {
                            const ts = tagStyle[e.tag]
                            return (
                                <div key={e.id} className="flex items-center gap-0 min-w-0 shrink-0">
                                    {/* Node */}
                                    <div className="flex flex-col items-center gap-1.5">
                                        <span className="text-[10px] text-fun-blue-400 font-medium whitespace-nowrap">
                                            {e.dateShort}
                                        </span>
                                        <div className={`w-3 h-3 rounded-full border-2 border-fun-blue-50 ${ts.dot}`} />
                                        <span className="text-[9px] text-zinc-400 whitespace-nowrap max-w-20 text-center leading-tight">
                                            {e.title.split(" ").slice(0, 2).join(" ")}
                                        </span>
                                    </div>
                                    {/* Connector */}
                                    {i < ALL_EVENTS.length - 1 && (
                                        <div className="h-px w-10 md:w-16 lg:w-24 bg-fun-blue-100 mx-1 -mt-3" />
                                    )}
                                </div>
                            )
                        })}
                    </motion.div>

                    {/* ── Featured NZUSICON card ── */}
                    <FeaturedCard event={featured} />

                    {/* ── Filters ── */}
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.4, delay: 0.25 }}
                        className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between"
                    >
                        <div className="flex items-center gap-1 p-1 bg-white rounded-full border border-fun-blue-100 shadow-sm">
                            {FILTERS.map(f => (
                                <button
                                    key={f}
                                    onClick={() => setTypeFilter(f)}
                                    className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer ${typeFilter === f
                                        ? "bg-fun-blue-950 text-white shadow-sm"
                                        : "text-fun-blue-600 hover:text-fun-blue-900"
                                        }`}
                                >
                                    {f}
                                </button>
                            ))}
                        </div>

                        <div className="flex items-center gap-1 p-1 bg-white rounded-full border border-fun-blue-100 shadow-sm flex-wrap">
                            {CATEGORIES.map(c => (
                                <button
                                    key={c}
                                    onClick={() => setCatFilter(c)}
                                    className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer whitespace-nowrap ${catFilter === c
                                        ? "bg-fun-blue-100 text-fun-blue-800"
                                        : "text-zinc-500 hover:text-fun-blue-700"
                                        }`}
                                >
                                    {c === "All Categories" ? <Tag size={11} className="inline mr-1" /> : null}
                                    {c}
                                </button>
                            ))}
                        </div>
                    </motion.div>

                    {/* ── Events list ── */}
                    <div>
                        {/* Column header */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={isInView ? { opacity: 1 } : {}}
                            transition={{ duration: 0.3, delay: 0.3 }}
                            className="flex items-center justify-between px-1 mb-3"
                        >
                            <span className="text-[10px] font-bold uppercase tracking-widest text-fun-blue-300">
                                {rest.length} Event{rest.length !== 1 ? "s" : ""} — Click to expand
                            </span>
                            <div className="h-px flex-1 bg-fun-blue-100 ml-4" />
                        </motion.div>

                        <AnimatePresence mode="popLayout">
                            <div className="flex flex-col gap-3">
                                {rest.length > 0 ? (
                                    rest.map((event, idx) => (
                                        <EventRow
                                            key={event.id}
                                            event={event}
                                            idx={idx}
                                            isInView={isInView}
                                        />
                                    ))
                                ) : (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="text-center py-14 text-fun-blue-300 text-sm"
                                    >
                                        No events match the selected filters.
                                    </motion.div>
                                )}
                            </div>
                        </AnimatePresence>
                    </div>

                    {/* ── Info strip ── */}
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5, delay: 0.6 }}
                        className="rounded-2xl bg-fun-blue-950 px-7 py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                    >
                        <div>
                            <p className="text-white font-semibold text-sm mb-1">Want to host an NZUSI event?</p>
                            <p className="text-fun-blue-400 text-xs leading-relaxed">
                                Full members can bid to organise conferences and CMEs under the NZUSI aegis.
                            </p>
                        </div>
                        <a
                            href="/about/bids"
                            className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 bg-fun-blue-100 text-fun-blue-900 rounded-xl font-semibold text-xs hover:bg-white transition-colors"
                        >
                            View Bid Guidelines <ArrowUpRight size={12} />
                        </a>
                    </motion.div>

                </div>
            </Wrapper>
        </Section>
    )
}