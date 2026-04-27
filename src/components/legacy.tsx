'use client'

import { useRef } from "react"
import { motion, useInView } from "motion/react"
import { Section } from "@/components/ui/sections"

const pastPresidents = [
    { year: "1991–92", name: "Prof. SC Mathur", city: "Jaipur" },
    { year: "1992–93", name: "Prof. SN Wadhwa", city: "Delhi" },
    { year: "1993–94", name: "Prof. SK Sharma", city: "Chandigarh" },
    { year: "1994–95", name: "Prof. Mahendra Bhandari", city: "Lucknow" },
    { year: "1995–96", name: "Prof. KM Singh", city: "Lucknow" },
    { year: "1996–97", name: "Prof. Narendra Bhandari", city: "Jodhpur" },
    { year: "1997–98", name: "Prof. NP Gupta", city: "Delhi" },
    { year: "1998–99", name: "Prof. DN Kalla", city: "Jaipur" },
    { year: "1999–00", name: "Col. SV Kotwal", city: "Delhi" },
    { year: "2000–01", name: "Prof. PB Singh", city: "Varanasi" },
    { year: "2001–02", name: "Prof. AK Hemal", city: "Delhi" },
    { year: "2002–03", name: "Prof. Kim Mammen", city: "Ludhiana" },
    { year: "2003–04", name: "Prof. Anant Kumar", city: "Lucknow" },
    { year: "2004–05", name: "Prof. PN Dogra", city: "Delhi" },
    { year: "2005–06", name: "Dr. AL Bhat", city: "Bikaner" },
    { year: "2006–07", name: "Prof. Madhu S Agrawal", city: "Agra" },
    { year: "2007–08", name: "Dr. AL Vyas", city: "Agra" },
    { year: "2008–09", name: "Col. HS Bhatyal", city: "Delhi" },
    { year: "2009–10", name: "Dr. Ashok Sharma", city: "Kota" },
    { year: "2010–11", name: "Prof. SK Singh", city: "Chandigarh" },
    { year: "2011–12", name: "Dr. Rajeev Sood", city: "Delhi" },
    { year: "2012–13", name: "Dr. BS Aulakh", city: "Ludhiana" },
    { year: "2013–14", name: "Dr. Aneesh Shrivastava", city: "Lucknow" },
    { year: "2014–15", name: "Dr. SK Pal", city: "New Delhi" },
    { year: "2015–16", name: "Dr. Anil Varshney", city: "New Delhi" },
    { year: "2016–17", name: "Dr. Anil Goyal", city: "New Delhi" },
    { year: "2017–18", name: "Dr. Satya Prakash Yadav", city: "Gurugram" },
    { year: "2018–19", name: "Dr. Anil Elhence", city: "Meerut" },
    { year: "2019–20", name: "Dr. Amlesh Seth", city: "New Delhi" },
]

const items = [...pastPresidents, ...pastPresidents]

export default function LegacyStrip() {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: "-60px" })

    return (
        <Section className="bg-fun-blue-950 py-0 overflow-hidden border-y border-fun-blue-900">
            <div ref={ref} className="w-full py-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-8 px-4"
                >
                    <span className="text-xs font-semibold tracking-widest uppercase text-fun-blue-500 mb-2 block">
                        Since 1991
                    </span>
                    <h3 className="text-xl md:text-2xl text-fun-blue-100">
                        A Legacy of <em className="not-italic text-fun-blue-400">Urological Excellence</em>
                    </h3>
                    <p className="text-fun-blue-500 text-sm mt-1">
                        30+ years · 29 presidents · Countless milestones
                    </p>
                </motion.div>

                {/* Scrolling ticker */}
                <div className="relative w-full overflow-hidden">
                    {/* Fade edges */}
                    <div className="absolute inset-y-0 left-0 w-24 bg-linear-to-r from-fun-blue-950 to-transparent z-10 pointer-events-none" />
                    <div className="absolute inset-y-0 right-0 w-24 bg-linear-to-l from-fun-blue-950 to-transparent z-10 pointer-events-none" />

                    <motion.div
                        className="flex gap-4 w-max"
                        animate={{ x: ["0%", "-50%"] }}
                        transition={{
                            duration: 60,
                            ease: "linear",
                            repeat: Infinity,
                        }}
                    >
                        {items.map((p, idx) => (
                            <div
                                key={idx}
                                className="shrink-0 flex items-center gap-3 px-5 py-3 bg-fun-blue-900/60 border border-fun-blue-800/50 rounded-xl"
                            >
                                <div className="text-right">
                                    <p className="text-fun-blue-500 text-xs tabular-nums">{p.year}</p>
                                </div>
                                <div className="w-px h-6 bg-fun-blue-800" />
                                <div>
                                    <p className="text-fun-blue-100 text-sm font-medium whitespace-nowrap">{p.name}</p>
                                    <p className="text-fun-blue-500 text-xs">{p.city}</p>
                                </div>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </Section>
    )
}