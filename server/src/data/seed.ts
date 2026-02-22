import mongoose from "mongoose";
import dotenv from "dotenv";
import { seedCategories } from "./seedCategories";
import { seedProducts } from "./seedProducts";
import { syncCategoryCounts } from "./syncCategoryCounts";

dotenv.config();

async function seedAll() {
    try {
        await mongoose.connect(process.env.MONGO_URI!);

        console.log("🌱 Seeding categories...");
        await seedCategories();

        console.log("🌱 Seeding products...");
        await seedProducts();

        console.log("🔢 Syncing category counts...");
        await syncCategoryCounts();

        console.log("✅ All data seeded successfully");
        process.exit(0);
        
    } catch(error) {
        console.error("❌ Seeding failed: ", error);
        process.exit(1);
    }
}

seedAll();