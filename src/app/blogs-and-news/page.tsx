import BlogPageClient from "./blog-details"


export const metadata = {
    title: 'Blog & News — NZUSI',
    description:
        'Latest events, clinical literature reviews (Adyatan), and academic updates from the North Zone Urological Society of India.',
}

export default function BlogPage() {
    return (
        <main className='w-full bg-[#F7F6F2] min-h-screen'>
            <BlogPageClient />
        </main>
    )
}