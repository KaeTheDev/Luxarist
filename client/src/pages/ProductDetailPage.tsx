import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { Product } from "../types/Product";
import { ProductInformation } from "../features/product-details/components/ProductInformation";
import { ProductImageGallery } from "../features/product-details/components/ProductImageGallery";
import { fetchProductsBySlug } from "../api/fetchProductsBySlug";

export function ProductDetailPage () {
    const { slug } = useParams<{ slug: string }>();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function getProduct() {
            if(!slug) return;
            try {
                setLoading(true);
                // Call the service: fetchProductBySlug
                const data = await fetchProductsBySlug(slug);
                setProduct(data);
            } catch(err) {
                console.error("Error loading product:", err);
            } finally {
                setLoading(false);
            }
        }
        getProduct();
    }, [slug]);

    if(loading) return <div className="p-20 text-center">Loading Luxury piece...</div>;
    if(!product) return <div className="p-20 text-center">Product not found.</div>

    return(
        <div className="container mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-2 gap-16">
            <ProductImageGallery product={product} />
            <ProductInformation product={product} />
        </div>
    )
}