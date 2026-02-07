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
    user?: { id: string };
}

export const authMiddleware = async (req: AuthRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if(authHeader && authHeader.startsWith('Bearer ')) {
        const token = authHeader.split('')[1];

        if(!token) return res.status(401).json({ message: 'Not authorized, no token' });

        try {
            const decoded = verifyToken(token);
            req.user = { id: decoded.id };
            next();
        } catch (error) {
            console.error(error);
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    } else {
        res.status(401).json({ message: 'Not authorized, no token' });
    }
};