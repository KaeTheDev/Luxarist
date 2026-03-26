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
import { 
  getActiveProduct, 
  getActiveProducts, 
  getProductBySlug, 
  getProductsByCategory 
} from "../../controllers/productController";

const router = Router();

// --- PUBLIC STOREFRONT ROUTES ---
router.get("/", getActiveProducts); // GET /api/products
router.get("/slug/:slug", getProductBySlug); // GET /api/products/slug/:slug
router.get("/category/:category", getProductsByCategory); // GET /api/products/category/:category
router.get("/:id", getActiveProduct); // GET /api/products/:id

export default router;