import { useEffect, useState } from "react";
import { useAuth } from "../../../../context/AuthContext";
// Ensure this path leads to your new config.ts file
import { API_URL, getAuthHeaders } from "../../../../api/config";

interface TimelineEvent { 
  id: string; 
  type: 'order' | 'review' | 'join'; 
  date: string; 
  message: string; 
}

interface DashboardStats { 
  totalOrders: number; 
  totalReviews: number; 
  memberSince: string; 
  timeline: TimelineEvent[]; 
}

export function useDashboardStats() {
  const { user, token } = useAuth();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Safety check for user and token
    if (!user?.id || !token) return;

    // Use centralized header helper
    const headers = getAuthHeaders(token);

    const fetchStats = async () => {
      try {
        // Parallel fetch using the unified API_URL
        const [oRes, rRes, mRes] = await Promise.all([
          // Orders endpoint
          fetch(`${API_URL}/orders/customer/${user.id}`, { headers }),
          
          // Reviews endpoint 
          fetch(`${API_URL}/reviews/customer/${user.id}`, { headers }),
          
          // Auth endpoint for profile/join date
          fetch(`${API_URL}/auth/me`, { headers }),
        ]);

        // Error handling if any parallel request fails
        if (!oRes.ok || !rRes.ok || !mRes.ok) {
          console.error("Dashboard Sync Failed:", {
            orders: oRes.status,
            reviews: rRes.status,
            auth: mRes.status
          });
          throw new Error("Registry access denied");
        }

        const [oData, rData, mData] = await Promise.all([
          oRes.json(), 
          rRes.json(), 
          mRes.json()
        ]);

        // Map Orders to Timeline
        const orderEvents = (Array.isArray(oData) ? oData : []).map((o: any) => ({
          id: o._id, 
          type: 'order' as const, 
          date: o.createdAt, 
          message: `Acquired ${o.items?.length || 1} items — Order #${o._id.slice(-6).toUpperCase()}`
        }));

        // Map Reviews to Timeline
        const reviewEvents = (Array.isArray(rData) ? rData : []).map((r: any) => ({
          id: r._id, 
          type: 'review' as const, 
          date: r.createdAt, 
          message: `Shared a reflection on ${r.productName || 'your latest piece'}`
        }));

        // Create Join Event from Auth data
        const joinEvent: TimelineEvent = { 
          id: 'join', 
          type: 'join' as const, 
          date: mData.createdAt || mData.memberSince || new Date().toISOString(), 
          message: "Initiated Client Suite membership" 
        };

        // Combine and Sort (Most recent first, top 5 only)
        const combinedTimeline = [...orderEvents, ...reviewEvents, joinEvent]
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
          .slice(0, 5);

        setStats({
          totalOrders: orderEvents.length,
          totalReviews: reviewEvents.length,
          memberSince: mData.createdAt || mData.memberSince,
          timeline: combinedTimeline
        });

        setError(null);
      } catch (err: any) { 
        console.error("Dashboard Stats Error:", err.message);
        setError(err.message); 
      } finally { 
        setLoading(false); 
      }
    };

    fetchStats();
  }, [user?.id, token]);

  return { stats, loading, error };
}