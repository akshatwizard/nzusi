import Hero from '@/components/hero'
import { Section, Wrapper } from '@/components/ui/sections'
import React from 'react'

export default function HomePage() {
  return (
    <main className='min-h-screen'>
      <Hero />
      <Section>
        <Wrapper>
          Hello
        </Wrapper>
      </Section>
    </main>
  )
}
