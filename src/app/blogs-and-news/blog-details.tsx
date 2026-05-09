'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Section, Wrapper } from '@/components/ui/sections'
import { POSTS } from '@/constant/blog'
import { FeaturedPostCard } from '@/components/blog-feature-post-card'
import { PostCard } from '@/components/blog-post-card'
import { CategoryFilter } from '@/components/category-filter'
import { BlogSidebar } from '@/components/blog-sidebar'
import { useInfiniteQuery } from '@tanstack/react-query'
import { blog } from '@/services/blog'
import { AllBlogsResponse, BlogPost, CategoryBlogPost, CategoryBlogsResponse } from '@/types/blogs.types'
import { Loader2 } from 'lucide-react'

type Filter = 'All' | 'Events' | 'Adyatan' | 'Academic'

const fadeUp = {
    hidden: { opacity: 0, y: 18 },
    show: (d = 0) => ({
        opacity: 1, y: 0,
        transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const, delay: d },
    }),
}

export default function BlogPageClient() {
    const [activeFilter, setActiveFilter] = useState<string>('all')

    const allQuery = useInfiniteQuery<AllBlogsResponse>({
        queryKey: ['blogs', 'all'],
        queryFn: ({ pageParam }) => blog.getDefaultBlogs({ pageParam: pageParam as number }),
        initialPageParam: 1,
        getNextPageParam: (lastPage) => lastPage.pagination.has_next_page
            ? lastPage.pagination.current_page + 1
            : undefined,
        enabled: activeFilter === 'all',
    })

    const categoryQuery = useInfiniteQuery<CategoryBlogsResponse>({
        queryKey: ['blogs', activeFilter],
        queryFn: ({ pageParam }) => blog.getBlogsByCategory({ pageParam: pageParam as number, slug: activeFilter }),
        initialPageParam: 1,
        getNextPageParam: (lastPage) => lastPage.pagination.has_next_page
            ? lastPage.pagination.current_page + 1
            : undefined,
        enabled: activeFilter !== 'all',
    })

    const isAll = activeFilter === 'all'
    const activeQuery = isAll ? allQuery : categoryQuery
    const { isLoading, isError, fetchNextPage, hasNextPage, isFetchingNextPage } = activeQuery

    const posts: Array<BlogPost | CategoryBlogPost> = isAll
        ? (allQuery.data?.pages.flatMap((p) => p.data) ?? [])
        : (categoryQuery.data?.pages.flatMap((p) => p.data) ?? [])

    const featured = posts[0] ?? null
    const rest = posts.slice(1)

    return (
        <>
            <Section className='bg-fun-blue-950 px-0! relative overflow-hidden'>
                <div
                    className='absolute inset-0 opacity-[0.03] pointer-events-none'
                    style={{
                        backgroundImage: `linear-gradient(rgba(255,255,255,.8) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.8) 1px,transparent 1px)`,
                        backgroundSize: '36px 36px',
                    }}
                />
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
                        <motion.div
                            initial='hidden' animate='show' custom={0} variants={fadeUp}
                            className='flex items-center gap-2.5 mb-5'
                        >
                            <div className='h-px w-5 bg-fun-blue-500/50' />
                            <span className='text-fun-blue-400/55 text-[11px] font-medium tracking-widest uppercase'>
                                Knowledge Hub
                            </span>
                        </motion.div>

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

                        <motion.div
                            initial='hidden' animate='show' custom={0.2} variants={fadeUp}
                            className='flex items-center gap-2 flex-wrap mt-6'
                        >
                            {['events', 'adyatan', 'residents', 'surgery-library'].map((slug) => (
                                <button
                                    key={slug}
                                    onClick={() => setActiveFilter(slug)}
                                    className='text-[11px] font-medium text-fun-blue-300/55 border border-white/8 hover:border-white/20 hover:text-fun-blue-200/80 rounded-full px-3 py-1 transition-all duration-200 cursor-pointer capitalize'
                                >
                                    {slug.replace('-', ' ')}
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

                        <div className='flex-1 min-w-0'>
                            {isLoading ? (
                                // Skeleton
                                <div className='mb-8 rounded-2xl overflow-hidden border border-fun-blue-100 bg-white shadow-sm'>
                                    <div className='flex flex-col lg:flex-row'>
                                        {/* Image panel */}
                                        <div className='lg:w-[42%] min-h-55 lg:min-h-65 bg-fun-blue-100/60 animate-pulse shrink-0' />

                                        {/* Content panel */}
                                        <div className='flex flex-col justify-between p-7 lg:p-10 flex-1'>
                                            <div className='space-y-4'>
                                                {/* Category pill */}
                                                <div className='h-5 w-20 rounded-full bg-fun-blue-100/80 animate-pulse' />
                                                {/* Title */}
                                                <div className='space-y-2'>
                                                    <div className='h-7 w-full rounded-lg bg-fun-blue-100/80 animate-pulse' />
                                                    <div className='h-7 w-3/4 rounded-lg bg-fun-blue-100/80 animate-pulse' />
                                                </div>
                                                {/* Excerpt lines */}
                                                <div className='space-y-2 pt-1'>
                                                    <div className='h-4 w-full rounded bg-fun-blue-50/80 animate-pulse' />
                                                    <div className='h-4 w-full rounded bg-fun-blue-50/80 animate-pulse' />
                                                    <div className='h-4 w-2/3 rounded bg-fun-blue-50/80 animate-pulse' />
                                                </div>
                                            </div>

                                            {/* Footer */}
                                            <div className='flex items-center justify-between mt-8 pt-5 border-t border-fun-blue-50'>
                                                <div className='flex items-center gap-3'>
                                                    <div className='h-3.5 w-20 rounded bg-fun-blue-100/60 animate-pulse' />
                                                    <div className='h-3.5 w-16 rounded bg-fun-blue-100/60 animate-pulse' />
                                                    <div className='h-3.5 w-14 rounded bg-fun-blue-100/60 animate-pulse' />
                                                </div>
                                                <div className='h-4 w-20 rounded bg-fun-blue-100/60 animate-pulse' />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : featured ? (
                                <FeaturedPostCard post={featured} />
                            ) : null}

                            <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6'>
                                <CategoryFilter
                                    active={activeFilter}
                                    onChange={setActiveFilter}
                                />
                                <span className='text-[11px] text-fun-blue-400/50 shrink-0'>
                                    {isLoading
                                        ? '…'
                                        : `${posts.length} post${posts.length !== 1 ? 's' : ''}`
                                    }
                                </span>

                            </div>

                            {/* Grid */}
                            <AnimatePresence mode='popLayout'>
                                {isLoading ? (
                                    <motion.div
                                        key='skeleton'
                                        className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5'
                                    >
                                        {Array.from({ length: 6 }).map((_, i) => (
                                            <div
                                                key={i}
                                                className='h-64 rounded-2xl bg-fun-blue-100/60 animate-pulse'
                                            />
                                        ))}
                                    </motion.div>
                                ) : isError ? (
                                    <motion.div
                                        key='error'
                                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                        className='py-20 text-center text-sm text-red-400/60'
                                    >
                                        Failed to load posts. Please try again.
                                    </motion.div>
                                ) : rest.length > 0 ? (
                                    <motion.div
                                        key={activeFilter}
                                        className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5'
                                    >
                                        {rest.map((post, i) => (
                                            <PostCard key={post.slug} post={post} index={i} />
                                        ))}
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key='empty'
                                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                        className='py-20 text-center'
                                    >
                                        <div className='text-fun-blue-300/40 text-sm'>
                                            No posts in this category yet.
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {hasNextPage && (
                                <div className='mt-10 flex justify-center'>
                                    <button
                                        onClick={() => fetchNextPage()}
                                        disabled={isFetchingNextPage}
                                        className='flex items-center gap-2.5 text-[12px] font-semibold text-fun-blue-700/60 border border-fun-blue-200 hover:border-fun-blue-300 hover:text-fun-blue-800 rounded-full px-6 py-2.5 transition-all duration-200 disabled:opacity-60'
                                    >
                                        {isFetchingNextPage ? (
                                            <>
                                                <Loader2 size={13} className='animate-spin text-fun-blue-500' />
                                                Loading…
                                            </>
                                        ) : (
                                            'Load more posts'
                                        )}
                                    </button>
                                </div>
                            )}
                        </div>

                        <BlogSidebar />
                    </div>

                </Wrapper>
            </Section>
        </>
    )
}