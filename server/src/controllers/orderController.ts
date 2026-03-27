import { Response } from "express";
import { Order } from "../models/Order";
import { AuthRequest } from "../types/auth";

// ─── CUSTOMER CONTROLLERS ─────────────────────────────────────────────────────

export async function getCustomerOrders(req: AuthRequest, res: Response) {
  try {
    const { customerId } = req.params;

    // 1. THIS CLEARS THE ERROR:
    // This guard tells TypeScript: "If customerId is undefined or not a string, stop here."
    if (!customerId || typeof customerId !== 'string') {
      return res.status(400).json({ message: "A valid Customer ID is required." });
    }

    // 2. SECURITY CHECK:
    // Now TypeScript knows customerId is definitely a string.
    if (!req.user || (req.user.id !== customerId && req.user.role !== "admin")) {
      return res.status(403).json({ message: "Unauthorized access to these orders." });
    }

    // 3. MONGOOSE QUERY:
    // Error 2769 disappears because customerId is now a guaranteed string.
    const orders = await Order.find({ customerId }).sort({ orderDate: -1 });
    
    return res.status(200).json(orders);
  } catch (error: any) {
    return res.status(500).json({ message: "Error fetching orders", error: error.message });
  }
}

export async function getCustomerOrderById(req: AuthRequest, res: Response) {
  try {
    const { id } = req.params;
    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({ message: "Order not found." });
    }

    if (req.user?.id !== order.customerId.toString() && req.user?.role !== "admin") {
      return res.status(403).json({ message: "Access denied to this order." });
    }

    return res.status(200).json(order);
  } catch (error: any) {
    return res.status(500).json({ message: "Error retrieving order.", error: error.message });
  }
}

// ─── ADMIN CONTROLLERS ────────────────────────────────────────────────────────

export async function getAllOrdersAdmin(req: AuthRequest, res: Response) {
  try {
    const orders = await Order.find({}).sort({ orderDate: -1 });
    return res.status(200).json(orders);
  } catch (error: any) {
    return res.status(500).json({ message: "Failed to retrieve orders.", error: error.message });
  }
}

export async function getOrderById(req: AuthRequest, res: Response) {
  try {
    const { id } = req.params;
    const order = await Order.findById(id);
    if (!order) return res.status(404).json({ message: "Order not found." });
    return res.status(200).json(order);
  } catch (error: any) {
    return res.status(500).json({ message: "Error retrieving order.", error: error.message });
  }
}

export async function updateOrderStatus(req: AuthRequest, res: Response) {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const allowedStatuses = ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];
    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status value." });
    }

    const updatedOrder = await Order.findByIdAndUpdate(id, { status }, { new: true });
    if (!updatedOrder) return res.status(404).json({ message: "Order not found." });

    return res.status(200).json(updatedOrder);
  } catch (error: any) {
    return res.status(500).json({ message: "Update failed.", error: error.message });
  }
}