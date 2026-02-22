import { Category } from "../models/Category";
import { Product } from "../models/Product";

export async function syncCategoryCounts() {
    const categories = await Category.find();

    for(const category of categories) {
        const count = await Product.countDocuments({
            category: category._id,
            status: "active"
        });

        category.productCount = count;
        await category.save();
    }
    console.log("🔢 Category product counts synced");
}