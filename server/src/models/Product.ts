/**
 * File: Product.ts
 * Purpose:
 *   Defines the Product data model for the Luxarist e-commerce application.
 *
 * Responsibilities:
 *   - Define the shape of a Product using a TypeScript interface for type safety
 *   - Enforce product data structure and constraints at the database level
 *     using a Mongoose schema
 *   - Validate controlled fields such as category and status via enums
 *   - Automatically manage createdAt and updatedAt timestamps
 *   - Generate a URL-friendly slug for products when not explicitly provided
 *
 * Usage:
 *   - Imported by controllers and services that create, read, update, or delete products
 *   - Used in product-related API routes (catalog, product detail pages, admin tools)
 *   - Supports population and relationships with other models (e.g., Orders, Reviews)
 */

import { Schema, model, Types } from "mongoose";

export interface IProduct {
    name: string;
    subtitle: string;
    category: Types.ObjectId;
    price: number; // store as a number for calculations
    isNew: boolean; // Used for filtering
    status: 'active' | 'inactive';

    primaryImageUrl: string;
    galleryImageUrls: string[];

    sizes: string[];
    material: string;
    gemstoneType: string;
    weightPreset: string;
    style: string;

    description: string;
    careTemplateKey: string;
    specsFromAttributes: boolean;

    sku: string;
    slug: string;

    createdAt: Date;
    updatedAt: Date;
}

const productSchema = new Schema<IProduct> (
    {
        name: { type: String, required: true },
        subtitle: { type: String, required: true },
        category: {
            type: Schema.Types.ObjectId,
            ref: "Category",
            required: true,
        },
        price: { type: Number, required: true },
        isNew: { type: Boolean, default: false },
        status: { type: String, required: true, enum: ['active', 'inactive'], default: 'active' },

        primaryImageUrl: { type: String, required: true },
        galleryImageUrls: { type: [String], default: [] },

        sizes: { type: [String], default: [] },
        material: { type: String, required: true },
        gemstoneType: { type: String, required: true },
        weightPreset: { type: String, required: true },
        style: { type: String, required: true },

        description: { type: String, required: true },
        careTemplateKey: { type: String, required: true },
        specsFromAttributes: { type: Boolean, default: true },

        sku: { type: String, required: true, unique: true },
        slug: { type: String, required: true, unique: true },
    },
    {
        timestamps: true, // automatically adds createdAt & updatedAt
    }
);

// Pre-Save hook to auto-generate slug from name if not provided
productSchema.pre('save', function () {
    if (!this.slug) {
        this.slug = this.name.toLowerCase().replace(/\s+/g, '-');
    }
});

// Optional index for faster category queries
productSchema.index({ category: 1 });

// Mongoose Model - typed constructor that gets imported elsewhere
export const Product = model<IProduct>('Product', productSchema);