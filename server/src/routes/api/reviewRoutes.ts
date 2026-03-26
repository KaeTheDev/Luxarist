import { Router } from "express";
import { getMyReviews, updateReview } from "../../controllers/reviewController";
import { authMiddleware } from "../../middleware/auth";

const router = Router();

/**
 * @route   GET /api/reviews/:userId
 * @desc    Fetch all reviews for a specific customer
 * @access  Private (Self or Admin only)
 */

// Use 'authMiddleware' specifically 
router.get("/customer/:userId", authMiddleware, getMyReviews);

router.put("/:reviewId", authMiddleware, updateReview);

export default router;