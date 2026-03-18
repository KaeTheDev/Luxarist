import { Router } from "express";
import { getMyOrders } from "../../controllers/orderController";
import { authMiddleware } from "../../middleware/auth";

const router = Router();

/**
 * @route   GET /api/orders/:customerId
 * @desc    Fetch all orders for a specific customer
 * @access  Private (Self or Admin only)
 */

// Use 'authMiddleware' specifically 
router.get("/:customerId", authMiddleware, getMyOrders);

export default router;