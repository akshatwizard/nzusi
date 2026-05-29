"use client";
import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import {
    X, ChevronRight, User, Mail,
    Building2, Phone, GraduationCap,
    CheckCircle2, ArrowRight, Upload, FileText,
    IdCard
} from 'lucide-react'
import { useMutation } from '@tanstack/react-query';
import { api } from '@/services/api';
import toast from 'react-hot-toast';


export default function RegisterModal({ onClose }: { onClose: () => void }) {
    const [step, setStep] = useState(1)
    const [submitted, setSubmitted] = useState(false)
    const [abstractId, setAbstractId] = useState('')
    const [file, setFile] = useState<File | null>(null)
    const fileInputRef = useRef<HTMLInputElement>(null)

    const [form, setForm] = useState({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        nzusi_membership_no: '',
        usi_membership_no: '',
        conf_reg_no: '',
        institution: '',
        designation: '',
        city: '',
        presentation_type: '',
        topic_category: '',
        abstract_title: '',
        authors: '',
        corresponding_author: '',
        abstract_body: '',
        video_link: ''
    })

    const update = (k: keyof typeof form, v: string) =>
        setForm(f => ({ ...f, [k]: v }))

    const { mutate, isPending } = useMutation({
        mutationFn: async () => {
            const payload = new FormData()

            // Append all text fields
            Object.entries(form).forEach(([key, value]) => {
                if (value) payload.append(key, value)
            })

            // Append file if present
            if (file) payload.append('supporting_file', file)

            return await api.post('/abstract-submission', payload, {
                headers: { 'Content-Type': 'multipart/form-data' },
            })
        },
        onSuccess: (res) => {
            // console.log(res.data);?? Math.random().toString(36).slice(2, 8).toUpperCase()
            setAbstractId(res.data?.data.abstract_id)
            setSubmitted(true)
        },
        onError: (err: any) => {
            const message =
                err?.response?.data?.message ??
                err?.response?.data?.error ??
                'Something went wrong. Please try again.'
            toast.error(message)
        },
    })

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const picked = e.target.files?.[0] ?? null
        if (picked && picked.size > 50 * 1024 * 1024) {
            toast.error('File must be under 50 MB.')
            return
        }
        if (picked && picked.type !== "application/pdf") {
            toast.error("Unsupported file...!");
            return
        }

        setFile(picked)
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        mutate()
    }

    const wordCount = form.abstract_body.trim().split(/\s+/).filter(Boolean).length

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
            {/* Backdrop */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="absolute inset-0 bg-fun-blue-950/70 backdrop-blur-sm"
            />

            {/* Modal */}
            <motion.div
                initial={{ opacity: 0, scale: 0.96, y: 16 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: 16 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="relative z-10 w-full max-w-xl bg-white rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
            >
                {/* Header */}
                <div className="bg-fun-blue-950 px-7 pt-7 pb-6 shrink-0">
                    <div className="flex items-start justify-between gap-4">
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <span className="text-[10px] font-bold tracking-widest uppercase text-fun-blue-400">
                                    NZUSICON 2026 · Abstract Submission
                                </span>
                            </div>
                            <h2 className="text-xl text-white leading-snug">
                                {submitted ? 'Abstract Submitted' : step === 1 ? 'Your Details' : 'Abstract Information'}
                            </h2>
                        </div>
                        <button
                            onClick={onClose}
                            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors shrink-0 mt-0.5"
                        >
                            <X size={14} className="text-white" />
                        </button>
                    </div>

                    {/* Step indicator */}
                    {!submitted && (
                        <div className="flex items-center gap-2 mt-5">
                            {[1, 2].map(s => (
                                <div key={s} className="flex items-center gap-2">
                                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold transition-all ${step >= s ? 'bg-fun-blue-400 text-white' : 'bg-white/10 text-fun-blue-500'}`}>
                                        {step > s ? <CheckCircle2 size={13} /> : s}
                                    </div>
                                    <span className={`text-[11px] font-medium ${step >= s ? 'text-fun-blue-200' : 'text-fun-blue-600'}`}>
                                        {s === 1 ? 'Personal Info' : 'Abstract Details'}
                                    </span>
                                    {s < 2 && <ChevronRight size={12} className="text-fun-blue-700" />}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Body */}
                <div className="overflow-y-auto flex-1">
                    <AnimatePresence mode="wait">

                        {/* ── Success ── */}
                        {submitted ? (
                            <motion.div
                                key="success"
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="flex flex-col items-center text-center p-10 gap-4"
                            >
                                <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center">
                                    <CheckCircle2 size={28} className="text-emerald-500" />
                                </div>
                                <h3 className="text-fun-blue-950 font-semibold text-lg">Submission Received!</h3>
                                <p className="text-zinc-500 text-sm leading-relaxed max-w-xs">
                                    Thank you, <strong>{form.first_name}</strong>. Your abstract has been submitted.
                                    You will receive a confirmation at <strong>{form.email}</strong> within 48 hours.
                                </p>
                                <div className="mt-2 px-4 py-3 rounded-xl bg-fun-blue-50 border border-fun-blue-100 text-xs text-fun-blue-600 font-medium">
                                    Abstract ID: {abstractId}
                                </div>
                                <button
                                    onClick={onClose}
                                    className="mt-4 px-6 py-2.5 bg-fun-blue-950 text-white rounded-xl text-sm font-semibold hover:bg-fun-blue-800 transition-colors"
                                >
                                    Close
                                </button>
                            </motion.div>

                        ) : step === 1 ? (

                            /* ── Step 1: Personal Info ── */
                            <motion.form
                                key="step1"
                                initial={{ opacity: 0, x: -16 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 16 }}
                                transition={{ duration: 0.25 }}
                                className="p-7 flex flex-col gap-4"
                                onSubmit={e => { e.preventDefault(); setStep(2) }}
                            >
                                <div className="grid grid-cols-2 gap-3">
                                    <Field label="First Name" required icon={User}>
                                        <input
                                            required
                                            value={form.first_name}
                                            onChange={e => update('first_name', e.target.value)}
                                            placeholder="Rajesh"
                                            className={inputCls}
                                            autoFocus
                                        />
                                    </Field>
                                    <Field label="Last Name">
                                        <input
                                            value={form.last_name}
                                            onChange={e => update('last_name', e.target.value)}
                                            placeholder="Kumar"
                                            className={inputCls}
                                        />
                                    </Field>
                                </div>
                                <Field label="Email Address" icon={Mail}>
                                    <input
                                        type="email"
                                        value={form.email}
                                        onChange={e => update('email', e.target.value)}
                                        placeholder="doctor@hospital.in"
                                        className={inputCls}
                                    />
                                </Field>
                                <Field label="Phone Number" icon={Phone}>
                                    <input
                                        type="tel"
                                        value={form.phone}
                                        onChange={e => update('phone', e.target.value)}
                                        placeholder="+91 98765 43210"
                                        className={inputCls}
                                    />
                                </Field>
                                <Field label="NZUSI Membership No." icon={IdCard}>
                                    <input
                                        type="text"
                                        value={form.nzusi_membership_no}
                                        onChange={e => update('nzusi_membership_no', e.target.value)}
                                        placeholder="RM000012"
                                        className={inputCls}
                                    />
                                </Field>
                                <Field label="USI Membership No." icon={IdCard}>
                                    <input
                                        type="text"
                                        value={form.usi_membership_no}
                                        onChange={e => update('usi_membership_no', e.target.value)}
                                        placeholder="USI000132"
                                        className={inputCls}
                                    />
                                </Field>
                                <Field label="Conference Registration No." icon={IdCard}>
                                    <input
                                        type="text"
                                        value={form.conf_reg_no}
                                        onChange={e => update('conf_reg_no', e.target.value)}
                                        placeholder="NZUSI1211"
                                        className={inputCls}
                                    />
                                    <span className='text-[11px] italic text-red-500 font-light'>
                                        "Last date for conference registration is 31st August."
                                    </span>
                                </Field>
                                <Field label="Institution / Hospital" icon={Building2}>
                                    <input
                                        value={form.institution}
                                        onChange={e => update('institution', e.target.value)}
                                        placeholder="AIIMS, New Delhi"
                                        className={inputCls}
                                    />
                                </Field>
                                <div className="grid grid-cols-2 gap-3">
                                    <Field label="Designation" icon={GraduationCap}>
                                        <input
                                            value={form.designation}
                                            onChange={e => update('designation', e.target.value)}
                                            placeholder="Senior Resident"
                                            className={inputCls}
                                        />
                                    </Field>
                                    <Field label="City">
                                        <input
                                            value={form.city}
                                            onChange={e => update('city', e.target.value)}
                                            placeholder="New Delhi"
                                            className={inputCls}
                                        />
                                    </Field>
                                </div>
                                <button
                                    type="submit"

                                    className="mt-2 w-full py-3 bg-fun-blue-950 text-white rounded-xl font-semibold text-sm hover:bg-fun-blue-800 transition-colors flex items-center justify-center gap-2"
                                >
                                    Continue <ArrowRight size={14} />
                                </button>
                            </motion.form>

                        ) : (
                            <motion.form
                                key="step2"
                                initial={{ opacity: 0, x: 16 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -16 }}
                                transition={{ duration: 0.25 }}
                                className="p-7 flex flex-col gap-4"
                                onSubmit={handleSubmit}
                            >
                                <Field label="Presentation Type" required>
                                    <select
                                        required
                                        value={form.presentation_type}
                                        onChange={e => update('presentation_type', e.target.value)}
                                        className={inputCls}
                                        autoFocus
                                    >
                                        <option value="">Select type…</option>
                                        {PRESENTATION_TYPES.map(t => (
                                            <option key={t.value} value={t.value}>{t.label}</option>
                                        ))}
                                    </select>
                                </Field>
                                <Field label="Topic / Category" required>
                                    <select
                                        required
                                        value={form.topic_category}
                                        onChange={e => update('topic_category', e.target.value)}
                                        className={inputCls}
                                    >
                                        <option value="">Select topic…</option>
                                        {TOPICS.map(t => (
                                            <option key={t} value={t}>{t}</option>
                                        ))}
                                    </select>
                                </Field>
                                <Field label="Abstract Title" required>
                                    <input
                                        required
                                        value={form.abstract_title}
                                        onChange={e => update('abstract_title', e.target.value)}
                                        placeholder="Enter the full title of your abstract"
                                        className={inputCls}
                                    />
                                </Field>
                                <Field label="Authors (comma separated)" required>
                                    <input
                                        required
                                        value={form.authors}
                                        onChange={e => update('authors', e.target.value)}
                                        placeholder="Dr A Kumar, Dr B Singh, Prof C Sharma"
                                        className={inputCls}
                                    />
                                </Field>
                                <Field label="Corresponding Author" required>
                                    <input
                                        required
                                        value={form.corresponding_author}
                                        onChange={e => update('corresponding_author', e.target.value)}
                                        placeholder="Dr A Kumar"
                                        className={inputCls}
                                    />
                                </Field>
                                <Field label="Video Link">
                                    <input
                                        value={form.video_link}
                                        onChange={e => update('video_link', e.target.value)}
                                        placeholder="https://youtube.com/dfkjasd_wed"
                                        className={inputCls}
                                    />
                                </Field>
                                <Field label="Abstract Body" required>
                                    <textarea
                                        required
                                        rows={5}
                                        value={form.abstract_body}
                                        onChange={e => update('abstract_body', e.target.value)}
                                        placeholder="Aims, Methods, Results, Conclusions (max 300 words)…"
                                        className={`${inputCls} resize-none`}
                                    />
                                    <p className={`text-[11px] mt-1 ${wordCount > 300 ? 'text-red-400 font-medium' : 'text-zinc-400'}`}>
                                        {wordCount} / 300 words
                                    </p>
                                </Field>

                                {/* File upload */}
                                <div>
                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        accept=".pdf"
                                        className="hidden"
                                        onChange={handleFileChange}
                                    />
                                    <div
                                        onClick={() => fileInputRef.current?.click()}
                                        className="border-2 border-dashed border-fun-blue-100 rounded-xl p-5 flex flex-col items-center gap-2 text-center hover:border-fun-blue-300 transition-colors cursor-pointer"
                                    >
                                        {file ? (
                                            <>
                                                <FileText size={20} className="text-fun-blue-500" />
                                                <p className="text-sm font-medium text-fun-blue-700">{file.name}</p>
                                                <p className="text-[11px] text-zinc-400">
                                                    {(file.size / 1024 / 1024).toFixed(2)} MB · Click to change
                                                </p>
                                            </>
                                        ) : (
                                            <>
                                                <Upload size={20} className="text-fun-blue-300" />
                                                <p className="text-sm font-medium text-fun-blue-700">Upload supporting file</p>
                                                <p className="text-[11px] text-zinc-400">PDF — max 50 MB (optional)</p>
                                            </>
                                        )}
                                    </div>
                                </div>

                                <div className="flex gap-3 mt-2">
                                    <button
                                        type="button"
                                        onClick={() => setStep(1)}
                                        disabled={isPending}
                                        className="flex-1 py-3 border border-fun-blue-200 text-fun-blue-700 rounded-xl font-semibold text-sm hover:bg-fun-blue-50 transition-colors disabled:opacity-50"
                                    >
                                        Back
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={isPending || wordCount > 300}
                                        className="flex-1 py-3 bg-fun-blue-950 text-white rounded-xl font-semibold text-sm hover:bg-fun-blue-800 transition-colors flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                                    >
                                        {isPending ? (
                                            <>
                                                <motion.span
                                                    animate={{ rotate: 360 }}
                                                    transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                                                    className="inline-block w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full"
                                                />
                                                Submitting…
                                            </>
                                        ) : (
                                            <>Submit Abstract <CheckCircle2 size={14} /></>
                                        )}
                                    </button>
                                </div>
                            </motion.form>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>
        </motion.div>
    )
}


const PRESENTATION_TYPES = [
    { value: 'video', label: 'Video Presentation (BV)' },
    { value: 'podium', label: 'Podium / Best Paper (BP)' },
    { value: 'poster', label: 'Moderated Poster (BPos)' },
    { value: 'eposter', label: 'Unmoderated e-Poster (UPos)' },
]

const TOPICS = [
    'Endourology & Stone Disease',
    'Uro-oncology',
    'Reconstructive Urology',
    'Female Urology & Incontinence',
    'Andrology & Sexual Medicine',
    'Paediatric Urology',
    'Renal Transplantation',
    'Laparoscopy & Robotics',
    'Trauma & Emergency Urology',
    'Infections & Inflammation',
    'Other',
]

const inputCls = `w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 bg-zinc-50
    text-fun-blue-950 text-sm placeholder:text-zinc-400
    focus:outline-none focus:border-fun-blue-400 focus:bg-white focus:ring-2 focus:ring-fun-blue-100
    transition-all`

function Field({ label, required, icon: Icon, children }: {
    label: string; required?: boolean; icon?: React.ElementType; children: React.ReactNode
}) {
    return (
        <div className="flex flex-col gap-1.5">
            <label className="text-[12px] font-semibold text-fun-blue-900 flex items-center gap-1.5">
                {Icon && <Icon size={11} className="text-fun-blue-400" />}
                {label}
                {required && <span className="text-red-400">*</span>}
            </label>
            {children}
        </div>
    )
}