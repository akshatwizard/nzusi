'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { ChevronDown, FileText, Download } from 'lucide-react'

const SECTIONS = [
    {
        num: '01',
        title: 'Title',
        content: `The name of the society shall be "North Zone Chapter of The Urological Society of India", hereafter referred to as "The Society".`,
    },
    {
        num: '02',
        title: 'Registered Office',
        content: `The Office of the Society shall be as determined from time to time by the Council of the Society.`,
    },
    {
        num: '03',
        title: 'Objects',
        content: null,
        bullets: [
            'To promote high standards in the practice of Urology in Delhi, Chandigarh, Haryana, Himachal Pradesh, Jammu & Kashmir, Punjab, Rajasthan, Uttarakhand and Uttar Pradesh.',
            'To associate together in one body all scientific personnel actively interested in the practice of Urology in the above mentioned areas.',
            'To foster high and uniform standards in Postgraduate training in Urology.',
            'To promote research in Urology for improving the practice of Urology.',
            'To promote, establish or support any institution, scientific association or research organization directed towards raising the standards of Urological practice or teaching or research.',
            'To promote the publication of scientific literature pertaining to Urological practice or research.',
            'To endeavour to establish and maintain liaison with other associations or organized bodies in India or abroad with aligned objectives.',
            'To carry out any other activities incidental or conducive to the furtherance of the objects of the Society.',
        ],
    },
    {
        num: '04',
        title: 'Membership',
        content: null,
        subsections: [
            {
                label: 'Full Members',
                text: 'Surgeons holding recognized postgraduate qualifications in Urology (M.Ch. Urology, DNB Urology or equivalent foreign qualifications recognized in India) practicing Urological specialty in the mentioned areas. Only Full members of USI are eligible.',
            },
            {
                label: 'Associate Members',
                text: 'Members who already have associate membership will continue to have it. No further members shall be added. They shall have no voting rights.',
            },
            {
                label: 'Trainee Members',
                text: 'Post-graduate students admitted to MCh (Urology) or DNB (Genitourinary Surgery). No voting rights. After getting full USI membership, eligible for full membership.',
            },
            {
                label: 'Life Members',
                text: 'All categories of members shall be life members.',
            },
            {
                label: 'Honorary Members',
                text: 'Any eminent Urologist from India or abroad can be nominated by council approval. No voting rights.',
            },
        ],
    },
    {
        num: '05',
        title: 'Mode of Election',
        content: 'Full members: Nominees shall be sponsored by two Full members and elected by the Council. Trainee Members: Nominees shall be sponsored by two Full members and elected by the Council. Honorary members: Can be nominated by council approval.',
    },
    {
        num: '06',
        title: 'Rights of Members',
        content: 'Only Full members shall be eligible to vote at any Annual or Special General meeting. All classes of members shall have the right to attend any Scientific or general meeting of the Society.',
    },
    {
        num: '07',
        title: 'Cessation of Membership',
        content: 'Any member may resign by serving a written notice to the Honorary Secretary. Members whose subscription is in arrears for the first six months of the financial year and duly notified shall forfeit membership. The Council shall have the right to terminate membership or alter the class of any individual member if material facts in the application were found incorrect.',
    },
    {
        num: '08',
        title: 'Subscription',
        content: null,
        subsections: [
            { label: 'Full Members', text: 'INR 5,000/- + applicable tax + Processing fees (Life membership)' },
            { label: 'Trainee Members', text: 'INR 5,000/- + applicable tax + Processing fees (Life membership)' },
            { label: 'Honorary Members', text: 'Nil' },
        ],
    },
    {
        num: '09',
        title: 'Financial Year & Audit',
        content: 'The financial year shall be 1st April to 31st March, closing on 31st March every year. The Honorary Treasurer is responsible for annual auditing by a qualified Chartered Accountant.',
    },
    {
        num: '10',
        title: 'Bank Account',
        content: 'The bank account shall be operated by the Honorary Treasurer. All cheques shall be signed by two Officers — one being the Honorary Treasurer and the other either the Honorary Secretary, President, or any other Officer nominated for the year by the Council.',
    },
    {
        num: '11',
        title: 'Officers of the Society',
        content: 'Officers shall be the President, President-Elect, Honorary Secretary, Secretary-Elect, Honorary Treasurer and Treasurer Elect. No member is eligible for election to these offices unless they have completed at least one full term as a Council member. Officers failing to attend two consecutive Council meetings without prior intimation forfeit their post.',
    },
    {
        num: '12',
        title: 'Duties of the Officers',
        content: 'The President presides at all Annual General meetings and Council meetings. The President-Elect performs duties in the President\'s absence. The Honorary Secretary handles day-to-day affairs, summons meetings, prepares agendas, and keeps minutes. The Honorary Treasurer receives subscriptions, pays bills, and prepares audited statements of accounts annually.',
    },
    {
        num: '13',
        title: 'Executive Council',
        content: 'Consists of Elected and Ex-officio members with a minimum of ten members. Comprises: President, President-Elect, Immediate Past President, Honorary Secretary, Secretary-elect, Honorary Treasurer, Treasurer-elect, five Council members, and two Ex-officio members (zonal representatives to USI Council). Council members are elected for two years.',
    },
    {
        num: '14',
        title: 'Duties of the Council',
        content: 'The Council constitutes the executive authority in all scientific, business and financial matters. It arranges the Annual General Meeting, has powers to appoint Sub-Committees, invest funds, and review applications for membership upgrades. Five members constitute a quorum.',
    },
    {
        num: '15',
        title: 'General Meeting',
        content: 'The Annual General Meeting consists of business and scientific parts, held not later than ten months after the close of the financial year. Quorum is fifteen full members. If quorum is not formed, the meeting dissolves and reassembles after 15 minutes without requiring quorum.',
    },
    {
        num: '16',
        title: 'Dissolution',
        content: 'Not less than three-fifths of the members may determine that the Society shall be dissolved. Upon dissolution, remaining assets after all debts and liabilities are discharged shall be transferred to an institution with similar objectives, determined by not less than three-fifths vote.',
    },
    {
        num: '17',
        title: 'Amendments of Rules',
        content: 'Notice of any proposal to amend rules must be forwarded to the Hon. Secretary in writing not later than six weeks before the Annual General Meeting. No proposal shall be considered passed unless carried by a majority of at least three-fifths of members present and voting.',
    },
    {
        num: '19',
        title: 'Notices of the Society',
        content: 'All notices will be sent to Council members through their email addresses. Emails sent and delivered constitute sufficient notice. Common notices to all members will be sent through registered emails and posted on the official website.',
    },
]

function AccordionItem({ section, index }: { section: typeof SECTIONS[number]; index: number }) {
    const [open, setOpen] = useState(index === 0)

    return (
        <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.04, ease: [0.22, 1, 0.36, 1] }}
            className={`rounded-xl border overflow-hidden transition-colors duration-200 ${open ? 'border-fun-blue-200 bg-white' : 'border-fun-blue-100 bg-white/60 hover:bg-white'}`}
        >
            <button
                onClick={() => setOpen(!open)}
                className="w-full flex items-center gap-4 px-5 py-4 text-left cursor-pointer"
            >
                <span className="text-[11px] font-bold tabular-nums text-fun-blue-300 w-6 shrink-0">
                    {section.num}
                </span>
                <span className={`flex-1 font-semibold text-sm transition-colors ${open ? 'text-fun-blue-800' : 'text-fun-blue-950/70'}`}>
                    {section.title}
                </span>
                <motion.div
                    animate={{ rotate: open ? 180 : 0 }}
                    transition={{ duration: 0.25 }}
                    className={`shrink-0 w-6 h-6 rounded-full flex items-center justify-center ${open ? 'bg-fun-blue-100' : 'bg-fun-blue-50'}`}
                >
                    <ChevronDown size={13} className={open ? 'text-fun-blue-600' : 'text-fun-blue-400'} />
                </motion.div>
            </button>

            <AnimatePresence initial={false}>
                {open && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                    >
                        <div className="px-5 pb-5 pt-1 border-t border-fun-blue-100">
                            {/* Plain text */}
                            {section.content && (
                                <p className="text-[13px] text-fun-blue-800/65 leading-relaxed pl-10">
                                    {section.content}
                                </p>
                            )}

                            {/* Bullet list */}
                            {'bullets' in section && section.bullets && (
                                <ul className="pl-10 space-y-2 mt-1">
                                    {section.bullets.map((b, i) => (
                                        <li key={i} className="flex gap-2.5 text-[13px] text-fun-blue-800/65 leading-relaxed">
                                            <span className="mt-1.5 w-1 h-1 rounded-full bg-fun-blue-300 shrink-0" />
                                            {b}
                                        </li>
                                    ))}
                                </ul>
                            )}

                            {/* Subsections */}
                            {'subsections' in section && section.subsections && (
                                <div className="pl-10 mt-2 space-y-3">
                                    {section.subsections.map((sub, i) => (
                                        <div key={i} className="flex gap-3">
                                            <span className="text-[11px] font-bold text-fun-blue-500 mt-0.5 w-28 shrink-0">{sub.label}</span>
                                            <p className="text-[13px] text-fun-blue-800/65 leading-relaxed">{sub.text}</p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    )
}

export default function AboutConstitution() {
    return (
        <div className="flex flex-col gap-8">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col gap-3"
            >
                <h2 className="font-serif text-2xl text-fun-blue-950 leading-snug">
                    Constitution of NZUSI
                </h2>
                <p className="text-fun-blue-800/55 text-[13px] leading-relaxed max-w-2xl">
                    The governing constitution of the North Zone Chapter of the Urological Society of India, last updated 30th June 2019. It defines the objectives, membership rules, governance structure, and operational guidelines of the Society.
                </p>

                {/* Meta strip */}
                <div className="flex flex-wrap items-center gap-3 mt-1">
                    <div className="flex items-center gap-1.5 px-3 py-1.5 bg-fun-blue-50 border border-fun-blue-100 rounded-lg text-[11px] text-fun-blue-600 font-medium">
                        <FileText size={11} />
                        Last updated: 30 June 2019
                    </div>
                    <div className="flex items-center gap-1.5 px-3 py-1.5 bg-fun-blue-50 border border-fun-blue-100 rounded-lg text-[11px] text-fun-blue-600 font-medium">
                        {SECTIONS.length} Sections
                    </div>
                </div>
            </motion.div>

            {/* Divider */}
            <div className="flex items-center gap-3">
                <div className="h-px w-4 bg-fun-blue-300/40" />
                <span className="text-[10px] font-semibold text-fun-blue-900/40 uppercase tracking-widest">Sections</span>
                <div className="flex-1 h-px bg-fun-blue-100" />
            </div>

            {/* Accordion */}
            <div className="flex flex-col gap-2">
                {SECTIONS.map((section, i) => (
                    <AccordionItem key={section.num} section={section} index={i} />
                ))}
            </div>

            {/* Footer note */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="rounded-xl bg-fun-blue-50 border border-fun-blue-100 px-5 py-4 flex items-start gap-3"
            >
                <div className="w-1 h-1 min-w-1 rounded-full bg-fun-blue-400 mt-2" />
                <p className="text-fun-blue-700/65 text-[12px] leading-relaxed">
                    Donations to the USI have been granted exemption from income tax under section 80G(1) of the Income Tax Act 1961, vide Order No. DIT(E)/MC/80-G/1468/97-98 INS/15533, dated 27-6-97. For any constitutional queries, contact{' '}
                    <a href="mailto:nzusioffice@gmail.com" className="text-fun-blue-600 underline underline-offset-2">
                        nzusioffice@gmail.com
                    </a>.
                </p>
            </motion.div>
        </div>
    )
}