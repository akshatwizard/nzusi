'use client'
import { useLenisControl } from '@/lib/smooth_scroll';
import { motion, useMotionValueEvent, useScroll } from 'motion/react'
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import DesktopMenu from './desktop.menu';
import MobileMenu from './mobile.menu';
import Login from '../login';
import { User } from 'lucide-react';

export default function Header() {
    const { scrollY } = useScroll();
    const [scrolled, setScrolled] = useState<boolean | null>(false);
    const [openMenu, setOpenMenu] = useState<boolean>(false);
    const [isLoginOpen, setIsLoginOpen] = useState<boolean>(false)

    useMotionValueEvent(scrollY, "change", (current) => {
        if (current > 50) {
            setScrolled(true);
        } else {
            setScrolled(null);
        }
    });

    return (
        <>
            <motion.header
                className={`fixed top-0 z-40 w-full h-20 lg:px-12 md:px-8 px-4 ${scrolled ? "bg-fun-blue-950/20 backdrop-blur border-b border-white/6" : "bg-transparent border-b border-white/0"} transition-colors duration-300 ease-in-out`}
            >
                <nav className='w-full max-w-7xl mx-auto flex items-center py-3 h-full gap-1.5'>
                    <Link
                        href={"/"}
                        className='relative'
                        aria-label='Logo'
                    >
                        <Image
                            src={"/images/logo/nzusi_logo.avif"}
                            alt='North Zone chapter of Urological Society of India'
                            width={120}
                            height={40}
                            priority
                            className={`w-14 h-auto transition-all duration-300 ease-in-out'`}

                        />
                        <span className='sr-only'>
                            North Zone chapter of Urological Society of India Logo
                        </span>
                    </Link>

                    <DesktopMenu />

                    <div className='max-md:flex-1 relative flex items-center justify-end gap-2 h-full'>
                        <button
                            onClick={() => setIsLoginOpen(true)}
                            className="flex items-center gap-1 bg-fun-blue-600 hover:bg-fun-blue-500 text-fun-blue-50 font-semibold text-sm px-3.5 py-2 rounded-lg border border-fun-blue-400/40 transition-all duration-200 cursor-pointer">
                            <User size={14} />
                            Login
                        </button>
                        <button aria-label="Open menu" className='md:hidden relative h-full w-12 cursor-pointer' onClick={() => setOpenMenu(!openMenu)}>
                            <motion.span
                                className="w-full h-px absolute left-1/2 -translate-x-1/2 top-[43%] bg-white inline-block"
                                animate={openMenu ? { top: "50%", rotate: 45 } : { top: "43%", rotate: 0 }}
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                            />
                            <motion.span
                                className="w-full h-px absolute left-1/2 -translate-x-1/2 top-[57%] bg-white inline-block"
                                animate={openMenu ? { top: "50%", rotate: -45 } : { top: "57%", rotate: 0 }}
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                            />
                        </button>
                    </div>
                </nav>
            </motion.header>
            <MobileMenu
                isOpen={openMenu}
                onClose={() => setOpenMenu(false)}
            />
            <Login
                isOpen={isLoginOpen}
                onClose={() => setIsLoginOpen(false)}
            />
        </>
    )
}
