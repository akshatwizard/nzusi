'use client'

import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { useCallback, useEffect, useState, useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'motion/react'

const SLIDES = [
    {
        src: '/images/hero/banner-1.png',
        alt: 'NZUSICON 2025 — Annual North Zone Urology Congress',
        caption: 'NZUSICON 2025',
        sub: 'Annual North Zone Urology Congress',
    },
    {
        src: '/images/hero/banner-2.png',
        alt: 'Live Surgery Workshop — Karnal CME 2026',
        caption: 'Live Surgery Workshop',
        sub: 'Karnal Mid-term CME · April 2026',
    },
    {
        src: '/images/hero/banner-3.png',
        alt: 'ASCENT Academic Series — Online CME',
        caption: 'ASCENT Academic Series',
        sub: 'Monthly online CME for North Zone urologists',
    },
    {
        src: '/images/hero/banner-4.png',
        alt: 'Youth Conclave — Young urologists, North Zone',
        caption: 'Youth Conclave 2026',
        sub: 'New Delhi · August 22–23, 2026',
    },
]

export function HeroCarousel() {
    const autoplay = useRef(
        Autoplay({ delay: 3000, })
    )

    const [emblaRef, emblaApi] = useEmblaCarousel(
        { loop: true, align: 'center', dragFree: false },
        [autoplay.current]
    )

    const [selected, setSelected] = useState(0)
    const [canScrollPrev, setCanScrollPrev] = useState(false)
    const [canScrollNext, setCanScrollNext] = useState(true)

    const onSelect = useCallback(() => {
        if (!emblaApi) return
        setSelected(emblaApi.selectedScrollSnap())
        setCanScrollPrev(emblaApi.canScrollPrev())
        setCanScrollNext(emblaApi.canScrollNext())
    }, [emblaApi])

    useEffect(() => {
        if (!emblaApi) return
        emblaApi.on('select', onSelect)
        emblaApi.on('reInit', onSelect)
        onSelect()
        return () => {
            emblaApi.off('select', onSelect)
            emblaApi.off('reInit', onSelect)
        }
    }, [emblaApi, onSelect])

    const scrollPrev = useCallback(() => {
        emblaApi?.scrollPrev()
        autoplay.current.reset()
    }, [emblaApi])

    const scrollNext = useCallback(() => {
        emblaApi?.scrollNext()
        autoplay.current.reset()
    }, [emblaApi])

    const scrollTo = useCallback((index: number) => {
        emblaApi?.scrollTo(index)
        autoplay.current.reset()
    }, [emblaApi])

    return (
        <div className='relative w-full h-full min-h-90 md:min-h-110'>
            <div
                ref={emblaRef}
                className='overflow-hidden rounded-2xl w-full h-full'
                style={{ height: '100%' }}
            >
                <div className='flex h-full' style={{ height: '440px' }}>
                    {SLIDES.map((slide, i) => (
                        <div
                            key={i}
                            className='flex-[0_0_100%] min-w-0 relative h-full'
                        >
                            {/* Image */}
                            <Image
                                src={slide.src}
                                alt={slide.alt}
                                fill
                                className='object-cover'
                                sizes='(max-width: 768px) 100vw, 50vw'
                                priority={i === 0}
                            />

                            {/* Dark gradient overlay — bottom only */}
                            <div className='absolute inset-0 bg-linear-to-t from-fun-blue-950/90 via-fun-blue-950/20 to-transparent' />

                            {/* Caption */}
                            <AnimatePresence mode='wait'>
                                {selected === i && (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -6 }}
                                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                                        className='absolute bottom-0 left-0 right-0 p-5'
                                    >
                                        {/* <div className='text-fun-blue-50 font-serif text-[17px] leading-snug mb-0.5'>
                                            {slide.caption}
                                        </div>
                                        <div className='text-fun-blue-300/60 text-[11px]'>
                                            {slide.sub}
                                        </div> */}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </div>

            {/* ── Prev / Next ── */}
            <button
                onClick={scrollPrev}
                aria-label='Previous slide'
                className='absolute left-3 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-fun-blue-950/60 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-fun-blue-900/80 hover:border-white/20 transition-all duration-200 cursor-pointer'
            >
                <ChevronLeft size={16} />
            </button>
            <button
                onClick={scrollNext}
                aria-label='Next slide'
                className='absolute right-3 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-fun-blue-950/60 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-fun-blue-900/80 hover:border-white/20 transition-all duration-200 cursor-pointer'
            >
                <ChevronRight size={16} />
            </button>

            {/* ── Dot indicators ── */}
            <div className='absolute bottom-4 right-5 z-10 flex items-center gap-1.5'>
                {SLIDES.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => scrollTo(i)}
                        aria-label={`Go to slide ${i + 1}`}
                        className={`
                            transition-all duration-300 rounded-full cursor-pointer
                            ${selected === i
                                ? 'w-5 h-1.5 bg-white'
                                : 'w-1.5 h-1.5 bg-white/30 hover:bg-white/55'
                            }
                        `}
                    />
                ))}
            </div>

            {/* ── Slide counter ── */}
            <div className='absolute top-3 right-4 z-10 text-[10px] font-medium text-white/40 tabular-nums'>
                {String(selected + 1).padStart(2, '0')} / {String(SLIDES.length).padStart(2, '0')}
            </div>
        </div>
    )
}