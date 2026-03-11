import { useState } from "react";
import { ProductActions } from "./ProductActions";
import { ProductDetails } from "./ProductDetails";
import { useFavorites } from "../../../hooks/useFavorites";
import type { Product } from "../../../types/Product";

export function ProductInformation({ product }: { product: Product }) {
  const [selectedVariant, setSelectedVariant] = useState<string | null>(null);
  const { favorites, toggleFavorite } = useFavorites();
  const isFavorited = favorites.includes(product._id);

  const handleShare = async () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ title: product.name, url: window.location.href });
      } catch (err) { console.log(err); }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied!");
    }
  };

  return (
    <div className="flex flex-col gap-8 w-full max-w-xl">
      {/* Header Section */}
      <section className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <span className="text-xs tracking-widest text-gray-500 uppercase">{product.category.name}</span>
          <h1 className="text-2xl font-semibold">{product.name}</h1>
          <p className="text-xl font-medium text-gray-800">${product.price.toLocaleString()}</p>
        </div>
        <div className="border-t border-gray-100"></div>
        {product.description && <p className="text-sm leading-relaxed text-gray-600">{product.description}</p>}
      </section>

      {/* Main Interactive Sections */}
      <ProductActions 
        product={product}
        selectedVariant={selectedVariant}
        setSelectedVariant={setSelectedVariant}
        isFavorited={isFavorited}
        onFavorite={() => toggleFavorite(product._id)}
        onShare={handleShare}
      />

      {/* Static Details Section */}
      <ProductDetails product={product} />
    </div>
  );
}