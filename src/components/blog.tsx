'use client'

import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'motion/react'
import Link from 'next/link'
import { ArrowRight, Clock, ArrowUpRight } from 'lucide-react'
import { Section, Wrapper } from './ui/sections'

export type Post = {
    slug: string
    title: string
    excerpt: string
    category: 'Events' | 'Adyatan' | 'Academic'
    date: string
    readTime: string
    featured?: boolean
    accentColor: string          // tailwind bg class for the image placeholder
    accentText: string           // tailwind text class
}

const POSTS: Post[] = [
    {
        slug: 'nzusi-midterm-live-workshop-may-2026-karnal',
        title: 'NZUSI Midterm Live Workshop May 2026, Karnal',
        excerpt:
            'Hands-on live surgery workshop bringing together North Zone urologists for skill enhancement, case demonstrations and faculty-led technique sessions.',
        category: 'Events',
        date: 'Mar 2026',
        readTime: '1 min read',
        featured: true,
        accentColor: 'bg-fun-blue-900',
        accentText: 'text-fun-blue-300',
    },
    {
        slug: 'rapid-review-of-robotic-instruments',
        title: 'Rapid Review of Robotic Instruments',
        excerpt:
            'A concise review of the latest robotic systems in urology — da Vinci, Hugo and Versius — comparing capabilities, learning curves and clinical outcomes.',
        category: 'Adyatan',
        date: 'Oct 4, 2025',
        readTime: '1 min read',
        accentColor: 'bg-fun-blue-800',
        accentText: 'text-fun-blue-200',
    },
    {
        slug: 'immediate-second-resection-during-turbt',
        title: 'Immediate Second Resection During TURBT',
        excerpt:
            'A RCT comparing re-stage TURBT vs immediate second resection for detection of deep muscle invasion in non-muscle-invasive bladder cancer.',
        category: 'Adyatan',
        date: 'Oct 4, 2025',
        readTime: '2 min read',
        accentColor: 'bg-fun-blue-800',
        accentText: 'text-fun-blue-200',
    },
    {
        slug: 'uro-vista-nzusi-scientific-magazine',
        title: 'URO-Vista — NZUSI Scientific Magazine',
        excerpt:
            'The official scientific magazine of NZUSI. URO-Vista brings peer-reviewed articles, case reports and expert commentary to the North Zone community.',
        category: 'Academic',
        date: 'Mar 2026',
        readTime: '1 min read',
        accentColor: 'bg-fun-blue-900',
        accentText: 'text-fun-blue-300',
    },
    {
        slug: 'copy-of-urology-across-the-globe',
        title: 'Urology in 2026 — Global Conference Calendar',
        excerpt:
            'Full calendar of national and international urology conferences, workshops and CME events scheduled throughout 2026 — including NZUSICON in Amritsar.',
        category: 'Events',
        date: 'Jan 2026',
        readTime: '1 min read',
        accentColor: 'bg-fun-blue-900',
        accentText: 'text-fun-blue-300',
    },
    {
        slug: 'nzusi-academic-series',
        title: 'ASCENT — NZUSI Academic Series Launch',
        excerpt:
            'North Zone launches its flagship digital academic series: live Zoom CMEs, case discussions and expert sessions open to all NZUSI members.',
        category: 'Academic',
        date: 'Jan 2026',
        readTime: '1 min read',
        accentColor: 'bg-fun-blue-900',
        accentText: 'text-fun-blue-300',
    },
]

const CATEGORIES = ['All', 'Events', 'Adyatan', 'Academic'] as const
type Category = (typeof CATEGORIES)[number]

const CATEGORY_STYLES: Record<string, { pill: string; tag: string }> = {
    Events: { pill: 'bg-fun-blue-600/20 text-fun-blue-300 border-fun-blue-400/25', tag: 'bg-fun-blue-600/15 text-fun-blue-400' },
    Adyatan: { pill: 'bg-emerald-900/30 text-emerald-400 border-emerald-500/20', tag: 'bg-emerald-900/20 text-emerald-400' },
    Academic: { pill: 'bg-amber-900/25 text-amber-400 border-amber-500/20', tag: 'bg-amber-900/15 text-amber-400' },
}

/* ─── Featured post (big card top) ─────────────────────── */
function FeaturedPost({ post }: { post: Post }) {
    const styles = CATEGORY_STYLES[post.category]
    return (
        <Link
            href={`/blog/${post.slug}`}
            className="group relative flex flex-col md:flex-row gap-0 rounded-2xl overflow-hidden border border-white/[0.07] hover:border-white/[0.14] transition-colors duration-300 mb-4"
            aria-label={`Read featured post: ${post.title}`}
        >
            {/* Image placeholder */}
            <div className={`${post.accentColor} md:w-2/5 min-h-45 md:min-h-60 relative overflow-hidden shrink-0`}>
                {/* Decorative grid */}
                <div
                    className="absolute inset-0 opacity-[0.06]"
                    style={{
                        backgroundImage: `linear-gradient(rgba(255,255,255,.8) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.8) 1px,transparent 1px)`,
                        backgroundSize: '28px 28px',
                    }}
                />
                {/* Abstract glyph */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-20 h-20 rounded-full border border-white/10 flex items-center justify-center">
                        <div className="w-10 h-10 rounded-full border border-white/10" />
                    </div>
                </div>
                {/* Featured label */}
                <div className="absolute top-4 left-4 bg-fun-blue-600 text-fun-blue-50 text-[10px] font-semibold px-2.5 py-1 rounded-full tracking-wide">
                    Featured
                </div>
            </div>

            {/* Content */}
            <div className="flex flex-col justify-between p-6 md:p-8 flex-1 bg-fun-blue-900/40">
                <div>
                    <div className={`inline-flex items-center text-[10px] font-semibold px-2.5 py-1 rounded-full mb-4 tracking-wide border ${styles.tag} border-current/20`}>
                        {post.category}
                    </div>
                    <h3 className="font-serif text-2xl md:text-3xl text-fun-blue-50 leading-tight mb-3 group-hover:text-white transition-colors duration-200">
                        {post.title}
                    </h3>
                    <p className="text-fun-blue-300/55 text-sm leading-relaxed max-w-lg">
                        {post.excerpt}
                    </p>
                </div>
                <div className="flex items-center justify-between mt-6 pt-5 border-t border-white/6">
                    <div className="flex items-center gap-3 text-[11px] text-fun-blue-400/50">
                        <span>{post.date}</span>
                        <span className="w-1 h-1 rounded-full bg-fun-blue-400/30" />
                        <span className="flex items-center gap-1">
                            <Clock size={10} />
                            {post.readTime}
                        </span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[12px] font-semibold text-fun-blue-400 group-hover:text-fun-blue-300 transition-colors duration-200">
                        Read post
                        <ArrowUpRight
                            size={14}
                            className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        />
                    </div>
                </div>
            </div>
        </Link>
    )
}

/* ─── Regular post card ─────────────────────────────────── */
function PostCard({ post, index }: { post: Post; index: number }) {
    const styles = CATEGORY_STYLES[post.category]
    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.45, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
        >
            <Link
                href={`/blog/${post.slug}`}
                className="group flex flex-col h-full rounded-xl border border-white/[0.07] hover:border-white/16 bg-fun-blue-900/20 hover:bg-fun-blue-900/40 transition-all duration-300 overflow-hidden"
                aria-label={`Read: ${post.title}`}
            >
                {/* Top colour bar */}
                <div className={`${post.accentColor} h-28 relative overflow-hidden`}>
                    <div
                        className="absolute inset-0 opacity-[0.06]"
                        style={{
                            backgroundImage: `linear-gradient(rgba(255,255,255,.8) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.8) 1px,transparent 1px)`,
                            backgroundSize: '24px 24px',
                        }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center">
                            <div className="w-5 h-5 rounded-full border border-white/10" />
                        </div>
                    </div>
                </div>

                {/* Body */}
                <div className="flex flex-col flex-1 p-5">
                    <div className={`inline-flex items-center self-start text-[10px] font-semibold px-2 py-0.5 rounded-full mb-3 tracking-wide ${styles.tag}`}>
                        {post.category}
                    </div>
                    <h3 className="font-serif text-[17px] text-fun-blue-100 leading-snug mb-2 group-hover:text-white transition-colors duration-200 flex-1">
                        {post.title}
                    </h3>
                    <p className="text-fun-blue-300/45 text-xs leading-relaxed mb-4 line-clamp-2">
                        {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
                        <div className="flex items-center gap-2 text-[10px] text-fun-blue-400/40">
                            <span>{post.date}</span>
                            <span className="w-0.5 h-0.5 rounded-full bg-fun-blue-400/30" />
                            <span>{post.readTime}</span>
                        </div>
                        <ArrowUpRight
                            size={13}
                            className="text-fun-blue-400/40 group-hover:text-fun-blue-400 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transform"
                        />
                    </div>
                </div>
            </Link>
        </motion.div>
    )
}

/* ─── Section ───────────────────────────────────────────── */
export default function BlogSection() {
    const ref = useRef<HTMLDivElement>(null)
    const inView = useInView(ref, { once: true, margin: '-60px' })
    const [active, setActive] = useState<Category>('All')

    const featured = POSTS.find((p) => p.featured)!
    const filtered = POSTS.filter((p) => !p.featured && (active === 'All' || p.category === active))

    const fadeUp = {
        hidden: { opacity: 0, y: 20 },
        show: (d = 0) => ({
            opacity: 1, y: 0,
            transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const, delay: d },
        }),
    }

    return (
        <Section
            ref={ref}
            className="relative w-full bg-fun-blue-950 overflow-hidden"
            aria-label="NZUSI blog posts and news"
        >
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

                {/* Category filters */}
                <motion.div
                    initial="hidden" animate={inView ? 'show' : 'hidden'} custom={0.14}
                    variants={fadeUp}
                    className="flex items-center gap-2 flex-wrap mb-8"
                    role="tablist"
                    aria-label="Filter posts by category"
                >
                    {CATEGORIES.map((cat) => {
                        const isActive = active === cat
                        const styles = cat !== 'All' ? CATEGORY_STYLES[cat] : null
                        return (
                            <button
                                key={cat}
                                role="tab"
                                aria-selected={isActive}
                                onClick={() => setActive(cat)}
                                className={`
                                    relative text-[12px] font-medium px-4 py-1.5 rounded-full border transition-all duration-200
                                    ${isActive
                                        ? cat === 'All'
                                            ? 'bg-fun-blue-600 text-fun-blue-50 border-fun-blue-400/40'
                                            : `border ${styles!.pill}`
                                        : 'text-fun-blue-400/50 border-white/8 hover:border-white/18 hover:text-fun-blue-300/70'
                                    }
                                `}
                            >
                                {isActive && (
                                    <motion.span
                                        layoutId="filter-pill"
                                        className="absolute inset-0 rounded-full"
                                        style={{
                                            background: cat === 'All'
                                                ? 'rgba(24,95,165,0.9)'
                                                : cat === 'Adyatan'
                                                    ? 'rgba(6,78,59,0.3)'
                                                    : cat === 'Academic'
                                                        ? 'rgba(120,53,15,0.25)'
                                                        : 'rgba(24,95,165,0.25)',
                                        }}
                                        transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
                                    />
                                )}
                                <span className="relative z-10">{cat}</span>
                            </button>
                        )
                    })}
                </motion.div>

                {/* Featured post */}
                <motion.div
                    initial="hidden" animate={inView ? 'show' : 'hidden'} custom={0.18}
                    variants={fadeUp}
                >
                    <FeaturedPost post={featured} />
                </motion.div>

                {/* Grid */}
                <AnimatePresence mode="popLayout">
                    <motion.div
                        key={active}
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
                    >
                        {filtered.map((post, i) => (
                            <PostCard key={post.slug} post={post} index={i} />
                        ))}
                    </motion.div>
                </AnimatePresence>

                {/* Empty state */}
                {filtered.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                        className="text-center py-16 text-fun-blue-400/40 text-sm"
                    >
                        No posts in this category yet.
                    </motion.div>
                )}
            </Wrapper>
        </Section>
    )
}