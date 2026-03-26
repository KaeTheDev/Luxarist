/**
 * Global API Configuration
 * Ensures all services use the same base URL and handle slashes correctly.
 */

const BASE = import.meta.env.DEV 
  ? "http://localhost:3000" 
  : (import.meta.env.VITE_API_URL || "https://luxarist-backend.onrender.com");

// This strips any trailing slash and ensures /api is the suffix
export const API_URL = `${BASE.replace(/\/$/, "")}/api`;

// Export common headers (like for Auth)
export const getAuthHeaders = (token: string | null) => ({
  "Content-Type": "application/json",
  ...(token ? { "Authorization": `Bearer ${token}` } : {}),
});