'use client'

import { Member } from '@/types/user.types'
import { motion, AnimatePresence } from 'motion/react'
import {
    User, Stethoscope, Award, Activity,
    LayoutDashboard, LogOut, AlertCircle, ChevronRight
} from 'lucide-react'
import { CompletionResult, ProfileField } from '@/lib/profile_completion'
import { ActiveSection } from '@/app/profile/[user_name]/page'
import { useAuth } from '@/context/auth_context'

type Props = {
    user: Member
    completion: CompletionResult
    active: ActiveSection
    onSelect: (s: ActiveSection) => void
}

const NAV_ITEMS: { id: ActiveSection; label: string; icon: React.ReactNode }[] = [
    { id: 'overview', label: 'Overview', icon: <LayoutDashboard size={15} /> },
    { id: 'personal', label: 'Personal Info', icon: <User size={15} /> },
    { id: 'professional', label: 'Professional', icon: <Stethoscope size={15} /> },
    { id: 'membership', label: 'Membership', icon: <Award size={15} /> },
    { id: 'activity', label: 'Activity', icon: <Activity size={15} /> },
]

export default function ProfileSidebar({ user, completion, active, onSelect }: Props) {
    const { logout, isLoggingOut } = useAuth()

    const topMissing = completion.missing.slice(0, 3)

    return (
        <aside className='lg:w-60 xl:w-64 shrink-0 flex flex-col gap-4'>

            {/* ── Navigation ── */}
            <div className='bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden'>
                <div className='px-4 py-3.5 border-b border-slate-100'>
                    <span className='text-[10px] font-semibold text-slate-400 uppercase tracking-widest'>
                        My Profile
                    </span>
                </div>
                <nav className='p-2 flex flex-col gap-0.5'>
                    {NAV_ITEMS.map((item) => {
                        const isActive = active === item.id
                        return (
                            <button
                                key={item.id}
                                onClick={() => onSelect(item.id)}
                                className={`
                                    group relative w-full flex items-center gap-3 px-3 py-2.5 rounded-xl
                                    text-[13px] font-medium text-left transition-all duration-150 cursor-pointer
                                    ${isActive
                                        ? 'text-fun-blue-700'
                                        : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
                                    }
                                `}
                            >
                                {isActive && (
                                    <motion.span
                                        layoutId='profile-nav-pill'
                                        className='absolute inset-0 rounded-xl bg-fun-blue-50 border border-fun-blue-100'
                                        transition={{ type: 'spring', bounce: 0.18, duration: 0.4 }}
                                    />
                                )}
                                <span className={`relative z-10 ${isActive ? 'text-fun-blue-600' : 'text-slate-400 group-hover:text-slate-500'}`}>
                                    {item.icon}
                                </span>
                                <span className='relative z-10 flex-1'>{item.label}</span>
                                {isActive && (
                                    <ChevronRight size={13} className='relative z-10 text-fun-blue-400' />
                                )}
                            </button>
                        )
                    })}
                </nav>

                {/* Logout */}
                <div className='px-2 pb-2 pt-1 border-t border-slate-50 mt-1'>
                    <button
                        onClick={logout}
                        disabled={isLoggingOut}
                        className='w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-medium text-red-400 hover:text-red-600 hover:bg-red-50 transition-all duration-150 cursor-pointer disabled:opacity-60'
                    >
                        <LogOut size={15} />
                        {isLoggingOut ? 'Signing out…' : 'Sign Out'}
                    </button>
                </div>
            </div>

            {/* ── Completion tips ── */}
            <AnimatePresence>
                {topMissing.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className='bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden'
                    >
                        <div className='px-4 py-3.5 border-b border-slate-100 flex items-center gap-2'>
                            <AlertCircle size={13} className='text-amber-500' />
                            <span className='text-[11px] font-semibold text-slate-500 uppercase tracking-widest'>
                                Complete your profile
                            </span>
                        </div>
                        <div className='p-3 flex flex-col gap-1.5'>
                            {topMissing.map((field) => (
                                <button
                                    key={field.key}
                                    className='flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-left text-[12px] text-slate-500 hover:text-slate-700 hover:bg-slate-50 transition-colors duration-150 group w-full cursor-pointer'
                                >
                                    <div className='w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0' />
                                    <span className='flex-1'>Add {field.label}</span>
                                    <ChevronRight size={11} className='text-slate-300 group-hover:text-slate-400 transition-colors' />
                                </button>
                            ))}
                            {completion.missing.length > 3 && (
                                <div className='text-[11px] text-slate-400 text-center pt-1'>
                                    +{completion.missing.length - 3} more fields
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ── Membership ID card mini ── */}
            {user.membership_no && (
                <div className='relative bg-fun-blue-950 rounded-2xl overflow-hidden p-4'>
                    <div
                        className='absolute inset-0 opacity-[0.05]'
                        style={{
                            backgroundImage: `linear-gradient(rgba(255,255,255,.9) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.9) 1px,transparent 1px)`,
                            backgroundSize: '22px 22px',
                        }}
                    />
                    <div className='absolute -bottom-6 -right-6 w-24 h-24 rounded-full'
                        style={{ background: 'radial-gradient(circle,rgba(24,95,165,.5) 0%,transparent 70%)' }} />
                    <div className='relative z-10'>
                        <div className='text-[9px] font-semibold text-fun-blue-400/60 uppercase tracking-widest mb-2'>NZUSI Member ID</div>
                        <div className='font-mono text-lg font-bold text-fun-blue-100 mb-1'>#{user.membership_no}</div>
                        <div className='text-[11px] text-fun-blue-300/50'>{user.membership_type ?? "NZUSI Member"}</div>
                    </div>
                </div>
            )}
        </aside>
    )
}