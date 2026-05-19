"use client";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react"
import { ReactNode } from "react";

type Props = {
    isOpen: boolean;
    onClose: () => void;
    header: {
        title: string,
        sub: string;
    }
    children: ReactNode
}

export default function ModalWrapper({ isOpen, onClose, header, children }: Props) {
    return (
        <AnimatePresence>
            {
                isOpen && (
                    <motion.div
                        className="fixed inset-0 z-50 flex items-center justify-center p-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={onClose}
                            className="absolute inset-0 bg-fun-blue-950/70 backdrop-blur-sm"
                        />

                        <motion.div
                            initial={{ opacity: 0, scale: 0.98, y: 40 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.98, y: 40 }}
                            className="relative z-10 w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
                        >
                            {/* header  */}
                            <div className="bg-fun-blue-950 px-7 pt-7 pb-6 shrink-0">
                                <div className="flex items-start justify-between gap-4">
                                    <div>
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="text-[10px] font-bold tracking-widest uppercase text-fun-blue-400">
                                                NZUSICON 2026 · {header.sub}
                                            </span>
                                        </div>
                                        <h2 className="text-xl text-white leading-snug">
                                            {header.title}
                                        </h2>
                                    </div>
                                    <button
                                        onClick={onClose}
                                        className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors shrink-0 mt-0.5"
                                    >
                                        <X size={14} className="text-white" />
                                    </button>
                                </div>

                            </div>

                            {/* body  */}
                            {children}
                        </motion.div>
                    </motion.div>
                )
            }
        </AnimatePresence>
    )
}
