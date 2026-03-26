import { useEffect, useState } from "react";
import { useAuth } from "../../../../context/AuthContext";

// Ensure /api is consistently applied for Local and Production
const BASE_URL = import.meta.env.DEV ? "http://localhost:3000/api" : `${import.meta.env.VITE_API_URL}/api`;

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

    const headers = { 
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    };

    const fetchStats = async () => {
      try {
        // Parallel fetch with corrected paths
        const [oRes, rRes, mRes] = await Promise.all([
          // Orders endpoint
          fetch(`${BASE_URL}/orders/customer/${user.id}`, { headers }),
          
          // Reviews endpoint 
          fetch(`${BASE_URL}/reviews/customer/${user.id}`, { headers }),
          
          // Auth endpoint for join date
          fetch(`${BASE_URL}/auth/me`, { headers }),
        ]);

        // Debugging log if any call fails
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

        // Create Join Event
        const joinEvent: TimelineEvent = { 
          id: 'join', 
          type: 'join' as const, 
          date: mData.createdAt || mData.memberSince || new Date().toISOString(), 
          message: "Initiated Client Suite membership" 
        };

        // Combine and Sort (Most recent first)
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