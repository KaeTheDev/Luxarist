import { Router } from "express";
import { 
  getCustomerOrders, 
  getCustomerOrderById, 
  getAllOrdersAdmin, 
  getOrderById, 
  updateOrderStatus 
} from "../../controllers/orderController";
import { authMiddleware, adminOnly } from "../../middleware/auth";

const router = Router();

/**
 * 1. SHARED/CUSTOMER ROUTES
 * These only require a valid login (authMiddleware).
 * The controller handles checking if the user owns the specific order.
 */

// Matches: GET /api/orders/customer/:customerId
router.get("/customer/:customerId", authMiddleware, getCustomerOrders);

// Matches: GET /api/orders/:id (General view for customer to see 1 order)
router.get("/:id", authMiddleware, getCustomerOrderById);


/**
 * 2. ADMINISTRATIVE ROUTES
 * These require BOTH a valid login AND the admin role.
 * We add 'adminOnly' here to keep customers out of the "Management Suite."
 */

// Matches: GET /api/orders/admin/all
router.get("/admin/all", authMiddleware, adminOnly, getAllOrdersAdmin);

// Matches: GET /api/orders/admin/:id
router.get("/admin/:id", authMiddleware, adminOnly, getOrderById);

// Matches: PUT /api/orders/admin/:id (The update status logic we fixed earlier)
router.put("/admin/:id", authMiddleware, adminOnly, updateOrderStatus);

export default router;