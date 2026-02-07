/**
 * File: jwt.ts
 * Purpose:
 *   Handles creation and verification of JSON Web Tokens (JWT) for authentication.
 *
 * Responsibilities:
 *   - Generate signed JWTs containing a user ID
 *   - Verify JWTs to extract the user ID
 *   - Ensure JWT_SECRET exists and handle errors if not
 *
 * Usage:
 *   - generateToken(userId) → called by signup/login controllers
 *   - verifyToken(token) → called by authMiddleware to protect routes
 */

import jwt from "jsonwebtoken";

export const generateToken = (id: string) => {
    if(!process.env.JWT_SECRET) {
        throw new Error('JWT_SECRET is not defined');
    }
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

export const verifyToken = (token: string) => {
    if(!process.env.JWT_SECRET) {
        throw new Error('JWT_SECRET is not defined');
    }
    return jwt.verify(token, process.env.JWT_SECRET) as { id: string };
};