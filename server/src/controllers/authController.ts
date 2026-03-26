import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import type { SignOptions } from "jsonwebtoken";
import { User } from "../models/User";
import { Order } from "../models/Order";
import { Review } from "../models/Review";

// Define a custom interface to handle the 'user' property added by your auth middleware
interface AuthRequest extends Request {
    user?: {
        id: string;
        role: string;
    };
}

/**
 * Utility to sign JWT tokens
 * Uses type casting for SignOptions to satisfy strict TS v9 requirements
 */
function signToken(payload: object): string {
    const secret = process.env.JWT_SECRET;

    if (!secret) {
        throw new Error("JWT_SECRET is missing from environment variables");
    }

    const options: SignOptions = {
        expiresIn: (process.env.JWT_EXPIRES_IN as SignOptions["expiresIn"]) ?? "7d",
    };

    return jwt.sign(payload, secret, options);
}

/**
 * @desc    Register a new user
 * @route   POST /api/auth/register
 * @access  Public
 */
export async function register(req: Request, res: Response) {
    try {
        // 1. Destructure adminPasscode from the request body
        const { firstName, lastName, email, password, adminPasscode } = req.body;

        // 2. Check for existing user
        const existingUser = await User.findOne({ email });
        if (existingUser) {
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
            role: assignedRole,
            lastLogin: new Date() // Initialize first login on registration
        });

        // 5. Generate JWT token
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
                lastLogin: newUser.lastLogin, // Added to response
                memberSince: newUser.memberSince,
            },
        });
    } catch (error) {
        const message = error instanceof Error ? error.message : "Internal server error during registration";
        console.error("Registration Error:", error);
        res.status(500).json({ message, error: message });
    }
}

/**
 * @desc    Login a user
 * @route   POST /api/auth/login
 * @access  Public
 */
export async function login(req: Request, res: Response) {
    try {
        const { email, password } = req.body;

        // 1. Check if user exists
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        // 2. Use the instance method from our Model to compare passwords
        const isMatch = await user.comparePassword(password);

        if (!isMatch) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        // --- UPDATE ACTIVITY ---
        user.lastLogin = new Date();
        await user.save();
        // -----------------------

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
                role: user.role,
                lastLogin: user.lastLogin // Added to response
            }
        });
    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ message: "Server error during login" });
    }
}

/**
 * @desc    Get current logged-in user
 * @route   GET /api/auth/me
 * @access  Private
 */
export async function getMe(req: AuthRequest, res: Response) {
    try {
        // req.user.id was attached by the authMiddleware
        const user = await User.findById(req.user?.id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({
            id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: user.role,
            memberSince: user.memberSince,
            addresses: user.addresses, 
        });
    } catch (error) {
        const message = error instanceof Error ? error.message : "Server error";
        res.status(500).json({ message, error: message });
    }
}

/**
 * @desc    Update profile (firstName, lastName)
 * @route   PUT /api/auth/me
 * @access  Private
 */
export async function updateMe(req: AuthRequest, res: Response) {
    try {
        const { firstName, lastName } = req.body;

        const user = await User.findByIdAndUpdate(
            req.user?.id,
            { firstName, lastName },
            { new: true, runValidators: true }
        ).select("-password");

        if (!user) return res.status(404).json({ message: "User not found" });

        res.status(200).json({
            id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: user.role,
            addresses: user.addresses, 
        });
    } catch (error) {
        const message = error instanceof Error ? error.message : "Server error";
        res.status(500).json({ message, error: message });
    }
}

/**
 * @desc    Change password
 * @route   PUT /api/auth/password
 * @access  Private
 */
export async function changePassword(req: AuthRequest, res: Response) {
    try {
        const { currentPassword, newPassword } = req.body;

        const user = await User.findById(req.user?.id);
        if (!user) return res.status(404).json({ message: "User not found" });

        const isMatch = await user.comparePassword(currentPassword);
        if (!isMatch) return res.status(401).json({ message: "Current password is incorrect" });

        user.password = newPassword;
        await user.save();

        res.status(200).json({ message: "Password updated successfully" });
    } catch (error) {
        const message = error instanceof Error ? error.message : "Server error";
        res.status(500).json({ message, error: message });
    }
}

/**
 * @desc    Add a shipping address
 * @route   POST /api/auth/me/addresses
 * @access  Private
 */
export async function addAddress(req: AuthRequest, res: Response) {
    try {
        const { type, address, isDefault } = req.body;

        const user = await User.findById(req.user?.id);
        if (!user) return res.status(404).json({ message: "User not found" });

        // if new address is default, unset all others
        if (isDefault) {
            user.addresses.forEach(a => a.isDefault = false);
        }
        user.addresses.push({ type, address, isDefault: isDefault ?? false });
        await user.save();

        res.status(200).json(user.addresses);
    } catch (error) {
        const message = error instanceof Error ? error.message : "Server error";
        res.status(500).json({ message, error: message });
    }
}

/**
 * @desc    Delete a shipping address
 * @route   DELETE /api/auth/me/addresses/:addressId
 * @access  Private
 */
export async function deleteAddress(req: AuthRequest, res: Response) {
    try {
        const user = await User.findById(req.user?.id);
        if (!user) return res.status(404).json({ message: "User not found" });

        user.addresses = user.addresses.filter(
            a => a._id?.toString() !== req.params.addressId
        );
        await user.save();
        res.status(200).json(user.addresses);
    } catch (error) {
        const message = error instanceof Error ? error.message : "Server error";
        res.status(500).json({ message, error: message });
    }
}

/**
 * @desc    Delete account
 * @route   DELETE /api/auth/me
 * @access  Private
 */
export async function deleteAccount(req: AuthRequest, res: Response) {
    try {
        const userId = req.user?.id;

        if (!userId) return res.status(401).json({ message: "Unauthorized" });

        await User.findByIdAndDelete(userId);
        await Order.deleteMany({ customerId: userId as string });
        await Review.deleteMany({ customerId: userId as string });

        res.status(200).json({ message: "Account deleted successfully" });
    } catch (error) {
        const message = error instanceof Error ? error.message : "Server error";
        res.status(500).json({ message, error: message });
    }
}