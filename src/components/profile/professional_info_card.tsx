'use client'

import { Member } from '@/types/user.types'
import { Stethoscope, GraduationCap, FlaskConical, Plus, CalendarDays } from 'lucide-react'
import { ProfileCard } from './profile_card'
import { useProfileContext } from '@/context/profile_update_context'

function formatTrainingDate(raw: string) {
    try { return new Date(raw).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) }
    catch { return raw }
}

function StatusDot({ status }: { status: 'done' | 'pending' }) {
    return (
        <span className={`inline-flex items-center gap-1 text-[9px] font-bold px-2 py-0.5 rounded-full border ${status === 'done'
            ? 'bg-emerald-50 text-emerald-600 border-emerald-200'
            : 'bg-amber-50 text-amber-600 border-amber-200'
            }`}>
            <span className={`w-1 h-1 rounded-full ${status === 'done' ? 'bg-emerald-500' : 'bg-amber-500'}`} />
            {status === 'done' ? 'Complete' : 'Pending'}
        </span>
    )
}

function EmptyState({ label, onAdd }: { label: string; onAdd: () => void }) {
    return (
        <button
            onClick={onAdd}
            className='w-full flex items-center justify-center gap-2 py-5 border border-dashed border-slate-200 rounded-xl text-[12px] text-slate-400 hover:text-fun-blue-600 hover:border-fun-blue-200 hover:bg-fun-blue-50/40 transition-all duration-200 cursor-pointer'
        >
            <Plus size={13} /> Add {label}
        </button>
    )
}

export default function ProfessionalInfoCard({ user }: { user: Member }) {
    const { setUpdateDesignation, setUpdateAcademic } = useProfileContext()
    return (
        <ProfileCard title='Professional Details' icon={<Stethoscope size={14} />} >
            <div className='flex flex-col gap-8'>

                {/* ── Present Designations ── */}
                <div>
                    <div className='flex items-center justify-between mb-3'>
                        <div className='flex items-center gap-2'>
                            <Stethoscope size={13} className='text-fun-blue-400' />
                            <span className='text-[11px] font-semibold text-slate-500 uppercase tracking-widest'>Current Designations</span>
                        </div>
                        <StatusDot status={user.designation_status} />
                    </div>

                    {user.present_designations.length > 0 ? (
                        <div className='flex flex-col gap-3'>
                            {user.present_designations.map((d, i) => (
                                <div key={d.id} className={`flex items-start gap-4 p-4 rounded-xl border ${i === 0 ? 'border-fun-blue-200 bg-fun-blue-50/40' : 'border-slate-100 bg-slate-50/30'}`}>
                                    <div className='w-8 h-8 rounded-lg bg-fun-blue-600 flex items-center justify-center text-white shrink-0'>
                                        <span className='font-serif text-[13px]'>{i + 1}</span>
                                    </div>
                                    <div className='flex-1 min-w-0'>
                                        <div className='font-medium text-[13px] text-slate-800 mb-0.5'>{d.designation}</div>
                                        <div className='text-[12px] text-slate-500'>{d.institution}</div>
                                        {d.year_of_joining && (
                                            <div className='flex items-center gap-1 text-[11px] text-slate-400 mt-1'>
                                                <CalendarDays size={10} /> Joined {d.year_of_joining}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <EmptyState label='designation' onAdd={() => setUpdateDesignation(true)} />
                    )}
                </div>

                {/* ── Academic Qualifications ── */}
                <div>
                    <div className='flex items-center justify-between mb-3'>
                        <div className='flex items-center gap-2'>
                            <GraduationCap size={13} className='text-fun-blue-400' />
                            <span className='text-[11px] font-semibold text-slate-500 uppercase tracking-widest'>Academic Qualifications</span>
                        </div>
                        <StatusDot status={user.academic_status} />
                    </div>

                    {user.academic_qualifications.length > 0 && (
                        <div className='relative'>
                            {/* Timeline line */}
                            <div className='absolute left-4 top-5 bottom-5 w-px bg-slate-100' />

                            <div className='flex flex-col gap-1'>
                                {user.academic_qualifications
                                    .sort((a, b) => Number(b.year_of_passing) - Number(a.year_of_passing))
                                    .map((q) => (
                                        <div key={q.id} className='flex items-start gap-4 pl-0'>
                                            {/* Timeline dot */}
                                            <div className='w-8 h-8 rounded-full bg-white border-2 border-fun-blue-200 flex items-center justify-center shrink-0 z-10'>
                                                <div className='w-2 h-2 rounded-full bg-fun-blue-400' />
                                            </div>
                                            <div className='flex-1 pb-4'>
                                                <div className='font-semibold text-[13px] text-slate-800'>{q.degree}</div>
                                                <div className='text-[12px] text-slate-500 mt-0.5'>{q.institution}</div>
                                                <div className='text-[11px] text-slate-400 mt-1'>{q.year_of_passing}</div>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    )}
                    <EmptyState label='qualification' onAdd={() => { setUpdateAcademic(true) }} />
                </div>

                {/* ── Urology Trainings ── */}
                <div>
                    <div className='flex items-center justify-between mb-3'>
                        <div className='flex items-center gap-2'>
                            <FlaskConical size={13} className='text-fun-blue-400' />
                            <span className='text-[11px] font-semibold text-slate-500 uppercase tracking-widest'>Urology Trainings</span>
                        </div>
                        <StatusDot status={user.training_status} />
                    </div>

                    {user.urology_trainings.length > 0 ? (
                        <div className='flex flex-col gap-3'>
                            {user.urology_trainings.map((t) => (
                                <div key={t.id} className='flex items-start gap-4 p-4 rounded-xl border border-slate-100 bg-slate-50/30'>
                                    <div className='w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0'>
                                        <FlaskConical size={13} className='text-emerald-500' />
                                    </div>
                                    <div className='flex-1 min-w-0'>
                                        <div className='font-medium text-[13px] text-slate-800 mb-1'>{t.institution}</div>
                                        <div className='flex items-center gap-1.5 text-[11px] text-slate-400'>
                                            <CalendarDays size={10} />
                                            {formatTrainingDate(t.from_date)}
                                            <span>→</span>
                                            {formatTrainingDate(t.to_date)}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <EmptyState label='urology training' onAdd={() => { }} />
                    )}
                </div>

            </div>
        </ProfileCard>
    )
}