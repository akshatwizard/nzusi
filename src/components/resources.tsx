'use client'

import { useRef } from "react"
import { motion, useInView } from "motion/react"
import { Section, Wrapper } from "@/components/ui/sections"
import { ArrowRight, BookOpen, Newspaper, Briefcase, FileText, Mail, Phone, MapPin } from "lucide-react"

const resources = [
    {
        icon: BookOpen,
        title: "URO-Vista",
        subtitle: "NZUSI Scientific Magazine",
        description: "NZUSI's peer-reviewed scientific publication covering latest advances in urology, case reports, and clinical reviews.",
        href: "/resources/uro-vista",
        tag: "Publication",
        tagColor: "bg-purple-50 text-purple-700",
        accentColor: "group-hover:bg-purple-600",
    },
    {
        icon: Newspaper,
        title: "Newsletters",
        subtitle: "Stay informed",
        description: "Download past NZUSI newsletters covering council updates, event highlights, and academic achievements.",
        href: "https://drive.google.com/drive/folders/1OHK9ENLpk5_O43cCS-DwRYpKOjRvzreD?usp=sharing",
        tag: "Archive",
        tagColor: "bg-sky-50 text-sky-700",
        accentColor: "group-hover:bg-sky-600",
        external: true,
    },
    {
        icon: Briefcase,
        title: "Job Opportunities",
        subtitle: "Urology positions",
        description: "Browse current urology job listings across North Zone hospitals, medical colleges, and private institutions.",
        href: "https://docs.google.com/spreadsheets/d/1PYYbXaKfgDS5oJYKMijuBBDCu5X162kYx13wJ5-9Ebc/edit?usp=sharing",
        tag: "Careers",
        tagColor: "bg-emerald-50 text-emerald-700",
        accentColor: "group-hover:bg-emerald-600",
        external: true,
    },
    {
        icon: FileText,
        title: "Nomination Form",
        subtitle: "Council elections",
        description: "Download the official NZUSI nomination form for council positions and submit your candidacy.",
        href: "https://1d2b4dea-e0f6-42cc-87ed-25777b45da4f.usrfiles.com/ugd/1d2b4d_ab61dcb331984fc3a7e757ec4b0dd3c0.pdf",
        tag: "Governance",
        tagColor: "bg-amber-50 text-amber-700",
        accentColor: "group-hover:bg-amber-500",
        external: true,
    },
]

export default function ResourcesSection() {
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
                                Member Resources
                            </span>
                            <h2 className="text-3xl md:text-4xl lg:text-5xl text-fun-blue-950 leading-tight">
                                Tools &{" "}
                                <em className="not-italic text-fun-blue-500">Publications</em>
                            </h2>
                        </motion.div>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={isInView ? { opacity: 1 } : {}}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="text-sm text-zinc-500 max-w-xs text-right hidden md:block"
                        >
                            Everything you need — publications, career listings, and governance documents in one place.
                        </motion.p>
                    </div>

                    {/* Resource cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-14">
                        {resources.map((res, idx) => {
                            const Icon = res.icon
                            return (
                                <motion.a
                                    key={res.title}
                                    href={res.href}
                                    target={res.external ? "_blank" : undefined}
                                    rel={res.external ? "noopener noreferrer" : undefined}
                                    initial={{ opacity: 0, y: 32 }}
                                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                                    transition={{
                                        duration: 0.5,
                                        delay: 0.1 + idx * 0.1,
                                        ease: [0.22, 1, 0.36, 1],
                                    }}
                                    className="group bg-white border border-zinc-200 rounded-2xl p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col"
                                >
                                    <div className="flex items-start justify-between mb-4">
                                        <div className={`w-10 h-10 rounded-xl bg-fun-blue-50 flex items-center justify-center transition-colors duration-300 ${res.accentColor}`}>
                                            <Icon size={18} className="text-fun-blue-600 group-hover:text-white transition-colors duration-300" />
                                        </div>
                                        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${res.tagColor}`}>
                                            {res.tag}
                                        </span>
                                    </div>

                                    <h3 className="font-bold text-fun-blue-950 text-base mb-0.5 group-hover:text-fun-blue-700 transition-colors">
                                        {res.title}
                                    </h3>
                                    <p className="text-xs text-fun-blue-400 font-medium mb-3">{res.subtitle}</p>
                                    <p className="text-sm text-zinc-500 leading-relaxed flex-1">{res.description}</p>

                                    <div className="mt-5 flex items-center gap-1 text-xs font-semibold text-fun-blue-600 group-hover:gap-2 transition-all">
                                        Access <ArrowRight size={12} />
                                    </div>
                                </motion.a>
                            )
                        })}
                    </div>

                    {/* Contact strip */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.5 }}
                        className="bg-fun-blue-950 rounded-2xl p-7 flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
                    >
                        <div>
                            <p className="text-white font-semibold mb-1">Get in Touch with NZUSI</p>
                            <p className="text-fun-blue-400 text-sm">Reach our office directly for membership, queries, or collaboration.</p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 md:gap-6 text-sm">
                            <a href="mailto:nzusioffice@gmail.com" className="flex items-center gap-2 text-fun-blue-300 hover:text-white transition-colors">
                                <Mail size={14} className="text-fun-blue-500" />
                                nzusioffice@gmail.com
                            </a>
                            <a href="tel:+919897921138" className="flex items-center gap-2 text-fun-blue-300 hover:text-white transition-colors">
                                <Phone size={14} className="text-fun-blue-500" />
                                +91 98979 21138
                            </a>
                            <div className="flex items-start gap-2 text-fun-blue-400">
                                <MapPin size={14} className="text-fun-blue-500 mt-0.5 shrink-0" />
                                <span className="text-xs leading-snug max-w-50">
                                    1st Floor, above HDFC Bank, South Patel Nagar, New Delhi 110008
                                </span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </Wrapper>
        </Section>
    )
}