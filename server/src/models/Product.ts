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

interface IMetalSpecs {
  type?: string;
  weight?: string;
  finish?: string;
  setting?: string;
  width?: string;
  length?: string;
  clasp?: string;
  movement?: string;
  waterResistance?: string;
  glass?: string;
  strap?: string;
  battery?: string;
}

interface IDiamondSpecs {
  carat?: string;
  cut?: string;
  color?: string;
  clarity?: string;
  halo?: string;
  stones?: string;
}

export interface IProduct {
  name: string;
  subtitle: string;
  category: Types.ObjectId;
  price: number;
  isNewArrival: boolean;
  status: 'active' | 'inactive';
  diamondSpecs?: IDiamondSpecs;
  metalSpecs?: IMetalSpecs;
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

const productSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true },
    subtitle: { type: String, required: true },
    category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
    price: { type: Number, required: true },
    isNewArrival: { type: Boolean, default: false },
    status: { type: String, required: true, enum: ['active', 'inactive'], default: 'active' },
    diamondSpecs: {
      type: new Schema<IDiamondSpecs>({
        carat:   { type: String },
        cut:     { type: String },
        color:   { type: String },
        clarity: { type: String },
        halo:    { type: String },
        stones:  { type: String },
      }, { _id: false }),
      required: false,
    },
    metalSpecs: {
      type: new Schema<IMetalSpecs>({
        type:             { type: String },
        weight:           { type: String },
        finish:           { type: String },
        setting:          { type: String },
        width:            { type: String },
        length:           { type: String },
        clasp:            { type: String },
        movement:         { type: String },
        waterResistance:  { type: String },
        glass:            { type: String },
        strap:            { type: String },
        battery:          { type: String },
      }, { _id: false }),
      required: false,
    },
    primaryImageUrl:    { type: String, required: true },
    galleryImageUrls:   { type: [String], default: [] },
    sizes:              { type: [String], default: [] },
    material:           { type: String, required: true },
    gemstoneType:       { type: String, required: true },
    weightPreset:       { type: String, required: true },
    style:              { type: String, required: true },
    description:        { type: String, required: true },
    careTemplateKey:    { type: String, required: true },
    specsFromAttributes:{ type: Boolean, default: true },
    sku:                { type: String, required: true, unique: true },
    slug:               { type: String, unique: true },
  },
  { timestamps: true }
);

productSchema.pre('save', function () {
  if (!this.slug) {
    this.slug = this.name.toLowerCase().replace(/\s+/g, '-');
  }
});

productSchema.index({ category: 1 });

export const Product = model<IProduct>('Product', productSchema);