import { Response } from "express";
import NodeCache from "node-cache"; 
import { Order } from "../models/Order";
import { Review } from "../models/Review";
import { Product } from "../models/Product";
import { User } from "../models/User";
import { AuthRequest } from "../types/auth";

// Initialize cache for 10 minutes to prevent redundant DB hits on inventory
const inventoryCache = new NodeCache({ stdTTL: 600 });

/**
 * @desc    Fetch high-level business metrics and recent activity for the dashboard
 * @route   GET /api/admin/metrics
 * @access  Private (Admin Only)
 */
export async function adminGetMetrics(req: AuthRequest, res: Response) {
    try {
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

/**
 * @desc    Retrieve all products in the database including inactive/draft items
 * @route   GET /api/admin/products
 * @access  Private (Admin Only)
 * @optimization Added Pagination, Caching, and Lean queries for performance
 */
export async function adminGetAllProducts(req: AuthRequest, res: Response) {
    try {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 12;
        const search = (req.query.search as string) || "";
        const skip = (page - 1) * limit;
        
        // We include the search term in the cache key so searches aren't "stuck"
        const cacheKey = `inventory_p${page}_l${limit}_s${search}`;

        const cachedData = inventoryCache.get(cacheKey);
        if (cachedData) return res.status(200).json(cachedData);

        // 1. Build a dynamic search query
        const query: any = {};
        if (search) {
            query.$or = [
                { name: { $regex: search, $options: "i" } },
                { sku: { $regex: search, $options: "i" } },
                { "metalSpecs.type": { $regex: search, $options: "i" } }
            ];
        }

        // 2. Execute query with count
        const [products, total] = await Promise.all([
            Product.find(query)
                .select('name sku price status primaryImageUrl metalSpecs diamondSpecs') 
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit)
                .lean(),
            Product.countDocuments(query) // Count only the filtered items
        ]);

        const response = {
            products,
            pagination: {
                total,
                page,
                limit,
                pages: Math.ceil(total / limit)
            }
        };

        inventoryCache.set(cacheKey, response);
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: "Inventory retrieval failed" });
    }
}

/**
 * @desc    Initialize and save a new product to the boutique catalog
 * @route   POST /api/admin/products
 * @access  Private (Admin Only)
 */
export async function adminCreateProduct(req: AuthRequest, res: Response) {
    try {
        const product = await Product.create(req.body);
        inventoryCache.flushAll(); // Clear cache to ensure new product is visible
        res.status(201).json(product);
    } catch (error) {
        const message = error instanceof Error ? error.message : "Server error";
        res.status(500).json({ message, error: message });
    }
}

/**
 * @desc    Modify specifications or status of an existing product
 * @route   PUT /api/admin/products/:id
 * @access  Private (Admin Only)
 */
export async function adminUpdateProduct(req: AuthRequest, res: Response) {
    try {
        const product = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!product) return res.status(404).json({ message: "Product not found" });
        
        inventoryCache.flushAll(); // Clear cache to reflect updates immediately
        res.status(200).json(product);
    } catch (error) {
        const message = error instanceof Error ? error.message : "Server error";
        res.status(500).json({ message, error: message });
    }
}

/**
 * @desc    Permanently remove a product from the database
 * @route   DELETE /api/admin/products/:id
 * @access  Private (Admin Only)
 */
export async function adminDeleteProduct(req: AuthRequest, res: Response) {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) return res.status(404).json({ message: "Product not found" });
        
        inventoryCache.flushAll(); // Clear cache after deletion
        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        const message = error instanceof Error ? error.message : "Server error";
        res.status(500).json({ message, error: message });
    }
}

/**
 * @desc    Retrieve full list of client acquisitions for the ledger
 * @route   GET /api/admin/orders
 * @access  Private (Admin Only)
 */
export async function adminGetAllOrders(req: AuthRequest, res: Response) {
    try {
        const orders = await Order.find().sort({ orderDate: -1 });
        res.status(200).json(orders);
    } catch (error) {
        const message = error instanceof Error ? error.message : "Server error";
        res.status(500).json({ message, error: message });
    }
}

/**
 * @desc    Update the fulfillment status of a client order
 * @route   PUT /api/admin/orders/:id
 * @access  Private (Admin Only)
 */
export async function adminUpdateOrderStatus(req: AuthRequest, res: Response) {
    try {
        const { status } = req.body;
        const order = await Order.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true, runValidators: true }
        );
        if (!order) return res.status(404).json({ message: "Order not found" });
        res.status(200).json(order);
    } catch (error) {
        const message = error instanceof Error ? error.message : "Server error";
        res.status(500).json({ message, error: message });
    }
}

/**
 * @desc    Retrieve the full client directory with investment metrics
 * @route   GET /api/admin/customers
 * @note    Dating Logic: pulls lastLogin and uses updatedAt for Acquisitions
 */
export async function adminGetAllCustomers(req: AuthRequest, res: Response) {
    try {
        const customers = await User.aggregate([
            { $match: { role: 'customer' } }, 
            {
                $lookup: {
                    from: 'orders', 
                    let: { userIdString: { $toString: "$_id" } },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $or: [
                                        { $eq: ["$customerId", "$$userIdString"] },
                                        { $eq: [{ $toString: "$customerId" }, "$$userIdString"] }
                                    ]
                                }
                            }
                        }
                    ],
                    as: 'orderHistory'
                }
            },
            {
                $project: {
                    firstName: 1,
                    lastName: 1,
                    email: 1,
                    lastLogin: 1,
                    totalInvestment: { $sum: "$orderHistory.total" },
                    acquisitionCount: { $size: "$orderHistory" },
                    // Pointing to updatedAt ensures correct purchase dates are pulled
                    lastAcquisition: { $max: "$orderHistory.updatedAt" }
                }
            },
            { $sort: { totalInvestment: -1 } }
        ]);

        res.status(200).json(customers);
    } catch (error) {
        const message = error instanceof Error ? error.message : "Server error";
        res.status(500).json({ message });
    }
}

/**
 * @desc    Fetch all client reviews for moderation (with populated names)
 * @route   GET /api/admin/reviews
 * @access  Private (Admin Only)
 */
export async function adminGetAllReviews(req: AuthRequest, res: Response) {
    try {
        const reviews = await Review.find().sort({ createdAt: -1 });
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
}

/**
 * @desc    Toggle approval status to show or hide a review on the storefront
 * @route   PUT /api/admin/reviews/:id
 * @access  Private (Admin Only)
 */
export async function adminUpdateReviewApproval(req: AuthRequest, res: Response) {
    try {
        const { approved } = req.body;
        const review = await Review.findByIdAndUpdate(
            req.params.id,
            { approved },
            { new: true, runValidators: true }
        );
        if (!review) return res.status(404).json({ message: "Review not found" });
        res.status(200).json(review);
    } catch (error) {
        const message = error instanceof Error ? error.message : "Server error";
        res.status(500).json({ message, error: message });
    }
}