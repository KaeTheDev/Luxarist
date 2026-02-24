export interface FeaturedCategory {
    _id: string;
    name: string;
    slug: string;
    featuredImage: string;
    productCount: number;
    span?: string;
}