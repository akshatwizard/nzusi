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
import { AcademicQualification } from '@/types/user.types';

const emptyQualification = (): Omit<AcademicQualification, "id"> => ({
    degree: '',
    institution: '',
    year_of_passing: '' as unknown as string,
});


export default function UpdateAcademic({ data, name }: { data: AcademicQualification[]; name: string }) {
    const [submitted, setSubmitted] = useState(false);
    const { refreshUser } = useAuth();
    const { updateAcademic, setUpdateAcademic } = useProfileContext();

    const [qualifications, setQualifications] = useState<Array<AcademicQualification | Omit<AcademicQualification, 'id'>>>(() =>
        data.length > 0
            ? data.map((q) => ({
                id: q.id,
                degree: q.degree ?? '',
                institution: q.institution ?? '',
                year_of_passing: q.year_of_passing ?? '',
            }))
            : [emptyQualification()]
    );

    const updateField = (index: number, key: keyof AcademicQualification, value: string) => {
        setQualifications((prev) =>
            prev.map((q, i) =>
                i === index
                    ? { ...q, [key]: value }
                    : q
            )
        );
    };

    const addQualification = () => setQualifications((prev) => [...prev, emptyQualification()]);

    const removeQualification = (index: number) => {
        if (qualifications.length === 1) return;
        setQualifications((prev) => prev.filter((_, i) => i !== index));
    };

    const { mutate, isPending } = useMutation({
        mutationFn: () =>
            profileUpdateService.updateAcademicDetails({
                qualifications: qualifications.map((q) => ({
                    ...q,
                    year_of_passing: Number(q.year_of_passing),
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
            isOpen={updateAcademic}
            onClose={() => (setUpdateAcademic(false), setSubmitted(false))}
            header={{ title: 'Update Academic Details', sub: 'Member Academic Update' }}
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
                                onClick={() => (setUpdateAcademic(false), setSubmitted(false))}
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
                                {qualifications.map((q, index) => (
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
                                            {qualifications.length > 1 && (
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

                                        <Field label="Degree / Qualification" required icon={BookOpen}>
                                            <input
                                                required
                                                value={q.degree}
                                                onChange={(e) => updateField(index, 'degree', e.target.value)}
                                                placeholder="MBBS"
                                                className={inputCls}
                                            />
                                        </Field>

                                        <Field label="Institution / University" required icon={Building2}>
                                            <input
                                                required
                                                value={q.institution}
                                                onChange={(e) => updateField(index, 'institution', e.target.value)}
                                                placeholder="AIIMS New Delhi"
                                                className={inputCls}
                                            />
                                        </Field>

                                        <Field label="Year of Passing" required icon={CalendarDays}>
                                            <input
                                                required
                                                type="number"
                                                value={q.year_of_passing}
                                                onChange={(e) => updateField(index, 'year_of_passing', e.target.value)}
                                                placeholder="2018"
                                                className={inputCls}
                                            />
                                        </Field>
                                    </motion.div>
                                ))}
                            </AnimatePresence>

                            {/* Add another qualification */}
                            <button
                                type="button"
                                onClick={addQualification}
                                className="w-full py-2.5 border border-dashed border-zinc-300 rounded-xl text-sm text-zinc-500 hover:border-fun-blue-950 hover:text-fun-blue-950 transition-colors flex items-center justify-center gap-2"
                            >
                                <Plus size={14} />
                                Add Another Qualification
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
                                        Update Academic Details
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