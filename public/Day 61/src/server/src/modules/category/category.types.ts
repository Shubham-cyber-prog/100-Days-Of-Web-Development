export interface Category {
    id: string;
    name: string;
    slug: string;
    description?: string;
    images?: string[];
    createdAt: Date;
    updatedAt: Date;
}