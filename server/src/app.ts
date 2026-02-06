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

// Store express in app variable
const app = express();

// CORS Configuration Here 👇🏾

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev")); // logs details about each HTTP request to console

// Mount Auth Routes Here 👇🏾

// Mount Order Routes Here 👇🏾

// Mount Product Routes Here 👇🏾

// Mount Review Routes Here 👇🏾

export default app;