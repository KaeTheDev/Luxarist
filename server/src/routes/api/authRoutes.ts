import { Router } from "express";
import { validateBody } from "../../middleware/validate";
import { register, login, getMe, updateMe, changePassword, addAddress, deleteAddress, deleteAccount } from "../../controllers/authController";
import { authMiddleware } from "../../middleware/auth";
import { z } from "zod";

const router = Router();

// Define the schema for registration
const registerSchema = z.object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.string().email("Invalid email address"), 
    password: z.string().min(8, "Password must be at least 8 characters"),
});

// Define the schema for login
const loginSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters")
});

/**
 * @route   POST /api/auth/register
 * @desc    Register a new user
 * @access  Public
 */
router.post("/register", validateBody(registerSchema), register);

/**
 * @route   POST /api/auth/login
 * @desc    Login user
 * @access  Public
 */
router.post("/login", validateBody(loginSchema), login);

/**
 * @route   GET /api/auth/me
 * @desc    Get current user profile
 * @access  Private
 */
router.get("/me", authMiddleware, getMe);

/**
 * @route   PUT /api/auth/me
 * @desc    Update profile (firstName, lastName)
 * @access  Private
 */
router.put("/me", authMiddleware, updateMe);

/**
 * @route   PUT /api/auth/password
 * @desc    Change password
 * @access  Private
 */
router.put("/password", authMiddleware, changePassword);

/**
 * @route   POST /api/auth/me/addresses
 * @desc    Add a shipping address
 * @access  Private
 */
router.post("/me/addresses", authMiddleware, addAddress);

/**
 * @route   DELETE /api/auth/me/addresses/:addressId
 * @desc    Delete a shipping address
 * @access  Private
 */
router.delete("/me/addresses/:addressId", authMiddleware, deleteAddress);

/**
 * @route   DELETE /api/auth/me
 * @desc    Delete a user account
 * @access  Private
 */
router.delete("/me", authMiddleware, deleteAccount);

export default router;