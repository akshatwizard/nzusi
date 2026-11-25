import Link from 'next/link'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { notFound } from 'next/navigation'
import { sectionLoaders } from '@/content/scientific-programs'
import { SP_BASE, SP_DEFAULT_SLUG, SP_ITEMS } from '@/constant/scientific_programs'

/** Server component: renders one generated section with its heading and prev/next links. */
export default async function SectionContent({ slug }: { slug: string }) {
    const index = SP_ITEMS.findIndex((i) => i.slug === slug)
    const load = sectionLoaders[slug]
    if (index === -1 || !load) notFound()

    const item = SP_ITEMS[index]
    const prev = SP_ITEMS[index - 1]
    const next = SP_ITEMS[index + 1]
    const html = (await load()).default

    return (
        <article>
            <p className='text-[11px] font-semibold text-fun-blue-500 uppercase tracking-widest mb-4'>
                {item.group} <span className='text-fun-blue-900/30'>/</span> {item.label}
            </p>

            {/* HTML generated at build from the NZUSICON 2026 documents (static, no scripts) */}
            <div className='sp-doc' dangerouslySetInnerHTML={{ __html: html }} />

            <nav className='mt-12 pt-6 border-t border-fun-blue-100 flex flex-col sm:flex-row gap-3 justify-between' aria-label='Previous and next section'>
                {prev ? (
                    <Link href={prev.slug === SP_DEFAULT_SLUG ? SP_BASE : `${SP_BASE}/${prev.slug}`} className='inline-flex items-center gap-2 text-sm font-medium text-fun-blue-700 hover:text-fun-blue-500'>
                        <ArrowLeft size={14} /> {prev.label}
                    </Link>
                ) : <span />}
                {next && (
                    <Link href={`${SP_BASE}/${next.slug}`} className='inline-flex items-center gap-2 text-sm font-medium text-fun-blue-700 hover:text-fun-blue-500 sm:ml-auto'>
                        {next.label} <ArrowRight size={14} />
                    </Link>
                )}
            </nav>
        </article>
    )
}
