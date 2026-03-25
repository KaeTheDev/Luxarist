import { useState, useEffect } from "react";
import { useAuth } from "../../../../../context/AuthContext";
import type { DashboardData } from "../../../shared/types";

export function useAdminMetrics() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { token } = useAuth();

  const API_URL = import.meta.env.DEV ? "http://localhost:3000/api" : import.meta.env.VITE_API_URL;

  useEffect(() => {
    if (!token) return;

    async function fetchMetrics() {
      try {
        const res = await fetch(`${API_URL}/admin/metrics`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.ok) setData(await res.json());
      } catch (err) {
        console.error("Metrics fetch failed", err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchMetrics();
  }, [token, API_URL]);

  return { data, isLoading };
}