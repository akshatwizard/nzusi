'use client'

import { ComponentType} from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { ChevronRight } from 'lucide-react'
import { About_Tab } from '@/constant/about_tabs'

type Props = {
    active: ComponentType
    onSelect: (component: ComponentType) => void
}

export default function AboutSidebar({ active, onSelect }: Props) {
    return (
        <aside
            className='lg:sticky lg:top-22 h-max lg:w-60 shrink-0 border-b lg:border-b-0 lg:border-r border-fun-blue-100
            bg-white px-3 py-8 lg:py-12 flex flex-col gap-6
        '>
            {About_Tab.map((group) => (
                <div key={group.label}>
                    <p className='text-[10px] font-semibold text-fun-blue-900/30 uppercase tracking-widest mb-1.5 px-2'>
                        {group.label}
                    </p>

                    <div className='flex flex-col gap-0.5'>
                        {group.items.map((item) => {
                            const isActive = active === item.component
                            return (
                                <button
                                    key={item.label}
                                    onClick={() => onSelect(item.component)}
                                    className={`
                                        group relative w-full flex items-center justify-between
                                        px-3 py-2 rounded-lg text-[13px] font-medium text-left
                                        transition-colors duration-150 cursor-pointer
                                        ${isActive
                                            ? 'text-white'
                                            : 'text-fun-blue-900/55 hover:text-fun-blue-900 hover:bg-fun-blue-100/60'
                                        }
                                    `}
                                >
                                    {isActive && (
                                        <motion.span
                                            layoutId='sidebar-pill'
                                            className='absolute inset-0 rounded-lg bg-fun-blue-600'
                                            transition={{ type: 'spring', bounce: 0.18, duration: 0.4 }}
                                        />
                                    )}

                                    <span className='relative z-10'>{item.label}</span>

                                    <AnimatePresence>
                                        {isActive && (
                                            <motion.span
                                                initial={{ opacity: 0, x: -4 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: -4 }}
                                                transition={{ duration: 0.2 }}
                                                className='relative z-10'
                                            >
                                                <ChevronRight size={13} className='text-white/55' />
                                            </motion.span>
                                        )}
                                    </AnimatePresence>
                                </button>
                            )
                        })}
                    </div>
                </div>
            ))}
        </aside>
    )
}