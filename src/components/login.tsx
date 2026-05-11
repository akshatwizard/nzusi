"use client"
import { useAuth } from "@/context/auth_context";
import { api } from "@/services/api";
import { authService } from "@/services/auth";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { ArrowRight, Mail, RotateCcw, ShieldCheck, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react"
import Image from "next/image";
import { Dispatch, SetStateAction, useEffect, useState, useRef } from "react";
import toast from "react-hot-toast";

type Props = {
    isOpen: boolean;
    onClose: () => void;
}
type Step = "email" | "otp";
const OTP_LENGTH = 6;

export default function Login({ isOpen, onClose }: Props) {
    const [email, setEmail] = useState<string>("");
    const [otp, setOtp] = useState<string>("");
    const [currentStep, setCurrentStep] = useState<Step>("email");
    const { login } = useAuth()

    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                when: "beforeChildren",
                staggerChildren: 0.12,
            },
        },
    };
    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 120,
                damping: 12,
                mass: 0.6,
            } as const,
        },
    };

    // useEffect(() => {
    //     if (isOpen) {
    //         stopScroll();
    //     } else {
    //         startScroll();
    //     }
    //     return () => {
    //         startScroll();
    //     };
    // }, [isOpen, startScroll, stopScroll]);

    const { mutate: sendOtp, isPending: sendingOtp } = useMutation({
        mutationFn: () => authService.getOtp({ email }),

        onSuccess: async (val) => {
            // console.log(val);
            toast.success(val.message);
            // console.log(val.data);
            setCurrentStep("otp");
        },
        onError: (err: AxiosError<{ error: string }>) =>
            toast.error(err.response?.data?.error || "Failed"),
    })

    const { mutate: verifyOtp, isPending: verifyingOtp } = useMutation({
        mutationFn: () => login(email, otp),
        onSuccess: (val) => {
            toast.success(val.message);
            setCurrentStep("otp");
            onClose()
        },
        onError: (err: AxiosError<{ error: string }>) =>
            toast.error(err.response?.data?.error || "Failed"),
    })

    return (
        <AnimatePresence>
            {isOpen &&
                <motion.section
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="fixed inset-0 z-50 bg-fun-blue-950/10 backdrop-blur-xs p-10"
                    onClick={onClose}
                >
                    <motion.div
                        variants={itemVariants}
                        onClick={(e) => e.stopPropagation()}
                        className="relative mx-auto w-full max-w-lg rounded-3xl overflow-hidden bg-white shadow-lg shadow-fun-blue-800/60 border border-stone-100"
                    >
                        <div
                            className="h-0.5 w-full bg-linear-to-r from-fun-blue-400/20 via-blue-600 to-fun-blue-400/20"
                        />

                        <div className="w-full p-7">
                            <LoginHeader onClose={onClose} />

                            <AnimatePresence>
                                {currentStep === "email" &&
                                    <SentOtp
                                        email={email}
                                        setEmail={setEmail}
                                        sendOtp={sendOtp}
                                        sendingOtp={sendingOtp}
                                    />
                                }

                                {
                                    currentStep === "otp" &&
                                    <VerifyOtp
                                        email={email}
                                        otp={otp}
                                        setOtp={setOtp}
                                        verifyOtp={verifyOtp}
                                        verifyingOtp={verifyingOtp}
                                        changeStep={setCurrentStep}
                                    />
                                }
                            </AnimatePresence>

                        </div>
                    </motion.div>
                </motion.section>}
        </AnimatePresence>
    )
}


function LoginHeader({ onClose }: { onClose: () => void; }) {
    return (
        <div className="flex items-center justify-between mb-8">
            <Image
                src="/images/logo/nzusi_logo.avif"
                width={150}
                height={64}
                alt="North Zone chapter of Urological Society of India"
                className="w-12 h-auto"
            />
            <button
                onClick={onClose}
                className="size-8 flex items-center justify-center rounded-full bg-stone-100 border border-stone-200 text-stone-500 hover:bg-stone-200 hover:text-stone-700 transition-all duration-150 cursor-pointer"
                aria-label="Close"
            >
                <X size={15} />
            </button>
        </div>
    )
}

type SentOtpProps = {
    email: string;
    setEmail: Dispatch<SetStateAction<string>>;
    sendOtp: () => void;
    sendingOtp: boolean
}

function SentOtp({ email, setEmail, sendOtp, sendingOtp }: SentOtpProps) {
    return (
        <motion.div
            key="login"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{
                type: "spring",
                stiffness: 120,
                damping: 12,
                mass: 0.6,
            } as const}
        >
            <h2 className="text-center text-2xl text-fun-blue-950 tracking-tight">
                Welcome back
            </h2>
            <p className="text-center text-sm text-stone-400 mt-1 mb-7">
                Sign in to your account to continue
            </p>

            <div className="flex items-center gap-3 my-5">
                <div className="flex-1 h-px bg-fun-blue-100" />
                <span className="text-xs text-stone-400 font-medium">
                    Use registered email
                </span>
                <div className="flex-1 h-px bg-stone-100" />
            </div>

            <div className="relative">
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none">
                    <Mail size={16} />
                </div>
                <input
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && sendOtp()}
                    className="w-full pl-10 pr-4 py-3 rounded-lg border-2 border-fun-blue-200 bg-fun-blue-50/20 text-sm text-fun-blue-900 placeholder:text-stone-400 outline-none focus:border-fun-blue-400 focus:shadow-[0_0_0_4px_rgba(245,158,11,0.1)] transition-all duration-200 "
                />
            </div>

            <button
                onClick={() => sendOtp()}
                disabled={!email.trim() || sendingOtp}
                className="mt-4 w-full flex items-center justify-center gap-2 py-3 px-5 rounded-2xl font-semibold text-sm text-white bg-fun-blue-500 hover:bg-fun-blue-400 disabled:opacity-40 disabled:cursor-not-allowed
                active:scale-[0.98] transition-all duration-150 cursor-pointer"
            >
                {sendingOtp ?
                    <div className="w-4 h-4 border-2 border-fun-blue-100 border-t-fun-blue-900 rounded-full animate-spin" />
                    :
                    <>
                        Send OTP
                        <ArrowRight size={15} />
                    </>
                }
            </button>

            <p className="text-center text-xs text-stone-400 mt-5 leading-relaxed">
                By continuing you agree to our{" "}
                <a href="#" className="text-fun-blue-600 hover:underline">Terms</a>
                {" & "}
                <a href="#" className="text-fun-blue-600 hover:underline">Privacy Policy</a>
            </p>
        </motion.div>
    )
}

type VerifyOtpProps = {
    email: string;
    otp: string;
    setOtp: Dispatch<SetStateAction<string>>
    verifyOtp: () => void;
    changeStep: Dispatch<SetStateAction<Step>>;
    verifyingOtp: boolean
}

function VerifyOtp({ email, otp, setOtp, verifyOtp, verifyingOtp, changeStep }: VerifyOtpProps) {
    const maskedContact = email.length > 4 ? email.replace(/(.{2}).+(@.+)/, "$1••••$2") : email;

    return (
        <motion.div
            key="otp"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{
                type: "spring",
                stiffness: 120,
                damping: 12,
                mass: 0.6,
            } as const}
        >
            <div className="size-12 rounded-2xl bg-fun-blue-100 flex items-center justify-center mb-5">
                <ShieldCheck className="text-fun-blue-600" size={22} />
            </div>

            <h2 className="text-2xl font-bold text-zinc-800 tracking-tight">Verify it's you</h2>
            <p className="text-sm text-stone-400 mt-1 mb-7">
                We sent a 6-digit code to{" "}
                <span className="text-zinc-600 font-medium">{maskedContact || "your contact"}</span>
            </p>

            <OtpInput value={otp} onChange={setOtp} />

            {/* Verify CTA */}
            <button
                onClick={verifyOtp}
                disabled={otp.length !== 6 || verifyingOtp}
                className="mt-6 w-full flex items-center justify-center gap-2 py-3 px-5 rounded-2xl font-semibold text-sm text-white bg-fun-blue-500 hover:bg-fun-blue-400 disabled:opacity-40 disabled:cursor-not-allowed active:scale-[0.98] transition-all duration-150 cursor-pointer"
            >
                {verifyingOtp ?
                    <div className="w-4 h-4 border-2 border-fun-blue-100 border-t-fun-blue-900 rounded-full animate-spin" /> :
                    <>
                        Verify & Sign In
                        <ArrowRight size={15} />
                    </>
                }
            </button>

            <div className="flex items-center justify-between mt-5">
                <button
                    onClick={() => { changeStep("email"); setOtp(""); }}
                    className="text-xs text-stone-400 hover:text-zinc-600 transition-colors cursor-pointer"
                >
                    ← Change email
                </button>
                <button
                    // onClick={handleResend}
                    className="flex items-center gap-1 text-xs text-fun-blue-600 hover:text-fun-blue-700 transition-colors cursor-pointer"
                >
                    <RotateCcw size={11} />
                    Resend OTP
                </button>
            </div>
        </motion.div>
    )
}

function OtpInput({ value, onChange }: { value: string; onChange: (v: string) => void }) {
    const refs = useRef<(HTMLInputElement | null)[]>([]);

    const handleKey = (e: React.KeyboardEvent<HTMLInputElement>, idx: number) => {
        if (e.key === "Backspace") {
            if (value[idx]) {
                const next = value.split("");
                next[idx] = "";
                onChange(next.join(""));
            } else if (idx > 0) {
                refs.current[idx - 1]?.focus();
                const next = value.split("");
                next[idx - 1] = "";
                onChange(next.join(""));
            }
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, idx: number) => {
        const char = e.target.value.replace(/\D/g, "").slice(-1);
        if (!char) return;
        const next = value.split("").concat(Array(OTP_LENGTH).fill("")).slice(0, OTP_LENGTH);
        next[idx] = char;
        onChange(next.join(""));
        if (idx < OTP_LENGTH - 1) refs.current[idx + 1]?.focus();
    };

    const handlePaste = (e: React.ClipboardEvent) => {
        const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, OTP_LENGTH);
        onChange(pasted.padEnd(OTP_LENGTH, ""));
        refs.current[Math.min(pasted.length, OTP_LENGTH - 1)]?.focus();
        e.preventDefault();
    };

    return (
        <div className="flex gap-2 justify-center">
            {Array.from({ length: OTP_LENGTH }).map((_, idx) => (
                <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05, type: "spring", stiffness: 280, damping: 22 }}
                >
                    <input
                        ref={(el) => { refs.current[idx] = el; }}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={value[idx] ?? ""}
                        onChange={(e) => handleChange(e, idx)}
                        onKeyDown={(e) => handleKey(e, idx)}
                        onPaste={handlePaste}
                        className={`
                            w-11 h-13 text-center text-xl font-semibold rounded-xl border-2 outline-none
                            transition-all duration-200 bg-amber-50/60 text-zinc-800
                            ${value[idx]
                                ? "border-fun-blue-500"
                                : "border-fun-blue-200 focus:border-fun-blue-400"
                            }
                        `}
                    />
                </motion.div>
            ))}
        </div>
    );
}
