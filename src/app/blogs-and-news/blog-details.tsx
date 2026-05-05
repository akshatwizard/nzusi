'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Section, Wrapper } from '@/components/ui/sections'
import { POSTS } from '@/constant/blog'
import { FeaturedPostCard } from '@/components/blog-feature-post-card'
import { PostCard } from '@/components/blog-post-card'
import { CategoryFilter } from '@/components/category-filter'
import { BlogSidebar } from '@/components/blog-sidebar'

type Filter = 'All' | 'Events' | 'Adyatan' | 'Academic'

const fadeUp = {
    hidden: { opacity: 0, y: 18 },
    show: (d = 0) => ({
        opacity: 1, y: 0,
        transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const, delay: d },
    }),
}

export default function BlogPageClient() {
    const [activeFilter, setActiveFilter] = useState<Filter>('All')

    const featured = POSTS.find((p) => p.featured)!
    const rest = POSTS.filter((p) => !p.featured)

    const filtered = useMemo(
        () => activeFilter === 'All' ? rest : rest.filter((p) => p.category === activeFilter),
        [activeFilter, rest]
    )

    // Count per category for filter badges
    const counts = useMemo(() => ({
        All: rest.length,
        Events: rest.filter((p) => p.category === 'Events').length,
        Adyatan: rest.filter((p) => p.category === 'Adyatan').length,
        Academic: rest.filter((p) => p.category === 'Academic').length,
    }), [rest])

    return (
        <>
            {/* ── Dark page hero ── */}
            <Section className='bg-fun-blue-950 px-0! relative overflow-hidden'>

                {/* Bg texture */}
                <div
                    className='absolute inset-0 opacity-[0.03] pointer-events-none'
                    style={{
                        backgroundImage: `linear-gradient(rgba(255,255,255,.8) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.8) 1px,transparent 1px)`,
                        backgroundSize: '36px 36px',
                    }}
                />

                {/* Orbs */}
                <div
                    className='absolute -right-20 -bottom-20 w-80 h-80 rounded-full pointer-events-none'
                    style={{ background: 'radial-gradient(circle, rgba(24,95,165,0.25) 0%, transparent 70%)' }}
                />
                <div
                    className='absolute left-1/3 -top-10 w-48 h-48 rounded-full pointer-events-none'
                    style={{ background: 'radial-gradient(circle, rgba(55,138,221,0.1) 0%, transparent 70%)' }}
                />

                <Wrapper className='lg:pt-40 pt-36 md:pt-38 pb-14! px-6 md:px-8 lg:px-12 relative z-10'>
                    <div className='max-w-2xl'>
                        {/* Eyebrow */}
                        <motion.div
                            initial='hidden' animate='show' custom={0} variants={fadeUp}
                            className='flex items-center gap-2.5 mb-5'
                        >
                            <div className='h-px w-5 bg-fun-blue-500/50' />
                            <span className='text-fun-blue-400/55 text-[11px] font-medium tracking-widest uppercase'>
                                Knowledge Hub
                            </span>
                        </motion.div>

                        {/* Heading */}
                        <motion.h1
                            initial='hidden' animate='show' custom={0.07} variants={fadeUp}
                            className='font-serif text-4xl md:text-5xl lg:text-6xl text-fun-blue-50 leading-[1.08] mb-4'
                        >
                            Blog &{' '}
                            <em className='not-italic text-fun-blue-400'>News</em>
                        </motion.h1>

                        <motion.p
                            initial='hidden' animate='show' custom={0.14} variants={fadeUp}
                            className='text-fun-blue-200/45 text-[14px] leading-relaxed'
                        >
                            Events, clinical literature reviews (Adyatan) and academic updates
                            from the North Zone Urological Society of India.
                        </motion.p>

                        {/* Category pills as quick-links */}
                        <motion.div
                            initial='hidden' animate='show' custom={0.2} variants={fadeUp}
                            className='flex items-center gap-2 flex-wrap mt-6'
                        >
                            {(['Events', 'Adyatan', 'Academic'] as const).map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setActiveFilter(cat)}
                                    className='text-[11px] font-medium text-fun-blue-300/55 border border-white/8 hover:border-white/2 hover:text-fun-blue-200/80 rounded-full px-3 py-1 transition-all duration-200 cursor-pointer'
                                >
                                    {cat}
                                </button>
                            ))}
                        </motion.div>
                    </div>
                </Wrapper>

                {/* Bottom edge */}
                <div className='absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-fun-blue-700/40 to-transparent' />
            </Section>

            {/* ── Main content ── */}
            <Section className='bg-[#F7F6F2]! px-0!'>
                <Wrapper className='px-6 md:px-8 lg:px-12 py-12! lg:py-16!'>

                    <div className='flex flex-col lg:flex-row gap-10 xl:gap-14'>

                        {/* Left — posts */}
                        <div className='flex-1 min-w-0'>

                            {/* Featured */}
                            <FeaturedPostCard post={featured} />

                            {/* Filter + grid header */}
                            <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6'>
                                <CategoryFilter
                                    active={activeFilter}
                                    counts={counts}
                                    onChange={setActiveFilter}
                                />
                                <span className='text-[11px] text-fun-blue-400/50 shrink-0'>
                                    {filtered.length} post{filtered.length !== 1 ? 's' : ''}
                                </span>
                            </div>

                            {/* Grid */}
                            <AnimatePresence mode='popLayout'>
                                {filtered.length > 0 ? (
                                    <motion.div
                                        key={activeFilter}
                                        className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5'
                                    >
                                        {filtered.map((post, i) => (
                                            <PostCard key={post.slug} post={post} index={i} />
                                        ))}
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key='empty'
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className='py-20 text-center'
                                    >
                                        <div className='text-fun-blue-300/40 text-sm'>
                                            No posts in this category yet.
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Right — sidebar */}
                        <BlogSidebar />
                    </div>

                </Wrapper>
            </Section>
        </>
    )
}