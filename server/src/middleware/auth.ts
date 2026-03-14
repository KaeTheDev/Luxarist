/**
 * File: auth.ts
 * Purpose:
 *   Middleware to protect private routes by verifying JWT tokens.
 *
 * Responsibilities:
 *   - Extract JWT from Authorization header
 *   - Verify and decode the token using jwt utility
 *   - Attach authenticated user ID to request object
 *   - Block access if token is missing, invalid, or expired
 *
 * Usage:
 *   - Apply to private routes to ensure only authenticated users can access them
 *   - Controllers can use req.user.id for authorization checks
 */

import type { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";

interface AuthRequest extends Request {
    user?: { id: string; role: string };
}

export const authMiddleware = async (req: AuthRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    // 1. Check if the Authorization header exists and follows the Bearer pattern
    if(authHeader && authHeader.startsWith('Bearer ')) {
        const token = authHeader.split(' ')[1];

        if(!token) return res.status(401).json({ message: 'Not authorized, no token' });

        try {
            // 2. Verify and decode the token
            const decoded = verifyToken(token) as { id: string; role: string };
            // 3. Attach the decoded user data to the request object
            req.user = { 
                id: decoded.id,
                role: decoded.role 
            };

            next();
        } catch (error) {
            console.error(error);
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    } else {
        res.status(401).json({ message: 'Not authorized, no token' });
    }
};

/**
 * Admin-only middleware
 * Must be used AFTER authMiddleware
 */
export const adminOnly = (req: AuthRequest, res: Response, next: NextFunction) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(403).json({ message: "Access denied. Admins only." });
    }
};