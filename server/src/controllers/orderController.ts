import { Request, Response } from "express";
import { Order } from "../models/Order";

// Extend the Request type to include the user object
interface AuthRequest extends Request {
    user?: {
        id: string;
        role: string;
    };
}

/**
 * Fetch all orders for a specific customer
 * GET /api/orders/:customerId
 */

export async function getMyOrders(req: AuthRequest, res: Response) {
    try {
        const { customerId } = req.params;

        // Safety Check: Ensure customerId exists and is a string
        if(!customerId || typeof customerId !== 'string') {
            return res.status(400).json({ message: "Invalid Customer ID" });
        }

        // Security check using the extended AuthRequest
        if(!req.user || (req.user.id !== customerId && req.user.role !== 'admin')) {
            return res.status(403).json({ message: "Unauthorized access to these orders." });
        }
        
        // Query with the guaranteed string
        const orders = await Order.find({ customerId: customerId })
        .select('orderNumber items total status orderDate')
        .sort({ orderDate: -1 });

        return res.status(200).json(orders);
    } catch (error: any) {
        return res.status(500).json({
            message: "Error fetching orders",
            error: error.message
        });
    }
}