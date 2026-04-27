'use client'

import { Section, Wrapper } from "@/components/ui/sections"
import { motion, useInView } from "motion/react"
import { useRef, useState } from "react"
import { Calendar, MapPin, ArrowRight, Clock } from "lucide-react"

const events = [
    {
        id: 1,
        title: "Online Academic Series — NZUSI",
        date: "Jan 11, 2026",
        location: "Online / Zoom",
        type: "NZUSI",
        category: "Academic",
        tag: "Completed",
        color: "bg-fun-blue-600",
        highlight: false,
    },
    {
        id: 2,
        title: "Mid-term CME — Karnal Chapter",
        date: "Apr 24–25, 2026",
        location: "Karnal, Haryana",
        type: "NZUSI",
        category: "CME",
        tag: "Upcoming",
        color: "bg-fun-blue-500",
        highlight: true,
    },
    {
        id: 3,
        title: "USICON 2026 — Annual Conference",
        date: "Jun 12–14, 2026",
        location: "Mumbai, Maharashtra",
        type: "USI",
        category: "Conference",
        tag: "Upcoming",
        color: "bg-slate-500",
        highlight: false,
    },
    {
        id: 4,
        title: "Youth Conclave — North Zone",
        date: "Aug 22–23, 2026",
        location: "New Delhi",
        type: "NZUSI",
        category: "Conclave",
        tag: "Upcoming",
        color: "bg-fun-blue-600",
        highlight: false,
    },
    {
        id: 5,
        title: "Endourology Society Meeting",
        date: "Sep 18–20, 2026",
        location: "Chandigarh, Punjab",
        type: "USI",
        category: "Conference",
        tag: "Upcoming",
        color: "bg-slate-500",
        highlight: false,
    },
    {
        id: 6,
        title: "NZUSICON 2026 — Annual Congress",
        date: "Nov 27–29, 2026",
        location: "Amritsar, Punjab",
        type: "NZUSI",
        category: "Conference",
        tag: "Flagship",
        color: "bg-fun-blue-600",
        highlight: true,
    },
]

const tagStyles: Record<string, string> = {
    Completed: "bg-zinc-100 text-zinc-500",
    Upcoming: "bg-fun-blue-50 text-fun-blue-700",
    Flagship: "bg-amber-50 text-amber-700 border border-amber-200",
}

const filters = ["All", "NZUSI", "USI"]

export default function EventsSection() {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: "-80px" })
    const [active, setActive] = useState("All")

    const filtered = events.filter(e => active === "All" || e.type === active)

    return (
        <Section>
            <Wrapper>
                <div ref={ref} className="w-full">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                        <motion.div
                            initial={{ opacity: 0, y: 24 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        >
                            <span className="text-xs font-semibold tracking-widest uppercase text-fun-blue-500 mb-3 block">
                                Calendar 2026
                            </span>
                            <h2 className="text-3xl md:text-4xl lg:text-5xl text-fun-blue-950 leading-tight">
                                Upcoming <em className="not-italic text-fun-blue-500">Events</em> &<br />
                                Conferences
                            </h2>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
                            className="flex items-center gap-2"
                        >
                            {filters.map(f => (
                                <button
                                    key={f}
                                    onClick={() => setActive(f)}
                                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer ${active === f
                                        ? "bg-fun-blue-950 text-white"
                                        : "bg-white text-fun-blue-700 border border-fun-blue-200 hover:border-fun-blue-400"
                                        }`}
                                >
                                    {f}
                                </button>
                            ))}
                        </motion.div>
                    </div>

                    {/* Events Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filtered.map((event, idx) => (
                            <motion.div
                                key={event.id}
                                initial={{ opacity: 0, y: 32 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{
                                    duration: 0.5,
                                    delay: 0.1 + idx * 0.08,
                                    ease: [0.22, 1, 0.36, 1],
                                }}
                            >
                                <div
                                    className={`group relative bg-white rounded-2xl p-5 border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer overflow-hidden ${event.highlight
                                        ? "border-fun-blue-300 shadow-md shadow-fun-blue-100"
                                        : "border-zinc-200"
                                        }`}
                                >
                                    {/* Top accent line */}
                                    <div className={`absolute inset-x-0 top-0 h-0.5 ${event.type === "NZUSI" ? "bg-fun-blue-500" : "bg-slate-400"}`} />

                                    <div className="flex items-start justify-between mb-4">
                                        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${tagStyles[event.tag]}`}>
                                            {event.tag}
                                        </span>
                                        <span className={`text-xs font-bold px-2 py-1 rounded-md ${event.type === "NZUSI" ? "bg-fun-blue-50 text-fun-blue-700" : "bg-slate-100 text-slate-600"}`}>
                                            {event.type}
                                        </span>
                                    </div>

                                    <h3 className="font-semibold text-fun-blue-950 text-base leading-snug mb-4 group-hover:text-fun-blue-700 transition-colors">
                                        {event.title}
                                    </h3>

                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2 text-sm text-zinc-500">
                                            <Calendar size={13} className="shrink-0 text-fun-blue-400" />
                                            <span>{event.date}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-zinc-500">
                                            <MapPin size={13} className="shrink-0 text-fun-blue-400" />
                                            <span>{event.location}</span>
                                        </div>
                                    </div>

                                    <div className="mt-4 pt-4 border-t border-zinc-100 flex items-center justify-between">
                                        <span className="text-xs text-zinc-400 bg-zinc-50 px-2 py-1 rounded-md">
                                            {event.category}
                                        </span>
                                        <span className="text-xs font-medium text-fun-blue-600 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                            Learn more <ArrowRight size={12} />
                                        </span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Bottom CTA */}
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5, delay: 0.7 }}
                        className="mt-10 flex justify-center"
                    >
                        <a
                            href="/events"
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-fun-blue-300 text-fun-blue-700 text-sm font-medium hover:bg-fun-blue-950 hover:text-white hover:border-fun-blue-950 transition-all duration-300"
                        >
                            View Full Events Calendar
                            <ArrowRight size={14} />
                        </a>
                    </motion.div>
                </div>
            </Wrapper>
        </Section>
    )
}