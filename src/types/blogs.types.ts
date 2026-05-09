export type BlogCategoryResponse = {
    status: boolean;
    message: string;
    data: {
        id: number;
        title: string;
        slug: string;
    }[]
}