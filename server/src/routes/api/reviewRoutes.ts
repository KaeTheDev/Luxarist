import { Router } from "express";
import {
  createReview,
  getApprovedReviewsByProduct,
  getMyReviews,
  updateReview,
  deleteReview,
  getPendingReviews,
  approveReview,
} from "../../controllers/reviewController";
import { authMiddleware } from "../../middleware/auth";

const router = Router();

// ── Public ────────────────────────────────────────────────────────────────────
// GET /api/reviews/product/:productId  → approved reviews for a product page
router.get("/product/:productId", getApprovedReviewsByProduct);

// ── Authenticated (Customer) ──────────────────────────────────────────────────
// POST   /api/reviews                  → submit a new review
router.post("/", authMiddleware, createReview);

// GET    /api/reviews/customer/:userId → all reviews by a customer
router.get("/customer/:userId", authMiddleware, getMyReviews);

// PUT    /api/reviews/:reviewId        → edit own review
router.put("/:reviewId", authMiddleware, updateReview);

// DELETE /api/reviews/:reviewId        → delete own review
router.delete("/:reviewId", authMiddleware, deleteReview);

// ── Admin ─────────────────────────────────────────────────────────────────────
// GET   /api/reviews/pending              → moderation queue
router.get("/pending", authMiddleware, getPendingReviews);

// PATCH /api/reviews/:reviewId/approve    → approve a review
router.patch("/:reviewId/approve", authMiddleware, approveReview);

export default router;