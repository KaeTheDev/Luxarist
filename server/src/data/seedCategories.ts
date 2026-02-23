import mongoose from "mongoose";
import dotenv from "dotenv";
import { Category } from "../models/Category";

dotenv.config();

const categories = [
    {
        name: "Earrings",
        slug: "earrings",
        featuredImage: "https://ik.imagekit.io/gwbd4eva2026/collections/earrings.png",
        isFeatured: true
    },

    {
        name: "Necklace",
        slug: "necklace",
        featuredImage: "https://ik.imagekit.io/gwbd4eva2026/collections/necklaces.png",
        isFeatured: true
    },
    {
        name: "Bracelet",
        slug: "bracelet",
        featuredImage: "https://ik.imagekit.io/gwbd4eva2026/collections/bracelets.png",
        isFeatured: true
    },
    {
        name: "Watch",
        slug: "watch",
        featuredImage: "https://ik.imagekit.io/gwbd4eva2026/collections/watches.png",
        isFeatured: true
    },
    {
        name: "Ring",
        slug: "ring",
        featuredImage: "https://ik.imagekit.io/gwbd4eva2026/collections/rings.png",
        isFeatured: true
    },
];

export async function seedCategories() {
    await mongoose.connect(process.env.MONGO_URI!);
    await Category.deleteMany();
    await Category.insertMany(categories);
    console.log("✅ Categories seeded");
}