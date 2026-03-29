/**
 * Purpose: Renders the tabbed information section on the product detail page.
 *
 * Responsibilities:
 * - Manage active tab state across Description, Specifications, Care, and Reviews
 * - Render the Description panel with product copy and Luxarist craftsmanship note
 * - Render the Specifications panel using diamondSpecs / metalSpecs columns
 * - Render the Care panel scoped to the product's gemstone type
 * - Delegate the Reviews panel entirely to <ReviewsTab productId={product._id} />
 * - Display a dynamic review count on the Reviews tab label using product.totalReviews
 *
 * Usage:
 *   <ProductDetailsTab product={product} />
 */

import { useState } from "react";
import type { Product } from "../../dashboard/shared/types";
import { DescriptionTab } from "./DescriptionTab";
import { SpecificationsTab } from "./SpecificationsTab";
import { CareTab } from "./CareTab";
import { ReviewsTab } from "./ReviewsTab";

interface ProductDetailsTabProps {
  product: Product;
}

export function ProductDetailsTab({ product }: ProductDetailsTabProps) {
  const [activeTab, setActiveTab] = useState("description");
 
  if (!product)
    return <div className="p-10 text-center">Loading specifications...</div>;
 
  const reviewCount = (product as any).totalReviews ?? 0;
 
  const TABS = [
    { id: "description", label: "Description" },
    { id: "specs",       label: "Specifications" },
    { id: "care",        label: "Care Instructions" },
    {
      id: "reviews",
      label: reviewCount > 0 ? `Reviews (${reviewCount})` : "Reviews",
    },
  ];
 
  return (
    <div className="w-full flex flex-col items-center">
 
      {/* Tab header */}
      <div className="w-full border-b border-gray-200">
        <div className="flex justify-center gap-4 md:gap-12 px-2">
          {TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  relative py-4 md:py-6 transition-all duration-300 font-semibold
                  text-sm md:text-base
                  ${isActive ? "text-black" : "text-gray-400 hover:text-black"}
                `}
              >
                {tab.label}
                {isActive && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 md:h-1 bg-black translate-y-px animate-in fade-in slide-in-from-bottom-1" />
                )}
              </button>
            );
          })}
        </div>
      </div>
 
      {/* Tab content */}
      <div className="mt-8 md:mt-12 w-full max-w-5xl px-4 min-h-75">
 
        {activeTab === "description" && (
          <DescriptionTab description={product.description} />
        )}
 
        {activeTab === "specs" && (
          <SpecificationsTab
            diamondSpecs={product.diamondSpecs}
            metalSpecs={product.metalSpecs}
            material={product.material}
            gemstoneType={product.gemstoneType ?? "none"}
            style={product.style ?? ""}
            sku={product.sku ?? ""}
          />
        )}
 
        {activeTab === "care" && (
          <CareTab gemstoneType={product.gemstoneType ?? "none"} />
        )}
 
        {activeTab === "reviews" && (
          <div className="animate-in fade-in duration-500">
            <ReviewsTab productId={product._id} />
          </div>
        )}
 
      </div>
    </div>
  );
}