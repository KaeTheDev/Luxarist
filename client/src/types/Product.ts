/**
 * File: Product.ts
 * Purpose:
 *  Defines the structure of a product object used throughout the frontend.
 *  Ensures type safety and consistent handling of product data in components and hooks.
 *
 * Responsibilities:
 *  - Represent essential product information: unique ID, primary image URL, name, and price.
 *  - Include minimal category information for display or filtering purposes.
 *  - Provide a reliable type for mapping, rendering, and API consumption.
 *
 * Usage:
 *  - Used as the return type for hooks like `useProducts` and API fetch functions.
 *  - Provides type safety when rendering product cards, grids, or lists.
 *  - Example:
 *      const product: Product = { ... };
 */

export interface Product {
    _id: string;
    primaryImageUrl: string;
    name: string;
    price: number;
    category: {
        name: string;
    };
}