/**
 * File: errorHandler.ts
 * Purpose:
 *   Centralized middleware to catch and handle uncaught errors in the app.
 *
 * Responsibilities:
 *   - Catch errors thrown in routes or other middleware
 *   - Log the error stack for debugging
 *   - Send standardized error response to client
 *
 * Usage:
 *   - Apply last in app.ts using app.use(errorHandler)
 *   - Ensures consistent error handling across the application
 */

import { Request, Response, NextFunction } from "express";

export const errorHandler = (err: any, _req: Request, res: Response, _next: NextFunction) => {
    console.error(err.stack);
    res.status(err.status || 500).json({ message: err.message || "Internal Server Error" });
};