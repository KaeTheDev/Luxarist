import { Router } from "express";
import { getMyOrders, verifyPurchase } from "../../controllers/orderController";
import { authMiddleware } from "../../middleware/auth";

const router = Router();

router.get("/customer/:customerId", authMiddleware, getMyOrders);
router.get("/verify-purchase/:productId", authMiddleware, verifyPurchase);

export default router;