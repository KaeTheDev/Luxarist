import type { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";
import { User } from "../models/User";

interface AuthRequest extends Request {
    user?: { id: string; role: string };
}

export const authMiddleware = async (req: AuthRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if(authHeader && authHeader.startsWith('Bearer ')) {
        const token = authHeader.split(' ')[1];

        if (!token) return res.status(401).json({ message: 'Not authorized, no token' });

        try {
            // 2. Added type assertion to ensure TypeScript knows 'id' exists
            const decoded = verifyToken(token) as { id: string };
            
            // 3. 'User' (Capital U) is the model we imported above
            const user = await User.findById(decoded.id).select("role");

            if (!user) {
                return res.status(401).json({ message: 'User no longer exists' });
            }

            req.user = { 
                id: decoded.id,
                role: user.role // Now fetching directly from the DB
            };

            next();
        } catch (error) {
            console.error("Auth Middleware Error:", error);
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