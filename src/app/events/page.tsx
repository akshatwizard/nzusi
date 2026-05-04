"use client"
import NZUSICONBanner from '@/components/banner'
import EventsSection from '@/components/events'
import { Section, Wrapper } from '@/components/ui/sections'
import { motion } from "motion/react"


export default function EventsPage() {
    return (
        <main className='w-full'>
            <NZUSICONBanner
                variant="hero"
                bgImage="/images/hero/hero-bg.jpg"
            />
            <EventsSection />
        </main>
    )
}
