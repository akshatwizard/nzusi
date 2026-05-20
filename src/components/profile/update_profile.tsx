"use client";

import { useAuth } from "@/context/auth_context";
import { useProfileContext } from "@/context/profile_update_context";
import { profileUpdateService } from "@/services/profile_update";
import { Member } from "@/types/user.types";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { ArrowRight, Calendar, CheckCircle2, Mail, Phone, User, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react"
import { useState } from "react";
import toast from "react-hot-toast";
import ModalWrapper from "../ui/modal_wrapper";


export function UpdateUserProfile({ user }: { user: Member }) {
    const { refreshUser } = useAuth()
    const { editProfile, setEditProfile } = useProfileContext();
    const [submitted, setSubmitted] = useState(false);
    const [profile, setProfile] = useState({
        name: user.name,
        email: user.email,
        gender: user.gender,
        city_name: user.city_name,
        mobile_no: user.mobile_no,
        dob: user.dob,
    })

    const update = (k: keyof typeof profile, v: string) => setProfile(f => ({ ...f, [k]: v }))

    const { mutate, isPending } = useMutation({
        mutationFn: () => profileUpdateService.updateProfile({ payload: profile }),
        onSuccess: (value) => {
            toast.success(value.message)
            setSubmitted(true)
            refreshUser();
        },
        onError: (val: AxiosError<{ error?: string }>) => {
            toast.error(val.response?.data?.error ?? "Something went wrong")
        }
    })
    const handleSubmit = (e: React.SubmitEvent) => {
        e.preventDefault()
        mutate()
    }
    return (
        <ModalWrapper
            key={"Profile Update"}
            isOpen={editProfile}
            onClose={() => (setEditProfile(false), setSubmitted(false))}
            header={{ title: "Update Your Profile", sub: "Member Profile Update" }}
        >
            {/* Form  */}
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
                                Thank you, <strong>{user.name}</strong>. Your profile has been submitted.
                            </p>
                            <button
                                onClick={() => (setEditProfile(false), setSubmitted(false))}
                                className="mt-4 px-6 py-2.5 bg-fun-blue-950 text-white rounded-xl text-sm font-semibold hover:bg-fun-blue-800 transition-colors"
                            >
                                Close
                            </button>
                        </motion.div>
                    ) : (

                        /* ── Step 1: Personal Info ── */
                        <motion.form
                            onSubmit={handleSubmit}
                            key="Profile"
                            initial={{ opacity: 0, x: -16 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 16 }}
                            transition={{ duration: 0.25 }}
                            className="p-7 flex flex-col gap-4"
                        >
                            <Field label="Full Name" required icon={User}>
                                <input
                                    required
                                    value={profile.name}
                                    onChange={e => update('name', e.target.value)}
                                    placeholder="Rajesh"
                                    className={inputCls}
                                />
                            </Field>
                            <Field label="Email Address" icon={Mail}>
                                <input
                                    type="email"
                                    value={profile.email}
                                    onChange={e => update('email', e.target.value)}
                                    placeholder="doctor@hospital.in"
                                    className={inputCls}
                                />
                            </Field>
                            <Field label="Phone Number" icon={Phone}>
                                <input
                                    type="tel"
                                    value={profile.mobile_no ?? ""}
                                    onChange={e => update('mobile_no', e.target.value)}
                                    placeholder="+91 98765 43210"
                                    className={inputCls}
                                />
                            </Field>
                            <Field label="Date of Birth(DOB)" icon={Calendar}>
                                <input
                                    type="date"
                                    value={profile.dob ?? ""}
                                    onChange={e => update('dob', e.target.value)}
                                    placeholder="09-06-1977"
                                    className={inputCls}
                                />
                            </Field>
                            <div className="grid grid-cols-2 gap-3">
                                <Field label="Gender">
                                    <div className="flex gap-3">
                                        {(['male', 'female', 'other'] as const).map(opt => (
                                            <label
                                                key={opt}
                                                className={`flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl border text-sm cursor-pointer select-none transition-all capitalize ${profile.gender === opt
                                                    ? 'border-fun-blue-400 bg-fun-blue-50 text-fun-blue-900 font-semibold'
                                                    : 'border-zinc-200 bg-zinc-50 text-zinc-500 hover:border-zinc-300'
                                                    }`}
                                            >
                                                <input
                                                    type="radio"
                                                    name="gender"
                                                    value={opt}
                                                    checked={profile.gender === opt}
                                                    onChange={e => update('gender', e.target.value)}
                                                    className="sr-only"
                                                />
                                                {opt}
                                            </label>
                                        ))}
                                    </div>
                                </Field>
                                <Field label="City">
                                    <input
                                        value={profile.city_name ?? ""}
                                        onChange={e => update('city_name', e.target.value)}
                                        placeholder="New Delhi"
                                        className={inputCls}
                                    />
                                </Field>
                            </div>
                            <button
                                type="submit"
                                disabled={isPending}
                                className="mt-2 w-full py-3 bg-fun-blue-950 text-white rounded-xl font-semibold text-sm hover:bg-fun-blue-800 transition-colors flex items-center justify-center gap-2"
                            >
                                {isPending ? (
                                    <>
                                        <motion.span
                                            animate={{ rotate: 360 }}
                                            transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                                            className="inline-block w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full"
                                        />
                                        Updatting...
                                    </>
                                ) : (
                                    <>Update <ArrowRight size={14} /></>
                                )}
                            </button>
                        </motion.form>

                    )}
                </AnimatePresence>
            </div>
        </ModalWrapper>
    )
}

export const inputCls = `w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 bg-zinc-50
    text-fun-blue-950 text-sm placeholder:text-zinc-400
    focus:outline-none focus:border-fun-blue-400 focus:bg-white focus:ring-2 focus:ring-fun-blue-100
    transition-all`

export function Field({ label, required, icon: Icon, children }: {
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
