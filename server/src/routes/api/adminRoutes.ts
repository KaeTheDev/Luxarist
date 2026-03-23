import { Router } from "express";
import { getAdminMetrics } from "../../controllers/adminController";
import { authMiddleware, adminOnly } from "../../middleware/auth";

const router = Router();

/**
 * @route   GET /api/admin/metrics
 * @desc    Get admin dashboard metrics
 * @access  Private (Admin only)
 */

router.get("/metrics", authMiddleware, adminOnly, getAdminMetrics);

export default router;