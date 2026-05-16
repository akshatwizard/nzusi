'use client'

import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'motion/react'
import Link from 'next/link'
import { ArrowRight, Clock, ArrowUpRight } from 'lucide-react'
import { Section, Wrapper } from './ui/sections'
import { useQuery } from '@tanstack/react-query'
import { blog } from '@/services/blog'
import { AllBlogsResponse, BlogPost } from '@/types/blogs.types'
import Image from 'next/image'
import { FeaturedPostCard } from './blog-feature-post-card'
import { PostCard } from './blog-post-card'


export default function BlogSection() {
    const ref = useRef<HTMLDivElement>(null)
    const inView = useInView(ref, { once: true, margin: '-60px' })

    const fadeUp = {
        hidden: { opacity: 0, y: 20 },
        show: (d = 0) => ({
            opacity: 1, y: 0,
            transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const, delay: d },
        }),
    }

    const { data, isLoading, isFetching } = useQuery<AllBlogsResponse>({
        queryKey: ['blogs', 'all', "homepage"],
        queryFn: () => blog.getDefaultBlogs({ pageParam: 1 })
    })

    const featured = data?.data[0] ?? null
    const rest = data?.data.slice(1, 5)

    return (
        <Section
            ref={ref}
            className="relative w-full bg-fun-blue-950 overflow-hidden"
            aria-label="NZUSI blog posts and news"
        >
            <>
                {/* Faint dot grid background */}
                <div
                    className="absolute inset-0 opacity-20 pointer-events-none"
                    style={{
                        backgroundImage: 'radial-gradient(circle, rgba(194,220,245,1) 1px, transparent 1px)',
                        backgroundSize: '32px 32px',
                    }}
                />

                {/* Subtle top-left orb */}
                <div
                    className="absolute -top-40 -left-40 w-96 h-96 rounded-full pointer-events-none"
                    style={{ background: 'radial-gradient(circle, rgba(24,95,165,0.3) 0%, transparent 70%)' }}
                />
            </>

            <Wrapper className="gap-0!">

                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
                    <div>
                        <motion.div
                            initial="hidden" animate={inView ? 'show' : 'hidden'} custom={0}
                            variants={fadeUp}
                            className="flex items-center gap-2.5 mb-4"
                        >
                            <div className="h-px w-5 bg-fun-blue-500/50" />
                            <span className="text-fun-blue-400/60 text-[11px] font-medium tracking-widest uppercase">
                                Latest from NZUSI
                            </span>
                        </motion.div>
                        <motion.h2
                            initial="hidden" animate={inView ? 'show' : 'hidden'} custom={0.07}
                            variants={fadeUp}
                            className="font-serif text-3xl lg:text-4xl text-fun-blue-50 leading-tight"
                        >
                            Events, Research &{' '}
                            <em className="text-fun-blue-400">Academic Updates</em>
                        </motion.h2>
                    </div>

                    {/* View all link */}
                    <motion.div
                        initial="hidden" animate={inView ? 'show' : 'hidden'} custom={0.1}
                        variants={fadeUp}
                    >
                        <Link
                            href="/blog"
                            className="group inline-flex items-center gap-2 text-[12px] font-semibold text-fun-blue-400/70 hover:text-fun-blue-300 border border-white/8 hover:border-white/18 rounded-lg px-4 py-2.5 transition-all duration-200"
                        >
                            View all posts
                            <ArrowRight size={13} className="transition-transform duration-200 group-hover:translate-x-0.5" />
                        </Link>
                    </motion.div>
                </div>

                {/* Featured post */}
                <motion.div
                    initial="hidden" animate={inView ? 'show' : 'hidden'} custom={0.18}
                    variants={fadeUp}
                >
                    {(isLoading || isFetching) ? (
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
                </motion.div>

                {/* Grid */}
                <AnimatePresence mode="popLayout">
                    {isLoading ? (
                        <motion.div
                            key='skeleton'
                            className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 md:grid-cols-3 gap-3'
                        >
                            {Array.from({ length: 4 }).map((_, i) => (
                                <div
                                    key={i}
                                    className='h-64 rounded-2xl bg-fun-blue-100/60 animate-pulse'
                                />
                            ))}
                        </motion.div>
                    ) : (
                        rest && rest.length > 0 && (
                            <motion.div
                                className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 md:grid-cols-3 gap-3'
                            >
                                {rest.map((post, i) => (
                                    <PostCard key={post.slug} post={post} index={i} />
                                ))}
                            </motion.div>
                        )
                    )}
                </AnimatePresence>

            </Wrapper>
        </Section>
    )
}