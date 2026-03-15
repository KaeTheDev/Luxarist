import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import type { SignOptions } from "jsonwebtoken";
import { User } from "../models/User";

/**
 * Utility to sign JWT tokens
 * Uses type casting for SignOptions to satisfy strict TS v9 requirements
 */
const signToken = (payload: object): string => {
    const secret = process.env.JWT_SECRET;

    if(!secret) {
        throw new Error("JWT_SECRET is missing from environment variables");
    }

    const options: SignOptions = {
        expiresIn: (process.env.JWT_EXPIRES_IN as SignOptions["expiresIn"]) ?? "7d",
    };

    return jwt.sign(payload, secret, options);
};

/**
 * @desc    Register a new user
 * @route   POST /api/auth/register
 * @access  Public
 */
export const register = async(req: Request, res: Response) => {
    try {
        // 1. Destructure adminPasscode from the request body
        const { firstName, lastName, email, password, adminPasscode } = req.body;

        // 2. Check for existing user
        const existingUser = await User.findOne({ email });
        if(existingUser) {
            return res.status(400).json({
                message: "A user with this email already exists."
            });
        }

        /**
         * 3. Role Logic 
         * Compares the user-provided passcode to the secret stored in .env
         */
        const assignedRole = adminPasscode === process.env.ADMIN_SECRET_PASSCODE ? 'admin' : 'customer';

        // 4. Create new user 
        // We explicitly pass 'role' here to override the Mongoose default if needed.
        // Password hashing is handled by the pre-save hook in User.ts.
        const newUser = await User.create({
            firstName,
            lastName,
            email,
            password,
            role: assignedRole 
        });

        // 5. Generate JWT token
        // Pass an object with the ID converted to a string
        const token = signToken({ 
            id: newUser._id.toString(), 
            role: newUser.role 
        });        

        // 6. Return user info (excluding password) and token
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

/**
 * @desc    Login a user
 * @route   POST /api/auth/login
 * @access  Public
 */
export const login = async(req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        // 1. Check if user exists
        const user = await User.findOne({ email });

        if(!user) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        // 2. Use the instance method from our Model to compare passwords
        const isMatch = await user.comparePassword(password);

        if(!isMatch) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        // 3. Generate JWT
        const token = signToken({ 
            id: user._id.toString(), 
            role: user.role 
        });

        // 4. Return response (excluding password)
        res.status(200).json({
            message: "Login successful",
            token,
            user: {
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                role: user.role
            }
        });   
    } catch  (error: any) {
        console.error("Login Error:", error);
        res.status(500).json({ message: "Server error during login" });
    }
};

/**
 * @desc    Get current logged-in user
 * @route   GET /api/auth/me
 * @access  Private
 */
export const getMe = async (req: any, res: Response) => {
    try {
        // req.user.id was attached by your authMiddleware
        const user = await User.findById(req.user.id);
        
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({
            id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: user.role
        });
    } catch (error: any) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};