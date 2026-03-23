export type OrderStatus = "Pending" | "Processing" | "Shipped" | "Delivered";
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
    category: { _id: string; name: string; slug: string } | null;
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