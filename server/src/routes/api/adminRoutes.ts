import { Router } from "express";
import z from "zod";
import { 
    adminGetMetrics, 
    adminGetAllProducts, 
    adminCreateProduct, 
    adminUpdateProduct, 
    adminDeleteProduct, 
    adminGetAllOrders, 
    adminUpdateOrderStatus, 
    adminGetAllReviews, 
    adminUpdateReviewApproval 
} from "../../controllers/adminController";
import { authMiddleware, adminOnly } from "../../middleware/auth";
import { validateBody } from "../../middleware/validate";

const router = Router();

// --- SCHEMAS ---

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
        carat: z.string().optional(), cut: z.string().optional(), color: z.string().optional(),
        clarity: z.string().optional(), halo: z.string().optional(), stones: z.string().optional(),
    }).optional(),
    metalSpecs: z.object({
        type: z.string().optional(), weight: z.string().optional(), finish: z.string().optional(),
        setting: z.string().optional(), width: z.string().optional(), length: z.string().optional(),
        clasp: z.string().optional(), movement: z.string().optional(), waterResistance: z.string().optional(),
        glass: z.string().optional(), strap: z.string().optional(), battery: z.string().optional(),
    }).optional(),
});

const updateProductSchema = createProductSchema.partial();
const updateOrderStatusSchema = z.object({ status: z.enum(["Pending", "Processing", "Shipped", "Delivered", "Cancelled"]) });
const updateReviewApprovalSchema = z.object({ approved: z.boolean() });

// --- ROUTES ---

/**
 * @route   GET /api/admin/metrics
 * @desc    Retrieve high-level business analytics and recent activity
 * @access  Private (Admin Only)
 */
router.get("/metrics", authMiddleware, adminOnly, adminGetMetrics);

/**
 * @route   GET /api/admin/products
 * @desc    Retrieve all products for the management ledger (including inactive)
 * @access  Private (Admin Only)
 */
router.get("/products", authMiddleware, adminOnly, adminGetAllProducts);

/**
 * @route   POST /api/admin/products
 * @desc    Initialize and publish a new luxury product to the catalog
 * @access  Private (Admin Only)
 */
router.post("/products", authMiddleware, adminOnly, validateBody(createProductSchema), adminCreateProduct);

/**
 * @route   PUT /api/admin/products/:id
 * @desc    Update specifications or availability for an existing product
 * @access  Private (Admin Only)
 */
router.put("/products/:id", authMiddleware, adminOnly, validateBody(updateProductSchema), adminUpdateProduct);

/**
 * @route   DELETE /api/admin/products/:id
 * @desc    Permanently remove a product from the database
 * @access  Private (Admin Only)
 */
router.delete("/products/:id", authMiddleware, adminOnly, adminDeleteProduct);

/**
 * @route   GET /api/admin/orders
 * @desc    Fetch the full sequence of client acquisitions
 * @access  Private (Admin Only)
 */
router.get("/orders", authMiddleware, adminOnly, adminGetAllOrders);

/**
 * @route   PUT /api/admin/orders/:id
 * @desc    Modify the fulfillment status of a specific order
 * @access  Private (Admin Only)
 */
router.put("/orders/:id", authMiddleware, adminOnly, validateBody(updateOrderStatusSchema), adminUpdateOrderStatus);

/**
 * @route   GET /api/admin/reviews
 * @desc    Retrieve all client reviews for moderation
 * @access  Private (Admin Only)
 */
router.get("/reviews", authMiddleware, adminOnly, adminGetAllReviews);

/**
 * @route   PUT /api/admin/reviews/:id
 * @desc    Toggle the public visibility (approval) of a client review
 * @access  Private (Admin Only)
 */
router.put("/reviews/:id", authMiddleware, adminOnly, validateBody(updateReviewApprovalSchema), adminUpdateReviewApproval);

export default router;