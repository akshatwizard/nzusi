'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ExternalLink, BookOpen, CalendarDays, GraduationCap } from 'lucide-react'
import { Category, POSTS } from '@/constant/blog'

const SIDEBAR_CATEGORIES: { cat: Category; icon: React.ReactNode; desc: string }[] = [
    {
        cat: 'Events',
        icon: <CalendarDays size={14} />,
        desc: 'Conferences, workshops & CME events',
    },
    {
        cat: 'Adyatan',
        icon: <BookOpen size={14} />,
        desc: 'Clinical literature rapid reviews',
    },
    {
        cat: 'Academic',
        icon: <GraduationCap size={14} />,
        desc: 'Academic series & publications',
    },
]

const RECENT = POSTS.slice(0, 3)

export function BlogSidebar() {
    const [email, setEmail] = useState('')
    const [submitted, setSubmitted] = useState(false)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (email) setSubmitted(true)
    }

    return (
        <aside className='flex flex-col gap-6 lg:w-64 xl:w-72 shrink-0'>

            {/* Categories */}
            <div className='bg-white rounded-xl border border-fun-blue-100 overflow-hidden'>
                <div className='px-5 py-4 border-b border-fun-blue-50'>
                    <h3 className='font-serif text-[16px] text-fun-blue-950'>Categories</h3>
                </div>
                <div className='p-3 flex flex-col gap-1'>
                    {SIDEBAR_CATEGORIES.map(({ cat, icon, desc }) => {
                        const count = POSTS.filter((p) => p.category === cat).length
                        return (
                            <div
                                key={cat}
                                className='flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-fun-blue-50 transition-colors duration-150 cursor-pointer group'
                            >
                                <div className='w-7 h-7 rounded-lg bg-fun-blue-50 border border-fun-blue-100 flex items-center justify-center text-fun-blue-500 group-hover:bg-fun-blue-600 group-hover:text-white group-hover:border-fun-blue-600 transition-all duration-150'>
                                    {icon}
                                </div>
                                <div className='flex-1 min-w-0'>
                                    <div className='text-[12px] font-semibold text-fun-blue-900'>{cat}</div>
                                    <div className='text-[10px] text-fun-blue-400/60 truncate'>{desc}</div>
                                </div>
                                <span className='text-[11px] font-semibold text-fun-blue-400/50'>
                                    {count}
                                </span>
                            </div>
                        )
                    })}
                </div>
            </div>

            {/* Recent posts */}
            <div className='bg-white rounded-xl border border-fun-blue-100 overflow-hidden'>
                <div className='px-5 py-4 border-b border-fun-blue-50'>
                    <h3 className='font-serif text-[16px] text-fun-blue-950'>Recent Posts</h3>
                </div>
                <div className='p-3 flex flex-col gap-1'>
                    {RECENT.map((post) => (
                        <Link
                            key={post.slug}
                            href={`/blog/${post.slug}`}
                            className='flex flex-col gap-1 px-3 py-3 rounded-lg hover:bg-fun-blue-50 transition-colors duration-150 group'
                        >
                            <span className='text-[11px] font-semibold text-fun-blue-600/70 group-hover:text-fun-blue-600'>
                                {post.category}
                            </span>
                            <span className='text-[12px] font-medium text-fun-blue-900 leading-snug line-clamp-2 group-hover:text-fun-blue-700'>
                                {post.title}
                            </span>
                            <span className='text-[10px] text-fun-blue-400/50'>{post.date}</span>
                        </Link>
                    ))}
                </div>
            </div>

            {/* NZUSICON promo */}
            <div className='relative rounded-xl bg-fun-blue-950 overflow-hidden p-5'>
                <div
                    className='absolute inset-0 opacity-[0.04]'
                    style={{
                        backgroundImage: `linear-gradient(rgba(255,255,255,.9) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.9) 1px,transparent 1px)`,
                        backgroundSize: '24px 24px',
                    }}
                />
                <div
                    className='absolute -bottom-8 -right-8 w-32 h-32 rounded-full'
                    style={{ background: 'radial-gradient(circle, rgba(24,95,165,0.5) 0%, transparent 70%)' }}
                />
                <div className='relative z-10'>
                    <div className='flex items-center gap-1.5 mb-3'>
                        <div className='w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse' />
                        <span className='text-[10px] font-medium text-fun-blue-300/60 uppercase tracking-widest'>
                            Upcoming
                        </span>
                    </div>
                    <div className='font-serif text-lg text-fun-blue-50 leading-snug mb-1'>
                        NZUSICON 2026
                    </div>
                    <div className='text-fun-blue-300/55 text-[12px] mb-4'>
                        Nov 27–29 · Amritsar, Punjab
                    </div>
                    <a
                        href='#'
                        className='inline-flex items-center gap-1.5 text-[11px] font-semibold text-fun-blue-50 bg-fun-blue-600 hover:bg-fun-blue-500 px-3 py-1.5 rounded-lg transition-colors duration-200'
                    >
                        Register Now
                        <ExternalLink size={10} />
                    </a>
                </div>
            </div>

            {/* Newsletter */}
            <div className='bg-white rounded-xl border border-fun-blue-100 p-5'>
                <h3 className='font-serif text-[16px] text-fun-blue-950 mb-1'>Stay Updated</h3>
                <p className='text-fun-blue-700/50 text-[12px] leading-relaxed mb-4'>
                    Get NZUSI news, Adyatan reviews and event alerts in your inbox.
                </p>
                {submitted ? (
                    <div className='text-emerald-600 text-[12px] font-medium py-2'>
                        ✓ You're on the list!
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className='flex flex-col gap-2'>
                        <input
                            type='email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder='your@email.com'
                            className='w-full text-[12px] px-3 py-2.5 rounded-lg border border-fun-blue-150 bg-fun-blue-50/50 text-fun-blue-900 placeholder:text-fun-blue-300/60 focus:outline-none focus:ring-2 focus:ring-fun-blue-400/30 focus:border-fun-blue-300 transition-all duration-150'
                            required
                        />
                        <button
                            type='submit'
                            className='w-full text-[12px] font-semibold bg-fun-blue-600 hover:bg-fun-blue-500 text-white py-2.5 rounded-lg transition-colors duration-200'
                        >
                            Subscribe
                        </button>
                    </form>
                )}
            </div>
        </aside>
    )
}