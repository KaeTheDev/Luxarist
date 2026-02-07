/**
 * File: axios.ts
 * Purpose:
 *  Creates a centralized Axios instance for all API requests in the frontend.
 *  Automatically configures the base URL, JSON headers, and attaches the
 *  user's JWT token to requests for authentication.
 *
 * Responsibilities:
 *  - Provide a single, reusable API client for the frontend
 *  - Set the base URL for backend API requests using environment variables
 *  - Ensure all requests use "Content-Type: application/json"
 *  - Include credentials (cookies) when needed for authentication
 *  - Intercept outgoing requests to attach the JWT token from localStorage
 *  - Simplify API calls in other service files by handling common setup
 *
 * Usage:
 *  - Imported into service files (e.g., productService.ts, orderService.ts, reviewService.ts)
 *  - Automatically includes authentication headers if the user is logged in
 *  - Handles all HTTP requests without repeating configuration in multiple files
 */

import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});

// Intercept requests to automatically attach token
api.interceptors.request.use((config) => {
    // Get user from localStorage
    const user = localStorage.getItem("user");
    if(user) {
        // Extract JWT Token
        const token = JSON.parse(user).token;
        // Ensure headers object exists
        if(config.headers)
        // Attach token
    config.headers["Authorization"] = `Bearer ${token}`;
    }
    // Return the modified config to Axios
    return config;
});

export default api;