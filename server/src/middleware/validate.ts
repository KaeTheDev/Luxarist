/**
 * File: validate.ts
 * Purpose:
 *   Provides middleware to validate incoming request data using Zod schemas.
 *
 * Responsibilities:
 *   - Validate req.body against a Zod schema
 *   - Return 400 Bad Request if validation fails
 *   - Allow requests to proceed if validation passes
 *
 * Usage:
 *   - Use in routes before controller functions
 *   - Example: router.post("/signup", validateBody(signupSchema), signupController)
 */

import { Request, Response, NextFunction } from "express";
import { ZodType } from "zod";

export const validateBody = (schema: ZodType<any>) => {
    return(req: Request, res: Response, next: NextFunction) => {
        try {
            schema.parse(req.body);
            next();
        } catch (err: any) {
            res.status(400).json({ message: err.errors || "Invalid request data" });
        }
    };
};