/**
 * File: SiteContent.ts
 * Purpose: Defines the SiteContent model for storing editable homepage content.
 * Uses a singleton pattern — only one document ever exists, identified by key "main".
 *
 * Responsibilities:
 * - Store hero section: video URL, fallback image, heading, body text, CTA text and link.
 * - Store signature section: product reference, custom image, heading, subheading,
 *   body text, and CTA button text.
 */

import { Schema, model, Document, Types } from "mongoose";
 
export interface IHeroContent {
  videoUrl: string;
  fallbackImageUrl: string;
  heading: string;
  bodyText: string;
  ctaText: string;
  ctaLink: string;
}
 
export interface ISignatureContent {
  productId: Types.ObjectId | null;
  customImageUrl: string;
  heading: string;
  subheading: string;
  bodyText: string;
  ctaText: string;
}
 
export interface ISiteContent extends Document {
  key: string; // always "main"
  hero: IHeroContent;
  signature: ISignatureContent;
  updatedAt: Date;
}
 
const heroSchema = new Schema<IHeroContent>({
  videoUrl:         { type: String, default: "https://ik.imagekit.io/gwbd4eva2026/hero.mp4" },
  fallbackImageUrl: { type: String, default: "https://ik.imagekit.io/gwbd4eva2026/hero/hero.png" },
  heading:          { type: String, default: "Luxury in Every Detail" },
  bodyText:         { type: String, default: "Discover refinement across every piece in our exclusive collection." },
  ctaText:          { type: String, default: "Shop the Collection" },
  ctaLink:          { type: String, default: "/collections" },
}, { _id: false });
 
const signatureSchema = new Schema<ISignatureContent>({
  productId:      { type: Schema.Types.ObjectId, ref: "Product", default: null },
  customImageUrl: { type: String, default: "https://ik.imagekit.io/gwbd4eva2026/misc/signature.png" },
  heading:        { type: String, default: "The Necklace That Defines the Brand" },
  subheading:     { type: String, default: "Luxury Necklace" },
  bodyText:       { type: String, default: "Experience timeless elegance and unmatched craftsmanship, designed to elevate every moment." },
  ctaText:        { type: String, default: "View Necklace" },
}, { _id: false });
 
const siteContentSchema = new Schema<ISiteContent>({
  key:       { type: String, required: true, unique: true, default: "main" },
  hero:      { type: heroSchema, default: () => ({}) },
  signature: { type: signatureSchema, default: () => ({}) },
}, { timestamps: true });
 
export const SiteContent = model<ISiteContent>("SiteContent", siteContentSchema);