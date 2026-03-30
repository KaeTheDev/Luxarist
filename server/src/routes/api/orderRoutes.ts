import { Router } from "express";
import { getMyOrders, verifyPurchase, createOrder } from "../../controllers/orderController";
import { authMiddleware } from "../../middleware/auth";
 
const router = Router();
 
// POST /api/orders — create a new order (authenticated customers only)
router.post("/", authMiddleware, createOrder);
 
// GET /api/orders/customer/:customerId — fetch a customer's order history
router.get("/customer/:customerId", authMiddleware, getMyOrders);
 
// GET /api/orders/verify-purchase/:productId — Verified Acquisition check
router.get("/verify-purchase/:productId", authMiddleware, verifyPurchase);
 
export default router;