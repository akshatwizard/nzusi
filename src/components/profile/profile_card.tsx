import { Pencil } from 'lucide-react'
import { ReactNode } from 'react'

type Props = {
    title: string
    icon: ReactNode
    onEdit?: () => void
    children: ReactNode
    accentColor?: string
}

export function ProfileCard({ title, icon, onEdit, children, accentColor = 'bg-fun-blue-500' }: Props) {
    return (
        <div className='bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden'>
            {/* Header */}
            <div className='flex items-center justify-between px-5 md:px-6 py-4 border-b border-slate-100'>
                <div className='flex items-center gap-2.5'>
                    <div className={`w-7 h-7 rounded-lg ${accentColor} bg-opacity-10 flex items-center justify-center`}
                        style={{ background: '' }}>
                        <div className='text-white'>{icon}</div>
                    </div>
                    <h2 className='font-serif text-[17px] text-slate-900'>{title}</h2>
                </div>
                {onEdit && (
                    <button
                        onClick={onEdit}
                        className='flex items-center gap-1.5 text-[12px] font-medium text-fun-blue-600 hover:text-fun-blue-700 bg-fun-blue-50 hover:bg-fun-blue-100 border border-fun-blue-100 hover:border-fun-blue-200 px-3 py-1.5 rounded-lg transition-all duration-200'
                    >
                        <Pencil size={11} />
                        Edit
                    </button>
                )}
            </div>
            {/* Body */}
            <div className='px-5 md:px-6 py-5'>
                {children}
            </div>
        </div>
    )
}

type FieldProps = {
    label: string
    value?: string | null
    placeholder?: string
    fullWidth?: boolean
    mono?: boolean
}

export function ProfileField({ label, value, placeholder = 'Not provided', fullWidth = false, mono = false }: FieldProps) {
    return (
        <div className={fullWidth ? 'col-span-2' : ''}>
            <div className='text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-1'>
                {label}
            </div>
            <div className={`text-[14px] ${mono ? 'font-mono' : ''} ${value ? 'text-slate-800' : 'text-slate-300 italic'}`}>
                {value || placeholder}
            </div>
        </div>
    )
}