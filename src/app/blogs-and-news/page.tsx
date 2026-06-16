import BlogPageClient from "./blog-details"


export const metadata = {
    title: 'Blog & News — NZUSI',
    description:
        'Latest events, clinical literature reviews (Adyatan), and academic updates from the North Zone Urological Society of India.',
}

interface BlogPageProps {
    searchParams: Promise<{
        category: string | undefined;
    }>;
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
    const params = await searchParams;

    return (
        <main className='w-full bg-[#F7F6F2] min-h-screen'>
            <BlogPageClient category={params.category ?? "all"} />
        </main>
    )
}