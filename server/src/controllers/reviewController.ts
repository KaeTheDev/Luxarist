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