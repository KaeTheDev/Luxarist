import { useState, useEffect } from "react";
import { useAuth } from "../../../../../context/AuthContext";
import { API_URL, getAuthHeaders } from "../../../../../api/config"; 
import type { DashboardData } from "../../../shared/types";

export function useAdminMetrics() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { token } = useAuth();

  useEffect(() => {
    if (!token) return;

    async function fetchMetrics() {
      try {
        const res = await fetch(`${API_URL}/admin/metrics`, {
          headers: getAuthHeaders(token)
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
  }, [token]); // API_URL is now a stable constant from config

  return { data, isLoading };
}