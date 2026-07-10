"use client";
import { ProfileDesignation } from '@/types/profile_update.types';
import { Designation } from '@/types/user.types'
import { useState } from 'react';
import ModalWrapper from '../ui/modal_wrapper';
import { useProfileContext } from '@/context/profile_update_context';
import { AnimatePresence, motion } from 'motion/react';
import { useAuth } from '@/context/auth_context';
import { ArrowRight, BriefcaseBusiness, Building2, CalendarDays, CheckCircle2 } from 'lucide-react';
import { useMutation } from '@tanstack/react-query';
import { profileUpdateService } from '@/services/profile_update';
import toast from 'react-hot-toast';
import { AxiosError } from 'axios';
import { Field, inputCls } from './update_profile';

type Des = Omit<Designation, "id"> | null

export default function UpdateDesignation({ data, name }: { data: Des, name: string }) {
    const [submitted, setSubmitted] = useState(false);
    const { refreshUser } = useAuth()
    const { updateDesignation, setUpdateDesignation } = useProfileContext()
    const [designation, setDesignation] = useState<ProfileDesignation["payload"]>({
        designation: data?.designation ?? "",
        institution: data?.institution ?? "",
        year_of_joining: data?.year_of_joining ?? ""
    });

    const update = (k: keyof typeof designation, v: string) => setDesignation(f => ({ ...f, [k]: v }))

    const { mutate, isPending } = useMutation({
        mutationFn: () => profileUpdateService.updateDesignation({ payload: designation }),
        onSuccess: (value) => {
            toast.success(value.message)
            setSubmitted(true)
            refreshUser();
        },
        onError: (val: AxiosError<{ message?: string }>) => {
            toast.error(val.response?.data?.message ?? "Something went wrong")
        }
    })
    const handleSubmit = (e: React.SubmitEvent) => {
        e.preventDefault()
        mutate()
    }

    return (
        <ModalWrapper
            key={"Update designation"}
            isOpen={updateDesignation}
            onClose={() => (setUpdateDesignation(false), setSubmitted(false))}
            header={{ title: "Update Your Designation", sub: "Member Designation Update" }}
        >
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
                                Thank you, <strong>{name}</strong>. Your designation has been updated.
                            </p>
                            <button
                                onClick={() => (setUpdateDesignation(false), setSubmitted(false))}
                                className="mt-4 px-6 py-2.5 bg-fun-blue-950 text-white rounded-xl text-sm font-semibold hover:bg-fun-blue-800 transition-colors"
                            >
                                Close
                            </button>
                        </motion.div>
                    ) : (

                        /* ── Step 1: Personal Info ── */
                        <motion.form
                            onSubmit={handleSubmit}
                            key="designation"
                            initial={{ opacity: 0, x: -16 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 16 }}
                            transition={{ duration: 0.25 }}
                            className="p-7 flex flex-col gap-4"
                        >

                            <Field
                                label="Designation"
                                required
                                icon={BriefcaseBusiness}
                            >
                                <input
                                    required
                                    value={designation.designation}
                                    onChange={e => update('designation', e.target.value)}
                                    placeholder="Professor"
                                    className={inputCls}
                                />
                            </Field>

                            <Field
                                label="Institution / Hospital"
                                required
                                icon={Building2}
                            >
                                <input
                                    required
                                    value={designation.institution}
                                    onChange={e => update('institution', e.target.value)}
                                    placeholder="AIIMS New Delhi"
                                    className={inputCls}
                                />
                            </Field>

                            <Field
                                label="Year of Joining"
                                required
                                icon={CalendarDays}
                            >
                                <input
                                    required
                                    type="number"
                                    value={designation.year_of_joining}
                                    onChange={e => update('year_of_joining', e.target.value)}
                                    placeholder="2018"
                                    className={inputCls}
                                />
                            </Field>

                            <button
                                type="submit"
                                disabled={isPending}
                                className="mt-2 w-full py-3 bg-fun-blue-950 text-white rounded-xl font-semibold text-sm hover:bg-fun-blue-800 transition-colors flex items-center justify-center gap-2"
                            >
                                {isPending ? (
                                    <>
                                        <motion.span
                                            animate={{ rotate: 360 }}
                                            transition={{
                                                duration: 0.8,
                                                repeat: Infinity,
                                                ease: 'linear'
                                            }}
                                            className="inline-block w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full"
                                        />
                                        Updating...
                                    </>
                                ) : (
                                    <>
                                        Update Designation
                                        <ArrowRight size={14} />
                                    </>
                                )}
                            </button>

                        </motion.form>

                    )}
                </AnimatePresence>
            </div>
        </ModalWrapper>
    )
}
