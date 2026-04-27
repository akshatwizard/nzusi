'use client'

import { Section, Wrapper } from "@/components/ui/sections"
import { motion, useInView } from "motion/react"
import { useRef } from "react"
import { CheckCircle2, ArrowRight, Users } from "lucide-react"

const benefits = [
    "Access to all NZUSI conferences & CMEs at member rates",
    "Receive Adyatan — clinical literature review digest",
    "Listing in the NZUSI member directory",
    "Voting rights in council elections",
    "Access to past webinar recordings & academic resources",
    "Eligibility for NZUSI awards & recognitions",
]

export default function MembershipSection() {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: "-80px" })

    return (
        <Section className="bg-fun-blue-950 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-fun-blue-800/30 blur-3xl" />
                <div className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full bg-fun-blue-700/20 blur-3xl" />
                {/* Dot grid */}
                <div
                    className="absolute inset-0 opacity-[0.04]"
                    style={{
                        backgroundImage: "radial-gradient(circle, #e4eefa 1px, transparent 1px)",
                        backgroundSize: "28px 28px",
                    }}
                />
            </div>

            <Wrapper className="relative z-10">
                <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                    {/* Left */}
                    <div>
                        <motion.span
                            initial={{ opacity: 0, y: 16 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5 }}
                            className="text-xs font-semibold tracking-widest uppercase text-fun-blue-400 mb-4 block"
                        >
                            Membership
                        </motion.span>

                        <motion.h2
                            initial={{ opacity: 0, y: 24 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                            className="text-3xl md:text-4xl lg:text-5xl text-fun-blue-50 leading-tight mb-6"
                        >
                            Join the North Zone<br />
                            <em className="not-italic text-fun-blue-400">Urology Community</em>
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0, y: 16 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="text-fun-blue-300 text-sm leading-relaxed mb-8 max-w-md"
                        >
                            NZUSI is the North Zone chapter of the Urological Society of India, connecting urologists across Haryana, Punjab, Himachal Pradesh, J&K, and Delhi. Membership is open to USI members practising in the North Zone.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="flex items-center gap-3 mb-8"
                        >
                            <div className="flex -space-x-2">
                                {["RK", "AS", "VP", "MG"].map((init, i) => (
                                    <div
                                        key={i}
                                        className="w-9 h-9 rounded-full bg-fun-blue-700 border-2 border-fun-blue-950 flex items-center justify-center text-xs font-semibold text-fun-blue-200"
                                    >
                                        {init}
                                    </div>
                                ))}
                            </div>
                            <p className="text-fun-blue-300 text-sm">
                                <span className="text-white font-semibold">500+</span> urologists across 6 states
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5, delay: 0.4 }}
                            className="flex flex-col sm:flex-row gap-3"
                        >
                            <a
                                href="/membership/apply"
                                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-fun-blue-100 text-fun-blue-900 rounded-lg font-semibold text-sm hover:bg-white transition-colors duration-200"
                            >
                                Apply for Membership
                                <ArrowRight size={14} />
                            </a>
                            <a
                                href="/about/constitution"
                                className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-fun-blue-700 text-fun-blue-200 rounded-lg font-semibold text-sm hover:border-fun-blue-500 transition-colors duration-200"
                            >
                                View Constitution
                            </a>
                        </motion.div>
                    </div>

                    {/* Right — benefits card */}
                    <motion.div
                        initial={{ opacity: 0, x: 32 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8"
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-xl bg-fun-blue-600/30 flex items-center justify-center">
                                <Users size={18} className="text-fun-blue-300" />
                            </div>
                            <div>
                                <p className="text-white font-semibold text-sm">Member Benefits</p>
                                <p className="text-fun-blue-400 text-xs">What you get with NZUSI membership</p>
                            </div>
                        </div>

                        <ul className="space-y-3.5">
                            {benefits.map((benefit, idx) => (
                                <motion.li
                                    key={idx}
                                    initial={{ opacity: 0, x: 16 }}
                                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                                    transition={{ duration: 0.4, delay: 0.4 + idx * 0.07 }}
                                    className="flex items-start gap-3 text-sm text-fun-blue-200"
                                >
                                    <CheckCircle2 size={15} className="shrink-0 text-fun-blue-400 mt-0.5" />
                                    {benefit}
                                </motion.li>
                            ))}
                        </ul>

                        <div className="mt-8 pt-6 border-t border-white/10">
                            <p className="text-fun-blue-400 text-xs">
                                Membership is processed via the Urological Society of India. North Zone residents are automatically eligible.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </Wrapper>
        </Section>
    )
}