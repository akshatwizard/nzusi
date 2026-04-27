import AboutSection from '@/components/about'
import BlogSection from '@/components/blog'
import EventsSection from '@/components/events'
import Hero from '@/components/hero'
import MembershipSection from '@/components/membership'
import StatsSection from '@/components/stats'

export default function HomePage() {
  return (
    <main className='min-h-screen'>
      <Hero />
      <StatsSection />
      <AboutSection />
      <BlogSection />
      <EventsSection />
      <MembershipSection/>
    </main>
  )
}
