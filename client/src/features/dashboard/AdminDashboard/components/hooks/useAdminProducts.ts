import { useEffect, useState } from "react";
import { useAuth } from "../../../../../context/AuthContext";

const API_URL = import.meta.env.DEV ? "http://localhost:3000/api" : import.meta.env.VITE_API_URL;

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

export function useAdminProducts() {
    const { token } = useAuth();
    const [products, setProducts] = useState<AdminProduct[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
    };

    useEffect(() => {
        fetchProducts();
    }, [token]);

    const fetchProducts = async() => {
        try {
            setLoading(true);
            const res = await fetch(`${API_URL}/products`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (!res.ok) throw new Error("Failed to fetch products");
            const data = await res.json();
            setProducts(data);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const createProduct = async(productData: Omit<AdminProduct, "_id" | "slug">) => {
        const res = await fetch(`${API_URL}/admin/products`, {
            method: "POST",
            headers,
            body: JSON.stringify(productData),
        });
        if (!res.ok) {
            const data = await res.json();
            throw new Error(data.message || "Failed to create product");
        }
        await fetchProducts();
    };

    const updateProduct = async(id: string, productData: Partial<AdminProduct>) => {
        const res = await fetch(`${API_URL}/admin/products/${id}`, {
            method: "PUT",
            headers,
            body: JSON.stringify(productData),
        });
        if (!res.ok) {
            const data = await res.json();
            throw new Error(data.message || "Failed to update product");
        }
        await fetchProducts();
    };

    const deleteProduct = async(id: string) => {
        const res = await fetch(`${API_URL}/admin/products/${id}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Failed to delete product");
        await fetchProducts();
    };

    return { products, loading, error, createProduct, updateProduct, deleteProduct, refetch: fetchProducts() };
}