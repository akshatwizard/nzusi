'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'motion/react'
import { ArrowUpRight, Clock, Eye, User } from 'lucide-react'
import { BlogPost, CategoryBlogPost } from '@/types/blogs.types'

const ACCENT_PALETTE = [
    '#185FA5',
    '#10b981',
    '#f59e0b',
    '#8b5cf6',
    '#ef4444',
    '#0ea5e9',
]

function getAccent(post: BlogPost | CategoryBlogPost): string {
    const id = 'category' in post && post.category ? post.category.id : 0
    return ACCENT_PALETTE[id % ACCENT_PALETTE.length]
}

export function FeaturedPostCard({ post }: { post: BlogPost | CategoryBlogPost }) {
    const accent = getAccent(post)
    const categoryName = post && 'category' in post && post.category ? post.category.name : null
    const hasImage = Boolean(post.image)

    return (
        <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className='mb-8'
        >
            <Link
                href={`/blogs-and-news/${post.slug}`}
                className='group block rounded-2xl overflow-hidden border border-fun-blue-150 hover:border-fun-blue-200 bg-white shadow-sm hover:shadow-md transition-all duration-300'
                aria-label={`Read featured post: ${post.title}`}
            >
                <div className='flex flex-col lg:flex-row'>

                    <div className='lg:w-[42%] min-h-55 lg:min-h-75 relative overflow-hidden bg-fun-blue-950 shrink-0'>

                        {hasImage ? (
                            <>
                                <Image
                                    src={post.image}
                                    alt={post.title}
                                    fill
                                    sizes='(max-width: 1024px) 100vw, 42vw'
                                    className='object-contain transition-transform duration-700 group-hover:scale-105'
                                    priority
                                />
                                <div className='absolute inset-0 bg-linear-to-t from-fun-blue-950/50 via-transparent to-fun-blue-950/20' />
                            </>
                        ) : (
                            <>
                                <div
                                    className='absolute inset-0 opacity-[0.055]'
                                    style={{
                                        backgroundImage: `linear-gradient(rgba(255,255,255,.9) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.9) 1px,transparent 1px)`,
                                        backgroundSize: '32px 32px',
                                    }}
                                />
                                <div
                                    className='absolute -bottom-16 -right-16 w-64 h-64 rounded-full'
                                    style={{ background: `radial-gradient(circle, ${accent}44 0%, transparent 70%)` }}
                                />
                                <div className='absolute inset-0 flex items-center justify-center'>
                                    <div className='relative'>
                                        <div
                                            className='w-28 h-28 rounded-full border opacity-20'
                                            style={{ borderColor: accent }}
                                        />
                                        <div
                                            className='absolute inset-4 rounded-full border opacity-30'
                                            style={{ borderColor: accent }}
                                        />
                                        <div
                                            className='absolute inset-9 rounded-full opacity-40'
                                            style={{ background: accent }}
                                        />
                                    </div>
                                </div>
                            </>
                        )}

                        <div className='absolute top-4 left-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white text-[10px] font-semibold px-3 py-1 rounded-full tracking-widest uppercase'>
                            Featured
                        </div>
                    </div>

                    {/* ── Content panel ── */}
                    <div className='flex flex-col justify-between p-7 lg:p-10 flex-1'>
                        <div>
                            {categoryName && (
                                <div className='mb-4'>
                                    <span
                                        className='inline-block text-[10px] font-semibold px-2.5 py-1 rounded-full border'
                                        style={{
                                            color: accent,
                                            borderColor: `${accent}33`,
                                            background: `${accent}10`,
                                        }}
                                    >
                                        {categoryName}
                                    </span>
                                </div>
                            )}

                            <h2 className='font-serif text-2xl lg:text-3xl text-fun-blue-950 leading-tight mb-4 group-hover:text-fun-blue-700 transition-colors duration-200'>
                                {post.title}
                            </h2>

                            {post.short_content && (
                                <p className='text-fun-blue-800/55 text-[14px] leading-relaxed max-w-lg line-clamp-3'>
                                    {post.short_content}
                                </p>
                            )}
                        </div>

                        <div className='flex items-center justify-between mt-8 pt-5 border-t border-fun-blue-100'>
                            <div className='flex items-center gap-4 text-[11px] text-fun-blue-400/60 flex-wrap'>
                                {post.view_count && (
                                    <span className='flex items-center gap-1.5'>
                                        <Eye size={11} />
                                        {post.view_count}
                                    </span>
                                )}
                                {post.published_at && (
                                    <span>{post.published_at}</span>
                                )}
                                {post.reading_title && (
                                    <span className='flex items-center gap-1'>
                                        <Clock size={11} />
                                        {post.reading_title}
                                    </span>
                                )}
                            </div>

                            <div className='flex items-center gap-1.5 text-[12px] font-semibold text-fun-blue-600 group-hover:text-fun-blue-700 transition-colors shrink-0'>
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