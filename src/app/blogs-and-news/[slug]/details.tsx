"use client"

import { blog } from "@/services/blog"
import { BlogDetailResponse } from "@/types/blogs.types"
import { useQuery } from "@tanstack/react-query"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Calendar, Clock, Eye, Tag, ChevronRight, ArrowLeft, User } from "lucide-react"
import { Section, Wrapper } from "@/components/ui/sections"


export default function BlogContent({ slug }: { slug: string }) {
    const { data: res, isLoading, isError } = useQuery<BlogDetailResponse>({
        queryKey: ["blog_details", slug],
        queryFn: () => blog.getBlogDetails({ slug }),
    })

    if (isLoading) return <BlogDetailSkeleton />

    if (isError || !res?.status || !res?.data) return notFound()

    const post = res.data
    const recentPosts = res.recent_post ?? []

    return (
        <>
            {/* HERO */}
            <Section className="bg-fun-blue-950 px-0! relative overflow-hidden">
                <div
                    className="absolute inset-0 opacity-[0.03] pointer-events-none"
                    style={{
                        backgroundImage: `linear-gradient(rgba(255,255,255,.8) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.8) 1px,transparent 1px)`,
                        backgroundSize: '36px 36px',
                    }}
                />

                <div
                    className="absolute -right-20 top-10 w-96 h-96 rounded-full pointer-events-none"
                    style={{
                        background:
                            'radial-gradient(circle, rgba(24,95,165,0.20) 0%, transparent 70%)',
                    }}
                />

                <Wrapper className="relative z-10 lg:pt-40 md:pt-36 pt-30 pb-18 px-4 md:px-8 lg:px-12">

                    <Link
                        href="/blogs-and-news"
                        className="inline-flex items-center gap-2 text-fun-blue-300/70 hover:text-white transition-colors text-xs font-medium mb-8"
                    >
                        <ArrowLeft size={14} />
                        Back to Blogs
                    </Link>

                    <div className="max-w-4xl">

                        {/* Category */}
                        <Link
                            href={"#"}
                            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full
                    border border-fun-blue-500/20 bg-fun-blue-500/10
                    text-fun-blue-300 text-[11px] font-semibold tracking-[0.2em]
                uppercase hover:bg-fun-blue-500/20 transition-all duration-300"
                        >
                            <Tag size={10} />
                            {post.category.name}
                        </Link>

                        {/* Title */}
                        <h1 className="mt-6 font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-tight text-white">
                            {post.title}
                        </h1>

                        {/* Subtitle */}
                        {post.short_content && (
                            <p className="mt-6 text-fun-blue-200/50 text-[15px] leading-relaxed max-w-2xl">
                                {post.short_content}
                            </p>
                        )}

                        {/* Meta */}
                        <div className="flex flex-wrap items-center gap-x-5 gap-y-3 mt-8">
                            <div className="flex items-center gap-2 text-fun-blue-300 text-xs">
                                <User size={13} />
                                <span>{post.user.name}</span>
                            </div>

                            <div className="w-px h-3 bg-fun-blue-700 hidden md:block" />

                            <div className="flex items-center gap-2 text-fun-blue-400 text-xs">
                                <Calendar size={13} />
                                <span>{post.published_at}</span>
                            </div>

                            <div className="w-px h-3 bg-fun-blue-700 hidden md:block" />

                            <div className="flex items-center gap-2 text-fun-blue-400 text-xs">
                                <Clock size={13} />
                                <span>{post.reading_title}</span>
                            </div>

                            <div className="w-px h-3 bg-fun-blue-700 hidden md:block" />

                            <div className="flex items-center gap-2 text-fun-blue-400 text-xs">
                                <Eye size={13} />
                                <span>{post.view_count} views</span>
                            </div>
                        </div>
                    </div>
                </Wrapper>

                {/* Bottom fade */}
                <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-fun-blue-700/40 to-transparent" />
            </Section>

            <Section>
                <Wrapper>
                    <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-10 items-start">

                        {/* Article */}
                        <article>
                            {post.main_image && (
                                <div className="relative overflow-hidden rounded-2xl mb-5 ">

                                    <div className="relative aspect-16/8 w-full">
                                        <Image
                                            src={post.main_image}
                                            alt={post.title}
                                            fill
                                            priority
                                            className="object-contain"
                                        />
                                    </div>

                                    <div className="absolute inset-x-0 bottom-0 p-5 md:p-7 bg-linear-to-t from-black/70 via-black/20 to-transparent">
                                        <div className="flex items-center gap-2 text-white/90 text-xs tracking-widest uppercase">
                                            <div className="w-10 h-px bg-white/40" />
                                            Featured Article
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div
                                className="blog-content prose prose-sm md:prose-base max-w-none
                                prose-headings:font-serif prose-headings:text-fun-blue-950
                                prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
                                prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
                                prose-p:text-zinc-600 prose-p:leading-relaxed prose-p:mb-5
                                prose-a:text-fun-blue-600 prose-a:no-underline hover:prose-a:underline
                                prose-strong:text-fun-blue-900 prose-strong:font-semibold
                                prose-ol:text-zinc-600 prose-ul:text-zinc-600
                                prose-li:mb-1.5 prose-li:leading-relaxed
                                prose-img:rounded-2xl prose-img:w-full prose-img:my-8 prose-img:shadow-lg
                                prose-em:text-fun-blue-700
                                prose-sup:text-fun-blue-500 prose-sup:text-[10px]
                            "
                                dangerouslySetInnerHTML={{ __html: post.long_content }}
                            />

                            <div className="mt-10 pt-8 border-t border-fun-blue-100 flex items-center justify-between flex-wrap gap-4">
                                <div className="flex items-center gap-2">
                                    <span className="text-[11px] text-fun-blue-400 uppercase tracking-widest font-semibold">Category</span>
                                    <Link
                                        href={`/blogs/category/${post.category.slug}`}
                                        className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-fun-blue-100 text-fun-blue-700 text-xs font-semibold hover:bg-fun-blue-200 transition-colors"
                                    >
                                        {post.category.name}
                                    </Link>
                                </div>
                                <Link
                                    href="/blogs"
                                    className="inline-flex items-center gap-2 text-xs font-semibold text-fun-blue-600 hover:text-fun-blue-800 transition-colors"
                                >
                                    <ArrowLeft size={12} />
                                    All Articles
                                </Link>
                            </div>
                        </article>

                        {/* Sidebar */}
                        <aside className="lg:sticky lg:top-24 flex flex-col gap-5">

                            {/* Author card */}
                            <div className="rounded-2xl border border-fun-blue-100 bg-white p-5">
                                <p className="text-[10px] font-bold uppercase tracking-widest text-fun-blue-400 mb-3">About the Author</p>
                                <div className="flex items-start gap-3">
                                    <div className="w-10 h-10 rounded-full bg-fun-blue-100 border border-fun-blue-200 flex items-center justify-center text-fun-blue-600 font-bold text-sm shrink-0">
                                        {post.user.name.charAt(0)}
                                    </div>
                                    <div>
                                        <p className="font-semibold text-fun-blue-950 text-sm leading-tight">
                                            {post.short_content
                                                ? post.short_content.replace(/^By\s+/i, "").split(",")[0]
                                                : post.user.name}
                                        </p>
                                        {post.short_content && (
                                            <p className="text-fun-blue-500 text-[12px] mt-1 leading-snug">
                                                {post.short_content.replace(/^By\s+/i, "").split(",").slice(1).join(",").trim()}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Article info */}
                            <div className="rounded-2xl border border-fun-blue-100 bg-white p-5">
                                <p className="text-[10px] font-bold uppercase tracking-widest text-fun-blue-400 mb-4">Article Info</p>
                                <div className="flex flex-col gap-3">
                                    {[
                                        { icon: Calendar, label: "Published", value: post.published_at },
                                        { icon: Clock, label: "Read time", value: post.reading_title },
                                        { icon: Eye, label: "Views", value: `${post.view_count}` },
                                        { icon: Tag, label: "Category", value: post.category.name },
                                    ].map(({ icon: Icon, label, value }) => (
                                        <div key={label} className="flex items-center justify-between">
                                            <div className="flex items-center gap-2 text-fun-blue-400">
                                                <Icon size={12} />
                                                <span className="text-[12px]">{label}</span>
                                            </div>
                                            <span className="text-fun-blue-950 text-[12px] font-medium">{value}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Recent posts */}
                            {recentPosts.length > 0 && (
                                <div className="rounded-2xl border border-fun-blue-100 bg-white p-5">
                                    <p className="text-[10px] font-bold uppercase tracking-widest text-fun-blue-400 mb-4">Recent Posts</p>
                                    <div className="flex flex-col gap-1">
                                        {recentPosts.slice(0, 5).map((recent) => (
                                            <Link
                                                key={recent.id}
                                                href={`/blogs/${recent.slug}`}
                                                className="group flex items-start gap-3 p-2 -mx-2 rounded-xl hover:bg-fun-blue-50 transition-colors"
                                            >
                                                {recent.image && (
                                                    <div className="relative w-14 h-14 rounded-lg overflow-hidden shrink-0 bg-fun-blue-100">
                                                        <Image
                                                            src={recent.image}
                                                            alt={recent.title}
                                                            fill
                                                            className="object-cover"
                                                        />
                                                    </div>
                                                )}
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-fun-blue-950 text-[12px] font-semibold leading-snug line-clamp-2 group-hover:text-fun-blue-700 transition-colors">
                                                        {recent.title}
                                                    </p>
                                                    <div className="flex items-center gap-1 mt-1 text-fun-blue-400 text-[11px]">
                                                        <Calendar size={9} />
                                                        <span>{recent.published_at}</span>
                                                    </div>
                                                </div>
                                                <ChevronRight size={12} className="text-fun-blue-200 shrink-0 mt-1 group-hover:text-fun-blue-400 transition-colors" />
                                            </Link>
                                        ))}
                                    </div>

                                    <Link
                                        href="/blogs-and-news"
                                        className="mt-4 flex items-center justify-center gap-1.5 w-full py-2 rounded-xl border border-fun-blue-100 text-fun-blue-600 text-xs font-semibold hover:bg-fun-blue-50 transition-colors"
                                    >
                                        View All Posts <ChevronRight size={11} />
                                    </Link>
                                </div>
                            )}
                        </aside>
                    </div>
                </Wrapper>
            </Section>
        </>
    )
}

function BlogDetailSkeleton() {
    return (
        <div className="animate-pulse">
            {/* Hero skeleton */}
            <div className="relative w-full h-[52vh]  bg-fun-blue-900">
                <div className="absolute bottom-0 left-0 right-0 px-4 md:px-8 lg:px-12 pb-8 max-w-7xl mx-auto w-full">
                    {/* Category badge */}
                    <div className="h-6 w-24 rounded-full bg-fun-blue-800 mb-4" />
                    {/* Title */}
                    <div className="space-y-3 mb-4">
                        <div className="h-8 w-2/3 rounded-xl bg-fun-blue-800" />
                        <div className="h-8 w-1/2 rounded-xl bg-fun-blue-800" />
                    </div>
                    {/* Meta row */}
                    <div className="flex gap-4">
                        <div className="h-4 w-32 rounded-lg bg-fun-blue-800" />
                        <div className="h-4 w-20 rounded-lg bg-fun-blue-800" />
                        <div className="h-4 w-20 rounded-lg bg-fun-blue-800" />
                    </div>
                </div>
            </div>

            {/* Body skeleton */}
            <div className="w-full max-w-7xl mx-auto px-4 md:px-8 lg:px-12 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-10">
                    {/* Article */}
                    <div className="space-y-4">
                        <div className="h-5 w-full rounded-lg bg-fun-blue-100" />
                        <div className="h-5 w-11/12 rounded-lg bg-fun-blue-100" />
                        <div className="h-5 w-4/5 rounded-lg bg-fun-blue-100" />
                        <div className="h-48 w-full rounded-2xl bg-fun-blue-100 mt-6" />
                        <div className="h-5 w-full rounded-lg bg-fun-blue-100 mt-4" />
                        <div className="h-5 w-10/12 rounded-lg bg-fun-blue-100" />
                        <div className="h-5 w-3/4 rounded-lg bg-fun-blue-100" />
                        <div className="h-7 w-1/3 rounded-lg bg-fun-blue-200 mt-8" />
                        <div className="h-5 w-full rounded-lg bg-fun-blue-100" />
                        <div className="h-5 w-11/12 rounded-lg bg-fun-blue-100" />
                        <div className="h-5 w-9/12 rounded-lg bg-fun-blue-100" />
                    </div>

                    {/* Sidebar */}
                    <div className="flex flex-col gap-5">
                        {/* Author card */}
                        <div className="rounded-2xl border border-fun-blue-100 bg-white p-5">
                            <div className="h-3 w-20 rounded bg-fun-blue-100 mb-4" />
                            <div className="flex gap-3">
                                <div className="w-10 h-10 rounded-full bg-fun-blue-100 shrink-0" />
                                <div className="flex-1 space-y-2">
                                    <div className="h-4 w-3/4 rounded bg-fun-blue-100" />
                                    <div className="h-3 w-full rounded bg-fun-blue-100" />
                                    <div className="h-3 w-2/3 rounded bg-fun-blue-100" />
                                </div>
                            </div>
                        </div>

                        {/* Info card */}
                        <div className="rounded-2xl border border-fun-blue-100 bg-white p-5">
                            <div className="h-3 w-20 rounded bg-fun-blue-100 mb-4" />
                            <div className="space-y-3">
                                {[1, 2, 3, 4].map(i => (
                                    <div key={i} className="flex justify-between">
                                        <div className="h-3 w-20 rounded bg-fun-blue-100" />
                                        <div className="h-3 w-16 rounded bg-fun-blue-100" />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Recent posts card */}
                        <div className="rounded-2xl border border-fun-blue-100 bg-white p-5">
                            <div className="h-3 w-24 rounded bg-fun-blue-100 mb-4" />
                            <div className="space-y-3">
                                {[1, 2, 3, 4].map(i => (
                                    <div key={i} className="flex gap-3 items-start">
                                        <div className="w-14 h-14 rounded-lg bg-fun-blue-100 shrink-0" />
                                        <div className="flex-1 space-y-1.5">
                                            <div className="h-3 w-full rounded bg-fun-blue-100" />
                                            <div className="h-3 w-4/5 rounded bg-fun-blue-100" />
                                            <div className="h-3 w-20 rounded bg-fun-blue-100" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}