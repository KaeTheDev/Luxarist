/**
 * File: Product.ts
 * Purpose:
 * Defines the structure of a product object used throughout the frontend.
 * Ensures type safety and consistent handling of product data in components and hooks.
 */

export interface Product {
    _id: string;
    primaryImageUrl: string;
    galleryImageUrls: string[];
    name: string;
    price: number;
    sizes: string[];
    isNewArrival: boolean;
    category: {
        name: string;
        slug: string;
    };
    description?: string;
    sku?: string;
    material: string;
    gemstoneType?: string;
    subtitle?: string;
    slug?: string;
    style?: string;
    weightPreset?: string;
    
    /**
     * Technical specifications for gemstones (Diamonds, Rubies, etc.)
     * Optional: Only present for fine jewelry items.
     */
    diamondSpecs?: {
        carat: string;
        cut: string;
        color: string;
        clarity: string;
        halo?: string;
        stones?: string;
    };

    /**
     * Technical specifications for the metal and construction.
     * Includes watch-specific fields like movement and water resistance.
     */
    metalSpecs?: {
        type: string;
        weight: string;
        finish?: string;
        setting?: string;
        width?: string;
        length?: string;
        clasp?: string;
        // Watch specific fields
        movement?: string;
        waterResistance?: string;
        glass?: string;
        strap?: string;
        battery?: string;
    };
}