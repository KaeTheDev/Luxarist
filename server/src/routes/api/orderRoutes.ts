import { Router } from "express";
import { getAllOrdersAdmin, getOrderById, updateOrderStatus } from "../../controllers/orderController";
import { authMiddleware, adminOnly } from "../../middleware/auth";

const router = Router();

// Apply Admin Lock to ALL routes in this file
router.use(authMiddleware);
router.use(adminOnly);

router.get("/", getAllOrdersAdmin);         // GET /api/admin/orders
router.get("/:id", getOrderById);           // GET /api/admin/orders/:id
router.put("/:id", updateOrderStatus);       // PUT /api/admin/orders/:id

export default router;