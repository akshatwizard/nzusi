'use client'

import Link from 'next/link'
import { motion } from 'motion/react'
import { ArrowUpRight, Clock } from 'lucide-react'
import { CATEGORY_META, Post } from '@/constant/blog'
import { CategoryPill } from './category-pill'

type Props = {
    post: Post
    index: number
}

export function PostCard({ post, index }: Props) {
    const meta = CATEGORY_META[post.category]

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.4, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
            className='h-full'
        >
            <Link
                href={`/blog/${post.slug}`}
                className='group flex flex-col h-full bg-white rounded-xl border border-fun-blue-100 hover:border-fun-blue-200 shadow-sm hover:shadow-md overflow-hidden transition-all duration-250'
                aria-label={`Read: ${post.title}`}
            >
                {/* Colour bar top */}
                <div
                    className='h-1.5 w-full'
                    style={{ background: `linear-gradient(to right, ${meta.accent}, ${meta.accent}55, transparent)` }}
                />

                {/* Visual block */}
                <div className='h-36 relative overflow-hidden bg-fun-blue-950'>
                    <div
                        className='absolute inset-0 opacity-[0.05]'
                        style={{
                            backgroundImage: `linear-gradient(rgba(255,255,255,.9) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.9) 1px,transparent 1px)`,
                            backgroundSize: '24px 24px',
                        }}
                    />
                    <div
                        className='absolute -bottom-8 -right-8 w-36 h-36 rounded-full'
                        style={{ background: `radial-gradient(circle, ${meta.accent}33 0%, transparent 70%)` }}
                    />
                    {/* Abstract glyph */}
                    <div className='absolute inset-0 flex items-center justify-center'>
                        <div className='relative'>
                            <div
                                className='w-14 h-14 rounded-full border opacity-20'
                                style={{ borderColor: meta.accent }}
                            />
                            <div
                                className='absolute inset-3 rounded-full opacity-30'
                                style={{ background: meta.accent }}
                            />
                        </div>
                    </div>
                </div>

                {/* Body */}
                <div className='flex flex-col flex-1 p-5'>
                    <div className='mb-3'>
                        <CategoryPill category={post.category} size='sm' />
                    </div>

                    <h3 className='font-serif text-[17px] leading-snug text-fun-blue-950 mb-2 group-hover:text-fun-blue-700 transition-colors duration-200 flex-1'>
                        {post.title}
                    </h3>

                    <p className='text-fun-blue-700/45 text-[12px] leading-relaxed mb-5 line-clamp-2'>
                        {post.excerpt}
                    </p>

                    {/* Footer row */}
                    <div className='flex items-center justify-between mt-auto pt-4 border-t border-fun-blue-50'>
                        <div className='flex items-center gap-2.5 text-[10px] text-fun-blue-400/50'>
                            <span>{post.date}</span>
                            <span className='w-0.5 h-0.5 rounded-full bg-fun-blue-300/40' />
                            <span className='flex items-center gap-1'>
                                <Clock size={9} />
                                {post.readTime}
                            </span>
                        </div>
                        <ArrowUpRight
                            size={14}
                            className='text-fun-blue-300 group-hover:text-fun-blue-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transform transition-all duration-200'
                        />
                    </div>
                </div>
            </Link>
        </motion.div>
    )
}