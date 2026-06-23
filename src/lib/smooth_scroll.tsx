"use client";
import { ReactLenis } from "lenis/react";
import type { LenisRef } from "lenis/react";
import {
    useEffect,
    useRef,
    ReactNode,
    createContext,
    useContext,
} from "react";
import { motionValue } from "framer-motion";

interface LenisProviderProps {
    children: ReactNode;
}

type LenisContextType = {
    stopScroll: () => void;
    startScroll: () => void;
    scrollY: ReturnType<typeof motionValue<number>>;
};

const LenisContext = createContext<LenisContextType | null>(null);

export function useLenisControl() {
    const context = useContext(LenisContext);
    if (!context) {
        throw new Error("useLenisControl must be used inside SmoothScrollProvider");
    }
    return context;
}

export default function SmoothScrollProvider({
    children,
}: LenisProviderProps) {
    const lenisRef = useRef<LenisRef>(null);

    // Motion scroll value (THIS is the bridge)
    const scrollY = useRef(motionValue(0)).current;

    useEffect(() => {
        let rafId: number;

        const raf = (time: number) => {
            lenisRef.current?.lenis?.raf(time);
            rafId = requestAnimationFrame(raf);
        };

        rafId = requestAnimationFrame(raf);

        // Sync Lenis scroll → Motion
        lenisRef.current?.lenis?.on("scroll", ({ scroll }) => {
            scrollY.set(scroll);
        });

        return () => cancelAnimationFrame(rafId);
    }, [scrollY]);

    const stopScroll = () => {
        lenisRef.current?.lenis?.stop();
        document.body.style.overflow = "hidden";
    };

    const startScroll = () => {
        lenisRef.current?.lenis?.start();
        document.body.style.overflow = "";
    };

    return (
        <LenisContext.Provider value={{ stopScroll, startScroll, scrollY }}>
            <ReactLenis root ref={lenisRef} options={{ autoRaf: false }}>
                {children}
            </ReactLenis>
        </LenisContext.Provider>
    );
}
