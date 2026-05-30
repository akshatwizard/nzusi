'use client';
import { Section, Wrapper } from './ui/sections'
import { motion } from 'motion/react'
import { HeroBackground } from './hero-background';
import { Calendar } from 'lucide-react';
import { HeroCarousel } from './hero_slider';
import Link from 'next/link';


const EXPLORE_TAGS = ['Membership', 'Adyatan Journal', 'NZUSICON 2026', 'Education', 'Council']

export default function Hero() {
    const fadeUp = {
        hidden: { opacity: 0, y: 18 },
        show: (delay = 0) => ({
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1] as const,
                delay,
            },
        }),
    }
    return (
        <Section className='relative min-h-screen bg-fun-blue-950 '>
            <HeroBackground />
            <Wrapper className='lg:pt-42 pt-36 md:pt-38'>
                <div className='w-full grid grid-cols-1 md:grid-cols-2 md:gap-8 gap-12'>
                    <div className='w-full h-full flex flex-col'>
                        <motion.span
                            initial="hidden"
                            animate="show"
                            custom={0}
                            variants={fadeUp}
                            className="relative inline-block px-4 py-1.5 bg-fun-blue-600/20 w-max rounded-full text-[11px] mb-4 font-semibold overflow-hidden border border-fun-blue-600">
                            <span
                                className="relative z-10 animate-shimmer"
                                style={{
                                    backgroundImage: "linear-gradient(90deg, #fff 35%, #000000 50%, #fff 65%)",
                                    backgroundSize: "200% 100%",
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "#185fa595",
                                    backgroundClip: "text",
                                }}
                            >
                                Urology · North Zone
                            </span>
                        </motion.span>
                        <motion.h1
                            initial="hidden"
                            animate="show"
                            custom={0.1}
                            variants={fadeUp}
                            className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.08] text-fun-blue-50 mb-2"
                        >
                            North Zone Chapter of{" "}
                            <em className="text-fun-blue-400">
                                Urological Society
                            </em>
                        </motion.h1>
                        <motion.h2
                            initial="hidden"
                            animate="show"
                            custom={0.15}
                            variants={fadeUp}
                            className="text-4xl md:text-5xl lg:text-6xl leading-[1.08] text-fun-blue-200/70 mb-6"
                        >
                            of India
                        </motion.h2>

                        <motion.p
                            initial="hidden"
                            animate="show"
                            custom={0.2}
                            variants={fadeUp}
                            className="text-fun-blue-200/60 text-sm leading-relaxed max-w-sm mb-8"
                        >
                            The North Zone chapter of the Urological Society of India — connecting specialists, publishing research, and driving excellence in urological care since 1997.
                        </motion.p>

                        {/* CTAs */}
                        <motion.div
                            initial="hidden"
                            animate="show"
                            custom={0.25}
                            variants={fadeUp}
                            className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-10"
                        >
                            <Link href={"/events"} className="group flex items-center gap-2 bg-fun-blue-600 hover:bg-fun-blue-500 text-fun-blue-50 font-semibold text-sm px-5 py-3 rounded-lg border border-fun-blue-400/40 transition-all duration-200 cursor-pointer">
                                <Calendar size={14} />
                                View Events
                            </Link>
                        </motion.div>

                        <motion.div
                            initial="hidden"
                            animate="show"
                            custom={0.3}
                            variants={fadeUp}
                            className="flex items-center gap-3"
                        >
                            <div className="flex pointer-events-none select-none">
                                {['DS', 'RK', 'AM', 'PV'].map((initials, i) => (
                                    <div
                                        key={initials}
                                        className="w-7 h-7 rounded-full border-2 border-fun-blue-950 bg-fun-blue-800 flex items-center justify-center text-[9px] font-semibold text-fun-blue-300"
                                        style={{ marginLeft: i === 0 ? 0 : -8 }}
                                    >
                                        {initials}
                                    </div>
                                ))}
                            </div>
                            <p className="text-[11px] text-fun-blue-300/50 leading-snug">
                                Trusted by <span className="text-fun-blue-300/80 font-medium">500+ urologists</span>
                                <br />across 6 North Indian states
                            </p>
                        </motion.div>
                    </div>

                    {/* <HeroRightColumn /> */}
                    <HeroCarousel />
                </div>

                {/* ── Explore strip ── */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="relative z-10 flex items-center gap-3 px-6 lg:px-10 py-2.5"
                >
                    <span className="text-[11px] text-fun-blue-400 uppercase tracking-widest shrink-0">Explore</span>
                    <div className="flex-1 h-px bg-fun-blue-200/20" />
                    <div className="flex gap-2 flex-wrap">
                        {EXPLORE_TAGS.map((tag) => (
                            <span
                                key={tag}
                                className="text-[11px] text-fun-blue-400/80 border border-fun-blue-400/20 rounded-full px-2.5 py-1 select-none hover:text-fun-blue-300/60 hover:border-fun-blue-400/20 transition-colors duration-200"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </motion.div>
            </Wrapper>
        </Section>
    )
}


// const cardVariants = {
//     hidden: { opacity: 0, y: 20 },
//     show: (delay: number) => ({
//         opacity: 1,
//         y: 0,
//         transition: {
//             duration: 0.55,
//             ease: [0.22, 1, 0.36, 1] as const,
//             delay
//         },
//     }),
// }

// function GlassCard({ children, className = '', accent = false, delay = 0, }: {
//     children: React.ReactNode
//     className?: string
//     accent?: boolean
//     delay?: number
// }) {
//     return (
//         <motion.div
//             initial="hidden"
//             animate="show"
//             custom={delay}
//             variants={cardVariants}
//             className={`
//                 rounded-xl border backdrop-blur-sm
//                 ${accent
//                     ? 'bg-fun-blue-600/10 border-fun-blue-400/22'
//                     : 'bg-white/4 border-white/9'
//                 }
//                 ${className}
//             `}
//         >
//             {children}
//         </motion.div>
//     )
// }

// function HeroRightColumn() {
//     return (
//         <div className="flex flex-col gap-3 lg:gap-2.5">

//             {/* ── Next conference card ── */}
//             <GlassCard accent delay={0.3} className="p-4">
//                 <div className="text-[10px] font-medium text-fun-blue-300/55 uppercase tracking-widest mb-3">
//                     Next conference
//                 </div>
//                 <div className="flex gap-3 items-start">
//                     {/* Date box */}
//                     <div className="min-w-11 w-11 h-12 bg-fun-blue-600 rounded-lg flex flex-col items-center justify-center gap-0.5 shrink-0">
//                         <span className="font-serif text-lg text-white leading-none">27</span>
//                         <span className="text-[9px] font-semibold text-fun-blue-100/70 tracking-wider">NOV</span>
//                     </div>
//                     {/* Info */}
//                     <div>
//                         <div className="text-fun-blue-400 text-[11px] font-medium mb-1">NZUSICON 2026</div>
//                         <div className="text-fun-blue-100/75 text-[13px] font-medium leading-snug mb-2">
//                             Annual Urology Conference &amp; Live Surgery Workshop
//                         </div>
//                         <div className="flex items-center gap-1 text-fun-blue-300/50 text-[11px]">
//                             <MapPin size={10} />
//                             Amritsar, Punjab
//                         </div>
//                     </div>
//                 </div>
//                 {/* Live bar */}
//                 <div className="flex items-center gap-2 mt-3 pt-3 border-t border-white/6">
//                     <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
//                     <span className="text-[10px] text-fun-blue-300/45">
//                         Registration open · 47 days away
//                     </span>
//                 </div>
//             </GlassCard>

//             {/* ── Membership progress card ── */}
//             <GlassCard delay={0.35} className="p-4">
//                 <div className="text-[10px] font-medium text-fun-blue-300/55 uppercase tracking-widest mb-3">
//                     Membership this year
//                 </div>
//                 <div className="grid grid-cols-2 gap-3 mb-3">
//                     <div>
//                         <div className="font-serif text-2xl text-fun-blue-100 leading-none">512</div>
//                         <div className="text-[10px] text-fun-blue-300/45 mt-1">Active members</div>
//                     </div>
//                     <div>
//                         <div className="font-serif text-2xl text-fun-blue-100 leading-none">+38</div>
//                         <div className="text-[10px] text-fun-blue-300/45 mt-1">Joined in 2025</div>
//                     </div>
//                 </div>
//                 {/* Progress bar */}
//                 <div className="h-1 bg-white/[0.07] rounded-full overflow-hidden mb-1.5">
//                     <motion.div
//                         initial={{ width: 0 }}
//                         animate={{ width: '72%' }}
//                         transition={{ duration: 1, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
//                         className="h-full bg-fun-blue-500 rounded-full"
//                     />
//                 </div>
//                 <div className="flex justify-between text-[10px] text-fun-blue-300/40">
//                     <span>Annual target</span>
//                     <span>72%</span>
//                 </div>
//             </GlassCard>

//             {/* ── Mini stat strip ── */}
//             <GlassCard delay={0.4} className="p-3">
//                 <div className="grid grid-cols-3 divide-x divide-white/[0.07]">
//                     {[
//                         { num: '28', label: 'Conferences' },
//                         { num: '6', label: 'States' },
//                         { num: '140+', label: 'Publications' },
//                     ].map((s) => (
//                         <div key={s.label} className="text-center px-2 py-1">
//                             <div className="font-serif text-lg text-fun-blue-100 leading-none">{s.num}</div>
//                             <div className="text-[9px] text-fun-blue-300/40 mt-1">{s.label}</div>
//                         </div>
//                     ))}
//                 </div>
//             </GlassCard>

//             {/* ── Latest Adyatan post ── */}
//             <GlassCard delay={0.45} className="px-3.5 py-3 flex items-center justify-between gap-3 group cursor-pointer hover:bg-white/6 transition-colors duration-200">
//                 <div className="min-w-0">
//                     <div className="text-fun-blue-400 text-[10px] font-medium mb-1">Latest — Adyatan</div>
//                     <div className="text-fun-blue-100/70 text-[12px] leading-snug truncate">
//                         Robotic instruments: rapid review 2025
//                     </div>
//                 </div>
//                 <div className="w-7 h-7 rounded-full border border-fun-blue-400/30 flex items-center justify-center shrink-0 group-hover:border-fun-blue-400/60 transition-colors duration-200">
//                     <ChevronRight size={12} className="text-fun-blue-400" />
//                 </div>
//             </GlassCard>
//         </div>
//     )
// }