/**
 * File: server.ts
 * Purpose: Application entry point.
 *
 * Responsibilities:
 *  - Initialize application configuration
 *  - Connect to the database
 *  - Start the Express server
 *
 * Usage:
 *  - Run with `npm run dev` or `npm start`
 *  - Imports configuration from env.ts
 */

import type { Request, Response } from "express";
import app from "./app";
import connectDB from "./config/db";
import { env } from "./config/env";

// Connect to MongoDB first
connectDB();

// Test route
app.get("/", (req: Request, res: Response) => {
    res.send("<h1>Server is running 🚀</h1>");
});

app.listen(env.PORT,() => {
    console.log(`Server running on port ${env.PORT}`);
});