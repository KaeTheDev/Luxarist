import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import DashboardShell from "../shared/components/DashboardShell";
import AdminOverview from "./components/overview/AdminOverview";
import OrdersTable from "./components/orders/OrdersTable";
import ReviewsTable from "./components/reviews/ReviewsTable";
import InventoryManager from "./components/products/InventoryManager";
import CustomerDirectory from "./components/customers/CustomerDirectory";
import AdminSettings from "./components/settings/AdminSettings";
import OrderDetail from "./components/orders/OrderDetail";

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

                {/* URL: /admin/orders/:id */}
                <Route path="orders/:id" element={<OrderDetail />} />

                {/* URL: /admin/customers */}
                <Route path="customers" element={<CustomerDirectory />} />

                {/* URL: /admin/reviews */}
                <Route path="reviews" element={<ReviewsTable />} />

                {/* URL: /admin/settings */}
                <Route path="settings" element={<AdminSettings />} />
            </Routes>
        </DashboardShell>
    );
}