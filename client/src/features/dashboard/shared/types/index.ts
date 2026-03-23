export type OrderStatus = "Pending" | "Processing" | "Shipped" | "Delivered" | "Cancelled";
export type AdminTab = 'overview' | 'products' | 'orders' | 'reviews' | 'settings';
export type DashboardTab = "overview" | "orders" | "reviews" | "settings";

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

export interface Review {
    id: string;
    productId?: string;
    productName: string;
    rating: number; 
    comment: string;
    date: string;
    image?: string;
    approved?: boolean;
  }

  export interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: "customer" | "admin"; 
  }

export interface AdminProduct {
    _id: string;
    name: string;
    subtitle: string;
    category?: { _id: string; name: string; slug: string } | null;
    price: number;
    status: "active" | "inactive";
    isNewArrival: boolean;
    primaryImageUrl: string;
    galleryImageUrls: string[];
    sizes: string[];
    material: string;
    gemstoneType: string;
    weightPreset: string;
    style: string;
    description: string;
    careTemplateKey: string;
    specsFromAttributes: boolean;
    sku: string;
    slug: string;
    diamondSpecs?: {
        carat?: string; cut?: string; color?: string;
        clarity?: string; halo?: string; stones?: string;
    };
    metalSpecs?: {
        type?: string; weight?: string; finish?: string;
        setting?: string; width?: string; length?: string;
        clasp?: string; movement?: string; waterResistance?: string;
        glass?: string; strap?: string; battery?: string;
    };
}


export interface AdminOrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  subtotal: number;
}

export interface AdminOrder {
    _id: string;              // Mongo unique ID
    orderNumber: string;      // e.g., "LUX-1001"
    customerId: string; 
    customerFirstName: string;
    customerLastName: string;
    customerEmail: string;
    orderDate: string;        // Dates come as strings over JSON
    status: OrderStatus;
    items: AdminOrderItem[];
    total: number;
    createdAt: string;
    updatedAt: string;
}

export interface AdminReview {
  _id: string;
  customerName: string;
  productName: string; // or productId if you're joining data
  rating: number;
  comment: string;
  isApproved: boolean;
  createdAt: string;
}