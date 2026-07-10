"use client";

import { useAuth } from '@/context/auth_context';
import { useProfileContext } from '@/context/profile_update_context';
import { profileUpdateService } from '@/services/profile_update';
import { Address, Member } from '@/types/user.types';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowRight, AtSign, Building2, CheckCircle2, Globe, Home, MapPin, Phone, Briefcase } from 'lucide-react';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import ModalWrapper from '../ui/modal_wrapper';
import { Field, inputCls } from './update_profile';

type AddressType = 'office' | 'residence';

type AddressForm = {
    state: string;
    city: string;
    pin: string;
    address: string;
    phone: string;
    email: string;
    website: string;
};

const fromApi = (addr: Address | null): AddressForm => ({
    state: addr?.state ?? '',
    city: addr?.city ?? '',
    pin: addr?.pin ?? '',
    address: addr?.address ?? '',
    phone: addr?.phone ?? '',
    email: addr?.email ?? '',
    website: addr?.website ?? '',
});

const toPayload = (type: AddressType, preferred: AddressType, form: AddressForm) => ({
    preferred_address: preferred,
    ...(type === 'office'
        ? {
            office_state: form.state,
            office_city: form.city,
            office_pin: form.pin,
            office_address: form.address,
            office_phone: form.phone,
            office_email: form.email,
            office_website: form.website,
        }
        : {
            residence_state: form.state,
            residence_city: form.city,
            residence_pin: form.pin,
            residence_address: form.address,
            residence_phone: form.phone,
            residence_email: form.email,
            residence_website: form.website,
        }),
});

export default function UpdateAddress({ user, name }: { user: Member; name: string }) {
    const [submitted, setSubmitted] = useState(false);
    const { refreshUser } = useAuth();
    const { updateAddress, setUpdateAddress } = useProfileContext();

    const [activeTab, setActiveTab] = useState<AddressType>(user.preferred_address ?? 'office');
    const [preferred, setPreferred] = useState<AddressType>(user.preferred_address ?? 'office');

    const [officeForm, setOfficeForm] = useState<AddressForm>(() => fromApi(user.office_address));
    const [residenceForm, setResidenceForm] = useState<AddressForm>(() => fromApi(user.residence_address));

    const currentForm = activeTab === 'office' ? officeForm : residenceForm;
    const setCurrentForm = activeTab === 'office' ? setOfficeForm : setResidenceForm;

    const updateField = (key: keyof AddressForm, value: string) => {
        setCurrentForm((prev) => ({ ...prev, [key]: value }));
    };

    const close = () => {
        setUpdateAddress(false);
        setSubmitted(false);
    };

    const { mutate, isPending } = useMutation({
        mutationFn: () =>
            profileUpdateService.updateAddress({
                address: toPayload(activeTab, preferred, currentForm)
            }),
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

    const tabs: { key: AddressType; label: string; icon: React.ReactNode }[] = [
        { key: 'office', label: 'Office', icon: <Briefcase size={13} /> },
        { key: 'residence', label: 'Residence', icon: <Home size={13} /> },
    ];

    return (
        <ModalWrapper
            key="Update address"
            isOpen={updateAddress}
            onClose={close}
            header={{ title: 'Update Address', sub: 'Member Address Update' }}
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
                                Thank you, <strong>{name}</strong>. Your{' '}
                                {activeTab} address has been updated.
                            </p>
                            <button
                                onClick={close}
                                className="mt-4 px-6 py-2.5 bg-fun-blue-950 text-white rounded-xl text-sm font-semibold hover:bg-fun-blue-800 transition-colors"
                            >
                                Close
                            </button>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="form-shell"
                            initial={{ opacity: 0, x: -16 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 16 }}
                            transition={{ duration: 0.25 }}
                            className="flex flex-col"
                        >
                            {/* ── Tab switcher ── */}
                            <div className="px-7 pt-5">
                                <div className="flex gap-2 p-1 bg-zinc-100 rounded-xl w-fit">
                                    {tabs.map((tab) => (
                                        <button
                                            key={tab.key}
                                            type="button"
                                            onClick={() => (setActiveTab(tab.key),setPreferred(tab.key))}
                                            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${activeTab === tab.key
                                                ? 'bg-white text-fun-blue-950 shadow-sm'
                                                : 'text-zinc-400 hover:text-zinc-600'
                                                }`}
                                        >
                                            {tab.icon}
                                            {tab.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* ── Preferred address toggle ── */}
                            <div className="px-7 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setPreferred(activeTab)}
                                    className={`flex items-center gap-2 text-xs font-medium px-3 py-1.5 rounded-lg border transition-all ${preferred === activeTab
                                        ? 'bg-fun-blue-50 border-fun-blue-200 text-fun-blue-700'
                                        : 'border-zinc-200 text-zinc-400 hover:border-zinc-300 hover:text-zinc-600'
                                        }`}
                                >
                                    <span
                                        className={`w-2 h-2 rounded-full ${preferred === activeTab ? 'bg-fun-blue-500' : 'bg-zinc-300'
                                            }`}
                                    />
                                    {preferred === activeTab ? 'Preferred address' : 'Set as preferred'}
                                </button>
                            </div>

                            {/* ── Form ── */}
                            <form onSubmit={handleSubmit} className="p-7 flex flex-col gap-4">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={activeTab}
                                        initial={{ opacity: 0, x: activeTab === 'office' ? -12 : 12 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: activeTab === 'office' ? 12 : -12 }}
                                        transition={{ duration: 0.2 }}
                                        className="flex flex-col gap-4"
                                    >
                                        <Field label="Address" icon={MapPin}>
                                            <input
                                                value={currentForm.address}
                                                onChange={(e) => updateField('address', e.target.value)}
                                                placeholder={
                                                    activeTab === 'office'
                                                        ? 'AIIMS Campus, Ansari Nagar'
                                                        : '12, Green Park, Block B'
                                                }
                                                className={inputCls}
                                            />
                                        </Field>

                                        <div className="grid grid-cols-2 gap-3">
                                            <Field label="City" icon={Building2}>
                                                <input
                                                    value={currentForm.city}
                                                    onChange={(e) => updateField('city', e.target.value)}
                                                    placeholder="New Delhi"
                                                    className={inputCls}
                                                />
                                            </Field>
                                            <Field label="State" icon={MapPin}>
                                                <input
                                                    value={currentForm.state}
                                                    onChange={(e) => updateField('state', e.target.value)}
                                                    placeholder="Delhi"
                                                    className={inputCls}
                                                />
                                            </Field>
                                        </div>

                                        <Field label="PIN Code" icon={MapPin}>
                                            <input
                                                value={currentForm.pin}
                                                onChange={(e) => updateField('pin', e.target.value)}
                                                placeholder="110029"
                                                maxLength={6}
                                                className={inputCls}
                                            />
                                        </Field>

                                        <Field label="Phone" icon={Phone}>
                                            <input
                                                value={currentForm.phone}
                                                onChange={(e) => updateField('phone', e.target.value)}
                                                placeholder="9876543210"
                                                className={inputCls}
                                            />
                                        </Field>

                                        <Field label="Email" icon={AtSign}>
                                            <input
                                                type="email"
                                                value={currentForm.email}
                                                onChange={(e) => updateField('email', e.target.value)}
                                                placeholder={
                                                    activeTab === 'office'
                                                        ? 'office@hospital.com'
                                                        : 'home@email.com'
                                                }
                                                className={inputCls}
                                            />
                                        </Field>

                                        {activeTab === 'office' && (
                                            <Field label="Website" icon={Globe}>
                                                <input
                                                    value={currentForm.website}
                                                    onChange={(e) => updateField('website', e.target.value)}
                                                    placeholder="https://yourwebsite.com"
                                                    className={inputCls}
                                                />
                                            </Field>
                                        )}
                                    </motion.div>
                                </AnimatePresence>

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
                                            Updating...
                                        </>
                                    ) : (
                                        <>
                                            Update {activeTab === 'office' ? 'Office' : 'Residence'} Address
                                            <ArrowRight size={14} />
                                        </>
                                    )}
                                </button>
                            </form>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </ModalWrapper>
    );
}