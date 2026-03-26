export type OrderStatus = "Pending" | "Processing" | "Shipped" | "Delivered" | "Cancelled";
export type AdminTab = 'overview' | 'products' | 'orders' | 'reviews' | 'settings';
export type DashboardTab = "overview" | "orders" | "reviews" | "settings";

// --- THE UNIFIED ORDER TYPE ---
export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  subtotal: number;
  image?: string;
}

export interface Order {
  _id: string;
  orderNumber: string;
  customerId: string;
  customerFirstName: string;
  customerLastName: string;
  customerEmail: string;
  orderDate: string;
  status: OrderStatus;
  paymentMethod: string;
  items: OrderItem[];
  total: number;
  shippingAddress?: {
    street: string;
    city: string;
    state: string;
    zip: string;
  };
  createdAt: string;
  updatedAt: string;
}

// --- SHARED USER TYPE ---
export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: "customer" | "admin"; 
}

// --- EQUIVALENT PRODUCT TYPE ---
// Use this for BOTH Customer view and Admin management
export interface Product {
  _id: string; // Use MongoDB naming consistently
  name: string;
  subtitle: string;
  slug: string;
  sku: string;
  description: string;
  price: number;
  category?: { _id: string; name: string; slug: string } | null;
  status: "active" | "inactive";
  isNewArrival: boolean;
  primaryImageUrl: string;
  galleryImageUrls: string[];
  sizes: string[];
  material: string;
  gemstoneType: string;
  weightPreset: string;
  style: string;
  careTemplateKey: string;
  
  // Specific Technical Details
  diamondSpecs?: {
    carat?: string; cut?: string; color?: string;
    clarity?: string; halo?: string; stones?: string;
  };
  metalSpecs?: {
    type?: string; weight?: string; finish?: string;
    purity?: string;
    setting?: string; width?: string; length?: string;
    clasp?: string; movement?: string; waterResistance?: string;
    glass?: string; strap?: string; battery?: string;
  };
}

// --- EQUIVALENT ORDER TYPE ---
export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  subtotal: number;
  image?: string; 
}

export interface Order {
  _id: string;
  orderNumber: string;
  customerId: string;
  customerFirstName: string;
  customerLastName: string;
  customerEmail: string;
  orderDate: string;
  status: OrderStatus;
  items: OrderItem[];
  total: number;
  shippingAddress?: {
    street: string;
    city: string;
    state: string;
    zip: string;
  };
  createdAt: string;
  updatedAt: string;
}

// --- EQUIVALENT REVIEW TYPE ---
export interface Review {
  _id: string;
  productId?: string;
  productName: string;
  productImage?: string;
  customerName: string; // Combined from AdminReview
  rating: number;
  comment: string;
  isApproved: boolean; // Admin toggles this, Customer filters by it
  date: string;
  createdAt: string;
}

// --- SYSTEM ANALYTICS ---
export interface DashboardData {
  totalProducts: number;
  activeProducts: number;
  totalOrders: number;
  totalReviews: number;
  totalCustomers: number;
  recentActivity: Array<{
    type: "order" | "review";
    id: string;
    title: string;
    subtitle: string;
    value: string;
    status: string | null;
    date: string;
  }>;
}