import { Response } from "express";
import { Order } from "../models/Order";
import { AuthRequest } from "../types/auth";

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

export async function getOrderById(req: AuthRequest, res: Response) {
  try {
    const { id } = req.params;
    if (req.user?.role !== "admin") {
      return res.status(403).json({ message: "Management access required." });
    }
    const order = await Order.findById(id);
    if (!order) return res.status(404).json({ message: "Acquisition manifest not found." });
    return res.status(200).json(order);
  } catch (error: any) {
    return res.status(500).json({ message: "Error retrieving manifest.", error: error.message });
  }
}

export async function updateOrderStatus(req: AuthRequest, res: Response) {
  try {
    const { id } = req.params;
    const { status } = req.body;
    if (req.user?.role !== "admin") {
      return res.status(403).json({ message: "Management access required." });
    }
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