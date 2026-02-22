/**
 * File: Category.ts
 * Purpose: Define the Mongoose schema and model for product categories.
 *
 * Responsibilities:
 *  - Define the structure and validation rules for Category documents
 *  - Enforce required fields and uniqueness constraints (e.g., slug)
 *  - Configure default values for optional properties
 *  - Add indexes to optimize common queries
 *  - Export a strongly-typed Mongoose model for use in controllers and services
 *
 * Data Model Overview:
 *  - name: Display name of the category (required)
 *  - slug: URL-friendly unique identifier (required, unique)
 *  - featuredImage: Image URL used for category banners/cards (required)
 *  - isFeatured: Flag to highlight category in featured sections (default: false)
 *  - productCount: Cached count of products in this category (default: 0)
 *
 * Usage:
 *  - Imported into controllers to perform CRUD operations
 *  - Queried by slug for SEO-friendly routes (e.g., /categories/:slug)
 *  - Used by seed scripts to populate initial category data
 */

import { Schema, model } from "mongoose";

export interface ICategory {
    name: string;
    slug: string;
    featuredImage: string;
    isFeatured: boolean;
    productCount: number;
}

const categorySchema = new Schema<ICategory> (
    {
        name: { type: String, required: true },
        slug: { type: String, required: true, unique: true },
        featuredImage: { type: String, required: true },
        isFeatured: { type: Boolean, default: false },
        productCount: { type: Number, default: 0 }
    },
    {
        timestamps: true,
    }
);

// Optional index for faster category queries
categorySchema.index({ slug: 1, isFeatured: 1 });

// Mongoose Model - typed constructor that gets imported elsewhere
export const Category = model<ICategory>('Category', categorySchema);