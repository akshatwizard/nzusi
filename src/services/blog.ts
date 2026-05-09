import { api } from "./api"

const BASE_URI = "http://nzusi.wizards.co.in/api"

export const blog = {
    getCategory: async () => {
        const { data } = await api.get(`${BASE_URI}/blog-category`)
        return data
    }
}