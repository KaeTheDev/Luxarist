import { Router } from "express";
import { getMyOrders, getAllOrdersAdmin, updateOrderStatus } from "../../controllers/orderController";
import { authMiddleware, adminOnly } from "../../middleware/auth";

const router = Router();

/**
 * CLIENT SIDE
 * GET /api/orders/customer/:customerId
 */
router.get("/customer/:customerId", authMiddleware, getMyOrders);

/**
 * ADMIN SIDE
 * These routes use both authMiddleware (to identify the user) 
 * and adminOnly (to verify their role).
 */

// Matches: fetch("/api/orders/admin/all")
router.get("/admin/all", authMiddleware, adminOnly, getAllOrdersAdmin);

// Matches: fetch(`/api/orders/admin/${id}`, { method: "PUT", ... })
router.put("/admin/:id", authMiddleware, adminOnly, updateOrderStatus);

export default router;