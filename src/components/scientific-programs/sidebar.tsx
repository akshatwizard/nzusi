'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronDown, ChevronRight } from 'lucide-react'
import { SP_BASE, SP_DEFAULT_SLUG, SP_ITEMS, SP_NAV } from '@/constant/scientific_programs'

export default function ScientificProgramsSidebar() {
    const pathname = usePathname()
    const [open, setOpen] = useState(false)
    const current = pathname === SP_BASE ? SP_DEFAULT_SLUG : pathname.split('/').pop()
    const currentLabel = SP_ITEMS.find((i) => i.slug === current)?.label ?? 'Contents'

    return (
        <aside className='lg:sticky lg:top-22 lg:self-start lg:w-64 shrink-0 border-b lg:border-b-0 lg:border-r border-fun-blue-100 bg-white'>
            {/* Mobile: collapsible contents */}
            <button
                type='button'
                onClick={() => setOpen((o) => !o)}
                aria-expanded={open}
                className='lg:hidden w-full flex items-center justify-between px-5 py-4 text-left cursor-pointer'
            >
                <span className='flex flex-col'>
                    <span className='text-[10px] font-semibold text-fun-blue-900/40 uppercase tracking-widest'>Contents</span>
                    <span className='text-sm font-semibold text-fun-blue-900'>{currentLabel}</span>
                </span>
                <ChevronDown size={18} className={`text-fun-blue-500 transition-transform ${open ? 'rotate-180' : ''}`} />
            </button>

            <nav
                aria-label='Scientific programme contents'
                className={`${open ? 'flex' : 'hidden'} lg:flex flex-col gap-6 px-3 pb-6 lg:py-10 lg:max-h-[calc(100vh-6rem)] lg:overflow-y-auto`}
            >
                {SP_NAV.map((group) => (
                    <div key={group.label}>
                        <p className='text-[10px] font-semibold text-fun-blue-900/30 uppercase tracking-widest mb-1.5 px-2'>
                            {group.label}
                        </p>
                        <div className='flex flex-col gap-0.5'>
                            {group.items.map((item) => {
                                const isActive = item.slug === current
                                return (
                                    <Link
                                        key={item.slug}
                                        href={item.slug === SP_DEFAULT_SLUG ? SP_BASE : `${SP_BASE}/${item.slug}`}
                                        onClick={() => setOpen(false)}
                                        aria-current={isActive ? 'page' : undefined}
                                        className={`flex items-center justify-between gap-2 px-3 py-2 rounded-lg text-[13px] font-medium transition-colors duration-150 ${isActive
                                            ? 'bg-fun-blue-600 text-white'
                                            : 'text-fun-blue-900/60 hover:text-fun-blue-900 hover:bg-fun-blue-100/60'
                                            }`}
                                    >
                                        <span>{item.label}</span>
                                        {isActive && <ChevronRight size={13} className='text-white/60 shrink-0' />}
                                    </Link>
                                )
                            })}
                        </div>
                    </div>
                ))}
            </nav>
        </aside>
    )
}
