/**
 * File: env.ts
 * Purpose: Centralized environment variable loading and validation.
 *
 * Responsibilities:
 *  - Load environment variables using dotenv
 *  - Validate required environment variables at startup
 *  - Export a typed, safe configuration object for the app
 *
 * Why this exists:
 *  - Prevents scattered access to process.env across the codebase
 *  - Ensures the app fails fast if required variables are missing
 *  - Provides a single source of truth for configuration values
 *
 * Usage:
 *  - Imported by db.ts, server.ts, and any other file needing config values
 *  - dotenv.config() MUST only be called here
 */

import dotenv from "dotenv";

// Loads variables from .env into process.env, once at startup
dotenv.config();

function requireEnv(key: string): string {
    const value = process.env[key];
    if(!value) {
        throw new Error(`Missing environment variable: ${key}`);
    }
    return value;
}

export const env = {
    // Optional
    PORT: Number(process.env.PORT) || 3001,
    // Required
    MONGO_URI: requireEnv("MONGO_URI")
};