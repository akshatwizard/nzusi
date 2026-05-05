import { Category, CATEGORY_META } from "@/constant/blog"

type Props = {
    category: Category
    size?: 'sm' | 'md'
}

export function CategoryPill({ category, size = 'md' }: Props) {
    const meta = CATEGORY_META[category]
    return (
        <span
            className={`
                inline-flex items-center gap-1.5 font-semibold rounded-full border
                ${meta.color} ${meta.bg} ${meta.border}
                ${size === 'sm'
                    ? 'text-[10px] px-2 py-0.5 tracking-wide'
                    : 'text-[11px] px-2.5 py-1 tracking-wide'
                }
            `}
        >
            <span
                className='w-1 h-1 rounded-full shrink-0'
                style={{ background: meta.dot }}
            />
            {category}
        </span>
    )
}