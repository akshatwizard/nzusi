'use client'

import { CompletionResult } from '@/lib/profile_completion'
import { Member } from '@/types/user.types'
import { Camera, CheckCircle2, Pencil, Share2 } from 'lucide-react'
import { motion } from 'motion/react'

type Props = { user: Member; completion: CompletionResult }

function getInitials(name: string) {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
}

const STATUS_LABEL: Record<string, { label: string; color: string }> = {
    approved: { label: 'Approved', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
    pending: { label: 'Pending', color: 'bg-amber-50  text-amber-700  border-amber-200' },
    rejected: { label: 'Rejected', color: 'bg-red-50    text-red-700    border-red-200' },
}

export default function ProfileHero({ user, completion }: Props) {
    const status = STATUS_LABEL[user.status] ?? STATUS_LABEL.pending
    const pct = completion.percent
    const barColor = pct >= 80 ? 'bg-emerald-500' : pct >= 50 ? 'bg-amber-500' : 'bg-fun-blue-500'
    const pctColor = pct >= 80 ? 'text-emerald-600' : pct >= 50 ? 'text-amber-600' : 'text-red-500'

    const city = user.city_name ?? user.office_address?.city ?? user.residence_address?.city
    const state = user.office_address?.state ?? user.residence_address?.state

    return (
        <div className='bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden'>
            <div className='p-5 md:p-7 flex flex-col sm:flex-row items-start gap-5'>

                {/* Avatar */}
                <div className='relative shrink-0'>
                    <div className='w-24 h-24 md:w-28 md:h-28 rounded-2xl border-4 border-white shadow-lg bg-fun-blue-100 flex items-center justify-center'>
                        <span className='font-serif text-3xl text-fun-blue-600 select-none'>
                            {getInitials(user.name)}
                        </span>
                    </div>
                    <button aria-label='Change profile photo'
                        className='absolute -bottom-1.5 -right-1.5 w-8 h-8 rounded-full bg-fun-blue-600 border-2 border-white flex items-center justify-center text-white hover:bg-fun-blue-500 transition-colors duration-200 shadow-sm'>
                        <Camera size={13} />
                    </button>
                </div>

                {/* Info */}
                <div className='flex-1 min-w-0'>
                    <div className='flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3'>
                        <div>
                            <div className='flex items-center gap-2 flex-wrap'>
                                <h1 className='font-serif text-2xl text-slate-900 leading-tight'>{user.name}</h1>
                                {user.is_verified && <CheckCircle2 size={18} className='text-fun-blue-500 shrink-0' />}
                            </div>

                            {/* Primary designation */}
                            {user.present_designations[0] && (
                                <div className='text-slate-500 text-[13px] mt-0.5'>
                                    {user.present_designations[0].designation}
                                    {user.present_designations[0].institution && (
                                        <span className='text-slate-400'> · {user.present_designations[0].institution}</span>
                                    )}
                                </div>
                            )}

                            {(city || state) && (
                                <div className='text-slate-400 text-[12px] mt-0.5'>
                                    {[city, state].filter(Boolean).join(', ')}
                                </div>
                            )}

                            {/* Badges */}
                            <div className='flex items-center gap-2 mt-2.5 flex-wrap'>
                                {user.membership_no && (
                                    <span className='text-[11px] font-semibold bg-fun-blue-50 text-fun-blue-700 border border-fun-blue-200 px-2.5 py-0.5 rounded-full'>
                                        {user.membership_no}
                                    </span>
                                )}
                                <span className={`text-[11px] font-semibold border px-2.5 py-0.5 rounded-full ${status.color}`}>
                                    {status.label}
                                </span>
                                {user.usi_member === 'yes' && (
                                    <span className='text-[11px] font-semibold bg-violet-50 text-violet-600 border border-violet-200 px-2.5 py-0.5 rounded-full'>
                                        USI Member
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Actions */}
                        <div className='flex items-center gap-2 shrink-0'>
                            <button className='flex items-center gap-1.5 text-[12px] font-semibold text-slate-500 hover:text-slate-700 border border-slate-200 hover:border-slate-300 px-3 py-1.5 rounded-lg transition-all duration-200'>
                                <Share2 size={12} /> Share
                            </button>
                            <button className='flex items-center gap-1.5 text-[12px] font-semibold text-fun-blue-600 hover:text-fun-blue-700 border border-fun-blue-200 hover:border-fun-blue-300 bg-fun-blue-50 hover:bg-fun-blue-100 px-3 py-1.5 rounded-lg transition-all duration-200'>
                                <Pencil size={12} /> Edit Profile
                            </button>
                        </div>
                    </div>

                    {/* Progress */}
                    <div className='mt-4 pt-4 border-t border-slate-100'>
                        <div className='flex items-center justify-between mb-1.5'>
                            <span className='text-[11px] font-semibold text-slate-500'>Profile completeness</span>
                            <span className={`text-[11px] font-bold ${pctColor}`}>{pct}%</span>
                        </div>
                        <div className='h-2 bg-slate-100 rounded-full overflow-hidden'>
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${pct}%` }}
                                transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                                className={`h-full rounded-full ${barColor}`}
                            />
                        </div>
                        <div className='text-[10px] text-slate-400 mt-1'>
                            {completion.filledCount} of {completion.total} fields completed
                            {completion.missing.length > 0 && (
                                <span className='ml-1'>· Add {completion.missing[0]?.label} to improve</span>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}