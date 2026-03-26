/**
 * File: app.ts
 * Purpose: Configure and export the Express application.
 *          Sets up global middleware and mounts all route handlers.
 *
 * Responsibilities:
 *  - Initialize the Express app
 *  - Apply global middleware (CORS, JSON parsing, logging, etc.)
 *  - Mount route handlers for users, projects, and tasks
 *  - Serve as the central app object imported by server.ts
 *
 * Usage:
 *  - Import in server.ts and pass to app.listen() to start the server
 *  - Controllers and routes are attached here via route mounting
 *  - Ensures all middleware is applied before routes handle requests
 */

import express from "express";
import morgan from "morgan"; // logging middleware
import cors from "cors";

// ROUTES GET IMPORTED HERE 👇🏾
import productRoutes from "./routes/api/productRoutes";
import categoryRoutes from "./routes/api/categoryRoutes";
import reviewRoutes from "./routes/api/reviewRoutes";
import authRoutes from "./routes/api/authRoutes";
import adminRoutes from "./routes/api/adminRoutes";
import orderRoutes from "./routes/api/orderRoutes";

 // TEST ROUTES (DELETE LATER w/ Test Routes and Controllers)
import productTestRoutes from './routes/api/productTestRoutes';

// Store express in app variable
const app = express();

// ======================
// CORS Configuration
// ======================

// Create a whitelist of allowed frontend origins
const allowedOrigins = [
    process.env.FRONTEND_URL, // Render Frontend URL
    "http://localhost:5173" // Local Vite dev server
  ].filter(Boolean); // Removes any undefined values to prevent accidental errors
  
  // Apply CORS globally to all routes in the app
  app.use(
    cors({
      /**
       * origin: function
       * ----------------
       * This is the “brain” of the CORS check.
       * Runs for every incoming request to determine if it should be allowed.
       */
      origin: (origin, callback) => {
        // Case 1: No origin header
        // - Happens for Postman, curl, server-to-server requests
        // - We allow these because they are safe outside the browser
        if (!origin || allowedOrigins.includes(origin)) {
          callback(null, true); // Approve request
        } else {
          // Case 2: Origin not in whitelist
          // - Browser will block the request
          // - Protects your API from unknown/untrusted websites
          callback(new Error("Not allowed by CORS"));
        }
      },
  
      /**
       * credentials: true
       * -----------------
       * Allows the browser to send cookies or Authorization headers.
       * Required if you plan to use auth tokens or session cookies.
       */
      credentials: true,
  
      /**
       * methods
       * -------
       * List of HTTP methods the backend accepts from the frontend.
       * Includes OPTIONS for preflight requests, which browsers send automatically.
       */
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
  
      /**
       * allowedHeaders
       * --------------
       * List of request headers the frontend is allowed to send.
       * Must include Authorization if using auth tokens, and Content-Type for JSON payloads.
       */
      allowedHeaders: ["Content-Type", "Authorization"]
    })
  );
  
// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev")); // logs details about each HTTP request to console

// Mount Auth Routes Here 👇🏾
app.use("/api/auth", authRoutes);

// Mount Order Routes Here 👇🏾
app.use("/api/orders", orderRoutes);

// Mount Product Routes Here 👇🏾
app.use("/api/products", productRoutes);

// Mount Category Here 👇🏾
app.use("/api/categories", categoryRoutes);

// Mount Admin Routes Here 👇🏾
app.use("/api/admin", adminRoutes);

// Mount Review Routes Here 👇🏾
app.use("/api/reviews", reviewRoutes);

// Mount Test Routes Here 👇🏾 (DELETE LATER)
app.use('/api/test', productTestRoutes);

console.log("app.ts loaded");

export default app;