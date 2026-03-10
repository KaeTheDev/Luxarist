/**
 * @name Homepage
 * @description The primary landing destination for the Luxarist brand. 
 * Orchestrates a series of high-impact sections into a cohesive storytelling 
 * experience, moving the user from broad brand awareness to specific product discovery.
 * * @features
 * - **Modular Composition**: Serves as a clean entry point that delegates all UI 
 * complexity to specialized sub-components (Hero, Collections, etc.).
 * - **Conversion Funnel**: Strategically ordered to build trust (Hero/Collections), 
 * showcase craftsmanship (Signature), drive urgency (New Arrivals), and 
 * establish long-term retention (Brand Promise/Newsletter).
 * - **Fragment Wrapper**: Uses React Fragments (`<>`) to return a clean vertical 
 * stack without adding unnecessary DOM nodes to the document tree.
 * * @styling
 * - **Visual Rhythm**: Alternates between "Pure White" and "Luxury Black/Gray" 
 * section backgrounds to create a rhythmic, high-end editorial scrolling experience.
 * - **SEO Optimization**: Acts as the semantic core of the site, ensuring critical 
 * keywords and collection links are indexed immediately upon page load.
 */

import { HeroSection } from "../features/home/sections/HeroSection";
import { FeaturedCollectionsSection } from "../features/home/sections/FeaturedCollectionsSection";
import { SignatureHighlightSection } from "../features/home/sections/SignatureHighlightSection";
import { NewArrivalsSection } from "../features/home/sections/NewArrivalsSection";
import { BrandPromiseSection } from "../features/home/sections/BrandPromiseSection";
import { NewsletterSection } from "../features/home/sections/NewsletterSection";

import { fetchProducts } from "../api/productServices";
import type { Product } from "../types/Product";
import { useEffect, useState } from "react";

export function Homepage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getInitialData() {
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products for homepage:", error);
      } finally {
        setLoading(false);
      }
    }
    getInitialData();
  },[]);

  // Find the signature product from the fetched list
  const signatureProduct = products.find(
    (p) => p.slug === 'triangular-bezel-diamond-necklace'
  );

  if(loading) {
    return <div className="h-screen flex items-center justify-center">
      Loading Luxarist...
    </div>
  }

  return (
    <>
      <HeroSection />
      <FeaturedCollectionsSection />

      {/* Only show if the API actually returned this product */}
      {signatureProduct && <SignatureHighlightSection product={signatureProduct} />}
      <NewArrivalsSection 
      products={products.filter(p => p.isNewArrival)} 
      loading={loading}
      />
      <BrandPromiseSection />
      <NewsletterSection />
    </>
  );
}