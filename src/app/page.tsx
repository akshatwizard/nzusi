import AboutSection from '@/components/about'
import BlogSection from '@/components/blog'
import CouncilSection from '@/components/councils'
import EventsSection from '@/components/events'
import Hero from '@/components/hero'
import MembershipSection from '@/components/membership'
import StatsSection from '@/components/stats'

export default function HomePage() {
  return (
    <main >
      <Hero />
      <StatsSection />
      <AboutSection />
      <BlogSection />
      <EventsSection />
      <MembershipSection/>
      <CouncilSection/>
    </main>
  )
}
