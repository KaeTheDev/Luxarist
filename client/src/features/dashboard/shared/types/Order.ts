export type OrderStatus = "Pending" | "Processing" | "Shipped" | "Delivered";

export interface Order {
  id: string;
  date: string;
  total: number;
  status: OrderStatus;
  // Optional details for the "Deep Dive" view
  items?: Array<{
    name: string;
    category: string;
    price: number;
    quantity: number;
    image?: string;
  }>;
  shippingAddress?: {
    street: string;
    city: string;
    state: string;
    zip: string;
  };
}