"use client"

import { blog } from "@/services/blog"
import { BlogDetailResponse, ExtraImages } from "@/types/blogs.types"
import { useQuery } from "@tanstack/react-query"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Calendar, Clock, Eye, Tag, ChevronRight, ArrowLeft, User, ZoomIn, ChevronLeft, X } from "lucide-react"
import { Section, Wrapper } from "@/components/ui/sections"
import { AnimatePresence, motion } from "motion/react"
import { useState } from "react"
import YoutubeVideo from "@/components/youtube_video_loader"


export default function BlogContent({ slug }: { slug: string }) {
    const { data: res, isLoading, isError } = useQuery<BlogDetailResponse>({
        queryKey: ["blog_details", slug],
        queryFn: () => blog.getBlogDetails({ slug }),
    })

    if (isLoading) return <BlogDetailSkeleton />

    if (isError || !res?.status || !res?.data) return notFound()

    const post = res.data
    const recentPosts = res.recent_post ?? []
    const galleryImages: [] | ExtraImages[] = Array.isArray(post.images) ? post.images.filter(Boolean) : []

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
                    style={{ background: 'radial-gradient(circle, rgba(24,95,165,0.20) 0%, transparent 70%)' }}
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
                        {post.category && <Link
                            href="#"
                            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-fun-blue-500/20 bg-fun-blue-500/10 text-fun-blue-300 text-[11px] font-semibold tracking-[0.2em] uppercase hover:bg-fun-blue-500/20 transition-all duration-300"
                        >
                            <Tag size={10} />
                            {post.category.name}
                        </Link>}

                        <h1 className="mt-6 font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-tight text-white">
                            {post.title}
                        </h1>

                        {post.short_content && (
                            <p className="mt-6 text-fun-blue-200/50 text-[15px] leading-relaxed max-w-2xl">
                                {post.short_content}
                            </p>
                        )}

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
                            {/* Gallery badge — shows only when images exist */}
                            {galleryImages.length > 0 && (
                                <>
                                    <div className="w-px h-3 bg-fun-blue-700 hidden md:block" />
                                    <div className="flex items-center gap-2 text-fun-blue-400 text-xs">
                                        <ZoomIn size={13} />
                                        <span>{galleryImages.length} photos</span>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </Wrapper>

                <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-fun-blue-700/40 to-transparent" />
            </Section>


            <Section>
                <Wrapper>
                    <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-10 items-start">

                        {/* Article */}
                        <article>
                            {/* {post.main_image && (
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
                            )} */}

                            <div
                                className="leading-snug blog-content prose prose-sm md:prose-base max-w-none
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
                            <ImageGallery images={galleryImages} />

                            {post.youtube_id_or_link &&
                                <div className="w-full overflow-hidden mt-10 pt-8 border-t border-fun-blue-100">
                                    <div className="w-full h-full overflow-hidden rounded-2xl">
                                        <YoutubeVideo
                                            title={post.title}
                                            video_id={post.youtube_id_or_link}
                                        />
                                    </div>
                                </div>
                            }

                            <div className="mt-10 pt-8 border-t border-fun-blue-100 flex items-center justify-between flex-wrap gap-4">
                                {post.category && <div className="flex items-center gap-2">
                                    <span className="text-[11px] text-fun-blue-400 uppercase tracking-widest font-semibold">Category</span>
                                    <span
                                        className="select-none inline-flex items-center gap-1 px-3 py-1 rounded-full bg-fun-blue-100 text-fun-blue-700 text-xs font-semibold hover:bg-fun-blue-200 transition-colors"
                                    >
                                        {post.category.name}
                                    </span>
                                </div>}
                                <Link
                                    href="/blogs-and-news"
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
                                        { icon: Tag, label: "Category", value: post.category?.name },
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
                                                href={`/blogs-and-news/${recent.slug}`}
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
            <div className="relative w-full h-[52vh] bg-fun-blue-900">
                <div className="absolute bottom-0 left-0 right-0 px-4 md:px-8 lg:px-12 pb-8 max-w-7xl mx-auto w-full">
                    <div className="h-6 w-24 rounded-full bg-fun-blue-800 mb-4" />
                    <div className="space-y-3 mb-4">
                        <div className="h-8 w-2/3 rounded-xl bg-fun-blue-800" />
                        <div className="h-8 w-1/2 rounded-xl bg-fun-blue-800" />
                    </div>
                    <div className="flex gap-4">
                        <div className="h-4 w-32 rounded-lg bg-fun-blue-800" />
                        <div className="h-4 w-20 rounded-lg bg-fun-blue-800" />
                        <div className="h-4 w-20 rounded-lg bg-fun-blue-800" />
                    </div>
                </div>
            </div>
            <div className="w-full max-w-7xl mx-auto px-4 md:px-8 lg:px-12 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-10">
                    <div className="space-y-4">
                        {[1, 2, 3].map(i => <div key={i} className="h-5 w-full rounded-lg bg-fun-blue-100" />)}
                        <div className="h-5 w-4/5 rounded-lg bg-fun-blue-100" />
                        <div className="h-48 w-full rounded-2xl bg-fun-blue-100 mt-6" />
                        {[1, 2, 3].map(i => <div key={i} className="h-5 w-full rounded-lg bg-fun-blue-100" />)}
                        <div className="h-7 w-1/3 rounded-lg bg-fun-blue-200 mt-8" />
                        {[1, 2].map(i => <div key={i} className="h-5 w-full rounded-lg bg-fun-blue-100" />)}
                    </div>
                    <div className="flex flex-col gap-5">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="rounded-2xl border border-fun-blue-100 bg-white p-5">
                                <div className="h-3 w-20 rounded bg-fun-blue-100 mb-4" />
                                <div className="space-y-2">
                                    {[1, 2, 3].map(j => <div key={j} className="h-3 w-full rounded bg-fun-blue-100" />)}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}


function Lightbox({ images, startIndex, onClose }: { images: string[], startIndex: number, onClose: () => void }) {
    const [current, setCurrent] = useState(startIndex)

    const prev = () => setCurrent(i => (i - 1 + images.length) % images.length)
    const next = () => setCurrent(i => (i + 1) % images.length)

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={onClose}
        >
            {/* Close */}
            <button
                onClick={onClose}
                className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors z-10"
            >
                <X size={18} className="text-white" />
            </button>

            {/* Counter */}
            <div className="absolute top-5 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-full bg-white/10 text-white text-xs font-medium">
                {current + 1} / {images.length}
            </div>

            {/* Prev */}
            {images.length > 1 && (
                <button
                    onClick={e => { e.stopPropagation(); prev() }}
                    className="absolute left-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors z-10"
                >
                    <ChevronLeft size={20} className="text-white" />
                </button>
            )}

            {/* Image */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={current}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    onClick={e => e.stopPropagation()}
                    className="relative max-w-5xl max-h-[80vh] w-full h-full flex items-center justify-center"
                >
                    <img
                        src={images[current]}
                        alt={`Image ${current + 1}`}
                        className="max-w-full max-h-[80vh] object-contain rounded-xl"
                    />
                </motion.div>
            </AnimatePresence>

            {/* Next */}
            {images.length > 1 && (
                <button
                    onClick={e => { e.stopPropagation(); next() }}
                    className="absolute right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors z-10"
                >
                    <ChevronRight size={20} className="text-white" />
                </button>
            )}

            {/* Thumbnail strip */}
            {images.length > 1 && (
                <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2 px-4 overflow-x-auto max-w-lg">
                    {images.map((img, i) => (
                        <button
                            key={i}
                            onClick={e => { e.stopPropagation(); setCurrent(i) }}
                            className={`relative w-14 h-10 rounded-lg overflow-hidden shrink-0 border-2 transition-all ${i === current ? 'border-white' : 'border-white/20 opacity-50'}`}
                        >
                            <img src={img} alt="" className="w-full h-full object-cover" />
                        </button>
                    ))}
                </div>
            )}
        </motion.div>
    )
}

function ImageGallery({ images }: { images: [] | ExtraImages[] }) {
    const [lightboxIdx, setLightboxIdx] = useState<number | null>(null)

    if (!images || images.length === 0) return null

    const imageUrls = images.map((img) => img.image)
    const isSingle = images.length === 1
    const isTwo = images.length === 2
    const isThree = images.length === 3

    return (
        <>
            <div className="mt-8 mb-2">
                <div className="flex items-center gap-3 mb-4">
                    <div className="h-px w-5 bg-fun-blue-200" />
                    <span className="text-[11px] font-bold uppercase tracking-widest text-fun-blue-400">
                        Photo Gallery · {images.length} {images.length === 1 ? 'image' : 'images'}
                    </span>
                </div>

                {/* Layout changes based on image count */}
                {isSingle && (
                    <button
                        onClick={() => setLightboxIdx(0)}
                        className="group relative w-full rounded-2xl overflow-hidden aspect-video border border-fun-blue-100"
                    >
                        <Image src={images[0].image} alt="Gallery image" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                            <ZoomIn size={24} className="text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                    </button>
                )}

                {isTwo && (
                    <div className="grid grid-cols-2 gap-2">
                        {images.map((img, i) => (
                            <button key={i} onClick={() => setLightboxIdx(i)}
                                className="group relative rounded-2xl overflow-hidden aspect-video border border-fun-blue-100">
                                <Image src={img.image} alt={`Gallery ${i + 1}`} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors flex items-center justify-center">
                                    <ZoomIn size={20} className="text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                                </div>
                            </button>
                        ))}
                    </div>
                )}

                {isThree && (
                    <div className="grid grid-cols-2 gap-2">
                        <button onClick={() => setLightboxIdx(0)}
                            className="group relative rounded-2xl overflow-hidden row-span-2 aspect-square border border-fun-blue-100">
                            <Image src={images[0].image} alt="Gallery 1" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors flex items-center justify-center">
                                <ZoomIn size={22} className="text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                        </button>
                        {images.slice(1).map((img, i) => (
                            <button key={i + 1} onClick={() => setLightboxIdx(i + 1)}
                                className="group relative rounded-2xl overflow-hidden aspect-video border border-fun-blue-100">
                                <Image src={img.image} alt={`Gallery ${i + 2}`} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors flex items-center justify-center">
                                    <ZoomIn size={18} className="text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                                </div>
                            </button>
                        ))}
                    </div>
                )}

                {images.length >= 4 && (
                    <div className="grid grid-cols-2 gap-2">
                        {/* Large first image */}
                        <button onClick={() => setLightboxIdx(0)}
                            className="group relative rounded-2xl overflow-hidden col-span-2 aspect-video border border-fun-blue-100">
                            <Image src={images[0].image} alt="Gallery 1" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                                <ZoomIn size={24} className="text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                        </button>

                        {/* Remaining as 2-col grid, last one shows "+N more" overlay */}
                        {images.slice(1, 4).map((img, i) => {
                            const actualIdx = i + 1
                            const isLast = i === 2 && images.length > 4
                            return (
                                <button key={actualIdx} onClick={() => setLightboxIdx(actualIdx)}
                                    className="group relative rounded-2xl overflow-hidden aspect-video border border-fun-blue-100">
                                    <Image src={img.image} alt={`Gallery ${actualIdx + 1}`} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                                    {isLast ? (
                                        <div className="absolute inset-0 bg-fun-blue-950/60 flex items-center justify-center">
                                            <span className="text-white font-bold text-xl">+{images.length - 4}</span>
                                        </div>
                                    ) : (
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors flex items-center justify-center">
                                            <ZoomIn size={18} className="text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                                        </div>
                                    )}
                                </button>
                            )
                        })}
                    </div>
                )}
            </div>

            <AnimatePresence>
                {lightboxIdx !== null && (
                    <Lightbox images={imageUrls} startIndex={lightboxIdx} onClose={() => setLightboxIdx(null)} />
                )}
            </AnimatePresence>
        </>
    )
}