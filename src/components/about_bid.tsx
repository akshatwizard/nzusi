'use client'

import { motion } from 'motion/react'
import { Mail, CalendarDays, ClipboardList, Trophy, Stethoscope } from 'lucide-react'

const BIDS = [
    {
        icon: Trophy,
        id: 'NZUSICON',
        title: 'NZUSICON — Annual Congress',
        subtitle: 'Bid for the flagship annual conference of the North Zone Chapter',
        deadline: '31st August (year prior to event)',
        accentColor: 'bg-amber-50 border-amber-200',
        iconColor: 'bg-amber-100 text-amber-600',
        badgeColor: 'bg-amber-100 text-amber-700',
        badge: 'Flagship Event',
        description: 'The NZUSICON is the premier annual scientific congress of the North Zone Urological Society of India. Hosting this event is the most prestigious responsibility a chapter member can undertake and is a testament to organizational excellence.',
    },
    {
        icon: Stethoscope,
        id: 'Midterm',
        title: 'Midterm CME / Workshop / Symposium',
        subtitle: 'Bid to host a midterm continuing medical education event',
        deadline: '31st August (year prior to event)',
        accentColor: 'bg-fun-blue-50 border-fun-blue-200',
        iconColor: 'bg-fun-blue-100 text-fun-blue-600',
        badgeColor: 'bg-fun-blue-100 text-fun-blue-700',
        badge: 'CME / Workshop',
        description: 'Applications for holding a midterm CME, workshop, or symposium under the aegis of the North Zone Chapter of the Urological Society of India are invited from Full Members of the North Zone USI.',
    },
]

const REQUIREMENTS = [
    { num: '01', label: 'Name of the Organizing Society' },
    { num: '02', label: 'Name of the Organizing Secretary / Organizing Chairman' },
    { num: '03', label: 'Proposed Venue' },
    { num: '04', label: 'Proposed Dates' },
    { num: '05', label: 'Proposed Theme (for midterm workshop)' },
]

const fadeUp = {
    hidden: { opacity: 0, y: 16 },
    show: (d = 0) => ({
        opacity: 1, y: 0,
        transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const, delay: d },
    }),
}

export default function AboutBids() {
    return (
        <div className="flex flex-col gap-10">

            {/* Header */}
            <motion.div
                initial="hidden" animate="show" custom={0}
                variants={fadeUp}
                className="max-w-2xl"
            >
                <h2 className="font-serif text-2xl text-fun-blue-950 mb-3 leading-snug">
                    Important Notice for NZUSICON Bids
                </h2>
                <p className="text-fun-blue-800/55 text-[13px] leading-relaxed">
                    Interested Full Members of the North Zone USI may submit bids to host the Annual Congress (NZUSICON) or a Midterm CME/Workshop. All applications must be received by the Honorary Secretary before the stated deadline.
                </p>
            </motion.div>

            {/* Bid cards */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                {BIDS.map((bid, i) => {
                    const Icon = bid.icon
                    return (
                        <motion.div
                            key={bid.id}
                            initial="hidden" animate="show" custom={i * 0.1}
                            variants={fadeUp}
                            className={`rounded-xl border p-5 flex flex-col gap-4 ${bid.accentColor}`}
                        >
                            <div className="flex items-start justify-between">
                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${bid.iconColor}`}>
                                    <Icon size={18} />
                                </div>
                                <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${bid.badgeColor}`}>
                                    {bid.badge}
                                </span>
                            </div>

                            <div>
                                <h3 className="font-semibold text-fun-blue-950 text-[15px] leading-snug mb-1">
                                    {bid.title}
                                </h3>
                                <p className="text-[12px] text-fun-blue-600/70">{bid.subtitle}</p>
                            </div>

                            <p className="text-[13px] text-fun-blue-800/60 leading-relaxed">
                                {bid.description}
                            </p>

                            <div className="flex items-center gap-2 text-[12px] text-fun-blue-600 font-medium pt-1 border-t border-fun-blue-100">
                                <CalendarDays size={12} className="text-fun-blue-400" />
                                <span>Deadline: {bid.deadline}</span>
                            </div>
                        </motion.div>
                    )
                })}
            </div>

            {/* Divider */}
            <div className="flex items-center gap-3">
                <div className="h-px w-4 bg-fun-blue-300/40" />
                <h3 className="text-[10px] font-semibold text-fun-blue-900/40 uppercase tracking-widest whitespace-nowrap">
                    Proposal Requirements
                </h3>
                <div className="flex-1 h-px bg-fun-blue-100" />
            </div>

            {/* Requirements list */}
            <motion.div
                initial="hidden" animate="show" custom={0.2}
                variants={fadeUp}
                className="flex flex-col gap-2"
            >
                <p className="text-[13px] text-fun-blue-800/60 mb-3 leading-relaxed">
                    Both NZUSICON and Midterm proposals must include the following information:
                </p>
                {REQUIREMENTS.map((req, i) => (
                    <motion.div
                        key={req.num}
                        initial="hidden" animate="show" custom={0.25 + i * 0.05}
                        variants={fadeUp}
                        className="flex items-center gap-4 px-4 py-3 rounded-lg bg-white border border-fun-blue-100 hover:border-fun-blue-200 hover:bg-fun-blue-50/40 transition-all duration-200"
                    >
                        <span className="text-[11px] font-bold text-fun-blue-300 tabular-nums w-5 shrink-0">
                            {req.num}
                        </span>
                        <div className="w-px h-4 bg-fun-blue-100" />
                        <div className="flex items-center gap-2.5">
                            <ClipboardList size={12} className="text-fun-blue-400 shrink-0" />
                            <span className="text-[13px] text-fun-blue-800/75 font-medium">{req.label}</span>
                        </div>
                    </motion.div>
                ))}
            </motion.div>

            {/* Submission CTA */}
            <motion.div
                initial="hidden" animate="show" custom={0.5}
                variants={fadeUp}
                className="rounded-xl bg-fun-blue-950 px-6 py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            >
                <div>
                    <p className="text-white font-semibold text-[14px] mb-1">Submit Your Bid</p>
                    <p className="text-fun-blue-300 text-[12px] leading-relaxed">
                        Send your proposal by email to the Honorary Secretary, NZUSI before the deadline.
                    </p>
                </div>
                <a
                    href="mailto:nzusioffice@gmail.com"
                    className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 bg-fun-blue-100 text-fun-blue-900 rounded-lg text-[12px] font-semibold hover:bg-white transition-colors"
                >
                    <Mail size={13} />
                    nzusioffice@gmail.com
                </a>
            </motion.div>

        </div>
    )
}