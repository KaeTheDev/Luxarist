import { Routes, Route } from "react-router-dom";
import DashboardShell from "../shared/components/DashboardShell";
import MyOrders from "./components/orders/MyOrders";
import MyReviews from "./components/reviews/MyReviews";
import AccountSettings from "./components/settings/AccountSettings";
import ProfileOverview from "./components/overview/ProfileOverview";

export default function CustomerDashboard() {
  return (
      <DashboardShell role="customer" title="Client Suite">
        <Routes>
          {/* URL: /dashboard */}
          <Route index element={<ProfileOverview />} />

          {/* URL: /dashboard/orders */}
          <Route path="ordewrs" element={<MyOrders />} />
    
          {/* URL: /dashbord/reviews */}
          <Route path="reviews" element={<MyReviews />} />

          {/* URL: /dashboard/settings */}
          <Route path="settings" element={<AccountSettings />} />
        </Routes>
      </DashboardShell>
  );
}