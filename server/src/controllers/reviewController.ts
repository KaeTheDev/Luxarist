import { Response } from "express";
import { Review } from "../models/Review";
import { AuthRequest } from "../types/auth";

/**
 * Fetch all reviews submitted by a specific user.
 * GET /api/reviews/:userId
 */
export async function getMyReviews(req: AuthRequest, res: Response) {
    try {
        const { userId } = req.params;

        // Verify req.user matches userId 
        if (!req.user || (req.user.id !== userId && req.user.role !== "admin")) {
            return res.status(403).json({ 
                message: "Unauthorized access to these reviews." 
            });
        }

        // Query MongoDB for reviews 
        const reviews = await Review.find({ customerId: userId as string })
            .sort({ createdAt: -1 });

        // Return JSON response 
        return res.status(200).json(reviews);

    } catch (error: any) {
        // Handle errors gracefully
        return res.status(500).json({
            message: "Error fetching reviews",
            error: error.message,
        });
    }
}

/**
 * Update a review by ID.
 * PUT /api/reviews/:reviewId
 */
export async function updateReview(req: AuthRequest, res: Response) {
    try {
        const { reviewId } = req.params;
        const { rating, comment } = req.body;

        // Find the review first so we can verify ownership
        const review = await Review.findById(reviewId);

        if(!review) {
            return res.status(404).json({ message: "Review not found." });
        }

        // Only the owner or an admin can update
        if(!req.user || (req.user.id !== review.customerId && req.user.role !== "admin")){
            return res.status(403).json({ message: "Unauthorized to updated this review." });
        }

        // Only allow rating and comment to be updated
        review.rating = rating ?? review.rating;
        review.comment = comment ?? review.comment;

        const updated = await review.save();

        return res.status(200).json(updated);
    } catch (error: any) {
        return res.status(500).json({
            message: "Error updating review",
            error: error.message,
        });
    }
}