'use client'

import { useState } from 'react'
import { motion } from 'motion/react'
import { MapPin, Search } from 'lucide-react'

const PRESIDENTS = [
    { year: '1991–1992', name: 'Prof. SC Mathur', city: 'Jaipur' },
    { year: '1992–1993', name: 'Prof. SN Wadhwa', city: 'Delhi' },
    { year: '1993–1994', name: 'Prof. SK Sharma', city: 'Chandigarh' },
    { year: '1994–1995', name: 'Prof. Mahendra Bhandari', city: 'Lucknow' },
    { year: '1995–1996', name: 'Prof. KM Singh', city: 'Lucknow' },
    { year: '1996–1997', name: 'Prof. Narendra Bhandari', city: 'Jodhpur' },
    { year: '1997–1998', name: 'Prof. NP Gupta', city: 'Delhi' },
    { year: '1998–1999', name: 'Prof. DN Kalla', city: 'Jaipur' },
    { year: '1999–2000', name: 'Col. SV Kotwal', city: 'Delhi' },
    { year: '2000–2001', name: 'Prof. PB Singh', city: 'Varanasi' },
    { year: '2001–2002', name: 'Prof. AK Hemal', city: 'Delhi' },
    { year: '2002–2003', name: 'Prof. Kim Mammen', city: 'Ludhiana' },
    { year: '2003–2004', name: 'Prof. Anant Kumar', city: 'Lucknow' },
    { year: '2004–2005', name: 'Prof. PN Dogra', city: 'Delhi' },
    { year: '2005–2006', name: 'Dr. AL Bhat', city: 'Bikaner' },
    { year: '2006–2007', name: 'Prof. Madhu S Agrawal', city: 'Agra' },
    { year: '2007–2008', name: 'Dr. AL Vyas', city: 'Agra' },
    { year: '2008–2009', name: 'Col. HS Bhatyal', city: 'Delhi' },
    { year: '2009–2010', name: 'Dr. Ashok Sharma', city: 'Kota' },
    { year: '2010–2011', name: 'Prof. SK Singh', city: 'Chandigarh' },
    { year: '2011–2012', name: 'Dr. Rajeev Sood', city: 'Delhi' },
    { year: '2012–2013', name: 'Dr. BS Aulakh', city: 'Ludhiana' },
    { year: '2013–2014', name: 'Dr. Aneesh Shrivastava', city: 'Lucknow' },
    { year: '2014–2015', name: 'Dr. SK Pal', city: 'New Delhi' },
    { year: '2015–2016', name: 'Dr. Anil Varshney', city: 'New Delhi' },
    { year: '2016–2017', name: 'Dr. Anil Goyal', city: 'New Delhi' },
    { year: '2017–2018', name: 'Dr. Satya Prakash Yadav', city: 'Gurugram' },
    { year: '2018–2019', name: 'Dr. Anil Elhence', city: 'Meerut' },
    { year: '2019–2020', name: 'Dr. Amlesh Seth', city: 'New Delhi' },
    { year: '2020-2021', name: 'Dr. Sudhir Kumar Rawal', city: 'New Delhi' },
    { year: '2021-2022', name: 'Dr. Shivam Priyadarshi', city: 'New Delhi' },
    { year: '2022-2023', name: 'Dr. Vijay Bora', city: 'New Delhi' },
    { year: '2023-2024', name: 'Dr. P. P. Singh', city: 'New Delhi' },
    { year: '2024-2025', name: 'Dr A.K.Sanwal', city: 'New Delhi' },
    { year: '2025-2026', name: 'Dr Kamaljeet Singh', city: 'New Delhi' },
]

// Get initials from name
function getInitials(name: string) {
    const parts = name.replace(/^(Prof\.|Dr\.|Col\.)\s+/, '').split(' ')
    return parts.slice(0, 2).map(p => p[0]).join('').toUpperCase()
}

// Gradient per decade
function decadeColor(year: string) {
    const y = parseInt(year.slice(0, 4))
    if (y < 1995) return 'from-fun-blue-800 to-fun-blue-950'
    if (y < 2000) return 'from-fun-blue-700 to-fun-blue-900'
    if (y < 2005) return 'from-fun-blue-600 to-fun-blue-800'
    if (y < 2010) return 'from-fun-blue-600 to-fun-blue-700'
    if (y < 2015) return 'from-fun-blue-500 to-fun-blue-700'
    return 'from-fun-blue-500 to-fun-blue-600'
}

export default function PastPresidents() {
    const [query, setQuery] = useState('')

    const filtered = PRESIDENTS.filter(p =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.city.toLowerCase().includes(query.toLowerCase()) ||
        p.year.includes(query)
    )

    // Reversed so newest appears first
    const display = [...filtered].reverse()

    return (
        <div className="flex flex-col gap-8">

            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-2xl"
            >
                <h2 className="font-serif text-2xl text-fun-blue-950 mb-3 leading-snug">
                    Past Presidents
                </h2>
                <p className="text-fun-blue-800/55 text-[13px] leading-relaxed">
                    A chronicle of the distinguished urologists who led the North Zone Chapter from its founding in 1991. Each president served a one-year term and shaped the academic and institutional legacy of NZUSI.
                </p>

                {/* Stats row */}
                <div className="flex flex-wrap gap-3 mt-4">
                    {[
                        { label: 'Total Presidents', value: PRESIDENTS.length },
                        { label: 'Years of Service', value: '33+' },
                        { label: 'Cities Represented', value: [...new Set(PRESIDENTS.map(p => p.city))].length },
                    ].map(stat => (
                        <div key={stat.label} className="flex items-center gap-2 px-3 py-1.5 bg-fun-blue-50 border border-fun-blue-100 rounded-lg">
                            <span className="font-bold text-fun-blue-700 text-sm">{stat.value}</span>
                            <span className="text-[11px] text-fun-blue-500">{stat.label}</span>
                        </div>
                    ))}
                </div>
            </motion.div>

            {/* Search */}
            <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="relative"
            >
                <Search size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-fun-blue-300" />
                <input
                    type="text"
                    placeholder="Search by name, city, or year…"
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 text-[13px] bg-white border border-fun-blue-100 rounded-xl outline-none focus:border-fun-blue-300 focus:ring-2 focus:ring-fun-blue-100 transition-all placeholder:text-fun-blue-300 text-fun-blue-900 max-w-sm"
                />
            </motion.div>

            {/* Section header */}
            <div className="flex items-center gap-3">
                <div className="h-px w-4 bg-fun-blue-300/40" />
                <span className="text-[10px] font-semibold text-fun-blue-900/40 uppercase tracking-widest">
                    {display.length} {display.length === 1 ? 'record' : 'records'} · Most recent first
                </span>
                <div className="flex-1 h-px bg-fun-blue-100" />
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
                {display.map((p, i) => (
                    <motion.div
                        key={p.year}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.35, delay: Math.min(i * 0.04, 0.6), ease: [0.22, 1, 0.36, 1] }}
                        className="group flex items-center gap-3.5 p-3.5 rounded-xl border border-fun-blue-100 bg-white hover:border-fun-blue-200 hover:shadow-sm hover:bg-fun-blue-50/40 transition-all duration-200"
                    >
                        {/* Avatar */}
                        <div className={`w-10 h-10 rounded-full bg-linear-to-br ${decadeColor(p.year)} flex items-center justify-center text-[11px] font-bold text-white shrink-0`}>
                            {getInitials(p.name)}
                        </div>

                        <div className="flex-1 min-w-0">
                            <div className="font-medium text-[13px] text-fun-blue-950 truncate">{p.name}</div>
                            <div className="flex items-center gap-3 mt-0.5">
                                <span className="text-[11px] text-fun-blue-400 font-medium tabular-nums">{p.year}</span>
                                <span className="flex items-center gap-0.5 text-[11px] text-fun-blue-400/60">
                                    <MapPin size={9} />{p.city}
                                </span>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {filtered.length === 0 && (
                <div className="text-center py-12 text-fun-blue-300 text-sm">
                    No results for "{query}"
                </div>
            )}

        </div>
    )
}