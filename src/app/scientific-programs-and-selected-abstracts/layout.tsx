import { ReactNode } from 'react'
import { Section, Wrapper } from '@/components/ui/sections'
import ScientificProgramsSidebar from '@/components/scientific-programs/sidebar'

export default function ScientificProgramsLayout({ children }: { children: ReactNode }) {
    return (
        <main className='w-full bg-fun-blue-50'>
            <Section className='bg-fun-blue-950 px-0! relative overflow-hidden'>
                {/* Grid texture */}
                <div
                    className='absolute inset-0 opacity-[0.03] pointer-events-none'
                    style={{
                        backgroundImage: `linear-gradient(rgba(255,255,255,.8) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.8) 1px,transparent 1px)`,
                        backgroundSize: '36px 36px',
                    }}
                />
                <div
                    className='absolute -right-16 -bottom-16 w-72 h-72 rounded-full pointer-events-none'
                    style={{ background: 'radial-gradient(circle, rgba(24,95,165,0.28) 0%, transparent 70%)' }}
                />

                <Wrapper className='lg:pt-40 pt-36 md:pt-38 pb-12! px-6 md:px-8 lg:px-12 relative z-10'>
                    <div className='flex flex-col gap-3'>
                        <div className='flex items-center gap-2.5'>
                            <div className='h-px w-5 bg-fun-blue-500/50' />
                            <span className='text-fun-blue-400/55 text-[11px] font-medium tracking-widest uppercase'>
                                NZUSICON 2026 · Amritsar · 27–29 November
                            </span>
                        </div>

                        <h1 className='font-serif text-4xl md:text-5xl lg:text-6xl text-fun-blue-50 leading-[1.08]'>
                            Scientific Programs &{' '}
                            <em className='italic text-fun-blue-400'>Selected Abstracts</em>
                        </h1>

                        <p className='text-fun-blue-200/45 text-sm leading-relaxed max-w-xl mt-1'>
                            The full scientific programme of the 36th Annual Conference of the North Zone chapter of the
                            Urological Society of India, the abstracts selected for presentation, and all abstract submissions.
                        </p>
                    </div>
                </Wrapper>

                <div className='absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-fun-blue-700/40 to-transparent' />
            </Section>

            <Section className='bg-transparent! px-0!'>
                <Wrapper className='py-0! gap-0! px-0'>
                    <div className='flex flex-col lg:flex-row min-h-[70vh]'>
                        <ScientificProgramsSidebar />
                        <div className='flex-1 min-w-0 px-5 md:px-8 lg:px-10 py-10 lg:py-12'>
                            {children}
                        </div>
                    </div>
                </Wrapper>
            </Section>
        </main>
    )
}
