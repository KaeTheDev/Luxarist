import type { SectionProps } from "./SectionBasicInfo";

export default function SectionSpecs({ formData, onChange }: SectionProps) {
    return (
        <section className="space-y-6">
            <header>
                <h3 className="text-[10px] uppercase tracking-[0.2em] text-stone-400 font-black">Specifications & Craft</h3>
                <div className="h-px w-full bg-stone-100 mt-2" />
            </header>

            <div className="grid grid-cols-2 gap-6">
                {/* Material Dropdown */}
                <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-stone-500 ml-1">Material</label>
                    <select 
                        value={formData.material || ""}
                        onChange={(e) => onChange("material", e.target.value)}
                        className="w-full px-5 py-4 bg-stone-50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-stone-200 appearance-none"
                    >
                        <option value="">Select Material</option>
                        <option value="18k Gold">18k Gold</option>
                        <option value="925 Sterling Silver">925 Sterling Silver</option>
                        <option value="Platinum">Platinum</option>
                    </select>
                </div>

                {/* Gemstone */}
                <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-stone-500 ml-1">Gemstone</label>
                    <input 
                        type="text"
                        value={formData.gemstoneType || ""}
                        onChange={(e) => onChange("gemstoneType", e.target.value)}
                        placeholder="e.g. VVS Diamond"
                        className="w-full px-5 py-4 bg-stone-50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-stone-200"
                    />
                </div>

                {/* Weight Preset */}
                <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-stone-500 ml-1">Weight Class</label>
                    <input 
                        type="text"
                        value={formData.weightPreset || ""}
                        onChange={(e) => onChange("weightPreset", e.target.value)}
                        placeholder="e.g. 12g Heavyweight"
                        className="w-full px-5 py-4 bg-stone-50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-stone-200"
                    />
                </div>

                {/* Style */}
                <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-stone-500 ml-1">Style</label>
                    <input 
                        type="text"
                        value={formData.style || ""}
                        onChange={(e) => onChange("style", e.target.value)}
                        placeholder="e.g. Minimalist"
                        className="w-full px-5 py-4 bg-stone-50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-stone-200"
                    />
                </div>
            </div>
        </section>
    );
}