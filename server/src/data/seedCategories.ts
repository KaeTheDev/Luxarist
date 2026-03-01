import mongoose from "mongoose";
import dotenv from "dotenv";
import { Category } from "../models/Category";

dotenv.config();

const categories = [
    {
        name: "Earrings",
        slug: "earrings",
        featuredImage: "https://ik.imagekit.io/gwbd4eva2026/collections/earrings.png",
        heroImage: "https://ik.imagekit.io/gwbd4eva2026/earrings-hero.png",
        description: "Designed to frame the face and command attention. From delicate studs to statement drops, each pair is crafted to elevate every look.",
        isFeatured: true
    },

    {
        name: "Necklace",
        slug: "necklace",
        featuredImage: "https://ik.imagekit.io/gwbd4eva2026/collections/necklaces.png",
        heroImage: "https://ik.imagekit.io/gwbd4eva2026/necklaces-hero.png",
        description: "Layered or worn alone, our necklaces are made to define the neckline with effortless sophistication and timeless shine.",
        isFeatured: true
    },
    {
        name: "Bracelet",
        slug: "bracelet",
        featuredImage: "https://ik.imagekit.io/gwbd4eva2026/collections/bracelets.png",
        heroImage: "https://ik.imagekit.io/gwbd4eva2026/bracelets-hero.png",
        description: "Refined accents that move with you. Subtle, bold, and endlessly stackable.",
        isFeatured: true
    },
    {
        name: "Watch",
        slug: "watch",
        featuredImage: "https://ik.imagekit.io/gwbd4eva2026/collections/watches.png",
        heroImage: "https://ik.imagekit.io/gwbd4eva2026/watches-hero.png",
        description: "Precision meets presence. Timepieces crafted for those who move with purpose and style.",
        isFeatured: true
    },
    {
        name: "Ring",
        slug: "ring",
        featuredImage: "https://ik.imagekit.io/gwbd4eva2026/collections/rings.png",
        heroImage: "https://ik.imagekit.io/gwbd4eva2026/rings-hero.png",
        description: "From minimal bands to bold statements, each ring is designed to leave a lasting impression.",
        isFeatured: true
    },
];

export async function seedCategories() {
    await mongoose.connect(process.env.MONGO_URI!);
    await Category.deleteMany();
    await Category.insertMany(categories);
    console.log("✅ Categories seeded");
}