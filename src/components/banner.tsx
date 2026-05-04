'use client'

import { useEffect, useRef, useState } from "react"
import { motion, useInView } from "motion/react"
import { ArrowRight, MapPin, Calendar } from "lucide-react"
import { Section, Wrapper } from "@/components/ui/sections"
import Image from "next/image"

function useCountdown(targetDate: Date) {
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })

    useEffect(() => {
        const calc = () => {
            const diff = targetDate.getTime() - Date.now()
            if (diff <= 0) return setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
            setTimeLeft({
                days: Math.floor(diff / 86400000),
                hours: Math.floor((diff % 86400000) / 3600000),
                minutes: Math.floor((diff % 3600000) / 60000),
                seconds: Math.floor((diff % 60000) / 1000),
            })
        }
        calc()
        const id = setInterval(calc, 1000)
        return () => clearInterval(id)
    }, [targetDate])

    return timeLeft
}

const NZUSICON_DATE = new Date("2026-11-27T09:00:00+05:30")

function TimeUnit({ value, label, dark }: { value: number; label: string; dark: boolean }) {
    return (
        <div className="flex flex-col items-center">
            <div className={`rounded-xl px-5 py-3 min-w-18 text-center border ${dark
                ? "bg-white/10 border-white/20 backdrop-blur-sm"
                : "bg-fun-blue-900 border-fun-blue-700"
                }`}>
                <span className="text-3xl font-bold text-white tabular-nums leading-none">
                    {String(value).padStart(2, "0")}
                </span>
            </div>
            <span className={`text-xs mt-1.5 uppercase tracking-wider ${dark ? "text-white/50" : "text-fun-blue-400"}`}>
                {label}
            </span>
        </div>
    )
}

const TOKENS = {
    home: {
        section: "bg-fun-blue-50",
        badgeWrap: "bg-fun-blue-100 border-fun-blue-300",
        badgeDot: "bg-fun-blue-500",
        badgeText: "text-fun-blue-700",
        h2: "text-fun-blue-950",
        accent: "text-fun-blue-500",
        metaText: "text-fun-blue-600",
        metaIcon: "text-fun-blue-400",
        metaDivider: "bg-fun-blue-200",
        body: "text-zinc-500",
        btnPrimary: "bg-fun-blue-500 hover:bg-fun-blue-400 text-white shadow-md shadow-fun-blue-200/60",
        btnSecondary: "border border-fun-blue-300 text-fun-blue-700 hover:bg-fun-blue-50",
        card: "bg-fun-blue-950 shadow-2xl shadow-fun-blue-900/20",
        cardLabel: "text-fun-blue-400",
        cardDivider: "from-transparent via-fun-blue-400 to-transparent",
        cardBorder: "border-fun-blue-800",
        cardFooter: "text-fun-blue-400",
        colon: "text-white/30",
    },
    hero: {
        section: "bg-fun-blue-950",
        badgeWrap: "bg-white/10 border-white/20",
        badgeDot: "bg-fun-blue-300",
        badgeText: "text-fun-blue-200",
        h2: "text-white",
        accent: "text-fun-blue-300",
        metaText: "text-fun-blue-200",
        metaIcon: "text-fun-blue-400",
        metaDivider: "bg-fun-blue-700",
        body: "text-fun-blue-300/80",
        btnPrimary: "bg-fun-blue-100 hover:bg-white text-fun-blue-900 shadow-md shadow-fun-blue-950/40",
        btnSecondary: "border border-white/20 text-white hover:bg-white/10",
        card: "bg-white/5 border border-white/10 backdrop-blur-md shadow-2xl shadow-black/30",
        cardLabel: "text-white/50",
        cardDivider: "from-transparent via-white/30 to-transparent",
        cardBorder: "border-white/10",
        cardFooter: "text-fun-blue-300/70",
        colon: "text-white/20",
    },
} as const

type Variant = keyof typeof TOKENS

type Props = {
    variant?: Variant
    bgImage?: string
}

export default function NZUSICONBanner({ variant = "home", bgImage }: Props) {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: "-60px" })
    const time = useCountdown(NZUSICON_DATE)
    const t = TOKENS[variant]
    const isHero = variant === "hero"

    return (
        <Section className={`relative overflow-hidden ${t.section}`}>
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {isHero ? (
                    <>
                        {bgImage && (
                            <Image
                                src={bgImage}
                                alt="Event Hero Image"
                                aria-hidden
                                fill
                                className="absolute inset-0 w-full h-full object-cover object-center opacity-[0.18]"
                                priority
                            />
                        )}

                        {/* linear overlay — stronger at bottom for legibility */}
                        <div className="absolute inset-0 bg-linear-to-b from-fun-blue-950/50 via-fun-blue-950/75 to-fun-blue-950" />

                        {/* Atmospheric orb */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-175 h-100 rounded-full bg-fun-blue-600/15 blur-[120px]" />

                        {/* Dot grid texture */}
                        <div
                            className="absolute inset-0 opacity-[0.035]"
                            style={{
                                backgroundImage: "radial-linear(circle, #c2dcf5 1px, transparent 1px)",
                                backgroundSize: "30px 30px",
                            }}
                        />

                        {/* Bottom separator */}
                        <div className="absolute bottom-0 inset-x-0 h-px bg-linear-to-r from-transparent via-fun-blue-700/50 to-transparent" />
                    </>
                ) : (
                    <>
                        {/* Home: warm soft orbs */}
                        <div className="absolute -bottom-20 -right-20 w-125 h-125 rounded-full bg-fun-blue-400/10 blur-3xl" />
                        <div className="absolute top-0 left-0 w-75 h-75 rounded-full bg-fun-blue-200/20 blur-3xl" />
                        {/* fun-blue top accent line */}
                        <div className="absolute inset-x-0 top-0 h-1 bg-linear-to-r from-transparent via-fun-blue-400/60 to-transparent" />
                    </>
                )}
            </div>

            <Wrapper
                ref={ref}
                className={`relative z-10 ${isHero ? "lg:pt-42 pt-36 md:pt-38 " : ""}`}
            >
                <div className="flex flex-col lg:flex-row items-center justify-between gap-12">

                    {/* Left col */}
                    <div className="flex-1 text-center lg:text-left">

                        {/* Badge */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5 }}
                            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border mb-5 ${t.badgeWrap}`}
                        >
                            <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${t.badgeDot}`} />
                            <span className={`text-xs font-semibold tracking-widest uppercase ${t.badgeText}`}>
                                Flagship Event · NZUSI 2026
                            </span>
                        </motion.div>

                        {/* Heading */}
                        <motion.h2
                            initial={{ opacity: 0, y: 24 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                            className={`text-4xl md:text-5xl lg:text-6xl leading-tight mb-4 ${t.h2}`}
                        >
                            NZUSICON{" "}
                            <em className={`not-italic ${t.accent}`}>2026</em>
                        </motion.h2>

                        {/* Date + Location */}
                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-4 mb-6"
                        >
                            <div className={`flex items-center gap-2 text-sm font-medium ${t.metaText}`}>
                                <Calendar size={14} className={t.metaIcon} />
                                November 27–29, 2026
                            </div>
                            <div className={`hidden sm:block w-px h-4 ${t.metaDivider}`} />
                            <div className={`flex items-center gap-2 text-sm font-medium ${t.metaText}`}>
                                <MapPin size={14} className={t.metaIcon} />
                                Amritsar, Punjab
                            </div>
                        </motion.div>

                        {/* Description */}
                        <motion.p
                            initial={{ opacity: 0, y: 12 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5, delay: 0.25 }}
                            className={`text-sm leading-relaxed mb-8 max-w-sm mx-auto lg:mx-0 ${t.body}`}
                        >
                            Annual congress of North Zone urologists — keynotes, live surgeries,
                            workshops, and the prestigious NZUSI awards ceremony.
                        </motion.p>

                        {/* Buttons */}
                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start"
                        >
                            <a
                                href="https://www.nzusi.org/_files/ugd/02b867_fd810af167bf4228a16d526ef68be544.pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-bold text-sm transition-colors duration-200 ${t.btnPrimary}`}
                            >
                                Register Now <ArrowRight size={14} />
                            </a>
                            <a
                                href="/events"
                                className={`inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm transition-colors duration-200 ${t.btnSecondary}`}
                            >
                                View All Events
                            </a>
                        </motion.div>
                    </div>

                    {/* Right col — countdown card */}
                    <motion.div
                        initial={{ opacity: 0, x: 32 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className={`rounded-3xl p-8 md:p-10 flex flex-col items-center gap-6 w-full lg:w-auto shrink-0 ${t.card}`}
                    >
                        <div className="text-center">
                            <p className={`text-xs font-semibold tracking-widest uppercase mb-2 ${t.cardLabel}`}>
                                Starts In
                            </p>
                            <div className={`w-10 h-0.5 mx-auto bg-linear-to-r ${t.cardDivider}`} />
                        </div>

                        <div className="flex items-start gap-3">
                            <TimeUnit value={time.days} label="Days" dark={isHero} />
                            <span className={`text-3xl font-light mt-3 ${t.colon}`}>:</span>
                            <TimeUnit value={time.hours} label="Hours" dark={isHero} />
                            <span className={`text-3xl font-light mt-3 ${t.colon}`}>:</span>
                            <TimeUnit value={time.minutes} label="Mins" dark={isHero} />
                            <span className={`text-3xl font-light mt-3 ${t.colon}`}>:</span>
                            <TimeUnit value={time.seconds} label="Secs" dark={isHero} />
                        </div>

                        <div className={`border-t pt-5 w-full text-center ${t.cardBorder}`}>
                            <p className={`text-xs leading-relaxed ${t.cardFooter}`}>
                                Historical city of Amritsar hosts<br />
                                India's premier North Zone Urology Congress
                            </p>
                        </div>
                    </motion.div>
                </div>
            </Wrapper>
        </Section>
    )
}