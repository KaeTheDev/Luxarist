import { useState, useEffect } from "react";
import { useAuth } from "../../../../../context/AuthContext";
import type { DashboardData } from "../../../shared/types";

export function useAdminMetrics() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { token } = useAuth();

  const BASE = import.meta.env.DEV ? "http://localhost:3000" : import.meta.env.VITE_API_URL;
  const API_URL = `${BASE.replace(/\/$/, "")}/api`;

  useEffect(() => {
    if (!token) return;

    async function fetchMetrics() {
      try {
        const res = await fetch(`${API_URL}/admin/metrics`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        if (res.ok) {
          const result = await res.json();
          setData(result);
        }
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