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

        // 1. Authorization Guard + Null Check
        // Adding !userId ensures TypeScript knows we have a value before querying
        if (!userId || !req.user || (req.user.id !== userId && req.user.role !== "admin")) {
            return res.status(403).json({ 
                message: "Unauthorized access to these reviews." 
            });
        }

        // 2. Fetch reviews from MongoDB
        // We cast userId as string to satisfy the Mongoose QueryFilter type
        const reviews = await Review.find({ customerId: userId as string })
            .sort({ createdAt: -1 });

        // 3. Transform the data
        const formattedReviews = reviews.map(rev => {
            const mainProduct = rev.products[0];

            return {
                _id: rev._id,
                // We ensure these fallbacks match your frontend Review interface
                productId: mainProduct && 'productId' in mainProduct ? mainProduct.productId : null,
                productName: mainProduct?.productName || "Luxarist Piece",
                productImage: mainProduct && 'productImage' in mainProduct ? mainProduct.productImage : "/api/placeholder/100/100",
                customerName: `${rev.customerFirstName} ${rev.customerLastName}`,
                rating: rev.rating,
                comment: rev.comment,
                isApproved: rev.approved,
                date: new Date(rev.date).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                }),
                createdAt: (rev as any).createdAt // Cast to any if timestamps aren't in IReview interface
            };
        });

        return res.status(200).json(formattedReviews);

    } catch (error: any) {
        console.error("Error in getMyReviews:", error);
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