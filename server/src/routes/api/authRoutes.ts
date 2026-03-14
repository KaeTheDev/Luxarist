import { Router } from "express";
import { validateBody } from "../../middleware/validate";
import { register } from "../../controllers/authController";
import { login } from "../../controllers/authController";
import { z } from "zod";

const router = Router();

// Define the schema for registration
const registerSchema = z.object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.string().email("Invalid email address"), // strike through is IDE cosmetic, not an issue
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

export default router;