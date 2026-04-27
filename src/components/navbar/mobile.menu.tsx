'use client';
import { Menu } from "@/constant/menu";
import { X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";



type Props = {
    isOpen: boolean;
    onClose: () => void;
};


export default function MobileMenu({ isOpen, onClose }: Props) {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        onClick={onClose}
                        className="md:hidden fixed inset-0 bg-fun-blue-400/20 backdrop-blur-sm z-40"
                    />

                    <motion.div
                        initial={{ x: "-100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "-100%" }}
                        transition={{ type: "spring", stiffness: 300, damping: 30, duration: 0.5 }}
                        className="md:hidden fixed inset-y-0 left-0 z-50 w-[85%] max-w-sm bg-white p-5 shadow-xl rounded-r-3xl flex flex-col"
                        data-lenis-prevent
                        role="dialog" aria-modal="true"
                    >
                        <div className="flex items-center justify-between">
                            <h2 className="text-lg text-fun-blue-950">Menu</h2>
                            <button
                                onClick={onClose}
                                className="size-10 flex items-center justify-center rounded-full bg-zinc-100"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        <motion.div
                            className="mt-8 flex flex-col gap-2"
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                            variants={{
                                hidden: {},
                                visible: {
                                    transition: {
                                        staggerChildren: 0.1,
                                        duration: 0.5
                                    },
                                },
                            }}
                        >
                            {Menu.map((item) => (
                                <motion.div
                                    key={item.name}
                                    variants={{
                                        hidden: { opacity: 0, x: -20 },
                                        visible: { opacity: 1, x: 0 },
                                    }}
                                    transition={{ duration: 0.25, ease: "easeOut" }}
                                >
                                    <Link
                                        href={item.path}
                                        onClick={onClose}
                                        className="flex items-center px-4 py-2 rounded-xl text-zinc-700 hover:bg-zinc-100 transition"
                                    >
                                        {item.name}
                                    </Link>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}
