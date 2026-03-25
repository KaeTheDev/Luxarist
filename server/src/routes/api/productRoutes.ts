/**
 * Product Routes
 *
 * Defines public API endpoints for retrieving product data.
 * These routes are accessible without authentication and are
 * intended for storefront and catalog consumption.
 *
 * Responsibilities:
 * - Expose product-related endpoints
 * - Delegate business logic to product controllers
 * - Keep routing concerns separate from data access logic
 */

import { Router } from "express";
import { getActiveProduct, getActiveProducts, getProductBySlug, getProductsByCategory, getAllProductsAdmin, createProduct, updateProduct, deleteProduct } from "../../controllers/productController";

const router = Router();

// Public GET all products
router.get("/", getActiveProducts);

// Public GET a specific category
router.get("/category/:category", getProductsByCategory);

// Public GET one product by slug
router.get("/slug/:slug", getProductBySlug);

// Public GET one product
router.get("/:id", getActiveProduct);

/**
 * --- ADMIN ROUTES (Admin Dashboard) ---
 * Logic: Full CRUD access. In production, wrap these in 'isAdmin' middleware.
 */
router.get("/admin/all", getAllProductsAdmin); // Admin needs to see inactive items too
router.post("/admin/create", createProduct);
router.put("/admin/:id", updateProduct);
router.delete("/admin/:id", deleteProduct);

export default router;