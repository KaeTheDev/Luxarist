// import { useState } from "react";
// import type { Product } from "../../../types/Product";
// import { CARE_GUIDE } from "../../../constants/careGuide";

// interface ProductDetailsTabsProps {
//   product: Product;
// }

// const TABS = [
//   { id: "description", label: "Description" },
//   { id: "specs", label: "Specifications" },
//   { id: "care", label: "Care Instructions" },
//   { id: "reviews", label: "Reviews" }, // Can be synced with actual review count later
// ];

// export function ProductDetailsTab({ product }: ProductDetailsTabsProps) {
//   const [activeTab, setActiveTab] = useState("description");

//   return (
//     <div className="w-full max-w-5xl mt-16">
//       {/* Tabs Header */}
//       <div className="border-b border-gray-200">
//         <div className="grid grid-cols-4">
//           {TABS.map((tab) => {
//             const isActive = activeTab === tab.id;
//             return (
//               <button
//                 key={tab.id}
//                 onClick={() => setActiveTab(tab.id)}
//                 className={`
//                   relative py-6 text-[11px] font-bold uppercase tracking-[0.2em] transition-all duration-300
//                   ${isActive
//                       ? "text-black"
//                       : "text-gray-400 hover:text-gray-600"}
//                 `}
//               >
//                 {tab.label}
//                 {/* Moving Underline */}
//                 {isActive && (
//                     <div className="absolute botton-0 left-0 right-0 h-0.5 bg-black animate-in slide-in-from-left-full duration-300"></div>
//                 )}
//               </button>
//             );
//           })}
//         </div>
//       </div>

//       {/* Tab Content */}
//       <div className="mt-10 text-sm text-gray-600 leading-relaxed max-w-3xl min-h-50">
//         {/* Description Tab */}
//         {activeTab === "description" && (
//           <div className="space-y-4 animate-in fade-in duration-500">
//             <p className="text-gray-900 font-medium">
//               About the {product.name}
//             </p>
//             <p>
//               {product.description ||
//                 "No description available for this piece."}
//             </p>
//             <p>
//               Each piece in our {product.category.name} collection is
//               meticulously inspected to ensure it meets the Luxarist standard of
//               brilliance.
//             </p>
//           </div>
//         )}

//         {/* Specifications Tab */}
//         {activeTab === "specs" && (
//           <div className="animate-in fade-in duration-500">
//             <ul className="divide-y divide-gray-100 border-t border-b border-gray-100">
//               <li className="py-3 flex justify-between">
//                 <span className="font-medium text-gray-400 uppercase tracking-tighter">
//                   Material
//                 </span>
//                 <span className="text-gray-900 capitalize">
//                   {product.material}
//                 </span>
//               </li>
//               <li className="py-3 flex justify-between">
//                 <span className="font-medium text-gray-400 uppercase tracking-tighter">
//                   Gemstone
//                 </span>
//                 <span className="text-gray-900 capitalize">
//                   {product.gemstoneType || "None"}
//                 </span>
//               </li>
//               <li className="py-3 flex justify-between">
//                 <span className="font-medium text-gray-400 uppercase tracking-tighter">
//                   Weight Class
//                 </span>
//                 <span className="text-gray-900 capitalize">
//                   {product.weightPreset}
//                 </span>
//               </li>
//               <li className="py-3 flex justify-between">
//                 <span className="font-medium text-gray-400 uppercase tracking-tighter">
//                   SKU
//                 </span>
//                 <span className="text-gray-900">{product.sku}</span>
//               </li>
//             </ul>
//           </div>
//         )}

//         {/* Care Tab */}
//         {activeTab === "care" && (
//           <div className="space-y-6 animate-in fade-in duration-500">
//             <div>
//               <h4 className="font-bold text-gray-900 uppercase tracking-widest text-[10px] mb-2">
//                 Material Care: {product.material}
//               </h4>
//               <p>
//                 {CARE_GUIDE[
//                   product.material.toLowerCase() as keyof typeof CARE_GUIDE
//                 ] ||
//                   "Clean with a soft, dry cloth and store in a cool, dry place away from direct sunlight."}
//               </p>
//             </div>

//             {product.gemstoneType && (
//               <div>
//                 <h4 className="font-bold text-gray-900 uppercase tracking-widest text-[10px] mb-2">
//                   Gemstone Care: {product.gemstoneType}
//                 </h4>
//                 <p>
//                   {CARE_GUIDE[
//                     product.gemstoneType.toLowerCase() as keyof typeof CARE_GUIDE
//                   ] ||
//                     "Ensure your gemstones remain vibrant by avoiding ultrasonic cleaners unless specified by a professional."}
//                 </p>
//               </div>
//             )}

//             <div className="pt-4 border-t border-gray-100 flex gap-4 items-center italic text-xs text-gray-400">
//               <span>Pro Tip:</span>
//               <span>
//                 Always remove jewelry before sleeping, swimming, or exercising
//                 to ensure its longevity.
//               </span>
//             </div>
//           </div>
//         )}
//         {/* Reviews Tab */}
//         {activeTab === "reviews" && (
//           <div className="flex flex-col space-y-6 animate-in fade-in duration-500">
//             <div className="border-b border-gray-50 pb-6">
//               <div className="flex items-center justify-between mb-2">
//                 <span className="text-yellow-500 text-lg">★★★★★</span>
//                 <span className="text-xs text-gray-400">March 7, 2026</span>
//               </div>
//               <p className="font-bold text-gray-900">Verified Purchase</p>
//               <p className="italic text-gray-500 mt-2">
//                 "The {product.name} exceeded my expectations. The light hits the
//                 {product.gemstoneType || "metal"} perfectly."
//               </p>
//               <p className="mt-4 text-xs font-bold uppercase tracking-widest text-gray-400">
//                 — Alexandra J.
//               </p>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

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
            <p>{product.description || "A masterpiece of modern craftsmanship..."}</p>
            <p>Each piece is crafted by master artisans with over 30 years of experience in fine jewelry making, ensuring every detail meets the Luxarist standard of excellence.</p>
          </div>
        )}

        {/* SPECIFICATIONS TAB - Updated for new Data Structure */}
        {activeTab === "specs" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-10 animate-in fade-in duration-500">
            
            {/* Gemstone/Diamond Column - Only shows if diamondSpecs exists */}
            {product.diamondSpecs ? (
              <div className="space-y-4">
                <h3 className="font-bold text-xs uppercase tracking-widest mb-4 border-b border-gray-100 pb-2">Gemstone Details</h3>
                <div className="space-y-3 text-sm">
                  <SpecRow label="Carat Weight" value={product.diamondSpecs.carat} />
                  <SpecRow label="Cut Grade" value={product.diamondSpecs.cut} />
                  <SpecRow label="Color" value={product.diamondSpecs.color} />
                  <SpecRow label="Clarity" value={product.diamondSpecs.clarity} />
                  {product.diamondSpecs.stones && <SpecRow label="Additional Stones" value={product.diamondSpecs.stones} />}
                </div>
              </div>
            ) : (
              <div className="hidden md:block">
                <h3 className="font-bold text-xs uppercase tracking-widest mb-4 border-b border-gray-100 pb-2">Information</h3>
                <p className="text-sm text-gray-400 italic">No gemstone specifications for this item.</p>
              </div>
            )}

            {/* Metal/Product Column - Dynamic based on category */}
            <div className="space-y-4">
              <h3 className="font-bold text-xs uppercase tracking-widest mb-4 border-b border-gray-100 pb-2">
                {product.category.name === "watch" ? "Movement & Build" : "Material Details"}
              </h3>
              <div className="space-y-3 text-sm">
                {product.metalSpecs ? (
                  <>
                    <SpecRow label="Material" value={product.metalSpecs.type} />
                    <SpecRow label="Weight" value={product.metalSpecs.weight} />
                    {product.metalSpecs.movement && <SpecRow label="Movement" value={product.metalSpecs.movement} />}
                    {product.metalSpecs.width && <SpecRow label="Width" value={product.metalSpecs.width} />}
                    {product.metalSpecs.finish && <SpecRow label="Finish" value={product.metalSpecs.finish} />}
                    {product.metalSpecs.waterResistance && <SpecRow label="Water Resistance" value={product.metalSpecs.waterResistance} />}
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
              <h3 className="font-bold text-xs uppercase tracking-widest">Material Care: {product.material}</h3>
              <p className="text-gray-600 italic text-sm leading-relaxed">
                {CARE_GUIDE[product.material.toLowerCase() as keyof typeof CARE_GUIDE] || 
                 "To maintain brilliance, clean with a soft, lint-free cloth and store in a cool, dry place."}
              </p>
            </div>
            {product.gemstoneType && product.gemstoneType !== "none" && (
              <div className="space-y-3">
                <h3 className="font-bold text-xs uppercase tracking-widest">Gemstone Care: {product.gemstoneType}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                   {CARE_GUIDE[product.gemstoneType.toLowerCase() as keyof typeof CARE_GUIDE] || 
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
                <div className="flex text-black text-lg my-2 justify-center">★★★★★</div>
                <p className="text-gray-500 text-xs">Based on 3 reviews</p>
              </div>
              <div className="flex-1 w-full max-w-md space-y-2">
                {[5, 4, 3, 2, 1].map((star) => (
                  <div key={star} className="flex items-center gap-4 text-xs">
                    <span className="w-4">{star}★</span>
                    <div className="flex-1 h-px bg-gray-200 relative">
                      {star === 5 && <div className="absolute inset-0 bg-black w-full" />}
                    </div>
                    <span className="text-gray-400 w-8 text-right">{star === 5 ? "(3)" : "(0)"}</span>
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

function SpecRow({ label, value }: { label: string; value: string }) {
  if (!value) return null;
  return (
    <div className="flex justify-between border-b border-gray-50 pb-2">
      <span className="text-gray-500">{label}:</span>
      <span className="font-medium text-black text-right">{value}</span>
    </div>
  );
}

function ReviewItem({ name, date, title, body }: { name: string, date: string, title: string, body: string }) {
  return (
    <div className="pt-8 first:pt-0">
      <div className="flex justify-between items-center mb-1">
        <div className="flex text-black text-[10px] space-x-0.5">
          <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
        </div>
        <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{date}</span>
      </div>
      <p className="font-bold text-sm text-black">{name}</p>
      <p className="font-semibold text-xs text-gray-800 mt-1">{title}</p>
      <p className="text-gray-600 text-sm leading-relaxed mt-2">{body}</p>
    </div>
  );
}