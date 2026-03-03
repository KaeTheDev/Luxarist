/**
 * File: Category.ts
 * Purpose:
 * Defines the comprehensive data structure for a full jewelry collection/category 
 * used primarily on dedicated collection landing pages.
 *
 * Responsibilities:
 * - Represent the administrative and editorial data of a category (ID, Name, Slug).
 * - Store high-resolution visual assets (`heroImage`) and marketing copy (`description`) 
 * required for top-of-page immersive headers.
 * - Maintain a count of total items to assist with collection metadata display.
 * - Contain an array of associated `Product` objects to facilitate nested data 
 * rendering within the category view.
 *
 * Usage:
 * - Serves as the primary data type for the `CategoryPage` component.
 * - Returned by the `fetchCategoryBySlug` utility to hydrate the `CategoryHero`.
 * - Example:
 * const category: Category = {
 * _id: "cat_987",
 * name: "Necklaces",
 * slug: "necklaces",
 * heroImage: "/assets/heros/necklaces.jpg",
 * description: "Discover our signature gold and silver chains.",
 * productCount: 24,
 * products: [...] 
 * };
 */

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