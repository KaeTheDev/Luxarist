import { Schema, model, Document } from "mongoose";

// The Shape of an Order Item
export interface IOrderItem {
    productId: string; // Changed to string to match Mongo/Shopify ID patterns
    name: string;
    price: number;
    quantity: number;
    subtotal: number;
}

// The Shape of an Order Document
export interface IOrder extends Document {
    orderNumber: string; // Typically strings for formatting (e.g., "LUX-1001")
    customerId: string; 
    customerFirstName: string;
    customerLastName: string;
    customerEmail: string;
    orderDate: Date;
    status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
    items: IOrderItem[];
    total: number;
}

// Sub-schema for items to keep the main schema clean
const orderItemSchema = new Schema<IOrderItem>({
    productId: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true, min: 1 },
    subtotal: { type: Number, required: true }
}, { _id: false }); // We don't need unique IDs for every single line item

// Main Order Schema
const orderSchema = new Schema<IOrder>({
    orderNumber: { 
        type: String, 
        required: true, 
        unique: true,
        index: true 
    },
    customerId: { 
        type: String, 
        required: true,
        index: true 
    },
    customerFirstName: { type: String, required: true },
    customerLastName: { type: String, required: true },
    customerEmail: { 
        type: String, 
        required: true,
        lowercase: true 
    },
    orderDate: { 
        type: Date, 
        default: Date.now 
    },
    status: { 
        type: String, 
        required: true, 
        enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
        default: 'Pending'
    },
    items: [orderItemSchema],
    total: { 
        type: Number, 
        required: true 
    }
}, { 
    timestamps: true // Gives you createdAt and updatedAt automatically
});

// Export model for use in routes
export const Order = model<IOrder>('Order', orderSchema);