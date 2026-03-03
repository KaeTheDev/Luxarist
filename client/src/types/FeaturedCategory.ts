/**
 * File: FeaturedCategory.ts
 * Purpose:
 *  Defines the shape of a featured product category object used throughout the frontend.
 *  Ensures type safety and consistency when fetching or displaying featured categories.
 *
 * Responsibilities:
 *  - Represent the core data of a featured category, including its unique ID, name, and slug.
 *  - Store the category’s main image (`featuredImage`) for use in UI components.
 *  - Include the number of products in the category (`productCount`).
 *  - Optionally allow a `span` property for layout or grid styling purposes.
 *
 * Usage:
 *  - Used as the return type for `useFeaturedCategories` and `fetchFeaturedCategories`.
 *  - Provides type safety when mapping categories in components like `FeaturedCollectionsSection`.
 *  - Example:
 *      const category: FeaturedCategory = {
 *          _id: "123",
 *          name: "Bracelets",
 *          slug: "bracelets",
 *          featuredImage: "/images/bracelet.jpg",
 *          productCount: 12,
 *          span: "col-span-2"
 *      };
 */

export interface FeaturedCategory {
    _id: string;
    name: string;
    slug: string;
    featuredImage: string;
    productCount: number;
    span?: string;
}