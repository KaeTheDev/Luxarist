/**
 * @name ProductDetailPage
 * @description The primary product detail view. Fetches a single product by slug
 * and renders the full page — gallery, info, tabs, and recommendations.
 * Shows ProductDetailSkeleton while loading to prevent layout shift.
 */

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { Product } from "../features/dashboard/shared/types";
import { ProductInformation } from "../features/product-details/components/ProductInformation";
import { ProductImageGallery } from "../features/product-details/components/ProductImageGallery";
import { ProductDetailsTab } from "../features/product-details/components/ProductDetailsTab";
import { fetchOneProduct } from "../api/productServices";
import { ProductRecommendations } from "../features/product-details/ProductRecommendations";
import { ProductDetailSkeleton } from "../common/ui/ProductDetailSkeleton";

export function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getProduct() {
      if (!slug) return;
      try {
        setLoading(true);
        const data = await fetchOneProduct(slug);
        setProduct(data);
      } catch (err) {
        console.error("Error loading product:", err);
      } finally {
        setLoading(false);
      }
    }
    getProduct();
  }, [slug]);

  if (loading) return <ProductDetailSkeleton />;

  if (!product) {
    return (
      <div className="p-20 text-center text-gray-500">Product not found.</div>
    );
  }

  return (
    <main className="container mx-auto px-4 py-12">
      {/* Upper Section: Gallery and Primary Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
        <ProductImageGallery product={product} />
        <ProductInformation product={product} />
      </div>

      {/* Lower Section: Tabs */}
      <div className="mt-12 max-w-4xl mx-auto border-t border-gray-100 pt-12 w-full">
        <ProductDetailsTab product={product} />
      </div>

      {product?._id && product?.category?.slug && (
        <ProductRecommendations
          currentProductId={product._id}
          categorySlug={product.category.slug}
        />
      )}
    </main>
  );
}