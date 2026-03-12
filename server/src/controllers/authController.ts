import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import type { SignOptions } from "jsonwebtoken";
import { User } from "../models/User";

/**
 * Utility to sign JWT tokens
 * Uses type casting for SignOptions to satisfy strict TS v9 requirements
 */

const signToken = (id: string): string => {
    const secret = process.env.JWT_SECRET;

    if(!secret) {
        throw new Error("JWT_SECRET is missing from environment variables");
    }

    const options: SignOptions = {
        expiresIn: (process.env.JWT_EXPIRES_IN as SignOptions["expiresIn"]) ?? "7d",
    };

    return jwt.sign({ id }, secret, options);
};

/**
 * @desc    Register a new user
 * @route   POST /api/auth/register
 * @access  Public
 */

export const register = async(req: Request, res: Response) => {
    try {
        const { firstName, lastName, email, password } = req.body;

        // 1. Check for existing user
        const existingUser = await User.findOne({ email });
        if(existingUser) {
            return res.status(400).json({
                message: "A user with this email already exists."
            });
        }

        // 2. Create new user 
        // Role ('customer') and memberSince are set by Mongoose defaults.
        // Password hashing is handled by the pre-save hook in User.ts.
        const newUser = await User.create({
            firstName,
            lastName,
            email,
            password
        });

        // 3. Generate JWT token
        const token = signToken(newUser._id.toString());

        // 4. Return user info (excluding password) and token
        res.status(201).json({
            message: "User registered successfully",
            token,
            user: {
                id: newUser._id,
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                email: newUser.email,
                role: newUser.role,
                memberSince: newUser.memberSince,
            },
        });
    } catch(error: any) {
        console.error("Registration Error:", error);
        res.status(500).json({
            message: "Internal server error during registration",
            error: error.message
        });
    }
};