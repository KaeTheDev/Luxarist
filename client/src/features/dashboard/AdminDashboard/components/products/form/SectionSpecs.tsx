import type { SectionProps } from "./SectionBasicInfo";
import { CATEGORY_CONFIG, getDropdownOptions, buildSku } from "../../../../../../constants/categoryConfig";

export default function SectionSpecs({ formData, onChange }: SectionProps) {
    // Determine the current category key (fallback to 'ring' if none selected yet)
    // lowercase it to match the CATEGORY_CONFIG keys (ring, bracelet, etc.)
    const categoryName = (formData.category as any)?.name?.toLowerCase() || 'ring';
    
    // Type-safe check to ensure the category exists in our config
    const currentCategory = categoryName in CATEGORY_CONFIG ? (categoryName as keyof typeof CATEGORY_CONFIG) : 'ring';

    // Retrieve dropdown arrays using the helper function
    const materials = getDropdownOptions(currentCategory, 'materials');
    const gemstones = getDropdownOptions(currentCategory, 'gemstoneTypes');
    const styles = getDropdownOptions(currentCategory, 'styles');
    const weights = getDropdownOptions(currentCategory, 'weights');
    const sizes = getDropdownOptions(currentCategory, 'sizes');

    return (
        <section className="space-y-8 animate-in fade-in duration-500">
            <header>
                <h3 className="text-[10px] uppercase tracking-[0.2em] text-stone-400 font-black">Specifications & Craft</h3>
                <div className="h-px w-full bg-stone-100 mt-2" />
            </header>
    
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Dynamic Material Selection */}
                <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-stone-500 ml-1">Material</label>
                    <select 
                        value={formData.material || ""}
                        onChange={(e) => onChange("material", e.target.value)}
                        className="w-full px-5 py-4 bg-stone-50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-stone-200 appearance-none transition-all cursor-pointer"
                    >
                        <option value="">Select Material</option>
                        {materials.map((m) => (
                            <option key={m} value={m}>{m}</option>
                        ))}
                    </select>
                </div>
    
                {/* Dynamic Gemstone Selection */}
                <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-stone-500 ml-1">Gemstone Type</label>
                    <select 
                        value={formData.gemstoneType || ""}
                        onChange={(e) => {
                            const val = e.target.value;
                            onChange("gemstoneType", val);
                            const newSku = buildSku(currentCategory, val);
                            onChange("sku", newSku);
                        }}
                        className="w-full px-5 py-4 bg-stone-50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-stone-200 appearance-none transition-all cursor-pointer"
                    >
                        {gemstones.map((g) => (
                            <option key={g} value={g}>{g}</option>
                        ))}
                    </select>
                </div>
    
                {/* Dynamic Style Selection */}
                <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-stone-500 ml-1">Design Style</label>
                    <select 
                        value={formData.style || ""}
                        onChange={(e) => onChange("style", e.target.value)}
                        className="w-full px-5 py-4 bg-stone-50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-stone-200 appearance-none transition-all cursor-pointer"
                    >
                        {styles.map((s) => (
                            <option key={s} value={s}>{s}</option>
                        ))}
                    </select>
                </div>
    
                {/* Dynamic Weight Selection */}
                <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-stone-500 ml-1">Weight Class</label>
                    <select 
                        value={formData.weightPreset || ""}
                        onChange={(e) => onChange("weightPreset", e.target.value)}
                        className="w-full px-5 py-4 bg-stone-50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-stone-200 appearance-none transition-all cursor-pointer"
                    >
                        {weights.map((w) => (
                            <option key={w} value={w}>{w}</option>
                        ))}
                    </select>
                </div>
            </div>
    
            {/* Sizes Selection (Chip UI) */}
            <div className="space-y-3 pb-8">
                <label className="text-[10px] uppercase tracking-widest text-stone-500 ml-1">Available Sizes</label>
                <div className="flex flex-wrap gap-2">
                    {sizes.map((size) => {
                        const isSelected = formData.sizes?.includes(size);
                        return (
                            <button
                                key={size}
                                type="button"
                                onClick={() => {
                                    const currentSizes = formData.sizes || [];
                                    const newSizes = isSelected 
                                        ? currentSizes.filter(s => s !== size)
                                        : [...currentSizes, size];
                                    onChange("sizes", newSizes);
                                }}
                                className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-tighter transition-all border ${
                                    isSelected 
                                    ? "bg-stone-900 border-stone-900 text-white shadow-lg shadow-stone-200" 
                                    : "bg-stone-50 border-stone-100 text-stone-400 hover:border-stone-200 hover:bg-white"
                                }`}
                            >
                                {size}
                            </button>
                        );
                    })}
                </div>
            </div>
    
            {/* NEW: Gemstone & Metal Precision Fields */}
            <div className="pt-8 border-t border-stone-100 space-y-8 bg-stone-50/30 p-6 rounded-3xl">
                <header>
                    <h3 className="text-[10px] uppercase tracking-[0.2em] text-stone-400 font-black italic">Gemstone & Metal Precision</h3>
                </header>
    
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Diamond/Gemstone Details */}
                    <div className="space-y-4">
                        <h4 className="text-[9px] uppercase tracking-widest font-bold text-stone-900">Technical Diamond Specs</h4>
                        <div className="grid grid-cols-2 gap-3">
                            <input 
                                placeholder="Carat (e.g. 1.25)"
                                value={formData.diamondSpecs?.carat || ""}
                                onChange={(e) => onChange("diamondSpecs", { 
                                    ...(formData.diamondSpecs || {}), 
                                    carat: e.target.value 
                                })}
                                className="p-3 bg-white border border-stone-100 rounded-xl text-xs outline-none focus:border-stone-300 transition-all"
                            />
                            <input 
                                placeholder="Clarity (e.g. VS1)"
                                value={formData.diamondSpecs?.clarity || ""}
                                onChange={(e) => onChange("diamondSpecs", { 
                                    ...(formData.diamondSpecs || {}), 
                                    clarity: e.target.value 
                                })}
                                
                                className="p-3 bg-white border border-stone-100 rounded-xl text-xs outline-none focus:border-stone-300 transition-all"
                            />
                        </div>
                    </div>
    
                    {/* Metal Details */}
                    <div className="space-y-4">
                        <h4 className="text-[9px] uppercase tracking-widest font-bold text-stone-900">Metal Precision</h4>
                        <div className="grid grid-cols-2 gap-3">
                            <input 
                                placeholder="Finish (e.g. Polished)"
                                value={formData.metalSpecs?.finish || ""}
                                onChange={(e) => onChange("metalSpecs", { 
                                    ...(formData.metalSpecs || {}), 
                                    finish: e.target.value 
                                })}
                                className="p-3 bg-white border border-stone-100 rounded-xl text-xs outline-none focus:border-stone-300 transition-all"
                            />
                            <input 
                                placeholder="Setting (e.g. Prong)"
                                value={formData.metalSpecs?.setting || ""}
                                onChange={(e) => onChange("metalSpecs", { 
                                    ...(formData.metalSpecs || {}), 
                                    setting: e.target.value 
                                })}
                                className="p-3 bg-white border border-stone-100 rounded-xl text-xs outline-none focus:border-stone-300 transition-all"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}