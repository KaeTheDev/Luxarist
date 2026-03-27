import { Response } from "express";
import { Review } from "../models/Review";
import { Product } from "../models/Product";
import { AuthRequest } from "../types/auth";

/**
 * Fetch all reviews submitted by a specific user.
 * GET /api/reviews/customer/:userId
 */
export async function getMyReviews(req: AuthRequest, res: Response) {
  try {
    const { userId } = req.params;
    
    if (!userId) {
      return res.status(400).json({ message: "Valid User ID is required." });
    }

    // 1. Fetch reviews and populate the associated Product
    const reviews = await Review.find({ customerId: userId })
      .populate({
        path: "productId",
        select: "name primaryImageUrl", // Get only what we need for the UI
      })
      .sort({ createdAt: -1 });

    // 2. Format the response to match your frontend expectation
    const formattedReviews = reviews.map((rev) => {
      const product = rev.productId as any;

      return {
        _id: rev._id,
        productId: product?._id || rev.productId,
        productName: product?.name || "Luxarist Piece",
        productImage: product?.primaryImageUrl || "https://placehold.co/400",
        customerName: rev.customerName, // Now uses the combined string from the model
        rating: rev.rating,
        title: rev.title,
        comment: rev.comment,
        isVerified: rev.isVerified,
        isApproved: rev.approved,
        createdAt: rev.createdAt,
      };
    });

    return res.status(200).json(formattedReviews);
  } catch (error: any) {
    console.error("Review Fetch Error:", error);
    return res.status(500).json({ message: "Error fetching reviews", error: error.message });
  }
}
/**
 * Update a review by ID.
 * PUT /api/reviews/:reviewId
 */
export async function updateReview(req: AuthRequest, res: Response) {
  try {
    const { reviewId } = req.params;
    const { rating, comment, title } = req.body;

    const review = await Review.findById(reviewId);
    if (!review) return res.status(404).json({ message: "Review not found." });

    const isOwner = req.user && String(req.user.id) === String(review.customerId);
    const isAdmin = req.user?.role === "admin";

    if (!isOwner && !isAdmin) {
      return res.status(403).json({ message: "Unauthorized." });
    }

    // Update fields
    if (rating) review.rating = rating;
    if (comment) review.comment = comment;
    if (title) review.title = title;

    await review.save();
    return res.status(200).json(review);
  } catch (error: any) {
    return res.status(500).json({ message: "Update failed", error: error.message });
  }
}

/**
 * Delete a review by ID.
 * DELETE /api/reviews/:reviewId
 */
export async function deleteReview(req: AuthRequest, res: Response) {
  try {
    const { reviewId } = req.params;
    const review = await Review.findById(reviewId);

    if (!review) return res.status(404).json({ message: "Review not found." });

    const isOwner = req.user && String(req.user.id) === String(review.customerId);
    const isAdmin = req.user?.role === "admin";

    if (!isOwner && !isAdmin) {
      return res.status(403).json({ message: "Unauthorized." });
    }

    await Review.findByIdAndDelete(reviewId);
    return res.status(200).json({ message: "Review deleted successfully." });
  } catch (error: any) {
    return res.status(500).json({ message: "Delete failed", error: error.message });
  }
}