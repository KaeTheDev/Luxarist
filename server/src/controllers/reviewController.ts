import { Response } from "express";
import { AuthRequest } from "../types/auth";
import * as reviewService from "../services/reviewService";

// ─────────────────────────────────────────────────────────────────────────────
// Shared error handler — reads statusCode attached to service errors
// ─────────────────────────────────────────────────────────────────────────────
function handleError(res: Response, error: any) {
  const status = error?.statusCode ?? 500;
  const message = error?.message ?? "An unexpected error occurred.";
  return res.status(status).json({ message });
}

// ─────────────────────────────────────────────────────────────────────────────
// Client controllers
// ─────────────────────────────────────────────────────────────────────────────

// POST /api/reviews
export async function createReview(req: AuthRequest, res: Response) {
  try {
    const review = await reviewService.createReview({
      productId: req.body.productId,
      customerId: req.user!.id,
      customerName: req.body.customerName,  // client must send this — user token only carries id + role
      rating: Number(req.body.rating),
      title: req.body.title,
      comment: req.body.comment,
    });
    return res.status(201).json({
      message: "Review submitted and is pending approval.",
      review,
    });
  } catch (error: any) {
    // Mongoose unique index violation
    if (error.code === 11000) {
      return res.status(409).json({ message: "You have already reviewed this product." });
    }
    return handleError(res, error);
  }
}

// GET /api/reviews/product/:productId
export async function getApprovedReviewsByProduct(req: AuthRequest, res: Response) {
  try {
    const reviews = await reviewService.getApprovedReviewsByProduct(req.params.productId as string);
    return res.status(200).json(reviews);
  } catch (error: any) {
    return handleError(res, error);
  }
}

// GET /api/reviews/customer/:userId
export async function getMyReviews(req: AuthRequest, res: Response) {
  try {
    const reviews = await reviewService.getReviewsByCustomer(req.params.userId as string);
    return res.status(200).json(reviews);
  } catch (error: any) {
    return handleError(res, error);
  }
}

// PUT /api/reviews/:reviewId
export async function updateReview(req: AuthRequest, res: Response) {
  try {
    const review = await reviewService.updateReview(
      req.params.reviewId as string,
      req.body,
      req.user!.id,
      req.user!.role
    );
    return res.status(200).json(review);
  } catch (error: any) {
    return handleError(res, error);
  }
}

// DELETE /api/reviews/:reviewId
export async function deleteReview(req: AuthRequest, res: Response) {
  try {
    await reviewService.deleteReview(req.params.reviewId as string, req.user!.id, req.user!.role);
    return res.status(200).json({ message: "Review deleted successfully." });
  } catch (error: any) {
    return handleError(res, error);
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Admin controllers
// ─────────────────────────────────────────────────────────────────────────────

// GET /api/admin/reviews/pending
export async function getPendingReviews(req: AuthRequest, res: Response) {
  try {
    if (req.user?.role !== "admin") {
      return res.status(403).json({ message: "Management access required." });
    }
    const reviews = await reviewService.getPendingReviews();
    return res.status(200).json(reviews);
  } catch (error: any) {
    return handleError(res, error);
  }
}

// PATCH /api/admin/reviews/:reviewId/approve
export async function approveReview(req: AuthRequest, res: Response) {
  try {
    if (req.user?.role !== "admin") {
      return res.status(403).json({ message: "Management access required." });
    }
    const review = await reviewService.approveReview(req.params.reviewId as string);
    return res.status(200).json({ message: "Review approved.", review });
  } catch (error: any) {
    return handleError(res, error);
  }
}