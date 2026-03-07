import React from "react";
import { Award, ShieldCheck } from "lucide-react";
import type { Product } from "../../../types/Product";

export function ProductDetails({ product }: { product: Product }) {
  const details = [
    { label: "SKU", value: product.sku },
    { label: "Material", value: product.material, capitalize: true },
    { label: "Gemstone", value: product.gemstoneType || "None", capitalize: true },
    { label: "Weight", value: product.weightPreset || "N/A" },
  ];

  return (
    <div className="text-sm space-y-6 border-t pt-8">
      <p className="font-bold text-gray-800 uppercase tracking-[0.2em] text-[10px]">Product Details</p>
      
      <div className="grid grid-cols-2 gap-y-4">
        {details.map((item) => (
          <React.Fragment key={item.label}>
            <span className="text-gray-400 font-medium">{item.label}:</span>
            <span className={`text-gray-900 font-semibold text-right ${item.capitalize ? 'capitalize' : ''}`}>
              {item.value}
            </span>
          </React.Fragment>
        ))}
      </div>

      <div className="space-y-6 pt-6 border-t border-gray-50">
        <Badge icon={<Award size={20} />} title="Certified Authority" desc="Comes with a certificate of authenticity and GIA grading report." />
        <Badge icon={<ShieldCheck size={20} />} title="Lifetime Warranty" desc="Comprehensive coverage for manufacturing defects." />
      </div>
    </div>
  );
}

function Badge({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="flex gap-4 items-start">
      <div className="w-10 h-10 bg-gray-100 shrink-0 flex items-center justify-center text-gray-400">{icon}</div>
      <div>
        <p className="font-semibold text-gray-900 text-sm">{title}</p>
        <p className="text-gray-500 text-xs leading-normal">{desc}</p>
      </div>
    </div>
  );
}