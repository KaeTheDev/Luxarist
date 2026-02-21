import { Schema, model } from "mongoose";

export interface ICategory {
    name: string;
    slug: string;
    featuredImage: string;
}

const categorySchema = new Schema<ICategory> (
    {
        name: { type: String, required: true },
        slug: { type: String, required: true, unique: true },
        featuredImage: { type: String, required: true }
    },
    {
        timestamps: true,
    }
);

// Optional index for faster category queries
categorySchema.index({ slug: 1 });

// Mongoose Model - typed constructor that gets imported elsewhere
export const Category = model<ICategory>('Category', categorySchema);