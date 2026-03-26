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
      if (!userId || typeof userId !== "string") {
        return res.status(400).json({ message: "Valid User ID is required." });
      }
  
      const reviews = await Review.find({ customerId: userId })
        .populate({
          path: "products.productId",
          select: "primaryImageUrl",
          model: "Product",
        })
        .sort({ createdAt: -1 });
  
      const formattedReviews = await Promise.all(
        reviews.map(async (rev) => {
          const mainProductItem = rev.products?.[0] ?? null;
          const productData = mainProductItem?.productId as any;
  
          // Determine if populate actually worked:
          // A populated doc will have a truthy ._id; a raw ref will not.
          const isPopulated =
            productData &&
            typeof productData === "object" &&
            productData._id;
  
          let finalImageUrl: string | undefined = isPopulated
            ? productData.primaryImageUrl
            : undefined;
  
          // Manual fallback — only runs if populate didn't hydrate the doc
          if (!finalImageUrl && mainProductItem) {
            // Safe extraction of the raw ID regardless of populate state
            const rawId = isPopulated
              ? productData._id
              : mainProductItem.productId;
  
            if (rawId) {
              const manualProduct = await Product.findById(rawId)
                .select("primaryImageUrl")
                .lean();
              finalImageUrl = manualProduct?.primaryImageUrl;
            }
          }
  
          // Log here while debugging — remove once working
          console.log("Review ID:", rev._id, "| Image URL:", finalImageUrl);
  
          return {
            _id: rev._id,
            productId: isPopulated
              ? productData._id
              : mainProductItem?.productId ?? null,
            productName: mainProductItem?.productName || "Luxarist Piece",
            productImage: finalImageUrl || "https://placehold.co/400",
            customerName: `${rev.customerFirstName} ${rev.customerLastName}`,
            rating: rev.rating,
            comment: rev.comment,
            isApproved: rev.approved,
            date: new Date(rev.date).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            }),
            createdAt: rev.createdAt,
          };
        })
      );
  
      return res.status(200).json(formattedReviews);
    } catch (error: any) {
      console.error("Review Fetch Error:", error);
      return res
        .status(500)
        .json({ message: "Error fetching reviews", error: error.message });
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