import { Schema, model, Document, Types } from "mongoose";

export interface IReview extends Document {
  productId: Types.ObjectId;
  customerId: Types.ObjectId;
  customerName: string;
  rating: number;
  title: string;
  comment: string;
  isVerified: boolean;
  approved: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const reviewSchema = new Schema<IReview>(
  {
    productId: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
      index: true,
    },
    customerId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    customerName: {
      type: String,
      required: true,
      trim: true,
    },
    rating: {
      type: Number,
      required: [true, "Rating is required"],
      min: [1, "Rating must be at least 1"],
      max: [5, "Rating must be at most 5"],
    },
    title: {
      type: String,
      required: [true, "Review title is required"],
      trim: true,
      maxlength: [120, "Title cannot exceed 120 characters"],
    },
    comment: {
      type: String,
      required: [true, "Review comment is required"],
      trim: true,
      maxlength: [2000, "Comment cannot exceed 2000 characters"],
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    approved: {
      type: Boolean,
      default: false,
      index: true,
    },
  },
  { timestamps: true }
);

// Prevents a user submitting more than one review per product at the DB level
reviewSchema.index({ productId: 1, customerId: 1 }, { unique: true });

export const Review = model<IReview>("Review", reviewSchema);