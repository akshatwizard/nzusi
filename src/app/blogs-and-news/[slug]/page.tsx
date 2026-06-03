import { blog } from "@/services/blog"
import { BlogDetailResponse } from "@/types/blogs.types"
import { Metadata } from "next"
import BlogContent from "./details"

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params
    try {
        const res: BlogDetailResponse = await blog.getBlogDetails({ slug })
        const post = res.data
        return {
            title: post.meta_title,
            description: post.meta_description,
            openGraph: {
                title: post.meta_title,
                description: post.meta_description,
                images: [post.main_image ?? "/images/logo/nzusi_logo.png"],
            },
        }
    } catch {
        return { title: 'Blog | NZUSI' }
    }
}

export default async function SingleBlogsDetails({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    return (
        <main className='w-full bg-fun-blue-50'>
            <BlogContent slug={slug} />
        </main>
    )
}
