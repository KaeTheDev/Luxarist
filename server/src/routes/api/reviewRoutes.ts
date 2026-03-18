import { Router } from "express";
import { getMyReviews } from "../../controllers/reviewController";
import { authMiddleware } from "../../middleware/auth";

const router = Router();

/**
 * @route   GET /api/reviews/:userId
 * @desc    Fetch all reviews for a specific customer
 * @access  Private (Self or Admin only)
 */

// Use 'authMiddleware' specifically 
router.get("/:userId", authMiddleware, getMyReviews);

export default router;