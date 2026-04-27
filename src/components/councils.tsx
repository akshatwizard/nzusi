'use client'

import { Section, Wrapper } from "@/components/ui/sections"
import { motion, useInView } from "motion/react"
import { useRef } from "react"
import { ArrowRight } from "lucide-react"

const council = [
    {
        name: "Dr. Rajesh Kumar",
        role: "President",
        state: "Haryana",
        initials: "RK",
        color: "from-fun-blue-600 to-fun-blue-800",
    },
    {
        name: "Dr. Amandeep Singh",
        role: "Secretary",
        state: "Punjab",
        initials: "AS",
        color: "from-fun-blue-500 to-fun-blue-700",
    },
    {
        name: "Dr. Vikas Pradhan",
        role: "Treasurer",
        state: "Delhi",
        initials: "VP",
        color: "from-fun-blue-700 to-fun-blue-900",
    },
    {
        name: "Dr. Meena Gupta",
        role: "Joint Secretary",
        state: "Himachal Pradesh",
        initials: "MG",
        color: "from-fun-blue-600 to-fun-blue-800",
    },
]

export default function CouncilSection() {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: "-80px" })

    return (
        <Section>
            <Wrapper>
                <div ref={ref}>
                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                        <motion.div
                            initial={{ opacity: 0, y: 24 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        >
                            <span className="text-xs font-semibold tracking-widest uppercase text-fun-blue-500 mb-3 block">
                                Leadership
                            </span>
                            <h2 className="text-3xl md:text-4xl lg:text-5xl text-fun-blue-950 leading-tight">
                                The <em className="not-italic text-fun-blue-500">Council</em>
                            </h2>
                        </motion.div>

                        <motion.a
                            href="/about/council"
                            initial={{ opacity: 0 }}
                            animate={isInView ? { opacity: 1 } : {}}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="inline-flex items-center gap-2 text-sm font-medium text-fun-blue-600 hover:text-fun-blue-800 transition-colors"
                        >
                            View full council <ArrowRight size={14} />
                        </motion.a>
                    </div>

                    {/* Council cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                        {council.map((member, idx) => (
                            <motion.div
                                key={member.name}
                                initial={{ opacity: 0, y: 32 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{
                                    duration: 0.5,
                                    delay: 0.1 + idx * 0.1,
                                    ease: [0.22, 1, 0.36, 1],
                                }}
                            >
                                <div className="group bg-white border border-zinc-200 rounded-2xl p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 text-center">
                                    {/* Avatar */}
                                    <div className={`w-16 h-16 mx-auto rounded-2xl bg-linear-to-br ${member.color} flex items-center justify-center mb-4 shadow-md`}>
                                        <span className="text-xl font-bold text-white">{member.initials}</span>
                                    </div>

                                    <p className="text-xs font-semibold text-fun-blue-500 uppercase tracking-wider mb-1">
                                        {member.role}
                                    </p>
                                    <h3 className="font-semibold text-fun-blue-950 text-sm leading-snug mb-2 group-hover:text-fun-blue-700 transition-colors">
                                        {member.name}
                                    </h3>
                                    <span className="text-xs text-zinc-400 bg-zinc-50 px-2.5 py-1 rounded-full">
                                        {member.state}
                                    </span>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Bottom note */}
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : {}}
                        transition={{ duration: 0.5, delay: 0.6 }}
                        className="mt-8 text-center text-sm text-zinc-400"
                    >
                        Council members are elected biennially by the NZUSI membership.{" "}
                        <a href="/about/executives" className="text-fun-blue-500 hover:underline">
                            View past presidents & executives →
                        </a>
                    </motion.p>
                </div>
            </Wrapper>
        </Section>
    )
}