import { api } from "./api"

// export const BASE_URI = "https://nzusi.wizards.co.in/api"

export const blog = {
    getCategory: async () => {
        const { data } = await api.get(`/blog-category`)
        return data
    },
    getDefaultBlogs: async ({ pageParam = 1 }: { pageParam?: number }) => {
        const { data } = await api.get(`/blog`, {
            params: { page: pageParam }
        })
        return data
    },

    getBlogsByCategory: async ({ pageParam = 1, slug }: { pageParam?: number; slug: string }) => {
        const { data } = await api.get(`/blog-category/${slug}`, {
            params: { page: pageParam }
        })
        return data
    },

    getBlogDetails: async ({ slug }: { slug: string }) => {
        const { data } = await api.get(`/blog/${slug}`)
        return data
    }
}
