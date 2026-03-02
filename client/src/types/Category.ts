import type { Product } from "./Product";

export interface Category {
    _id: string;
    name: string;
    slug: string;
    heroImage: string;
    description: string;
    productCount: number;
    products: Product[]; 
}