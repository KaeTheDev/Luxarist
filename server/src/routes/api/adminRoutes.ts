import { Router } from "express";
import { authMiddleware, adminOnly } from "../../middleware/auth";
import { validateBody } from "../../middleware/validate";
import { z } from "zod";

import adminOrderRoutes from "./admin/order.routes";

import { adminGetAllProducts, adminCreateProduct, adminUpdateProduct, adminDeleteProduct, adminGetAllCustomers, adminGetAllReviews, adminUpdateReviewApproval, adminGetMetrics } from "../../controllers/adminController";

const router = Router();

// --- SCHEMAS ---
const createProductSchema = z.object({
  name: z.string().min(1),
  subtitle: z.string().min(1),
  category: z.string().min(1),
  price: z.number().positive(),
  status: z.enum(["active", "inactive"]).default("active"),
  primaryImageUrl: z.string().min(1),
  galleryImageUrls: z.array(z.string()).default([]),
  sizes: z.array(z.string()).default([]),
  material: z.string().min(1),
  gemstoneType: z.string().min(1),
  weightPreset: z.string().min(1),
  style: z.string().min(1),
  description: z.string().min(1),
  careTemplateKey: z.string().min(1),
  specsFromAttributes: z.boolean().default(true),
  sku: z.string().min(1),
  slug: z.string().optional(),
  diamondSpecs: z.object({
    carat: z.string().optional(),
    cut: z.string().optional(),
    color: z.string().optional(),
    clarity: z.string().optional(),
    halo: z.string().optional(),
    stones: z.string().optional()
  }).optional(),
  metalSpecs: z.object({
    type: z.string().optional(),
    weight: z.string().optional(),
    finish: z.string().optional(),
    setting: z.string().optional(),
    width: z.string().optional(),
    length: z.string().optional(),
    clasp: z.string().optional(),
    movement: z.string().optional(),
    waterResistance: z.string().optional(),
    glass: z.string().optional(),
    strap: z.string().optional(),
    battery: z.string().optional()
  }).optional()
});

const updateProductSchema = createProductSchema.partial();
const updateReviewApprovalSchema = z.object({ approved: z.boolean() });

// ==========================================
// 1. ORDERS (NESTED ROUTING)
// ==========================================
// This one line replaces all previous /orders routes in this file.
// It maps everything to /api/admin/orders/...
router.use("/orders", adminOrderRoutes);

// ==========================================
// 2. METRICS
// ==========================================
router.get("/metrics", authMiddleware, adminOnly, adminGetMetrics);

// ==========================================
// 3. PRODUCTS CRUD
// ==========================================
router.get("/products", authMiddleware, adminOnly, adminGetAllProducts);
router.post("/products", authMiddleware, adminOnly, validateBody(createProductSchema), adminCreateProduct);
router.put("/products/:id", authMiddleware, adminOnly, validateBody(updateProductSchema), adminUpdateProduct);
router.delete("/products/:id", authMiddleware, adminOnly, adminDeleteProduct);

// ==========================================
// 4. CUSTOMERS & REVIEWS
// ==========================================
router.get("/customers", authMiddleware, adminOnly, adminGetAllCustomers);

router.get("/reviews", authMiddleware, adminOnly, adminGetAllReviews);
router.put("/reviews/:id", authMiddleware, adminOnly, validateBody(updateReviewApprovalSchema), adminUpdateReviewApproval);

export default router;