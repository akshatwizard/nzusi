'use client'

import { Section, Wrapper } from "@/components/ui/sections"
import { motion, useInView, AnimatePresence } from "motion/react"
import { useRef, useState } from "react"
import { Calendar, MapPin, ArrowRight, ArrowUpRight } from "lucide-react"

const events = [
    {
        id: 1,
        title: "Online Academic Series — NZUSI",
        date: "Jan 11, 2026",
        location: "Online / Zoom",
        type: "NZUSI",
        category: "Academic",
        tag: "Completed",
        highlight: false,
        index: "01",
    },
    {
        id: 2,
        title: "Mid-term CME — Karnal Chapter",
        date: "Apr 24–25, 2026",
        location: "Karnal, Haryana",
        type: "NZUSI",
        category: "CME",
        tag: "Upcoming",
        highlight: true,
        index: "02",
    },
    {
        id: 3,
        title: "USICON 2026 — Annual Conference",
        date: "Jun 12–14, 2026",
        location: "Mumbai, Maharashtra",
        type: "USI",
        category: "Conference",
        tag: "Upcoming",
        highlight: false,
        index: "03",
    },
    {
        id: 4,
        title: "Youth Conclave — North Zone",
        date: "Aug 22–23, 2026",
        location: "New Delhi",
        type: "NZUSI",
        category: "Conclave",
        tag: "Upcoming",
        highlight: false,
        index: "04",
    },
    {
        id: 5,
        title: "Endourology Society Meeting",
        date: "Sep 18–20, 2026",
        location: "Chandigarh, Punjab",
        type: "USI",
        category: "Conference",
        tag: "Upcoming",
        highlight: false,
        index: "05",
    },
    {
        id: 6,
        title: "NZUSICON 2026 — Annual Congress",
        date: "Nov 27–29, 2026",
        location: "Amritsar, Punjab",
        type: "NZUSI",
        category: "Conference",
        tag: "Flagship",
        highlight: true,
        index: "06",
    },
]

const tagConfig: Record<string, { dot: string; text: string }> = {
    Completed: { dot: "bg-zinc-300", text: "text-zinc-400" },
    Upcoming: { dot: "bg-fun-blue-400", text: "text-fun-blue-600" },
    Flagship: { dot: "bg-amber-500 animate-pulse", text: "text-amber-600" },
}

const filters = ["All", "NZUSI", "USI"]

export default function EventsSection() {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: "-80px" })
    const [active, setActive] = useState("All")
    const [hovered, setHovered] = useState<number | null>(null)

    const filtered = events.filter(e => active === "All" || e.type === active)

    return (
        <Section className="bg-fun-blue-50">
            <Wrapper>
                <div ref={ref} className="w-full">

                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14">
                        <motion.div
                            initial={{ opacity: 0, y: 28 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-8 h-px bg-fun-blue-400" />
                                <span className="text-xs font-semibold tracking-[0.2em] uppercase text-fun-blue-500">
                                    Calendar 2026
                                </span>
                            </div>
                            <h2 className="text-3xl lg:text-4xl text-fun-blue-950 leading-[1.05] tracking-tight">
                                Events & <em className="not-italic text-fun-blue-400">Conferences</em>
                            </h2>
                        </motion.div>

                        {/* Filter pill group */}
                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="flex items-center gap-1 p-1 bg-white rounded-full border border-fun-blue-100 shadow-sm w-max"
                        >
                            {filters.map(f => (
                                <button
                                    key={f}
                                    onClick={() => setActive(f)}
                                    className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 cursor-pointer ${active === f
                                            ? "bg-fun-blue-950 text-white shadow-md"
                                            : "text-fun-blue-600 hover:text-fun-blue-900"
                                        }`}
                                >
                                    {f}
                                </button>
                            ))}
                        </motion.div>
                    </div>

                    {/* Column headers — desktop only */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : {}}
                        transition={{ duration: 0.4, delay: 0.15 }}
                        className="hidden lg:grid grid-cols-[28px_120px_1fr_160px_160px_80px_40px] gap-4 px-5 mb-2"
                    >
                        {["#", "Status", "Event", "Date", "Location", "Type", ""].map(h => (
                            <span key={h} className="text-[10px] font-bold uppercase tracking-widest text-fun-blue-300">{h}</span>
                        ))}
                    </motion.div>

                    {/* Divider */}
                    <div className="hidden lg:block h-px bg-fun-blue-100 mb-1" />

                    {/* Event rows */}
                    <AnimatePresence mode="popLayout">
                        <div className="flex flex-col divide-y divide-fun-blue-100/70">
                            {filtered.map((event, idx) => {
                                const tag = tagConfig[event.tag]
                                const isHov = hovered === event.id
                                return (
                                    <motion.div
                                        key={event.id}
                                        layout
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0 }}
                                        exit={{ opacity: 0, y: -8 }}
                                        transition={{ duration: 0.4, delay: idx * 0.07, ease: [0.22, 1, 0.36, 1] }}
                                        onHoverStart={() => setHovered(event.id)}
                                        onHoverEnd={() => setHovered(null)}
                                        className={`group relative flex flex-col sm:flex-row sm:items-center gap-3 py-5 px-5 rounded-2xl cursor-pointer transition-all duration-300 ${isHov
                                                ? "bg-white shadow-xl shadow-fun-blue-100 -mx-2 px-7 scale-[1.005]"
                                                : event.highlight ? "bg-white/50" : ""
                                            }`}
                                    >
                                        {/* Desktop layout */}
                                        <div className="hidden lg:grid grid-cols-[28px_120px_1fr_160px_160px_80px_40px] gap-4 items-center w-full">
                                            <span className={`text-xs font-bold tabular-nums transition-colors duration-300 ${isHov ? "text-fun-blue-500" : "text-fun-blue-200"}`}>
                                                {event.index}
                                            </span>

                                            <div className="flex items-center gap-2">
                                                <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${tag.dot}`} />
                                                <span className={`text-xs font-semibold ${tag.text}`}>{event.tag}</span>
                                            </div>

                                            <div>
                                                <h3 className={`leading-snug transition-colors duration-300 ${isHov ? "text-fun-blue-700" : "text-fun-blue-950"}`}>
                                                    {event.title}
                                                </h3>
                                                {event.highlight && (
                                                    <span className="inline-flex items-center mt-0.5 px-1.5 py-0.5 rounded bg-amber-100 text-amber-700 text-[9px] font-bold uppercase tracking-wide">
                                                        ★ Key Event
                                                    </span>
                                                )}
                                            </div>

                                            <div className="flex items-center gap-1.5 text-xs text-zinc-500">
                                                <Calendar size={11} className="text-fun-blue-300 shrink-0" />
                                                <span className="font-medium">{event.date}</span>
                                            </div>

                                            <div className="flex items-center gap-1.5 text-xs text-zinc-500">
                                                <MapPin size={11} className="text-fun-blue-300 shrink-0" />
                                                <span>{event.location}</span>
                                            </div>

                                            <span className={`text-[10px] font-bold px-2 py-1 rounded-md tracking-wider w-max ${event.type === "NZUSI"
                                                    ? "bg-fun-blue-100 text-fun-blue-600"
                                                    : "bg-slate-100 text-slate-500"
                                                }`}>
                                                {event.type}
                                            </span>

                                            <motion.div
                                                animate={{ opacity: isHov ? 1 : 0, scale: isHov ? 1 : 0.7 }}
                                                transition={{ duration: 0.2 }}
                                                className="w-8 h-8 rounded-full bg-fun-blue-950 flex items-center justify-center"
                                            >
                                                <ArrowUpRight size={13} className="text-white" />
                                            </motion.div>
                                        </div>

                                        {/* Mobile layout */}
                                        <div className="lg:hidden flex flex-col gap-2 w-full">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <span className={`w-1.5 h-1.5 rounded-full ${tag.dot}`} />
                                                    <span className={`text-xs font-semibold ${tag.text}`}>{event.tag}</span>
                                                </div>
                                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${event.type === "NZUSI" ? "bg-fun-blue-100 text-fun-blue-600" : "bg-slate-100 text-slate-500"
                                                    }`}>{event.type}</span>
                                            </div>
                                            <h3 className="font-semibold text-fun-blue-950 text-sm leading-snug">{event.title}</h3>
                                            <div className="flex flex-wrap gap-3 text-xs text-zinc-500">
                                                <span className="flex items-center gap-1"><Calendar size={10} className="text-fun-blue-300" />{event.date}</span>
                                                <span className="flex items-center gap-1"><MapPin size={10} className="text-fun-blue-300" />{event.location}</span>
                                            </div>
                                        </div>
                                    </motion.div>
                                )
                            })}
                        </div>
                    </AnimatePresence>

                    {/* Bottom CTA */}
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5, delay: 0.7 }}
                        className="mt-12 flex items-center justify-between"
                    >
                        <p className="text-sm text-fun-blue-300 hidden md:block">
                            {filtered.length} of {events.length} events shown
                        </p>
                        <a
                            href="/events"
                            className="group ml-auto inline-flex items-center gap-3 px-7 py-3.5 bg-fun-blue-950 text-white rounded-full text-sm font-semibold hover:bg-fun-blue-800 transition-colors duration-300"
                        >
                            Full Events Calendar
                            <span className="w-5 h-5 rounded-full bg-white/15 flex items-center justify-center group-hover:bg-white/25 transition-colors">
                                <ArrowRight size={11} />
                            </span>
                        </a>
                    </motion.div>
                </div>
            </Wrapper>
        </Section>
    )
}