/**
 * File: db.ts
 * Purpose: Establish and manage the MongoDB connection.
 *
 * Responsibilities:
 *  - Connect to MongoDB using a validated connection string
 *  - Handle connection errors and terminate the process on failure
 *
 * Usage:
 *  - Import in server.ts and call connectDB() before starting the server
 *  - Relies on env.ts for validated configuration values
 */

import mongoose from "mongoose";
import { env }  from "./env";


const connectDB = async () => {
    try {
        await mongoose.connect(env.MONGO_URI);
        console.log("MongoDB connected");
    } catch (error) {
        console.error("MongoDB connection failed:", error);
        process.exit(1);
    }
};

export default connectDB;