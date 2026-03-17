import { Schema, model, Document } from "mongoose";

// The Shape of a Product Item
export interface IProductItem {
    productName: string;
}

// The Shape of a Review Document
export interface IReview extends Document {
    products: IProductItem[];
    customerFirstName: string;
    customerLastName: string;
    rating: number;
    comment: string;
    date: Date;
    createdAt: Date;
    updatedAt: Date;
}

// Sub-schema for items to keep the main schema clean
const productItemSchema = new Schema<IProductItem>({
    productName: { type: String, required: true }
}, { _id: false });


// Mongoose Schema = enforces this shape at DB level
const reviewSchema = new Schema<IReview>({
    products: {
        type: [productItemSchema],
        required: true,
        validate: [(val: IProductItem[]) => val.length > 0, 'Review must be linked to at least one product']
    },
    customerFirstName: {
        type: String,
        required: true,
        trim: true
    },
    customerLastName: {
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
    comment: {
        type: String,
        required: true,
        trim: true
    },
    date: {
        type: Date,
        default: Date.now,
        required: true
    }
}, {
    timestamps: true
})

export const Review = model<IReview>('Review', reviewSchema);