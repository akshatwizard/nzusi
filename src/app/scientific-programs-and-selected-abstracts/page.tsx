import type { Metadata } from 'next'
import SectionContent from '@/components/scientific-programs/section-content'
import { SP_BASE, SP_DEFAULT_SLUG, SP_TITLE } from '@/constant/scientific_programs'

export const metadata: Metadata = {
    title: `${SP_TITLE} | NZUSICON 2026`,
    description:
        'NZUSICON 2026 (Amritsar, 27–29 November 2026): full scientific programme, selected abstracts and abstract submissions of the North Zone chapter of the Urological Society of India.',
    alternates: { canonical: SP_BASE },
}

export default function ScientificProgramsPage() {
    return <SectionContent slug={SP_DEFAULT_SLUG} />
}
