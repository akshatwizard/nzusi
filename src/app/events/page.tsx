import NZUSICONBanner from '@/components/banner'
import EventsSection from '@/components/events'


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
