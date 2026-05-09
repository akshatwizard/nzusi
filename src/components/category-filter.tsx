'use client'

import { blog } from '@/services/blog'
import { BlogCategoryResponse } from '@/types/blogs.types'
import { useQuery } from '@tanstack/react-query'
import { motion } from 'motion/react'
import { Dispatch, SetStateAction } from 'react'


const ALL_CATEGORIES = ["All", "Events", "Adyatan", "Academic"]
const TAB_STYLE = {
    active: 'bg-fun-blue-950 text-white border-fun-blue-950',
    idle: 'text-fun-blue-700/60 border-fun-blue-200 hover:border-fun-blue-300 hover:text-fun-blue-800'
}

type Props = {
    active: string
    onChange: Dispatch<SetStateAction<string>>
}

export function CategoryFilter({ active, onChange }: Props) {

    const { data, isLoading, isFetching } = useQuery<BlogCategoryResponse>({
        queryKey: ["blog_categorys"],
        queryFn: blog.getCategory
    })

    const allFilters: Array<{ id: number; title: string; slug: string }> =
        [
            { id: 1, title: 'All', slug: "all" },
            ...(data?.data.map((c) => ({ id: c.id, title: c.title, slug: c.slug })) ?? []),
        ]

    return (
        <div
            className='flex items-center gap-2 flex-wrap'
            role='tablist'
            aria-label='Filter posts by category'
        >
            {
                (isLoading || isFetching) ?
                    ALL_CATEGORIES.map((cat) => {
                        const isActive = active === cat
                        const styles = TAB_STYLE;

                        return (
                            <button
                                key={cat}
                                role='tab'
                                aria-selected={isActive}
                                disabled
                                className={`
                                    relative flex items-center gap-2 text-[12px] font-semibold
                                    px-4 py-2 rounded-full border transition-all duration-200 cursor-pointer
                                    ${isActive ? styles.active : styles.idle}
                                `}
                            >
                                {isActive && (
                                    <motion.span
                                        layoutId='blog-filter-bg'
                                        className='absolute inset-0 rounded-full'
                                        transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
                                    />
                                )}
                                <span className='relative z-10'>{cat}</span>
                            </button>
                        )
                    }) :
                    allFilters.map((cat) => {
                        const isActive = active === cat.slug
                        const styles = TAB_STYLE;

                        return (
                            <button
                                key={cat.id}
                                role='tab'
                                aria-selected={isActive}
                                onClick={() => onChange(cat.slug)}
                                className={`
                                    relative flex items-center gap-2 text-[12px] font-semibold
                                    px-4 py-2 rounded-full border transition-all duration-200 cursor-pointer
                                    ${isActive ? styles.active : styles.idle}
                                `}
                            >
                                {isActive && (
                                    <motion.span
                                        layoutId='blog-filter-bg'
                                        className='absolute inset-0 rounded-full'
                                        transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
                                    />
                                )}
                                <span className='relative z-10'>{cat.title}</span>
                            </button>
                        )
                    })
            }

        </div>
    )
}