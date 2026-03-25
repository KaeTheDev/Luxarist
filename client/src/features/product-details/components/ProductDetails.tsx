import React from "react";
import { Award, ShieldCheck, Diamond, Zap } from "lucide-react";
import type { Product } from "../../dashboard/shared/types";

export function ProductDetails({ product }: { product: Product }) {
  // We build the array dynamically so we don't show "N/A" or empty rows
  const details = [
    { label: "SKU", value: product.sku },
    { label: "Material", value: product.material, capitalize: true },
    { label: "Purity", value: product.metalSpecs?.purity },
    { label: "Finish", value: product.metalSpecs?.finish, capitalize: true },
    { label: "Gemstone", value: product.gemstoneType, capitalize: true },
    // Only add Carat/Clarity if they exist in the diamondSpecs object
    ...(product.diamondSpecs?.carat ? [{ label: "Carat Weight", value: `${product.diamondSpecs.carat}ct` }] : []),
    ...(product.diamondSpecs?.clarity ? [{ label: "Clarity Grade", value: product.diamondSpecs.clarity }] : []),
    { label: "Weight Class", value: product.weightPreset },
  ].filter(item => item.value && item.value !== "None"); // Remove any "None" or undefined values

  return (
    <div className="text-sm space-y-6 border-t border-stone-100 pt-8">
      <p className="font-black text-stone-900 uppercase tracking-[0.3em] text-[10px] mb-8">
        Technical Specifications
      </p>
      
      <div className="grid grid-cols-2 gap-y-5">
      {details.map((item) => (
  <React.Fragment key={item.label}>
    <span className="text-stone-400 font-bold uppercase text-[9px] tracking-widest self-center flex items-center gap-2">
      {/* If the label is Gemstone, show the Diamond icon */}
      {item.label === "Gemstone" && <Diamond size={10} className="text-stone-300" />}
      {item.label}
    </span>
    <span className={`text-stone-900 font-bold text-right ${item.capitalize ? 'capitalize' : ''}`}>
      {item.value}
    </span>
  </React.Fragment>
))}
      </div>

      <div className="space-y-6 pt-10 mt-4 border-t border-stone-50">
        <Badge 
          icon={<Award size={18} className="text-stone-400" />} 
          title="Certified Authority" 
          desc="Each piece is accompanied by a digital Certificate of Authenticity and GIA grading where applicable." 
        />
        <Badge 
          icon={<ShieldCheck size={18} className="text-stone-400" />} 
          title="Lifetime Warranty" 
          desc="Our commitment to craft includes comprehensive coverage for any manufacturing refinements." 
        />
        <Badge 
          icon={<Zap size={18} className="text-stone-400" />} 
          title="Ethical Sourcing" 
          desc="Materials are sourced exclusively from conflict-free regions with documented chain of custody." 
        />
      </div>
    </div>
  );
}

function Badge({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="flex gap-5 items-start group">
      <div className="w-12 h-12 bg-stone-50 rounded-2xl shrink-0 flex items-center justify-center group-hover:bg-white group-hover:shadow-sm transition-all duration-500">
        {icon}
      </div>
      <div className="space-y-1">
        <p className="font-black text-stone-900 text-[10px] uppercase tracking-widest">{title}</p>
        <p className="text-stone-500 text-[11px] leading-relaxed font-medium">{desc}</p>
      </div>
    </div>
  );
}