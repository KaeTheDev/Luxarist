import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import DashboardShell from "../shared/components/DashboardShell";
import AdminOverview from "./components/overview/AdminOverview";
import OrdersTable from "./components/orders/OrdersTable";
import ReviewsTable from "./components/reviews/ReviewsTable";
import InventoryManager from "./components/products/InventoryManager";
import CustomerDirectory from "./components/customers/CustomerDirectory";
import AdminSettings from "./components/settings/AdminSettings";
import SiteContentManager from "./components/content/SiteContentManager";
import CategoryManager from "./components/categories/CategoryManager";

export default function AdminDashboard() {
  const { user, isLoading } = useAuth();

  if (isLoading) return null;

  if (user?.role !== "admin") {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <DashboardShell role="admin" title="Management Suite">
      <Routes>
        {/* URL: /admin */}
        <Route index element={<AdminOverview />} />

        {/* URL: /admin/products */}
        <Route path="products/*" element={<InventoryManager />} />

        {/* URL: /admin/orders */}
        <Route path="orders" element={<OrdersTable />} />

        {/* URL: /admin/customers */}
        <Route path="customers" element={<CustomerDirectory />} />

        {/* URL: /admin/reviews */}
        <Route path="reviews" element={<ReviewsTable />} />

        {/* URL: /admin/categories */}
        <Route path="categories" element={<CategoryManager />} />

        {/* URL: /admin/content */}
        <Route path="content" element={<SiteContentManager />} />

        {/* URL: /admin/settings */}
        <Route path="settings" element={<AdminSettings />} />
      </Routes>
    </DashboardShell>
  );
}