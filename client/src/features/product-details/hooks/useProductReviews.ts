/**
 * Purpose: Orchestrates all data-fetching for the product reviews panel.
 * Fetches approved reviews and the verify-purchase eligibility check in
 * parallel on mount, avoiding sequential round-trips.
 *
 * Responsibilities:
 * - Fetch approved reviews for a given productId via GET /api/reviews/product/:productId
 * - In parallel, hit GET /api/orders/verify-purchase/:productId to check
 *   Verified Acquisition eligibility (only if the user is authenticated)
 * - Expose a `submitReview` action that POSTs to /api/reviews and re-fetches
 *   the review list on success
 * - Surface unified loading, error, and submission states to the consumer
 *
 * Usage:
 *   const { reviews, canReview, loading, submitReview, submitting } =
 *     useProductReviews(product._id);
 */

import { useEffect, useState, useCallback } from "react";
import { useAuth } from "../../../context/AuthContext";
import { API_URL, getAuthHeaders } from "../../../api/config";
 
// ─────────────────────────────────────────────────────────────────────────────
// Types scoped to this feature — mirrors the fields returned by reviewService
// ─────────────────────────────────────────────────────────────────────────────
 
export interface ProductReview {
  _id: string;
  customerName: string;
  rating: number;
  title: string;
  comment: string;
  isVerified: boolean;
  createdAt: string;
}
 
export interface SubmitReviewPayload {
  rating: number;
  title: string;
  comment: string;
}
 
interface UseProductReviewsReturn {
  reviews: ProductReview[];
  averageRating: number;
  ratingDistribution: Record<number, number>; // { 5: 3, 4: 1, 3: 0, 2: 0, 1: 0 }
  canReview: boolean;                          // true only if Verified Acquisition confirmed
  loading: boolean;
  error: string | null;
  submitting: boolean;
  submitError: string | null;
  submitSuccess: boolean;
  submitReview: (payload: SubmitReviewPayload) => Promise<void>;
}
 
// ─────────────────────────────────────────────────────────────────────────────
// Hook
// ─────────────────────────────────────────────────────────────────────────────
 
export function useProductReviews(productId: string): UseProductReviewsReturn {
  const { user, token, isAuthenticated } = useAuth();
 
  const [reviews, setReviews] = useState<ProductReview[]>([]);
  const [canReview, setCanReview] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
 
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);
 
  // ── Derived stats ──────────────────────────────────────────────────────────
 
  const averageRating =
    reviews.length > 0
      ? parseFloat(
          (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
        )
      : 0;
 
  const ratingDistribution: Record<number, number> = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  for (const review of reviews) {
    if (review.rating in ratingDistribution) {
      ratingDistribution[review.rating]++;
    }
  }
 
  // ── Data fetch ─────────────────────────────────────────────────────────────
 
  const fetchData = useCallback(async () => {
    if (!productId) return;
 
    setLoading(true);
    setError(null);
 
    try {
      // Always fetch approved reviews — this endpoint is public
      const reviewsPromise = fetch(`${API_URL}/reviews/product/${productId}`);
 
      // Only check purchase eligibility if the user is logged in
      const verifyPromise =
        isAuthenticated && token
          ? fetch(`${API_URL}/orders/verify-purchase/${productId}`, {
              headers: getAuthHeaders(token),
            })
          : Promise.resolve(null);
 
      const [reviewsRes, verifyRes] = await Promise.all([reviewsPromise, verifyPromise]);
 
      if (!reviewsRes.ok) {
        throw new Error("Unable to load reviews for this piece.");
      }
 
      const reviewsData: ProductReview[] = await reviewsRes.json();
      setReviews(Array.isArray(reviewsData) ? reviewsData : []);
 
      if (verifyRes && verifyRes.ok) {
        const verifyData: { isVerified: boolean } = await verifyRes.json();
        setCanReview(verifyData.isVerified);
      } else {
        setCanReview(false);
      }
    } catch (err: any) {
      console.error("[useProductReviews] fetch error:", err.message);
      setError(err.message ?? "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }, [productId, isAuthenticated, token]);
 
  useEffect(() => {
    fetchData();
  }, [fetchData]);
 
  // ── Submit action ──────────────────────────────────────────────────────────

  const submitReview = useCallback(
    async (payload: SubmitReviewPayload) => {
        if(!user || !token) return;

        setSubmitting(true);
        setSubmitError(null);
        setSubmitSuccess(false);

        try {
            const res = await fetch(`${API_URL}/reviews`, {
                method: "POST",
                headers: getAuthHeaders(token),
                body: JSON.stringify({
                    productId,
                    customerName: `${user.firstName} ${user.lastName}`.trim(),
                    rating: payload.rating,
                    title: payload.title,
                    comment: payload.comment,
                }),
            });

            if(!res.ok) {
                const data = await res.json();
                throw new Error(data.message ?? "Failed to submit your reflection.");
            }

            setSubmitSuccess(true);

            await fetchData();
        } catch(err: any) {
            console.error("[useProductReviews] submit error:", err.message);
            setSubmitError(err.message ?? "Something went wrong.");
        } finally {
            setSubmitting(false);
        }
    },
    [productId, user, token, fetchData]
  );

  return { reviews, averageRating, ratingDistribution, canReview, loading, error, submitting,
    submitError, submitSuccess, submitReview
  };
}