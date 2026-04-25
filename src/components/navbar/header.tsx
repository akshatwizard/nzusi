'use client'
import { useLenisControl } from '@/lib/smooth_scroll';
import { motion, useMotionValueEvent, useScroll } from 'motion/react'
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import DesktopMenu from './desktop.menu';

export default function Header() {
    const { scrollY } = useScroll();
    const [scrolled, setScrolled] = useState<boolean | null>(false);
    const [openMenu, setOpenMenu] = useState<boolean>(false);
    const { startScroll, stopScroll } = useLenisControl()

    useMotionValueEvent(scrollY, "change", (current) => {
        if (current > 100) {
            setScrolled(true);
        } else {
            setScrolled(null);
        }
    });

    return (
        <motion.header
            className={`sticky top-0 z-40 lg:mt-5 mt-3 w-full h-max lg:px-12 md:px-8 px-4 ${scrolled ? "bg-fun-blue-950/5 backdrop-blur" : "bg-fun-blue-950"}`}
        >
            <nav className='w-full max-w-7xl mx-auto flex items-center justify-between py-3 h-full'>
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
                        className='w-16 h-auto'

                    />
                    <span className='sr-only'>
                        North Zone chapter of Urological Society of India Logo
                    </span>
                </Link>

                <DesktopMenu/>

            </nav>
        </motion.header>
    )
}
