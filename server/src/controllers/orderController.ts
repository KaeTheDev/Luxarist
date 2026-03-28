import { Response } from "express";
import { Order } from "../models/Order";
import { AuthRequest } from "../types/auth";
import * as orderService from "../services/orderService";

// ─────────────────────────────────────────────────────────────────────────────
// Existing controllers (unchanged in behaviour)
// ─────────────────────────────────────────────────────────────────────────────

// GET /api/orders/customer/:customerId
export async function getMyOrders(req: AuthRequest, res: Response) {
  try {
    const { customerId } = req.params;

    if (!req.user || (req.user.id !== customerId && req.user.role !== "admin")) {
      return res.status(403).json({ message: "Unauthorized access to these orders." });
    }

    const orders = await Order.find({ customerId: customerId as string }).sort({ orderDate: -1 });
    return res.status(200).json(orders);
  } catch (error: any) {
    return res.status(500).json({ message: "Error fetching orders.", error: error.message });
  }
}

// GET /api/admin/orders
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

// PUT /api/admin/orders/:id
export async function updateOrderStatus(req: AuthRequest, res: Response) {
  try {
    if (req.user?.role !== "admin") {
      return res.status(403).json({ message: "Management access required." });
    }

    const allowedStatuses = ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"];
    if (!allowedStatuses.includes(req.body.status)) {
      return res.status(400).json({ message: "Invalid status value." });
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found." });
    }

    return res.status(200).json(updatedOrder);
  } catch (error: any) {
    return res.status(500).json({ message: "Update failed.", error: error.message });
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// New — delegates to orderService
// ─────────────────────────────────────────────────────────────────────────────

// GET /api/orders/verify-purchase/:productId
export async function verifyPurchase(req: AuthRequest, res: Response) {
  try {
    const result = await orderService.verifyPurchase(
      req.user!.id,
      req.params.productId as string
    );
    return res.status(200).json(result);
  } catch (error: any) {
    return res.status(500).json({ message: "Error verifying purchase.", error: error.message });
  }
}