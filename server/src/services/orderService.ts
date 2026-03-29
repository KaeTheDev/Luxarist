import { Order } from "../models/Order";

export interface PurchaseVerificationResult {
  isVerified: boolean;
  message: string;
}

/**
 * Checks whether a user has a Delivered order containing a specific product.
 * Used by the frontend to conditionally render the "Write a Review" button.
 *
 * NOTE: Order.customerId is stored as a plain string in the schema.
 *       Order.status enum uses capital-first casing e.g. "Delivered" not "delivered".
 */
export async function verifyPurchase(
  customerId: string,
  productId: string
): Promise<PurchaseVerificationResult> {
  const deliveredOrder = await Order.findOne({
    customerId: String(customerId),
    status: "Delivered",       // capital D — must match your Order schema enum exactly
    "items.productId": String(productId),
  }).lean();

  return {
    isVerified: Boolean(deliveredOrder),
    message: deliveredOrder
      ? "Purchase verified."
      : "No delivered order found for this product.",
  };
}