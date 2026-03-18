import { Response } from "express";
import { Order } from "../models/Order";
import { AuthRequest } from "../types/auth";

/**
 * Fetch all orders for a specific user.
 * GET /api/orders/:customerId
 */
export async function getMyOrders(req: AuthRequest, res: Response) {
  try {
    const { customerId } = req.params;

    // Verify req.user matches customerId
    // Access is allowed if the user is the owner OR an admin
    if (
      !req.user ||
      (req.user.id !== customerId && req.user.role !== "admin")
    ) {
      return res
        .status(403)
        .json({ message: "Unauthorized access to these orders." });
    }

    // We cast customerId as string because we verified it in the security check above
    const orders = await Order.find({ customerId: customerId as string })
      .select("orderNumber items total status orderDate")
      .sort({ orderDate: -1 });

    // Return JSON response
    return res.status(200).json(orders);
  } catch (error: any) {
    // Handle errors gracefully
    return res.status(500).json({
      message: "Error fetching orders",
      error: error.message,
    });
  }
}