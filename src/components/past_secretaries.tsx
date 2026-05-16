'use client'

import { motion } from 'motion/react'
import { MapPin, Clock } from 'lucide-react'

const SECRETARIES = [
    { year: '1991–1994', name: 'Dr. PB Singh', city: 'Varanasi', tenure: 3 },
    { year: '1994–1996', name: 'Dr. AK Hemal', city: 'Delhi', tenure: 2 },
    { year: '1996–2000', name: 'Dr. Kim Mammen', city: 'Ludhiana', tenure: 4 },
    { year: '2000–2002', name: 'Dr. Samir Rai', city: 'Amritsar', tenure: 2 },
    { year: '2002–2004', name: 'Dr. AK Mandal', city: 'Chandigarh', tenure: 2 },
    { year: '2004–2006', name: 'Dr. Ashok Sharma', city: 'Kota', tenure: 2 },
    { year: '2006–2008', name: 'Dr. Ashok Sharma', city: 'Kota', tenure: 2 },
    { year: '2008–2010', name: 'Dr. Rajeev Sood', city: 'Delhi', tenure: 2 },
    { year: '2010–2013', name: 'Dr. Rajeev Kumar', city: 'Delhi', tenure: 3 },
    { year: '2013–2017', name: 'Dr. Uttam Mete', city: 'Chandigarh', tenure: 4 },
    { year: '2017–2019', name: 'Dr. Shivam Priyadarshi', city: 'Jaipur', tenure: 2 },
    { year: '2019-2021', name: 'Dr. Anup Kumar', city: 'Jaipur', tenure: 2 },
    { year: '2021-2023', name: 'Dr. Kamal Jeet Singh', city: 'Jaipur', tenure: 2 },
    { year: '2023-2025', name: 'Dr. Rishi Nayyar', city: 'Jaipur', tenure: 2 },
    { year: '2025-2027', name: 'Dr Sameer Trivedi', city: 'Jaipur', tenure: 2 },
]

function getInitials(name: string) {
    const parts = name.replace(/^(Prof\.|Dr\.|Col\.)\s+/, '').split(' ')
    return parts.slice(0, 2).map(p => p[0]).join('').toUpperCase()
}

// Width % for bar (max tenure in data = 4)
function barWidth(tenure: number) {
    return `${(tenure / 4) * 100}%`
}

const fadeUp = {
    hidden: { opacity: 0, y: 14 },
    show: (d = 0) => ({
        opacity: 1, y: 0,
        transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const, delay: d },
    }),
}

export default function PastSecretaries() {
    const reversed = [...SECRETARIES].reverse()

    return (
        <div className="flex flex-col gap-8">

            {/* Header */}
            <motion.div initial="hidden" animate="show" custom={0} variants={fadeUp} className="max-w-2xl">
                <h2 className="font-serif text-2xl text-fun-blue-950 mb-3 leading-snug">
                    Past Honorary Secretaries
                </h2>
                <p className="text-fun-blue-800/55 text-[13px] leading-relaxed">
                    The Honorary Secretary manages the day-to-day affairs of NZUSI — summoning meetings, maintaining records, and coordinating the academic calendar. Below is a record of all past secretaries since the Society's founding in 1991.
                </p>

                <div className="flex flex-wrap gap-3 mt-4">
                    {[
                        { label: 'Total Secretaries', value: SECRETARIES.length },
                        { label: 'Years Covered', value: '1991–2019' },
                        { label: 'Avg. Tenure', value: `${(SECRETARIES.reduce((a, s) => a + s.tenure, 0) / SECRETARIES.length).toFixed(1)} yrs` },
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

            {/* List with tenure bars */}
            <div className="flex flex-col gap-2.5">
                {reversed.map((s, i) => (
                    <motion.div
                        key={s.year}
                        initial="hidden" animate="show" custom={i * 0.06}
                        variants={fadeUp}
                        className="group flex items-center gap-4 p-4 rounded-xl border border-fun-blue-100 bg-white hover:border-fun-blue-200 hover:bg-fun-blue-50/40 transition-all duration-200"
                    >
                        {/* Avatar */}
                        <div className="w-10 h-10 rounded-full bg-linear-to-br from-fun-blue-600 to-fun-blue-800 flex items-center justify-center text-[11px] font-bold text-white shrink-0">
                            {getInitials(s.name)}
                        </div>

                        <div className="flex-1 min-w-0">
                            <div className="flex items-baseline justify-between gap-3 mb-1.5">
                                <span className="font-medium text-[13px] text-fun-blue-950 truncate">{s.name}</span>
                                <span className="text-[11px] font-medium text-fun-blue-400 tabular-nums shrink-0">{s.year}</span>
                            </div>

                            {/* Tenure bar */}
                            <div className="flex items-center gap-2.5">
                                <div className="flex-1 h-1 bg-fun-blue-50 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: barWidth(s.tenure) }}
                                        transition={{ duration: 0.7, delay: 0.2 + i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                                        className="h-full bg-fun-blue-400 rounded-full"
                                    />
                                </div>
                                <div className="flex items-center gap-1 text-[11px] text-fun-blue-400/60 shrink-0">
                                    <Clock size={9} />
                                    <span>{s.tenure} yr{s.tenure > 1 ? 's' : ''}</span>
                                </div>
                                <div className="flex items-center gap-1 text-[11px] text-fun-blue-400/60 shrink-0">
                                    <MapPin size={9} />
                                    <span>{s.city}</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Footer note */}
            <motion.div
                initial="hidden" animate="show" custom={0.7}
                variants={fadeUp}
                className="rounded-xl bg-fun-blue-50 border border-fun-blue-100 px-5 py-4 flex items-start gap-3"
            >
                <div className="w-1 h-1 min-w-1 rounded-full bg-fun-blue-400 mt-2" />
                <p className="text-fun-blue-700/65 text-[12px] leading-relaxed">
                    Dr. Ashok Sharma (Kota) served two consecutive terms as Honorary Secretary (2004–2008), reflecting the confidence the council placed in his organisational abilities. Records for the current term are maintained by Dr. Sameer Trivedi (Varanasi).
                </p>
            </motion.div>

        </div>
    )
}