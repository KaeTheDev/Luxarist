import mongoose from "mongoose";
import dotenv from "dotenv";
import { Category } from "../models/Category";

dotenv.config();

const categories = [
    {
        name: "Earrings",
        slug: "earrings",
        featuredImage: "https://ik.imagekit.io/gwbd4eva2026/collections/earrings.png"
    },

    {
        name: "Necklace",
        slug: "necklace",
        featuredImage: "https://ik.imagekit.io/gwbd4eva2026/collections/necklaces.png"
    },
    {
        name: "Bracelet",
        slug: "bracelet",
        featuredImage: "https://ik.imagekit.io/gwbd4eva2026/collections/bracelets.png"
    },
    {
        name: "Watch",
        slug: "watch",
        featuredImage: "https://ik.imagekit.io/gwbd4eva2026/collections/watches.png"
    },
    {
        name: "Ring",
        slug: "ring",
        featuredImage: "https://ik.imagekit.io/gwbd4eva2026/collections/rings.png"
    },
];

export async function seedCategories() {
    await mongoose.connect(process.env.MONGO_URI!);
    await Category.deleteMany();
    await Category.insertMany(categories);
    console.log("✅ Categories seeded");
}