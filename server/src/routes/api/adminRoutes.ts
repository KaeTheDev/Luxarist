import { Router } from "express";
import z from "zod";
import { getAdminMetrics, createProduct, updateProduct, deleteProduct } from "../../controllers/adminController";
import { authMiddleware, adminOnly } from "../../middleware/auth";
import { validateBody } from "../../middleware/validate";

const router = Router();

const createProductSchema = z.object({
    name: z.string().min(1, "Name is required"),
    subtitle: z.string().min(1, "Subtitle is required"),
    category: z.string().min(1, "Category is required"),
    price: z.number({ error: "Price is required" }).positive(),
    status: z.enum(["active", "inactive"]).default("active"),
    isNewArrival: z.boolean().default(false),
    primaryImageUrl: z.string().min(1, "Primary image is required"),
    galleryImageUrls: z.array(z.string()).default([]),
    sizes: z.array(z.string()).default([]),
    material: z.string().min(1, "Material is required"),
    gemstoneType: z.string().min(1, "Gemstone type is required"),
    weightPreset: z.string().min(1, "Weight preset is required"),
    style: z.string().min(1, "Style is required"),
    description: z.string().min(1, "Description is required"),
    careTemplateKey: z.string().min(1, "Care template key is required"),
    specsFromAttributes: z.boolean().default(true),
    sku: z.string().min(1, "SKU is required"),
    slug: z.string().optional(),
    diamondSpecs: z.object({
        carat: z.string().optional(),
        cut: z.string().optional(),
        color: z.string().optional(),
        clarity: z.string().optional(),
        halo: z.string().optional(),
        stones: z.string().optional(),
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
        battery: z.string().optional(),
    }).optional(),
});

// reuse createProductSchema but make all fields optional for partial updates
const updateProductSchema = createProductSchema.partial();

/**
 * @route   GET /api/admin/metrics
 * @desc    Get admin dashboard metrics
 * @access  Private (Admin only)
 */

router.get("/metrics", authMiddleware, adminOnly, getAdminMetrics);

/**
 * @route   POST /api/admin/products
 * @desc    Post products to dashboard
 * @access  Private (Admin only)
 */

router.post("/products", authMiddleware, adminOnly, validateBody(createProductSchema), createProduct);

/**
 * @route   PUT api/admin/products/:id
 * @desc    Update products to dashboard
 * @access  Private (Admin only)
 */

router.put("/products/:id", authMiddleware, adminOnly, validateBody(updateProductSchema), updateProduct);

/**
 * @route   DELETE api/admin/products/:id
 * @desc    Delete products from dashboard
 * @access  Private (Admin only)
 */
router.delete("/products/:id", authMiddleware, adminOnly, deleteProduct);

export default router;