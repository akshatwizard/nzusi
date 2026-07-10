"use client";

import { useAuth } from '@/context/auth_context';
import { useProfileContext } from '@/context/profile_update_context';
import { profileUpdateService } from '@/services/profile_update';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowRight, BookOpen, Building2, CalendarDays, CheckCircle2, Plus, Trash2 } from 'lucide-react';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import ModalWrapper from '../ui/modal_wrapper';
import { Field, inputCls } from './update_profile';
import { UrologyTraining } from '@/types/user.types';

const emptyUrologyTrainings = (): Omit<UrologyTraining, "id"> => ({
    institution: "",
    from_date: "",
    to_date: ""
});


export default function UpdateUrologyTrainings({ data, name }: { data: UrologyTraining[]; name: string }) {
    const [submitted, setSubmitted] = useState(false);
    const { refreshUser } = useAuth();
    const { updateUrologyTrainings, setUpdateUrologyTrainings } = useProfileContext();

    const [urologyTrainigs, setUrologyTrainigs] = useState<Array<UrologyTraining | Omit<UrologyTraining, 'id'>>>(() =>
        data.length > 0
            ? data.map((q) => ({
                id: q.id,
                institution: q.institution,
                from_date: q.from_date,
                to_date: q.to_date
            }))
            : [emptyUrologyTrainings()]
    );

    const updateField = (index: number, key: keyof UrologyTraining, value: string) => {
        setUrologyTrainigs((prev) =>
            prev.map((q, i) =>
                i === index
                    ? { ...q, [key]: value }
                    : q
            )
        );
    };

    const addUrology = () => setUrologyTrainigs((prev) => [...prev, emptyUrologyTrainings()]);

    const removeQualification = (index: number) => {
        if (urologyTrainigs.length === 1) return;
        setUrologyTrainigs((prev) => prev.filter((_, i) => i !== index));
    };

    const { mutate, isPending } = useMutation({
        mutationFn: () =>
            profileUpdateService.updateUrologyTrainings({
                trainings: urologyTrainigs.map((q) => ({
                    ...q,
                })),
            }
            ),
        onSuccess: (value) => {
            toast.success(value.message);
            setSubmitted(true);
            refreshUser();
        },
        onError: (val: AxiosError<{ message?: string }>) => {
            toast.error(val.response?.data?.message ?? 'Something went wrong');
        },
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        mutate();
    };

    return (
        <ModalWrapper
            key="Update academic"
            isOpen={updateUrologyTrainings}
            onClose={() => (setUpdateUrologyTrainings(false), setSubmitted(false))}
            header={{ title: 'Update Urology Trainings Details', sub: 'Member Urology Trainings Update' }}
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
                                Thank you, <strong>{name}</strong>. Your academic details have been updated.
                            </p>
                            <button
                                onClick={() => (setUpdateUrologyTrainings(false), setSubmitted(false))}
                                className="mt-4 px-6 py-2.5 bg-fun-blue-950 text-white rounded-xl text-sm font-semibold hover:bg-fun-blue-800 transition-colors"
                            >
                                Close
                            </button>
                        </motion.div>
                    ) : (
                        /* ── Form ── */
                        <motion.form
                            onSubmit={handleSubmit}
                            key="academic"
                            initial={{ opacity: 0, x: -16 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 16 }}
                            transition={{ duration: 0.25 }}
                            className="p-7 flex flex-col gap-6"
                        >
                            <AnimatePresence>
                                {urologyTrainigs.map((q, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: -8 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -8, height: 0 }}
                                        transition={{ duration: 0.2 }}
                                        className="flex flex-col gap-4 p-4 rounded-xl border border-zinc-200 bg-zinc-50/50 relative"
                                    >
                                        {/* Row header */}
                                        <div className="flex items-center justify-between">
                                            <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                                                Qualification {index + 1}
                                            </span>
                                            {urologyTrainigs.length > 1 && (
                                                <button
                                                    type="button"
                                                    onClick={() => removeQualification(index)}
                                                    className="text-zinc-400 hover:text-red-500 transition-colors"
                                                    aria-label="Remove qualification"
                                                >
                                                    <Trash2 size={14} />
                                                </button>
                                            )}
                                        </div>

                                        <Field label="Institution / University" required icon={Building2}>
                                            <input
                                                required
                                                value={q.institution}
                                                onChange={(e) => updateField(index, 'institution', e.target.value)}
                                                placeholder="AIIMS New Delhi"
                                                className={inputCls}
                                            />
                                        </Field>

                                        <Field label="From date" required icon={CalendarDays}>
                                            <input
                                                required
                                                type="date"
                                                value={q.from_date}
                                                onChange={(e) => updateField(index, 'from_date', e.target.value)}
                                                placeholder="2020-01-01"
                                                className={inputCls}
                                            />
                                        </Field>

                                        <Field label="To date" required icon={CalendarDays}>
                                            <input
                                                required
                                                type="date"
                                                value={q.to_date}
                                                onChange={(e) => updateField(index, 'to_date', e.target.value)}
                                                placeholder="2021-01-01"
                                                className={inputCls}
                                            />
                                        </Field>
                                    </motion.div>
                                ))}
                            </AnimatePresence>

                            {/* Add another qualification */}
                            <button
                                type="button"
                                onClick={addUrology}
                                className="w-full py-2.5 border border-dashed border-zinc-300 rounded-xl text-sm text-zinc-500 hover:border-fun-blue-950 hover:text-fun-blue-950 transition-colors flex items-center justify-center gap-2"
                            >
                                <Plus size={14} />
                                Add Another Training
                            </button>

                            <button
                                type="submit"
                                disabled={isPending}
                                className="w-full py-3 bg-fun-blue-950 text-white rounded-xl font-semibold text-sm hover:bg-fun-blue-800 transition-colors flex items-center justify-center gap-2"
                            >
                                {isPending ? (
                                    <>
                                        <motion.span
                                            animate={{ rotate: 360 }}
                                            transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                                            className="inline-block w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full"
                                        />
                                        Updating...
                                    </>
                                ) : (
                                    <>
                                        Update Urology Trainings
                                        <ArrowRight size={14} />
                                    </>
                                )}
                            </button>
                        </motion.form>
                    )}
                </AnimatePresence>
            </div>
        </ModalWrapper>
    );
}