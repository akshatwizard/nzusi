'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useInView, useMotionValue, useTransform, animate } from 'motion/react'
import { Section, Wrapper } from './ui/sections'
import { UserRound, Calendar, MapPin, ClipboardList } from 'lucide-react'

const STATS = [
    {
        value: 500,
        suffix: '+',
        label: 'Active Members',
        sublabel: 'urologists across North India',
        icon: UserRound,
    },
    {
        value: 28,
        suffix: '',
        label: 'Conferences Hosted',
        sublabel: 'annual & mid-term events',
        icon: Calendar,
    },
    {
        value: 140,
        suffix: '+',
        label: 'Research Publications',
        sublabel: 'Adyatan & peer-reviewed',
        icon: ClipboardList,
    },
    {
        value: 6,
        suffix: '',
        label: 'States Covered',
        sublabel: 'across the North Zone',
        icon: MapPin,
    },
]

function useCountUp(target: number, inView: boolean, duration = 2) {
    const [display, setDisplay] = useState(0)
    const hasRun = useRef(false)

    useEffect(() => {
        if (!inView || hasRun.current) return
        hasRun.current = true

        const start = performance.now()
        const step = (now: number) => {
            const progress = Math.min((now - start) / (duration * 1000), 1)
            const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress)
            setDisplay(Math.round(eased * target))
            if (progress < 1) requestAnimationFrame(step)
        }
        requestAnimationFrame(step)
    }, [inView, target, duration])

    return display
}

function StatCard({ stat, index, inView }: {
    stat: (typeof STATS)[number]
    index: number
    inView: boolean
}) {
    const count = useCountUp(stat.value, inView, 1.8 + index * 0.15)

    return (
        <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
            transition={{
                duration: 0.65,
                delay: index * 0.12,
                ease: [0.22, 1, 0.36, 1],
            }}
            className="group relative flex flex-col gap-4 p-6 lg:p-8 border-r border-fun-blue-500/20 last:border-r-0 overflow-hidden"
        >
            {/* Hover glow */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: 'radial-gradient(ellipse at 50% 100%, #4f9de115 0%, transparent 70%)' }}
            />

            {/* Top row: icon + index number */}
            <div className="flex items-center justify-between">
                <div className="w-9 h-9 rounded-lg bg-fun-blue-900/15 border border-fun-blue-900/20 flex items-center justify-center text-fun-blue-900">
                    <stat.icon size={16} />
                </div>
                <span className="font-serif text-[11px] text-fun-blue-800 select-none">
                    0{index + 1}
                </span>
            </div>

            {/* Count */}
            <div className="flex items-end gap-0.5">
                <span className="font-serif text-5xl lg:text-6xl text-fun-blue-950 leading-none tabular-nums">
                    {count.toLocaleString()}
                </span>
                {stat.suffix && (
                    <span className="font-serif text-3xl text-fun-blue-900 leading-none mb-1">
                        {stat.suffix}
                    </span>
                )}
            </div>

            {/* Label */}
            <div>
                <div className="text-fun-blue-600 font-medium text-sm leading-snug mb-0.5">
                    {stat.label}
                </div>
                <div className="text-fun-blue-400 text-xs leading-snug">
                    {stat.sublabel}
                </div>
            </div>

            {/* Bottom accent line — animates in with count */}
            <motion.div
                initial={{ scaleX: 0 }}
                animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
                transition={{ duration: 1.6, delay: 0.3 + index * 0.12, ease: [0.22, 1, 0.36, 1] }}
                style={{ originX: 0 }}
                className="absolute bottom-0 left-6 right-6 h-px bg-linear-to-r from-fun-blue-600 via-fun-blue-400/60 to-transparent"
            />
        </motion.div>
    )
}

export default function StatsSection() {
    const ref = useRef<HTMLDivElement>(null)
    const inView = useInView(ref, { once: true, margin: '-80px' })

    return (
        <Section
            ref={ref}
            className="relative w-full overflow-hidden"
            aria-label="NZUSI key statistics"
        >

            {/* Radial orb */}
            {/* <div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-75 pointer-events-none"
                style={{
                    background: 'radial-gradient(ellipse, rgba(24,95,165,0.18) 0%, transparent 70%)',
                }}
            /> */}

            <Wrapper>
                <div className="relative z-10">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
                        className="font-serif text-3xl lg:text-4xl text-fun-blue-950 text-center mt-4 mb-1"
                    >
                        North India's Leading
                        <em className="text-fun-blue-400 font-serif"> Urology </em>
                        Chapter
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 16 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.55, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                        className="text-fun-blue-800/45 text-sm text-center mt-2 pb-10"
                    >
                        Three decades of advancing urological science across the region
                    </motion.p>
                </div>

                {/* Stats grid */}
                <div className="relative z-10 grid grid-cols-2 lg:grid-cols-4 border-t border-fun-blue-500/20">
                    {STATS.map((stat, i) => (
                        <StatCard key={stat.label} stat={stat} index={i} inView={inView} />
                    ))}
                </div>

            </Wrapper>
            {/* Header */}
        </Section>
    )
}