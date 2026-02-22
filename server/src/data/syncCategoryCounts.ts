/**
 * File: syncCategoryCounts.ts
 * Purpose: Synchronize and update cached product counts for each category.
 *
 * Responsibilities:
 *  - Iterate through all Category documents
 *  - Count active products associated with each category
 *  - Update and persist the productCount field
 *  - Ensure category metadata reflects accurate product totals
 *
 * Why This Exists:
 *  - Avoids recalculating product counts on every frontend request
 *  - Improves performance for category listing pages
 *  - Keeps category-level summary data denormalized and efficient
 *
 * Usage:
 *  - Can be called after seed scripts
 *  - Can be triggered after product creation/update/deletion
 *  - Suitable for scheduled jobs or admin maintenance tasks
 *
 * Notes:
 *  - Only counts products with status: "active"
 *  - Uses MongoDB countDocuments for accuracy
 */

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