import { Schema, model, Document } from "mongoose";

// The Shape of a User Document
export interface IUser extends Document {
    firstName: string;
    lastName: string;
    email: string;
    passwordHash: string;
    role: 'admin' | 'customer';
    memberSince: Date;
}

// Mongoose Schema = enforces this shape at DB level
const userSchema = new Schema<IUser>({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true},
    passwordHash: { type: String, required: true },
    role: { type: String, required: true, enum: ['admin', 'customer']},
    memberSince: { type: Date, default: Date.now }
});

// Mongoose Model - typed constructor that gets imported elsewhere
export const User = model<IUser>('User', userSchema);