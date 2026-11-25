import type { Metadata } from 'next'
import SectionContent from '@/components/scientific-programs/section-content'
import { SP_BASE, SP_DEFAULT_SLUG, SP_ITEMS, SP_TITLE } from '@/constant/scientific_programs'

// Every section is built at deploy time; unknown slugs return 404.
export const dynamicParams = false

export function generateStaticParams() {
    return SP_ITEMS.map((item) => ({ section: item.slug }))
}

type Props = { params: Promise<{ section: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { section } = await params
    const item = SP_ITEMS.find((i) => i.slug === section)
    return {
        title: item ? `${item.label} – ${SP_TITLE} | NZUSICON 2026` : SP_TITLE,
        description: item
            ? `${item.group}: ${item.label} — NZUSICON 2026, Amritsar, 27–29 November 2026.`
            : undefined,
        // "Programme at a Glance" is also the main page; point search engines there
        alternates: { canonical: section === SP_DEFAULT_SLUG ? SP_BASE : `${SP_BASE}/${section}` },
    }
}

export default async function ScientificProgramsSectionPage({ params }: Props) {
    const { section } = await params
    return <SectionContent slug={section} />
}
