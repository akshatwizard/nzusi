'use client'
import { Activity, BookOpen, Calendar, Eye } from 'lucide-react'
import { ProfileCard } from './profile_card'

const ACTIVITY_ITEMS = [
    {
        icon: <Calendar size={13} className='text-fun-blue-500' />,
        label: 'NZUSICON 2026 registration opened',
        meta: 'Nov 27–29, Amritsar',
        time: '2 days ago',
        bg: 'bg-fun-blue-50',
    },
    {
        icon: <BookOpen size={13} className='text-emerald-500' />,
        label: 'New Adyatan post: Robotic Instruments Review',
        meta: 'Adyatan · Clinical Review',
        time: '5 days ago',
        bg: 'bg-emerald-50',
    },
    {
        icon: <Eye size={13} className='text-amber-500' />,
        label: 'Your profile was viewed',
        meta: '3 profile views this week',
        time: '1 week ago',
        bg: 'bg-amber-50',
    },
    {
        icon: <Calendar size={13} className='text-fun-blue-500' />,
        label: 'ASCENT Academic Series — Jan 2026',
        meta: 'Online · Completed',
        time: '3 months ago',
        bg: 'bg-fun-blue-50',
    },
]

export default function ActivityCard() {
    return (
        <ProfileCard title='Recent Activity' icon={<Activity size={14} />}>
            <div className='flex flex-col divide-y divide-slate-50'>
                {ACTIVITY_ITEMS.map((item, i) => (
                    <div key={i} className='flex items-start gap-4 py-3.5 first:pt-0 last:pb-0'>
                        <div className={`w-7 h-7 rounded-lg ${item.bg} flex items-center justify-center shrink-0 mt-0.5`}>
                            {item.icon}
                        </div>
                        <div className='flex-1 min-w-0'>
                            <div className='text-[13px] text-slate-700 font-medium leading-snug'>{item.label}</div>
                            <div className='text-[11px] text-slate-400 mt-0.5'>{item.meta}</div>
                        </div>
                        <div className='text-[10px] text-slate-400 shrink-0 mt-0.5'>{item.time}</div>
                    </div>
                ))}
            </div>

            <div className='mt-4 pt-4 border-t border-slate-100 text-center'>
                <button className='text-[12px] font-medium text-fun-blue-600 hover:text-fun-blue-700 transition-colors duration-200'>
                    View all activity
                </button>
            </div>
        </ProfileCard>
    )
}