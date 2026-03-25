import { Routes, Route } from "react-router-dom";
import DashboardShell from "../shared/components/DashboardShell";
import AdminOverview from "./components/overview/AdminOverview";
import OrdersTable from "./components/orders/OrdersTable";
import ReviewsTable from "./components/reviews/ReviewsTable";
import AdminProducts from "./components/products/AdminProducts";

export default function AdminDashboard() {
    return (
        <DashboardShell role="admin" title="Management Suite">
            <Routes>
                {/* URL: /admin */}
                <Route index element={<AdminOverview />} />

                {/* URL: /admin/products */}
                <Route path="products" element={<AdminProducts />} />

                {/* URL: /admin/ordrs */}
                <Route path="orders" element={<OrdersTable />} />

                {/* URL: /admin/reviews */}
                <Route path="reviews" element={<ReviewsTable />} />

                {/* URL: /admin/settings */}
                <Route path="settings" element={
                    <div className="p-20 border border-stone-100 bg-white rounded-4xl text-center text-stone-400 italic font-serif">
                        System Configuration Coming Soon
                    </div>
                }
                />
            </Routes>
        </DashboardShell>
    );
}