import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import DashboardShell from "../shared/components/DashboardShell";
import AdminOverview from "./components/overview/AdminOverview";
import OrdersTable from "./components/orders/OrdersTable";
import ReviewsTable from "./components/reviews/ReviewsTable";
import InventoryManager from "./components/products/InventoryManager";

export default function AdminDashboard() {

    const { user, isLoading } = useAuth();

    if (isLoading) return null;

    // PROTECTION: If they aren't an admin, bounce back to Customer Dashboard
    if (user?.role !== 'admin') {
        return <Navigate to="/dashboard" replace />;
    }

    return (
        <DashboardShell role="admin" title="Management Suite">
            <Routes>
                {/* URL: /admin */}
                <Route index element={<AdminOverview />} />

                {/* URL: /admin/products */}
                <Route path="products/*" element={<InventoryManager />} /> {/* Added * for sub-routes */}

                {/* URL: /admin/orders */}
                <Route path="orders" element={<OrdersTable />} />

                {/* URL: /admin/customers */}
                <Route path="customers" element={
                    <div className="p-20 border border-stone-100 bg-white rounded-4xl text-center">
                        <h3 className="text-lg font-serif italic text-stone-900">Client Directory</h3>
                        <p className="text-[10px] uppercase tracking-widest text-stone-400 mt-2 font-black">Archive under construction</p>
                    </div>
                } />

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