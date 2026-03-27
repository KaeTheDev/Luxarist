import { Router } from "express";
import { getAllOrdersAdmin, getOrderById, updateOrderStatus } from "../../../controllers/orderController";
import { authMiddleware, adminOnly } from "../../../middleware/auth";

const router = Router();

// Apply security to all admin order routes
router.use(authMiddleware);
router.use(adminOnly);

// Paths relative to /api/admin/orders
router.get("/", getAllOrdersAdmin);    // GET /api/admin/orders/
router.get("/:id", getOrderById);      // GET /api/admin/orders/:id
router.put("/:id", updateOrderStatus);  // PUT /api/admin/orders/:id

export default router;