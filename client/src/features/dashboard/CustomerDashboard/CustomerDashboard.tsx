import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import DashboardShell from "../shared/components/DashboardShell";
import MyOrders from "./components/orders/MyOrders";
import MyReviews from "./components/reviews/MyReviews";
import AccountSettings from "./components/settings/AccountSettings";
import ProfileOverview from "./components/overview/CollectionOverview";

export default function CustomerDashboard() {
  const { user, isLoading } = useAuth();

  // Wait for the Auth session to load
  if (isLoading) return null; 

  /** * 2. THE ADMIN LOCK
   * If an Admin tries to access ANY /dashboard route, 
   * redirect them immediately to the Admin panel.
   */
  if (user?.role === 'admin') {
    return <Navigate to="/admin" replace />;
  }

  return (
      <DashboardShell role="customer" title="Client Suite">
        <Routes>
          {/* URL: /dashboard */}
          <Route index element={<ProfileOverview />} />

          {/* URL: /dashboard/orders */}
          <Route path="orders" element={<MyOrders />} />
    
          {/* URL: /dashboard/reviews */}
          <Route path="reviews" element={<MyReviews />} />

          {/* URL: /dashboard/settings */}
          <Route path="settings" element={<AccountSettings />} />
        </Routes>
      </DashboardShell>
  );
}