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
import { getActiveProduct, getActiveProducts, getProductsByCategory } from "../../controllers/productController";

const router = Router();

// Public GET all products
router.get("/", getActiveProducts);

// Public GET a specific category
router.get("/category/:category", getProductsByCategory);

// Public GET one product
router.get("/:id", getActiveProduct);

export default router;