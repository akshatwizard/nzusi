export type BlogCategoryResponse = {
    status: boolean;
    message: string;
    data: BlogCategory[]
}

export type BlogCategory = {
    id: number
    title: string
    slug: string
}


export type BlogPost = {
    id: number
    title: string
    reading_title: string | null
    view_count: string
    short_content: string | null
    long_content: string
    slug: string
    published_at: string
    meta_title: string
    meta_description: string
    image: string
    category: { id: number; name: string } | null
    user: { id: number; name: string }
    label: string | null
}

export type CategoryBlogPost = Omit<BlogPost, 'category'> & {
    label: string | null
}

export type PaginationMeta = {
    current_page: number
    total_pages: number
    per_page: number
    total_products: number
    next_page_url: string | null
    previous_page_url: string | null
    has_next_page: boolean
    has_previous_page: boolean
}

export type AllBlogsResponse = {
    status: boolean
    message: string
    data: BlogPost[]
    pagination: PaginationMeta
}

export type CategoryBlogsResponse = {
    status: boolean
    message: string
    category: BlogCategory
    data: CategoryBlogPost[]
    pagination: PaginationMeta
}