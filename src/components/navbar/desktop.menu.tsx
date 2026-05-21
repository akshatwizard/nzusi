'use client';
import { Menu } from "@/constant/menu";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { AnimatePresence, motion } from 'motion/react'

export default function DesktopMenu() {
    const currentPath = usePathname();
    const [hovered, setHovered] = useState<number | null>(null);

    const activePath = (pathname: string) => {
        return currentPath === pathname || currentPath.startsWith(`${pathname}/`)
    };


    return (
        <div className="flex-1 hidden md:flex items-center gap-1 h-10 justify-end">
            {
                Menu.map((item, idx) => {
                    const isActive = activePath(item.path);
                    const isHovered = hovered === idx;
                    return (
                        <Link
                            key={item.name}
                            href={item.path}
                            className={`relative px-2.5 h-full w-max font-medium text-sm flex items-center ${isActive ? "text-fun-blue-400" : "text-white"} `}
                            onMouseEnter={() => setHovered(idx)}
                            onMouseLeave={() => setHovered(null)}
                        >
                            <span>
                                {item.name}
                            </span>
                            <AnimatePresence mode="popLayout">
                                {(isActive || isHovered) && (
                                    <motion.span
                                        layoutId="active-nav"
                                        className="absolute inset-x-0 rounded-full h-0.5 bottom-0 bg-linear-to-r from-transparent via-fun-blue-500 to-transparent "
                                        transition={{ type: "tween", ease: [0.22, 1, 0.36, 1], duration: 0.5 }}
                                    />
                                )}
                            </AnimatePresence>
                        </Link>
                    )
                })
            }
        </div>
    )
}
