/**
 * File: categoryRoutes.ts
 * Purpose: Define and register all HTTP routes related to product categories.
 *
 * Responsibilities:
 *  - Map URL paths to their corresponding controller functions
 *  - Organize category-related endpoints under a single router instance
 *  - Keep routing logic separate from business logic (controller layer)
 *
 * Mounted Base Path:
 *  - /api/categories
 *
 * Routes:
 *  - GET /
 *      → Fetch all categories
 *
 *  - GET /featured
 *      → Fetch only featured categories
 *
 *  - GET /:slug
 *      → Fetch a single category by slug
 *
 * Usage:
 *  - Imported and mounted in app.ts
 *      app.use("/api/categories", categoryRoutes);
 *  - Delegates request handling to categoryController functions
 */

import { Router } from "express";
import { getAllCategories, getFeaturedCategories, getCategoryBySlug } from "../../controllers/categoryController";

const router = Router();

router.get("/", getAllCategories);
router.get("/featured", getFeaturedCategories);
router.get("/:slug", getCategoryBySlug);

export default router;