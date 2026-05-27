import AboutSection from '@/components/about'
import AbstractsSection from '@/components/abstracts'
import NZUSICONBanner from '@/components/banner'
import BlogSection from '@/components/blog'
import CouncilSection from '@/components/councils'
import EventsSection from '@/components/events'
import Hero from '@/components/hero'
import LegacyStrip from '@/components/legacy'
import MembershipSection from '@/components/membership'
import ResourcesSection from '@/components/resources'
import StatsSection from '@/components/stats'

export default function HomePage() {
  return (
    <main >
      <Hero />
      <NZUSICONBanner />
      <StatsSection />
      <AboutSection />
      <BlogSection />
      <AbstractsSection />
      <EventsSection />
      {/* <LegacyStrip /> */}
      <MembershipSection />
      <CouncilSection />
      <ResourcesSection />
    </main>
  )
}
