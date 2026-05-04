'use client'

import { ComponentType, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Section, Wrapper } from '@/components/ui/sections'
import { About_Tab } from '@/constant/about_tabs'
import AboutSidebar from '@/components/about-sidebar'

const DEFAULT = About_Tab[0]?.items?.[0]?.component

export default function AboutPageClient() {
    const [ActiveComponent, setActiveComponent] = useState<ComponentType>(() => DEFAULT);

    const handleSelect = (component: ComponentType) => {
        setActiveComponent(() => component)
    }
    const activeLabel = About_Tab.flatMap((g) => g.items).find((item) => item.component === ActiveComponent)?.label ?? ''

    return (
        <>
            <Section className='bg-fun-blue-950 px-0! relative overflow-hidden'>

                {/* Grid texture */}
                <div
                    className='absolute inset-0 opacity-[0.03] pointer-events-none'
                    style={{
                        backgroundImage: `linear-gradient(rgba(255,255,255,.8) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.8) 1px,transparent 1px)`,
                        backgroundSize: '36px 36px',
                    }}
                />
                {/* Orb */}
                <div
                    className='absolute -right-16 -bottom-16 w-72 h-72 rounded-full pointer-events-none'
                    style={{ background: 'radial-gradient(circle, rgba(24,95,165,0.28) 0%, transparent 70%)' }}
                />

                <Wrapper className='lg:pt-40 pt-36 md:pt-38 pb-12! px-6 md:px-8 lg:px-12 relative z-10'>
                    <div className='flex flex-col gap-3'>
                        <div className='flex items-center gap-2.5'>
                            <div className='h-px w-5 bg-fun-blue-500/50' />
                            <span className='text-fun-blue-400/55 text-[11px] font-medium tracking-widest uppercase'>
                                North Zone · USI
                            </span>
                        </div>

                        <h1 className='font-serif text-4xl md:text-5xl lg:text-6xl text-fun-blue-50 leading-[1.08]'>
                            About{' '}
                            <em className='italic text-fun-blue-400'>NZUSI</em>
                        </h1>

                        <p className='text-fun-blue-200/45 text-sm leading-relaxed max-w-xl mt-1'>
                            The North Zone chapter of the Urological Society of India — connecting
                            specialists, shaping policy and advancing excellence in urological care since 1997.
                        </p>
                    </div>

                    {/* Breadcrumb */}
                    <div className='flex items-center gap-2 mt-6 text-[11px] text-fun-blue-400/40'>
                        <span>About</span>
                        <span>/</span>
                        <motion.span
                            key={activeLabel}
                            initial={{ opacity: 0, x: -6 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.25 }}
                            className='text-fun-blue-300/60'
                        >
                            {activeLabel}
                        </motion.span>
                    </div>
                </Wrapper>

                {/* Bottom separator */}
                <div className='absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-fun-blue-700/40 to-transparent' />
            </Section>

            {/* ── Sidebar + content ── */}
            <Section className='bg-transparent! px-0!'>
                <Wrapper className='py-0! gap-0! px-0'>
                    <div className='flex flex-col lg:flex-row min-h-[70vh]'>

                        <AboutSidebar
                            active={ActiveComponent}
                            onSelect={handleSelect}
                        />

                        {/* Content panel with fade transition */}
                        <div className='flex-1 px-6 md:px-8 lg:px-10 py-10 lg:py-12 overflow-hidden'>
                            <AnimatePresence mode='wait'>
                                <motion.div
                                    key={activeLabel}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -6 }}
                                    transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                                >
                                    <ActiveComponent />
                                </motion.div>
                            </AnimatePresence>
                        </div>

                    </div>
                </Wrapper>
            </Section>
        </>
    )
}