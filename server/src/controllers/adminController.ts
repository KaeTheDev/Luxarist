import { Response } from "express";
import { Order } from "../models/Order";
import { Review } from "../models/Review";
import { Product } from "../models/Product";
import { User } from "../models/User";
import { AuthRequest } from "../types/auth";

/**
 * @desc    Get admin dashboard metrics
 * @route   GET /api/admin/metrics
 * @access  Private (Admin only)
 */
export async function getAdminMetrics(req: AuthRequest, res: Response) {
    try {
        // Run all count queries in parallel for performance
        const [totalProducts, activeProducts, totalOrders, totalReviews, totalCustomers, recentOrders, recentReviews] = await Promise.all([
            Product.countDocuments(),
            Product.countDocuments({ status: "active" }),
            Order.countDocuments(),
            Review.countDocuments(),
            User.countDocuments({ role: "customer" }),
            Order.find()
            .sort({ createdAt: -1 })
            .limit(5)
            .select("orderNumber customerFirstName customerLastName total status orderDate"),
            Review.find()
            .sort({ createdAt: -1 })
            .limit(5)
            .select("customerFirstName customerLastName rating comment date products"),
        ]);

        // Merge and sort recent activity by date
        const recentActivity = [
            ...recentOrders.map(o => ({
                type: "order" as const,
                id: o._id,
                title: `Order #${o.orderNumber}`,
                subtitle: `${o.customerFirstName} ${o.customerLastName}`,
                value: `$${o.total.toLocaleString()}`,
                status: o.status,
                date: o.orderDate,
            })),
            ...recentReviews.map(r => ({
                type: "review" as const,
                id: r._id,
                title: r.products[0]?.productName ?? "Product Review",
                subtitle: `${r.customerFirstName} ${r.customerLastName}`,
                value: `${r.rating}/5`,
                status: null,
                date: r.date,
            })),
        ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
         .slice(0, 8);

        res.status(200).json({
            totalProducts,
            activeProducts,
            totalOrders,
            totalReviews,
            totalCustomers,
            recentActivity,
        });
    } catch (error) {
        const message = error instanceof Error ? error.message : "Server error";
        res.status(500).json({ message, error: message });
    }
}