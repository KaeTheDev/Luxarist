/**
 * File: categoryController.ts
 * Purpose: Handle HTTP requests related to product categories.
 *
 * Responsibilities:
 *  - Process incoming API requests for category data
 *  - Interact with the Category model to query the database
 *  - Return structured JSON responses with appropriate HTTP status codes
 *  - Handle and respond to server errors gracefully
 *
 * Endpoints Handled:
 *  - GET /api/categories
 *      → Returns all categories sorted by most recently created
 *
 *  - GET /api/categories/featured
 *      → Returns categories marked as featured
 *
 *  - GET /api/categories/:slug
 *      → Returns a single category by its unique slug
 *      → Responds with 404 if no category is found
 *
 * Usage:
 *  - Imported and attached to Express routes in categoryRoutes.ts
 *  - Called by the frontend to retrieve category data
 *  - Relies on the Category Mongoose model for database operations
 *
 * Error Handling:
 *  - Returns 500 for unexpected server/database failures
 *  - Returns 404 when a requested category does not exist
 */

import { Request, Response } from "express";
import { Category } from "../models/Category";

// GET /api/categories
export async function getAllCategories(req: Request, res: Response) {
    try {
        const categories = await Category.find().sort({ createdAt: -1 });

        res.status(200).json(categories);
    } catch(error) {
        res.status(500).json({ message: "Failed to fetch categories" });
    }
}

// GET /api/categories/featured
export async function getFeaturedCategories(req: Request, res: Response) {
    try {
        const categories = await Category.find({ isFeatured: true });

        res.status(200).json(categories);
    } catch(error) {
        res.status(500).json({ message: "Failed to fetch featured categories" });
    }
}

// GET /api/categories/:slug
export async function getCategoryBySlug(req:Request<{ slug: string }>, res: Response) {
    try {
        const { slug } = req.params;

        const category = await Category.findOne({ slug });

        if(!category) {
            return res.status(404).json({ message: "Category not found" });
        }
        res.status(200).json(category);
    } catch(error) {
        res.status(500).json({ message: "Failed to fetch category" });
    }
}