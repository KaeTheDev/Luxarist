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
import { getActiveProducts } from "../../controllers/productController";

const router = Router();

// Public GET all products
router.get("/", getActiveProducts);

export default router;