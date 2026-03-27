import { Schema, model, Document, Types } from "mongoose";

// The Shape of a Product Item
export interface IProductItem {
    productId: Types.ObjectId;
    productName: string;
    productImage?: string;
}

// The Shape of a Review Document
export interface IReview extends Document {
    productId: Types.ObjectId;
    customerId: Types.ObjectId;
    customerName: string;
    rating: number;
    title: string;
    comment: string;
    date: Date;
    isVerified: boolean;
    approved: boolean;
    createdAt: Date;
    updatedAt: Date;
}

// Sub-schema for items to keep the main schema clean
const productItemSchema = new Schema<IProductItem>({
    productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    productName: { type: String, required: true },
    productImage: { type: String }
}, { _id: false });


// Mongoose Schema = enforces this shape at DB level
const reviewSchema = new Schema<IReview>({
   productId: {
    type: Schema.Types.ObjectId,
    ref: "Product",
    required: true,
    index: true
   },


    customerId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    customerName: {
        type: String,
        required: true,
        trim: true
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    comment: {
        type: String,
        required: true,
        trim: true
    },
    isVerified: { 
        type: Boolean, 
        default: false 
    },
    approved: { 
        type: Boolean, 
        default: false 
    },
}, {
    timestamps: true
})

export const Review = model<IReview>('Review', reviewSchema);