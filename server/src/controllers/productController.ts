/**
 * File: controllers/productController.ts
 * Purpose:
 *   Handle product-related API logic for the Luxarist store.
 *   This controller fetches all active products for public viewing.
 *
 * Responsibilities:
 *   - Query the database for products with status 'active'
 *   - Optionally filter or paginate results (extendable)
 *   - Return products as JSON
 *   - Handle errors gracefully
 */

import { Request, Response } from "express";
import { Product } from "../models/Product";

// GET /products
export const getActiveProducts = async (req: Request, res: Response) => {
    try {
         // Step 1: Extract Inputs
         const { category, limit, skip } = req.query;

        // Step 2: Validate Inputs (optional)
        const allowedCategories = 
        ['ring', 'bracelet', 'watch', 'necklace', 'earrings'];
        if(category && !allowedCategories.includes(category as string)) {
            return res.status(400).json({ message: 'Invalid category filter' });
        }

        // Step 3: Fetch Primary Resource
        const query: any = { status: 'active' };
        if(category) query.category = category;

        const products = await Product.find(query)
        .limit(limit ? Number(limit): 0)
        .skip(skip ? Number(skip): 0)
        .sort({ createdAt: -1 }); // newest first

        // Step 4: Authorize
        // Not required for public products

        // Step 5: Perform Action
        // Already done: fetching products and applying optional filters

        // Step 6: Respond
        res.status(200).json(products);
    } catch (error: any) {
        // Step 7: Catch & Fail Safely
        console.error(error);
        res.status(500).json({ message: 'Server error fetching products' });
    }
}