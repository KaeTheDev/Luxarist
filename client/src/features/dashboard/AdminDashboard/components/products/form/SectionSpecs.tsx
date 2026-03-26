import type { SectionProps } from "./SectionBasicInfo";
import { CATEGORY_CONFIG, getDropdownOptions, buildSku } from "../../../../../../constants/categoryConfig";
import { SpecSelect, SpecInput } from "./FormUI";

export default function SectionSpecs({ formData, onChange }: SectionProps) {
  const categoryName = (formData.category as any)?.name?.toLowerCase() || "ring";
  const currentCategory = categoryName in CATEGORY_CONFIG ? (categoryName as keyof typeof CATEGORY_CONFIG) : "ring";

  // Logic: Only show Diamond specs if a gemstone is selected and it's not "None"
  const hasGemstone = formData.gemstoneType && formData.gemstoneType !== "None";

  return (
    <section className="space-y-8 animate-in fade-in duration-500">
      <header>
        <h3 className="text-[10px] uppercase tracking-[0.2em] text-stone-400 font-black">Specifications & Craft</h3>
        <div className="h-px w-full bg-stone-100 mt-2" />
      </header>

      {/* Dynamic Dropdowns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SpecSelect label="Material" value={formData.material} options={getDropdownOptions(currentCategory, "materials")} onChange={(val) => onChange("material", val)} />
        <SpecSelect label="Gemstone" value={formData.gemstoneType} options={getDropdownOptions(currentCategory, "gemstoneTypes")} onChange={(val) => { onChange("gemstoneType", val); onChange("sku", buildSku(currentCategory, val)); }} />
        <SpecSelect label="Design Style" value={formData.style} options={getDropdownOptions(currentCategory, "styles")} onChange={(val) => onChange("style", val)} />
        <SpecSelect label="Weight Class" value={formData.weightPreset} options={getDropdownOptions(currentCategory, "weights")} onChange={(val) => onChange("weightPreset", val)} />
      </div>

      {/* Sizes Chip UI */}
      <div className="space-y-3 pb-8">
        <label className="text-[10px] uppercase tracking-widest text-stone-500 ml-1">Available Sizes</label>
        <div className="flex flex-wrap gap-2">
          {getDropdownOptions(currentCategory, "sizes").map((size) => {
            const currentSizes = formData.sizes || [];
            const isSelected = currentSizes.includes(size);
            return (
              <button key={size} type="button" onClick={() => onChange("sizes", isSelected ? currentSizes.filter(s => s !== size) : [...currentSizes, size])} className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-tighter transition-all border ${isSelected ? "bg-stone-900 border-stone-900 text-white shadow-lg" : "bg-stone-50 border-stone-100 text-stone-400"}`}>
                {size}
              </button>
            );
          })}
        </div>
      </div>

      {/* Precision Fields: Simplified & Conditional */}
      <div className="pt-8 border-t border-stone-100 space-y-8 bg-stone-50/30 p-8 rounded-4xl">
        <header className="flex justify-between items-center">
          <h3 className="text-[10px] uppercase tracking-[0.2em] text-stone-400 font-black italic">Technical Precision</h3>
          <span className="text-[8px] uppercase tracking-widest text-stone-300 font-bold">Optional Details</span>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Conditional Diamond Specs: Only shows if a Gemstone is selected */}
          {hasGemstone ? (
            <div className="space-y-4 animate-in fade-in slide-in-from-left-2 duration-300">
              <h4 className="text-[9px] uppercase tracking-widest font-bold text-stone-900">Gemstone Details</h4>
              <div className="grid grid-cols-2 gap-3">
                <SpecInput placeholder="Carat" value={formData.diamondSpecs?.carat} onChange={(val) => onChange("diamondSpecs", { ...formData.diamondSpecs, carat: val })} />
                <SpecInput placeholder="Clarity" value={formData.diamondSpecs?.clarity} onChange={(val) => onChange("diamondSpecs", { ...formData.diamondSpecs, clarity: val })} />
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center border-2 border-dashed border-stone-100 rounded-3xl p-6">
              <p className="text-[9px] uppercase tracking-widest text-stone-300 font-bold">No Gemstone Selected</p>
            </div>
          )}

          <div className="space-y-4">
            <h4 className="text-[9px] uppercase tracking-widest font-bold text-stone-900">Metal Specs</h4>
            <div className="grid grid-cols-2 gap-3">
              <SpecInput placeholder="Purity (e.g. 18k)" value={formData.metalSpecs?.purity} onChange={(val) => onChange("metalSpecs", { ...formData.metalSpecs, purity: val })} />
              <SpecInput placeholder="Finish" value={formData.metalSpecs?.finish} onChange={(val) => onChange("metalSpecs", { ...formData.metalSpecs, finish: val })} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}