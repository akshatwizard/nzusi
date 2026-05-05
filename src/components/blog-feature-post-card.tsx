'use client'

import Link from 'next/link'
import { motion } from 'motion/react'
import { ArrowUpRight, Clock, User } from 'lucide-react'
import { CATEGORY_META, Post } from '@/constant/blog'
import { CategoryPill } from './category-pill'

export function FeaturedPostCard({ post }: { post: Post }) {
    const meta = CATEGORY_META[post.category]

    return (
        <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className='mb-8'
        >
            <Link
                href={`/blog/${post.slug}`}
                className='group block rounded-2xl overflow-hidden border border-fun-blue-150 hover:border-fun-blue-200 bg-white shadow-sm hover:shadow-md transition-all duration-300'
                aria-label={`Read featured post: ${post.title}`}
            >
                <div className='flex flex-col lg:flex-row'>

                    {/* Image / visual block */}
                    <div className='lg:w-[42%] min-h-55 lg:min-h-75 relative overflow-hidden bg-fun-blue-950 shrink-0'>

                        {/* Grid texture */}
                        <div
                            className='absolute inset-0 opacity-[0.055]'
                            style={{
                                backgroundImage: `linear-gradient(rgba(255,255,255,.9) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.9) 1px,transparent 1px)`,
                                backgroundSize: '32px 32px',
                            }}
                        />

                        {/* Orb */}
                        <div
                            className='absolute -bottom-16 -right-16 w-64 h-64 rounded-full'
                            style={{ background: `radial-gradient(circle, ${meta.accent}44 0%, transparent 70%)` }}
                        />

                        {/* Abstract glyph */}
                        <div className='absolute inset-0 flex items-center justify-center'>
                            <div className='relative'>
                                <div
                                    className='w-28 h-28 rounded-full border opacity-20'
                                    style={{ borderColor: meta.accent }}
                                />
                                <div
                                    className='absolute inset-4 rounded-full border opacity-30'
                                    style={{ borderColor: meta.accent }}
                                />
                                <div
                                    className='absolute inset-9 rounded-full opacity-40'
                                    style={{ background: meta.accent }}
                                />
                            </div>
                        </div>

                        {/* Featured badge */}
                        <div className='absolute top-4 left-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white text-[10px] font-semibold px-3 py-1 rounded-full tracking-widest uppercase'>
                            Featured
                        </div>
                    </div>

                    {/* Content */}
                    <div className='flex flex-col justify-between p-7 lg:p-10 flex-1'>
                        <div>
                            <div className='mb-4'>
                                <CategoryPill category={post.category} />
                            </div>

                            <h2 className='font-serif text-2xl lg:text-3xl text-fun-blue-950 leading-tight mb-4 group-hover:text-fun-blue-700 transition-colors duration-200'>
                                {post.title}
                            </h2>

                            <p className='text-fun-blue-800/55 text-[14px] leading-relaxed max-w-lg'>
                                {post.excerpt}
                            </p>
                        </div>

                        <div className='flex items-center justify-between mt-8 pt-5 border-t border-fun-blue-100'>
                            <div className='flex items-center gap-4 text-[11px] text-fun-blue-400/60'>
                                {post.author && (
                                    <span className='flex items-center gap-1.5'>
                                        <User size={11} />
                                        {post.author}
                                    </span>
                                )}
                                <span>{post.date}</span>
                                <span className='flex items-center gap-1'>
                                    <Clock size={11} />
                                    {post.readTime}
                                </span>
                            </div>

                            <div className='flex items-center gap-1.5 text-[12px] font-semibold text-fun-blue-600 group-hover:text-fun-blue-700 transition-colors'>
                                Read post
                                <ArrowUpRight
                                    size={14}
                                    className='transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5'
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        </motion.div>
    )
}