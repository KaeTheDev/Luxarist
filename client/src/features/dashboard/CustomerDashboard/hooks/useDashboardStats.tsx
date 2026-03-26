import { useEffect, useState } from "react";
import { useAuth } from "../../../../context/AuthContext";

const API_URL = import.meta.env.DEV ? "http://localhost:3000/api" : import.meta.env.VITE_API_URL;

interface TimelineEvent { id: string; type: 'order' | 'review' | 'join'; date: string; message: string; }
interface DashboardStats { totalOrders: number; totalReviews: number; memberSince: string; timeline: TimelineEvent[]; }

export function useDashboardStats() {
  const { user, token } = useAuth();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user || !token) return;
    const headers = { Authorization: `Bearer ${token}` };

    const fetchStats = async () => {
      try {
        const [oRes, rRes, mRes] = await Promise.all([
          fetch(`${API_URL}/orders/customer/${user.id}`, { headers }),
          fetch(`${API_URL}/reviews/${user.id}`, { headers }),
          fetch(`${API_URL}/auth/me`, { headers }),
        ]);

        if (!oRes.ok || !rRes.ok || !mRes.ok) throw new Error("Registry access denied");
        const [oData, rData, mData] = await Promise.all([oRes.json(), rRes.json(), mRes.json()]);

        const orderEvents = (Array.isArray(oData) ? oData : []).map((o: any) => ({
          id: o._id, 
          type: 'order' as const, 
          date: o.createdAt, 
          message: `Acquired ${o.items?.length || 1} items — Order #${o._id.slice(-6).toUpperCase()}`
        }));

        const reviewEvents = (Array.isArray(rData) ? rData : []).map((r: any) => ({
          id: r._id, 
          type: 'review' as const, 
          date: r.createdAt, 
          message: `Shared a reflection on ${r.productName || 'your latest piece'}`
        }));

        const joinEvent: TimelineEvent = { 
          id: 'join', 
          type: 'join' as const, 
          date: mData.createdAt || mData.memberSince || new Date().toISOString(), 
          message: "Initiated Client Suite membership" 
        };

        const combinedTimeline = [...orderEvents, ...reviewEvents, joinEvent]
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
          .slice(0, 5);

        setStats({
          totalOrders: orderEvents.length,
          totalReviews: reviewEvents.length,
          memberSince: mData.createdAt || mData.memberSince,
          timeline: combinedTimeline
        });
      } catch (err: any) { setError(err.message); } 
      finally { setLoading(false); }
    };

    fetchStats();
  }, [user, token]);

  return { stats, loading, error };
}