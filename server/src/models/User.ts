import { Schema, model, Document } from "mongoose";
import bcrypt from "bcryptjs";

// The Shape of a User Document
export interface IUser extends Document {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: 'admin' | 'customer';
    memberSince: Date;
    comparePassword(password: string): Promise<boolean>;
}

// Mongoose Schema = enforces this shape at DB level
const userSchema = new Schema<IUser>({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { 
        type: String, 
        required: true, 
        unique: true, 
        lowercase: true, 
        match: [/.+@.+\..+/, "Please enter a valid email address"] 
    },
    password: { type: String, required: true, minlength: 8 },
    role: { 
        type: String, 
        required: true, 
        enum: ['admin', 'customer'], 
        default: 'customer'
    },
    memberSince: { type: Date, default: Date.now }
});

// Pre-save hook to hash password before saving
userSchema.pre("save", async function (this: IUser) {
    if (!this.isModified("password")) return;

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    } catch (error: any) {
        throw new Error(error);
    }
});

  // Instance method to compare password for login
  userSchema.methods.comparePassword = async function (password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
};

// Mongoose Model - typed constructor that gets imported elsewhere
export const User = model<IUser>('User', userSchema);