import { Types } from "mongoose";
import { Review, IReview } from "../models/Review";
import { Product } from "../models/Product";
import { Order } from "../models/Order";

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

export interface CreateReviewPayload {
  productId: string;
  customerId: string;
  customerName: string;
  rating: number;
  title: string;
  comment: string;
}

export interface UpdateReviewPayload {
  rating?: number;
  title?: string;
  comment?: string;
}

export interface FormattedReview {
  _id: unknown;
  productId: unknown;
  productName: string;
  productImage: string;
  customerName: string;
  rating: number;
  title: string;
  comment: string;
  isVerified: boolean;
  isApproved: boolean;
  createdAt: Date;
}

// ─────────────────────────────────────────────────────────────────────────────
// Private helpers
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Recalculates averageRating and totalReviews on the Product document.
 * Called explicitly after any write that changes the approved review set —
 * no post-save hooks, no hidden magic.
 */
async function recalculateProductRating(productId: Types.ObjectId | string): Promise<void> {
  const approvedReviews = await Review.find({
    productId,
    approved: true,
  }).select("rating");

  const totalReviews = approvedReviews.length;
  const averageRating =
    totalReviews > 0
      ? parseFloat(
          (
            approvedReviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews
          ).toFixed(1)
        )
      : 0;

  await Product.findByIdAndUpdate(productId, { averageRating, totalReviews });
}

// ─────────────────────────────────────────────────────────────────────────────
// Public service methods
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Submit a new review.
 * Checks for duplicates, runs the Verified Acquisition check,
 * then persists the review (approved: false by default).
 */
export async function createReview(payload: CreateReviewPayload): Promise<IReview> {
  const { productId, customerId, customerName, rating, title, comment } = payload;

  // 1. Confirm product exists
  const product = await Product.findById(productId);
  if (!product) {
    throw Object.assign(new Error("Product not found."), { statusCode: 404 });
  }

  // 2. Guard against duplicates (index also enforces this at the DB level)
  const existing = await Review.findOne({ productId, customerId });
  if (existing) {
    throw Object.assign(new Error("You have already reviewed this product."), { statusCode: 409 });
  }

  // 3. Verified Acquisition — user must have a Delivered order containing this product
  //    Order.customerId is a plain string in your schema; productId stored as string too
  const deliveredOrder = await Order.findOne({
    customerId: String(customerId),
    status: "Delivered", // capital D — matches your Order schema enum exactly
    "items.productId": String(productId),
  });

  const review = await Review.create({
    productId,
    customerId,
    customerName,
    rating,
    title,
    comment,
    isVerified: Boolean(deliveredOrder),
    // approved defaults to false — awaits admin action
  });

  return review;
}

/**
 * Fetch all approved reviews for a product (used on the public product page).
 */
export async function getApprovedReviewsByProduct(productId: string): Promise<IReview[]> {
  return Review.find({ productId, approved: true })
    .select("customerName rating title comment isVerified createdAt")
    .sort({ createdAt: -1 });
}

/**
 * Fetch all reviews submitted by a specific customer, formatted for the UI.
 */
export async function getReviewsByCustomer(customerId: string): Promise<FormattedReview[]> {
  const reviews = await Review.find({ customerId })
    .populate({ path: "productId", select: "name primaryImageUrl" })
    .sort({ createdAt: -1 });

  return reviews.map((rev) => {
    const product = rev.productId as any;
    return {
      _id: rev._id,
      productId: product?._id || rev.productId,
      productName: product?.name || "Luxarist Piece",
      productImage: product?.primaryImageUrl || "https://placehold.co/400",
      customerName: rev.customerName,
      rating: rev.rating,
      title: rev.title,
      comment: rev.comment,
      isVerified: rev.isVerified,
      isApproved: rev.approved,
      createdAt: rev.createdAt,
    };
  });
}

/**
 * Update a review's content.
 * If the owner edits their review, it is re-queued for approval.
 */
export async function updateReview(
  reviewId: string,
  payload: UpdateReviewPayload,
  requesterId: string,
  requesterRole: string
): Promise<IReview> {
  const review = await Review.findById(reviewId);
  if (!review) {
    throw Object.assign(new Error("Review not found."), { statusCode: 404 });
  }

  const isOwner = String(requesterId) === String(review.customerId);
  const isAdmin = requesterRole === "admin";

  if (!isOwner && !isAdmin) {
    throw Object.assign(new Error("Unauthorized."), { statusCode: 403 });
  }

  if (payload.rating !== undefined) review.rating = payload.rating;
  if (payload.title !== undefined) review.title = payload.title;
  if (payload.comment !== undefined) review.comment = payload.comment;

  // Owner edits reset approval — the review re-enters the moderation queue
  if (isOwner && !isAdmin) {
    review.approved = false;
  }

  return review.save();
}

/**
 * Delete a review (owner or admin).
 * Recalculates product rating if the deleted review was approved.
 */
export async function deleteReview(
  reviewId: string,
  requesterId: string,
  requesterRole: string
): Promise<void> {
  const review = await Review.findById(reviewId);
  if (!review) {
    throw Object.assign(new Error("Review not found."), { statusCode: 404 });
  }

  const isOwner = String(requesterId) === String(review.customerId);
  const isAdmin = requesterRole === "admin";

  if (!isOwner && !isAdmin) {
    throw Object.assign(new Error("Unauthorized."), { statusCode: 403 });
  }

  const { productId, approved: wasApproved } = review;
  await Review.findByIdAndDelete(reviewId);

  if (wasApproved) {
    await recalculateProductRating(productId);
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Admin-only service methods
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Fetch all unapproved reviews for the admin moderation queue.
 */
export async function getPendingReviews(): Promise<IReview[]> {
  return Review.find({ approved: false })
    .populate("productId", "name primaryImageUrl slug")
    .populate("customerId", "name email")
    .sort({ createdAt: 1 }); // Oldest first — FIFO queue
}

/**
 * Approve a review and immediately recalculate the product's rating stats.
 */
export async function approveReview(reviewId: string): Promise<IReview> {
  const review = await Review.findById(reviewId);
  if (!review) {
    throw Object.assign(new Error("Review not found."), { statusCode: 404 });
  }
  if (review.approved) {
    throw Object.assign(new Error("Review is already approved."), { statusCode: 400 });
  }

  review.approved = true;
  const saved = await review.save();

  // Explicit call — no hidden hooks, easy to trace in logs/tests
  await recalculateProductRating(review.productId);

  return saved;
}