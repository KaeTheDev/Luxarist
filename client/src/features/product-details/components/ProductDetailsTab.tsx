import { useState } from "react";
import type { Product } from "../../../types/Product";
import { CARE_GUIDE } from "../../../constants/careGuide";

interface ProductDetailsTabsProps {
  product: Product;
}

const TABS = [
  { id: "description", label: "Description" },
  { id: "specs", label: "Specifications" },
  { id: "care", label: "Care Instructions" },
  { id: "reviews", label: "Reviews (3)" },
];

export function ProductDetailsTab({ product }: ProductDetailsTabsProps) {
  const [activeTab, setActiveTab] = useState("description");

  // If product is missing or still loading, show a placeholder
  if (!product)
    return <div className="p-10 text-center">Loading specifications...</div>;

  return (
    <div className="w-full flex flex-col items-center">
      {/* Tabs Header */}
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

      {/* Tab Content Area */}
      <div className="mt-8 md:mt-12 w-full max-w-5xl px-4 min-h-75">
        {/* DESCRIPTION TAB */}
        {activeTab === "description" && (
          <div className="space-y-6 text-gray-700 leading-relaxed max-w-4xl animate-in fade-in duration-500 text-sm md:text-base">
            <p>
              {product.description ||
                "A masterpiece of modern craftsmanship..."}
            </p>
            <p>
              Each piece is crafted by master artisans with over 30 years of
              experience in fine jewelry making, ensuring every detail meets the
              Luxarist standard of excellence.
            </p>
          </div>
        )}

        {/* SPECIFICATIONS TAB - Updated for new Data Structure */}
        {activeTab === "specs" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-10 animate-in fade-in duration-500">
            {/* Gemstone/Diamond Column - Only shows if diamondSpecs exists */}
            {product.diamondSpecs &&
            Object.keys(product.diamondSpecs).length > 0 ? (
              <div className="space-y-4">
                <h3 className="font-bold text-xs uppercase tracking-widest mb-4 border-b border-gray-100 pb-2">
                  Gemstone Details
                </h3>
                <div className="space-y-3 text-sm">
                  <SpecRow
                    label="Carat Weight"
                    value={product.diamondSpecs.carat}
                  />
                  <SpecRow label="Cut" value={product.diamondSpecs.cut} />
                  <SpecRow label="Color" value={product.diamondSpecs.color} />
                  <SpecRow
                    label="Clarity"
                    value={product.diamondSpecs.clarity}
                  />
                </div>
              </div>
            ) : (
              <div className="hidden md:block">
                <h3 className="font-bold text-xs uppercase tracking-widest mb-4 border-b border-gray-100 pb-2">
                  Information
                </h3>
                <p className="text-sm text-gray-400 italic">
                  No gemstone specifications for this item.
                </p>
              </div>
            )}

            {/* Metal/Product Column - Dynamic based on category */}
            <div className="space-y-4">
              <h3 className="font-bold text-xs uppercase tracking-widest mb-4 border-b border-gray-100 pb-2">
                {product.category.name === "watch"
                  ? "Movement & Build"
                  : "Material Details"}
              </h3>
              <div className="space-y-3 text-sm">
                {product.metalSpecs ? (
                  <>
                    <SpecRow label="Material" value={product.metalSpecs.type} />
                    <SpecRow label="Weight" value={product.metalSpecs.weight} />
                    {product.metalSpecs.movement && (
                      <SpecRow
                        label="Movement"
                        value={product.metalSpecs.movement}
                      />
                    )}
                    {product.metalSpecs.width && (
                      <SpecRow label="Width" value={product.metalSpecs.width} />
                    )}
                    {product.metalSpecs.finish && (
                      <SpecRow
                        label="Finish"
                        value={product.metalSpecs.finish}
                      />
                    )}
                    {product.metalSpecs.waterResistance && (
                      <SpecRow
                        label="Water Resistance"
                        value={product.metalSpecs.waterResistance}
                      />
                    )}
                  </>
                ) : (
                  <SpecRow label="Material" value={product.material} />
                )}
                <SpecRow label="SKU" value={product.sku || "N/A"} />
              </div>
            </div>
          </div>
        )}

        {/* CARE INSTRUCTIONS TAB */}
        {activeTab === "care" && (
          <div className="space-y-8 animate-in fade-in duration-500 max-w-3xl">
            <div className="space-y-3">
              <h3 className="font-bold text-xs uppercase tracking-widest">
                Material Care: {product.material}
              </h3>
              <p className="text-gray-600 italic text-sm leading-relaxed">
                {CARE_GUIDE[
                  product.material.toLowerCase() as keyof typeof CARE_GUIDE
                ] ||
                  "To maintain brilliance, clean with a soft, lint-free cloth and store in a cool, dry place."}
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

        {/* REVIEWS TAB */}
        {activeTab === "reviews" && (
          <div className="animate-in fade-in duration-500 space-y-10">
            <div className="flex flex-col md:flex-row gap-8 md:gap-16 items-center md:items-start border-b pb-10">
              <div className="text-center">
                <h2 className="text-6xl font-medium">5.0</h2>
                <div className="flex text-black text-lg my-2 justify-center">
                  ★★★★★
                </div>
                <p className="text-gray-500 text-xs">Based on 3 reviews</p>
              </div>
              <div className="flex-1 w-full max-w-md space-y-2">
                {[5, 4, 3, 2, 1].map((star) => (
                  <div key={star} className="flex items-center gap-4 text-xs">
                    <span className="w-4">{star}★</span>
                    <div className="flex-1 h-px bg-gray-200 relative">
                      {star === 5 && (
                        <div className="absolute inset-0 bg-black w-full" />
                      )}
                    </div>
                    <span className="text-gray-400 w-8 text-right">
                      {star === 5 ? "(3)" : "(0)"}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-8 divide-y divide-gray-100">
              <ReviewItem
                name="Sarah M."
                date="December 10, 2025"
                title="Absolutely Stunning"
                body="This piece exceeded all my expectations. The craftsmanship is impeccable and the light hits it perfectly."
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function SpecRow({ label, value }: { label: string; value: string | number }) {
  if (value === undefined || value === null || value === "") return null;
  return (
    <div className="flex justify-between border-b border-gray-50 pb-2">
      <span className="text-gray-500">{label}:</span>
      <span className="font-medium text-black text-right">{String(value)}</span>
    </div>
  );
}

function ReviewItem({
  name,
  date,
  title,
  body,
}: {
  name: string;
  date: string;
  title: string;
  body: string;
}) {
  return (
    <div className="pt-8 first:pt-0">
      <div className="flex justify-between items-center mb-1">
        <div className="flex text-black text-[10px] space-x-0.5">
          <span>★</span>
          <span>★</span>
          <span>★</span>
          <span>★</span>
          <span>★</span>
        </div>
        <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
          {date}
        </span>
      </div>
      <p className="font-bold text-sm text-black">{name}</p>
      <p className="font-semibold text-xs text-gray-800 mt-1">{title}</p>
      <p className="text-gray-600 text-sm leading-relaxed mt-2">{body}</p>
    </div>
  );
}
