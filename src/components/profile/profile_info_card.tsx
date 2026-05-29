'use client'

import { Member, getPreferredAddress, hasAddress } from '@/types/user.types'
import { User, MapPin, Pencil } from 'lucide-react'
import { ProfileCard, ProfileField } from './profile_card'
import { useProfileContext } from '@/context/profile_update_context'

function formatDate(raw: string | null) {
    if (!raw) return null
    try {
        return new Date(raw).toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' })
    } catch { return raw }
}

function formatLastLogin(raw: string | null) {
    if (!raw) return null
    try {
        return new Date(raw).toLocaleString('en-IN', {
            day: '2-digit', month: 'short', year: 'numeric',
            hour: '2-digit', minute: '2-digit'
        })
    } catch { return raw }
}

export default function PersonalInfoCard({ user }: { user: Member }) {
    const { setEditProfile, setUpdateAddress } = useProfileContext()
    const addr = getPreferredAddress(user)
    const hasAddr = hasAddress(addr)

    const officeHas = hasAddress(user.office_address)
    const residenceHas = hasAddress(user.residence_address)

    return (
        <ProfileCard title='Personal Information' icon={<User size={14} />} onEdit={() => setEditProfile(true)}>
            {/* Core fields */}
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5 mb-6'>
                <ProfileField label='Full Name' value={user.name} />
                <ProfileField label='Email' value={user.email} />
                <ProfileField label='Phone' value={user.mobile_no} />
                <ProfileField label='Gender' value={user.gender} />
                <ProfileField label='Date of Birth' value={formatDate(user.dob)} />
                {/* <ProfileField label='Last Login' value={formatLastLogin(user.last_login_at)} /> */}
            </div>

            {/* Address blocks */}
            {(officeHas || residenceHas) && (
                <div className='pt-5 border-t border-slate-100'>
                    <div className='flex items-center justify-between'>
                        <div className='flex items-center gap-2 mb-4'>
                            <MapPin size={13} className='text-fun-blue-400' />
                            <span className='text-[10px] font-semibold text-slate-400 uppercase tracking-widest'>
                                Addresses
                            </span>
                        </div>

                        <button
                            onClick={() => setUpdateAddress(true)}
                            className='flex items-center gap-1.5 text-[12px] font-medium text-fun-blue-600 hover:text-fun-blue-700 bg-fun-blue-50 hover:bg-fun-blue-100 border border-fun-blue-100 hover:border-fun-blue-200 px-3 py-1.5 rounded-lg transition-all duration-200'
                        >
                            <Pencil size={11} />
                            Edit
                        </button>

                    </div>
                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>

                        {/* Office address */}
                        {officeHas && (
                            <div className={`rounded-xl border p-4 ${user.preferred_address === 'office' ? 'border-fun-blue-200 bg-fun-blue-50/40' : 'border-slate-100 bg-slate-50/50'}`}>
                                <div className='flex items-center gap-2 mb-3'>
                                    <span className='text-[10px] font-semibold text-slate-500 uppercase tracking-widest'>Office</span>
                                    {user.preferred_address === 'office' && (
                                        <span className='text-[9px] font-bold bg-fun-blue-100 text-fun-blue-600 px-1.5 py-0.5 rounded-full'>Preferred</span>
                                    )}
                                </div>
                                <div className='flex flex-col gap-1.5 text-[12px] text-slate-600'>
                                    {user.office_address?.address && <div>{user.office_address.address}</div>}
                                    {(user.office_address?.city || user.office_address?.state) && (
                                        <div>{[user.office_address.city, user.office_address.state, user.office_address.pin].filter(Boolean).join(', ')}</div>
                                    )}
                                    {user.office_address?.phone && <div className='text-slate-400'>{user.office_address.phone}</div>}
                                    {user.office_address?.email && <div className='text-slate-400'>{user.office_address.email}</div>}
                                    {user.office_address?.website && <div className='text-fun-blue-500 underline underline-offset-2'>{user.office_address.website}</div>}
                                </div>
                            </div>
                        )}

                        {/* Residence address */}
                        {residenceHas && (
                            <div className={`rounded-xl border p-4 ${user.preferred_address === 'residence' ? 'border-fun-blue-200 bg-fun-blue-50/40' : 'border-slate-100 bg-slate-50/50'}`}>
                                <div className='flex items-center gap-2 mb-3'>
                                    <span className='text-[10px] font-semibold text-slate-500 uppercase tracking-widest'>Residence</span>
                                    {user.preferred_address === 'residence' && (
                                        <span className='text-[9px] font-bold bg-fun-blue-100 text-fun-blue-600 px-1.5 py-0.5 rounded-full'>Preferred</span>
                                    )}
                                </div>
                                <div className='flex flex-col gap-1.5 text-[12px] text-slate-600'>
                                    {user.residence_address?.address && <div>{user.residence_address.address}</div>}
                                    {(user.residence_address?.city || user.residence_address?.state) && (
                                        <div>{[user.residence_address.city, user.residence_address.state, user.residence_address.pin].filter(Boolean).join(', ')}</div>
                                    )}
                                    {user.residence_address?.phone && <div className='text-slate-400'>{user.residence_address.phone}</div>}
                                    {user.residence_address?.email && <div className='text-slate-400'>{user.residence_address.email}</div>}
                                </div>
                            </div>
                        )}

                        {/* If neither exists yet */}
                        {!officeHas && !residenceHas && (
                            <div className='col-span-2 text-[13px] text-slate-300 italic'>No address provided yet.</div>
                        )}
                    </div>
                </div>
            )}
        </ProfileCard>
    )
}