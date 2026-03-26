import { Router } from "express";
import { getMyOrders } from "../../controllers/orderController";
import { authMiddleware } from "../../middleware/auth";

const router = Router();

// CLIENT SIDE: Get orders for a customer
router.get("/customer/:customerId", authMiddleware, getMyOrders);

export default router;