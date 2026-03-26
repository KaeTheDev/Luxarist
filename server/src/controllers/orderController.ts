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

    if (!req.user || (req.user.id !== customerId && req.user.role !== "admin")) {
      return res.status(403).json({ message: "Unauthorized access to these orders." });
    }

    const orders = await Order.find({ customerId: customerId as string }).sort({ orderDate: -1 });
    return res.status(200).json(orders);
  } catch (error: any) {
    return res.status(500).json({ message: "Error fetching orders", error: error.message });
  }
}

/**
 * Fetch ALL orders in the system (Admin Only).
 * GET /api/admin/orders
 */
export async function getAllOrdersAdmin(req: AuthRequest, res: Response) {
  try {
    if (req.user?.role !== "admin") {
      return res.status(403).json({ message: "Management access required." });
    }

    const orders = await Order.find({}).sort({ orderDate: -1 });
    return res.status(200).json(orders);
  } catch (error: any) {
    return res.status(500).json({ message: "Failed to retrieve the ledger.", error: error.message });
  }
}

/**
 * Update Order Status (Admin Only)
 * PUT /api/admin/orders/:id
 */
export async function updateOrderStatus(req: AuthRequest, res: Response) {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (req.user?.role !== "admin") {
      return res.status(403).json({ message: "Management access required." });
    }

    // Validate that the status matches our defined Enum
    const allowedStatuses = ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];
    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status value." });
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { status },
      { new: true } // Returns the document AFTER update so UI gets fresh data
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found." });
    }

    return res.status(200).json(updatedOrder);
  } catch (error: any) {
    return res.status(500).json({ message: "Update failed.", error: error.message });
  }
}