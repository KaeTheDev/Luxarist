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
import { CARE_GUIDE } from "../../../constants/careGuide";
import { ReviewsTab } from "./ReviewsTab";

interface ProductDetailsTabProps {
  product: Product;
}

export function ProductDetailsTab({ product }: ProductDetailsTabProps) {
  const [activeTab, setActiveTab] = useState("description");

  if (!product)
    return <div className="p-10 text-center">Loading specifications...</div>;
 
  // ── Tab definitions — Reviews label is dynamic ─────────────────────────────
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
 
      {/* ── Tabs Header ──────────────────────────────────────────────────────── */}
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
 
      {/* ── Tab Content ──────────────────────────────────────────────────────── */}
      <div className="mt-8 md:mt-12 w-full max-w-5xl px-4 min-h-75">
 
        {/* DESCRIPTION TAB */}
        {activeTab === "description" && (
          <div className="space-y-6 text-gray-700 leading-relaxed max-w-4xl animate-in fade-in duration-500 text-sm md:text-base">
            <p>
              {product.description || "A masterpiece of modern craftsmanship..."}
            </p>
            <p>
              Each piece is crafted by master artisans with over 30 years of
              experience in fine jewelry making, ensuring every detail meets the
              Luxarist standard of excellence.
            </p>
          </div>
        )}
 
        {/* SPECIFICATIONS TAB */}
        {activeTab === "specs" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-10 animate-in fade-in duration-500">
            {/* Gemstone / Diamond Column */}
            {product.diamondSpecs &&
            Object.keys(product.diamondSpecs).length > 0 ? (
              <div className="space-y-3">
                <h3 className="font-bold text-xs uppercase tracking-widest">
                  Diamond Specifications
                </h3>
                <div className="space-y-2">
                  <SpecRow label="Carat Weight" value={product.diamondSpecs.carat} />
                  <SpecRow label="Cut"          value={product.diamondSpecs.cut} />
                  <SpecRow label="Color"        value={product.diamondSpecs.color} />
                  <SpecRow label="Clarity"      value={product.diamondSpecs.clarity} />
                  <SpecRow label="Halo"         value={product.diamondSpecs.halo} />
                  <SpecRow label="Stones"       value={product.diamondSpecs.stones} />
                </div>
              </div>
            ) : null}
 
            {/* Metal / Construction Column */}
            {product.metalSpecs &&
            Object.keys(product.metalSpecs).length > 0 ? (
              <div className="space-y-3">
                <h3 className="font-bold text-xs uppercase tracking-widest">
                  Metal Specifications
                </h3>
                <div className="space-y-2">
                  <SpecRow label="Metal Type"       value={product.metalSpecs.type} />
                  <SpecRow label="Weight"           value={product.metalSpecs.weight} />
                  <SpecRow label="Finish"           value={product.metalSpecs.finish} />
                  <SpecRow label="Setting"          value={product.metalSpecs.setting} />
                  <SpecRow label="Width"            value={product.metalSpecs.width} />
                  <SpecRow label="Length"           value={product.metalSpecs.length} />
                  <SpecRow label="Clasp"            value={product.metalSpecs.clasp} />
                  <SpecRow label="Movement"         value={product.metalSpecs.movement} />
                  <SpecRow label="Water Resistance" value={product.metalSpecs.waterResistance} />
                  <SpecRow label="Crystal"          value={product.metalSpecs.glass} />
                  <SpecRow label="Strap"            value={product.metalSpecs.strap} />
                  <SpecRow label="Battery"          value={product.metalSpecs.battery} />
                </div>
              </div>
            ) : null}
 
            {/* Shared attributes always visible */}
            <div className="space-y-3">
              <h3 className="font-bold text-xs uppercase tracking-widest">
                Product Details
              </h3>
              <div className="space-y-2">
                <SpecRow label="Material"  value={product.material} />
                <SpecRow label="Gemstone"  value={product.gemstoneType !== "none" ? product.gemstoneType : undefined} />
                <SpecRow label="Style"     value={product.style} />
                <SpecRow label="SKU"       value={product.sku} />
              </div>
            </div>
          </div>
        )}
 
        {/* CARE INSTRUCTIONS TAB */}
        {activeTab === "care" && (
          <div className="space-y-8 max-w-3xl animate-in fade-in duration-500">
            <div className="space-y-3">
              <h3 className="font-bold text-xs uppercase tracking-widest">
                General Care
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {CARE_GUIDE["general"]}
              </p>
            </div>
            {product.gemstoneType && product.gemstoneType !== "none" && (
              <div className="space-y-3">
                <h3 className="font-bold text-xs uppercase tracking-widest">
                  Gemstone Care: {product.gemstoneType}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {CARE_GUIDE[
                    product.gemstoneType.toLowerCase() as keyof typeof CARE_GUIDE
                  ] ||
                    "Avoid harsh chemicals and ultrasonic cleaners for delicate gemstones."}
                </p>
              </div>
            )}
          </div>
        )}
 
        {/* REVIEWS TAB — fully delegated to ReviewsTab */}
        {activeTab === "reviews" && (
          <div className="animate-in fade-in duration-500">
            <ReviewsTab productId={product._id} />
          </div>
        )}
 
      </div>
    </div>
  );
}
 
// ─────────────────────────────────────────────────────────────────────────────
// Shared utilities
// ─────────────────────────────────────────────────────────────────────────────
 
function SpecRow({ label, value }: { label: string; value?: string | number }) {
  if (value === undefined || value === null || value === "") return null;
  return (
    <div className="flex justify-between border-b border-gray-50 pb-2">
      <span className="text-gray-500">{label}:</span>
      <span className="font-medium text-black text-right">{String(value)}</span>
    </div>
  );
}