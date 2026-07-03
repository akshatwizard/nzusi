'use client'

import { Member } from '@/types/user.types'
import { Award, CheckCircle2, Clock, XCircle, ShieldCheck } from 'lucide-react'
import { ProfileCard } from './profile_card'

function formatDate(raw: string | null) {
    if (!raw) return null
    try { return new Date(raw).toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' }) }
    catch { return raw }
}

const STATUS_CONFIG = {
    approved: { icon: <CheckCircle2 size={16} className='text-emerald-500' />, color: 'text-emerald-700', bg: 'bg-emerald-50 border-emerald-200' },
    pending: { icon: <Clock size={16} className='text-amber-500' />, color: 'text-amber-700', bg: 'bg-amber-50  border-amber-200' },
    rejected: { icon: <XCircle size={16} className='text-red-500' />, color: 'text-red-700', bg: 'bg-red-50    border-red-200' },
}

export default function MembershipCard({ user }: { user: Member }) {
    const cfg = STATUS_CONFIG[user.status] ?? STATUS_CONFIG.pending

    return (
        <ProfileCard title='Membership' icon={<Award size={14} />}>
            <div className='flex flex-col gap-5'>

                {/* Status banner */}
                <div className={`flex items-center gap-3 px-4 py-3 rounded-xl border ${cfg.bg}`}>
                    {cfg.icon}
                    <div>
                        <div className={`font-semibold text-[13px] ${cfg.color}`}>
                            {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                            {user.membership_type ? ` — ${user.membership_type}` : ' — NZUSI Membership'}
                        </div>
                        {user.membership_no && (
                            <div className='text-[11px] text-slate-500 font-mono mt-0.5'>
                                Member No: {user.membership_no}
                            </div>
                        )}
                    </div>
                </div>

                {/* Grid of quick facts */}
                <div className='grid grid-cols-2 sm:grid-cols-3 gap-4'>
                    {/* <div>
                        <div className='text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-1'>Approval Date</div>
                        <div className='text-[13px] text-slate-700'>{formatDate(user.membership_approved_date) ?? 'Pending'}</div>
                    </div> */}
                    <div>
                        <div className='text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-1'>Active</div>
                        <div className={`text-[13px] font-medium ${user.is_active ? 'text-emerald-600' : 'text-red-500'}`}>
                            {user.is_active ? 'Yes' : 'No'}
                        </div>
                    </div>
                    <div>
                        <div className='text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-1'>Verified</div>
                        <div className={`text-[13px] font-medium ${user.is_verified ? 'text-emerald-600' : 'text-amber-600'}`}>
                            {user.is_verified ? 'Yes' : 'Pending'}
                        </div>
                    </div>
                </div>

                {/* USI membership */}
                <div className={`flex items-start gap-3 p-4 rounded-xl border ${user.usi_member === 'yes' ? 'border-violet-200 bg-violet-50/40' : 'border-slate-100 bg-slate-50/30'}`}>
                    <ShieldCheck size={16} className={user.usi_member === 'yes' ? 'text-violet-500 mt-0.5' : 'text-slate-300 mt-0.5'} />
                    <div>
                        <div className='text-[12px] font-semibold text-slate-700 mb-0.5'>
                            USI (Urological Society of India) Membership
                        </div>
                        {user.usi_member === 'yes' ? (
                            <div className='text-[12px] text-slate-500'>
                                Member · {user.usi_number ? `USI No: ${user.usi_number}` : 'USI number not provided'}
                            </div>
                        ) : (
                            <div className='text-[12px] text-slate-400'>Not a USI member</div>
                        )}
                    </div>
                </div>

                {/* Membership Notice */}
                <div className="flex items-start gap-3 rounded-xl border border-blue-200 bg-blue-50 px-4 py-3">
                    <ShieldCheck
                        size={16}
                        className="mt-0.5 shrink-0 text-blue-600"
                    />
                    <div>
                        <p className="text-[12px] font-medium text-fun-blue-600">
                            Membership ID is managed by the administrator.
                        </p>
                        <p className="mt-0.5 text-[11px] leading-relaxed text-fun-blue-800">
                            Your Membership Number can only be updated by the
                            NZUSI administration. If you believe your Membership ID is
                            incorrect or missing, please contact the administrator.
                        </p>
                    </div>
                </div>

                {/* Pending CTA */}
                {user.status === 'pending' && (
                    <div className='pt-2 border-t border-slate-100'>
                        <a
                            href='/files/NZUSI-MEMBERSHIP-APPLICATION-FORM.pdf'
                            target='_blank'
                            className='inline-flex items-center gap-2 bg-fun-blue-600 hover:bg-fun-blue-500 text-white text-[13px] font-semibold px-5 py-2.5 rounded-xl transition-colors duration-200'>
                            Complete Application
                        </a>
                    </div>
                )}
            </div>
        </ProfileCard>
    )
}