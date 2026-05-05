'use client'

import { motion } from 'motion/react'

const ALL_CATEGORIES = ['All', 'Events', 'Adyatan', 'Academic'] as const
type Filter = (typeof ALL_CATEGORIES)[number]

type Props = {
    active: Filter
    counts: Record<string, number>
    onChange: (cat: Filter) => void
}

const FILTER_STYLES: Record<string, { active: string; idle: string }> = {
    All: { active: 'bg-fun-blue-950 text-white border-fun-blue-950', idle: 'text-fun-blue-700/60 border-fun-blue-200 hover:border-fun-blue-300 hover:text-fun-blue-800' },
    Events: { active: 'bg-fun-blue-100 text-fun-blue-700 border-fun-blue-300', idle: 'text-fun-blue-600/50 border-fun-blue-150 hover:bg-fun-blue-50 hover:text-fun-blue-700' },
    Adyatan: { active: 'bg-emerald-50 text-emerald-700 border-emerald-300', idle: 'text-emerald-600/50 border-emerald-100 hover:bg-emerald-50 hover:text-emerald-700' },
    Academic: { active: 'bg-amber-50 text-amber-700 border-amber-300', idle: 'text-amber-600/50 border-amber-100 hover:bg-amber-50 hover:text-amber-700' },
}

export function CategoryFilter({ active, counts, onChange }: Props) {
    return (
        <div
            className='flex items-center gap-2 flex-wrap'
            role='tablist'
            aria-label='Filter posts by category'
        >
            {ALL_CATEGORIES.map((cat) => {
                const isActive = active === cat
                const styles = FILTER_STYLES[cat]
                const count = counts[cat] ?? 0

                return (
                    <button
                        key={cat}
                        role='tab'
                        aria-selected={isActive}
                        onClick={() => onChange(cat)}
                        className={`
                            relative flex items-center gap-2 text-[12px] font-semibold
                            px-4 py-2 rounded-full border transition-all duration-200 cursor-pointer
                            ${isActive ? styles.active : styles.idle}
                        `}
                    >
                        {isActive && (
                            <motion.span
                                layoutId='blog-filter-bg'
                                className='absolute inset-0 rounded-full'
                                transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
                            />
                        )}
                        <span className='relative z-10'>{cat}</span>
                        <span className={`
                            relative z-10 text-[10px] font-semibold px-1.5 py-0.5 rounded-full min-w-5 text-center
                            ${isActive ? 'bg-white/20' : 'bg-fun-blue-100/60 text-fun-blue-500/50'}
                        `}>
                            {count}
                        </span>
                    </button>
                )
            })}
        </div>
    )
}