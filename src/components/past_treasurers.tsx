'use client'

import { motion } from 'motion/react'
import { MapPin, Clock, IndianRupee } from 'lucide-react'

const TREASURERS = [
    { year: '1991–1994', name: 'Dr. NP Gupta', city: 'Delhi', tenure: 3 },
    { year: '1994–1995', name: 'Dr. PN Dogra', city: 'Delhi', tenure: 1 },
    { year: '1995–1996', name: 'Dr. SP Yadav', city: 'Rohtak', tenure: 1 },
    { year: '1996–2000', name: 'Dr. Madhu S Agrawal', city: 'Agra', tenure: 4 },
    { year: '2000–2002', name: 'Dr. Anil Elhence', city: 'Meerut', tenure: 2 },
    { year: '2002–2004', name: 'Dr. Diwakar Dalela', city: 'Lucknow', tenure: 2 },
    { year: '2004–2006', name: 'Dr. Rajeev Sood', city: 'Delhi', tenure: 2 },
    { year: '2006–2008', name: 'Dr. SK Pal', city: 'Delhi', tenure: 2 },
    { year: '2008–2010', name: 'Dr. SK Pal', city: 'Delhi', tenure: 2 },
    { year: '2010–2013', name: 'Dr. Anil Varshney', city: 'Delhi', tenure: 3 },
    { year: '2013–2015', name: 'Dr. Anil Goyal', city: 'New Delhi', tenure: 2 },
    { year: '2015–2019', name: 'Dr. Subhash Yadav', city: 'Meerut', tenure: 4 },
    { year: '2019–2021', name: 'Dr. Vijay Bora', city: 'Agra', tenure: 2 },
    { year: '2021-2023', name: 'Dr. Nachiket Vyas', city: 'Agra', tenure: 2 },
    { year: '2023-2025', name: 'Dr. Shailendra Goel', city: 'Agra', tenure: 2 },
    { year: '2025-2027', name: 'Dr Umesh Sharma', city: 'Agra', tenure: 2 },
]

function getInitials(name: string) {
    const parts = name.replace(/^(Prof\.|Dr\.|Col\.)\s+/, '').split(' ')
    return parts.slice(0, 2).map(p => p[0]).join('').toUpperCase()
}

const MAX_TENURE = 4

const fadeUp = {
    hidden: { opacity: 0, y: 14 },
    show: (d = 0) => ({
        opacity: 1, y: 0,
        transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const, delay: d },
    }),
}

export default function PastTreasurers() {
    const reversed = [...TREASURERS].reverse()

    const totalYears = TREASURERS.reduce((a, t) => a + t.tenure, 0)
    const avgTenure = (totalYears / TREASURERS.length).toFixed(1)
    const cities = [...new Set(TREASURERS.map(t => t.city))].length

    return (
        <div className="flex flex-col gap-8">

            {/* Header */}
            <motion.div initial="hidden" animate="show" custom={0} variants={fadeUp} className="max-w-2xl">
                <h2 className="font-serif text-2xl text-fun-blue-950 mb-3 leading-snug">
                    Past Honorary Treasurers
                </h2>
                <p className="text-fun-blue-800/55 text-[13px] leading-relaxed">
                    The Honorary Treasurer is responsible for all financial transactions of the Society — receiving subscriptions, paying bills, and presenting audited accounts at the Annual General Meeting. A record of all past treasurers since 1991.
                </p>

                <div className="flex flex-wrap gap-3 mt-4">
                    {[
                        { label: 'Total Treasurers', value: TREASURERS.length, icon: null },
                        { label: 'Years Covered', value: '1991–2021' },
                        { label: 'Avg. Tenure', value: `${avgTenure} yrs` },
                        { label: 'Cities', value: cities },
                    ].map(stat => (
                        <div key={stat.label} className="flex items-center gap-2 px-3 py-1.5 bg-fun-blue-50 border border-fun-blue-100 rounded-lg">
                            <span className="font-bold text-fun-blue-700 text-sm">{stat.value}</span>
                            <span className="text-[11px] text-fun-blue-500">{stat.label}</span>
                        </div>
                    ))}
                </div>
            </motion.div>

            {/* Divider */}
            <div className="flex items-center gap-3">
                <div className="h-px w-4 bg-fun-blue-300/40" />
                <span className="text-[10px] font-semibold text-fun-blue-900/40 uppercase tracking-widest">
                    Most recent first
                </span>
                <div className="flex-1 h-px bg-fun-blue-100" />
            </div>

            {/* List */}
            <div className="flex flex-col gap-2.5">
                {reversed.map((t, i) => (
                    <motion.div
                        key={`${t.year}-${t.name}`}
                        initial="hidden" animate="show" custom={i * 0.05}
                        variants={fadeUp}
                        className="group flex items-center gap-4 p-4 rounded-xl border border-fun-blue-100 bg-white hover:border-fun-blue-200 hover:bg-fun-blue-50/40 transition-all duration-200"
                    >
                        {/* Avatar */}
                        <div className="w-10 h-10 rounded-full bg-linear-to-br from-fun-blue-700 to-fun-blue-900 flex items-center justify-center text-[11px] font-bold text-white shrink-0">
                            {getInitials(t.name)}
                        </div>

                        <div className="flex-1 min-w-0">
                            <div className="flex items-baseline justify-between gap-3 mb-1.5">
                                <span className="font-medium text-[13px] text-fun-blue-950 truncate">{t.name}</span>
                                <span className="text-[11px] font-medium text-fun-blue-400 tabular-nums shrink-0">{t.year}</span>
                            </div>

                            {/* Tenure bar */}
                            <div className="flex items-center gap-2.5">
                                <div className="flex-1 h-1 bg-fun-blue-50 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${(t.tenure / MAX_TENURE) * 100}%` }}
                                        transition={{ duration: 0.7, delay: 0.2 + i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                                        className="h-full bg-fun-blue-500 rounded-full"
                                    />
                                </div>
                                <div className="flex items-center gap-1 text-[11px] text-fun-blue-400/60 shrink-0">
                                    <Clock size={9} />
                                    <span>{t.tenure} yr{t.tenure > 1 ? 's' : ''}</span>
                                </div>
                                <div className="flex items-center gap-1 text-[11px] text-fun-blue-400/60 shrink-0">
                                    <MapPin size={9} />
                                    <span>{t.city}</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Callout — Dr SK Pal served two consecutive terms */}
            <motion.div
                initial="hidden" animate="show" custom={0.7}
                variants={fadeUp}
                className="rounded-xl bg-fun-blue-50 border border-fun-blue-100 px-5 py-4 flex items-start gap-3"
            >
                <div className="w-1 h-1 min-w-1 rounded-full bg-fun-blue-400 mt-2" />
                <p className="text-fun-blue-700/65 text-[12px] leading-relaxed">
                    Dr. SK Pal (Delhi) served two consecutive terms as Honorary Treasurer (2006–2010). Dr. Madhu S Agrawal (Agra) and Dr. Subhash Yadav (Meerut) each served four-year terms — the longest in the Society's history. Current term is held by Dr. Umesh Sharma (New Delhi).
                </p>
            </motion.div>

        </div>
    )
}