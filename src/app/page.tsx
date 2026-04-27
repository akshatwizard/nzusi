import AboutSection from '@/components/about'
import Hero from '@/components/hero'
import StatsSection from '@/components/stats'

export default function HomePage() {
  return (
    <main className='min-h-screen'>
      <Hero />
      <StatsSection/>
      <AboutSection/>
    </main>
  )
}
