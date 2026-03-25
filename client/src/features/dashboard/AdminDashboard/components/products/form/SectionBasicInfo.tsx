import type { Product } from "../../../../shared/types";

export interface SectionProps {
    formData: Partial<Product>;
    onChange: <K extends keyof Product>(field: K, value: Product[K]) => void;
}

export default function SectionBasicInfo({ formData, onChange } : SectionProps) {
    return (
        <section className="space-y-6">
            <header>
                <h3 className="text-[10px] uppercase tracking-[0.2em] text-stone-400 font-black">General Information</h3>
                <div className="h-px w-full bg-stone-100 mt-2" />
            </header>

            <div className="grid grid-cols-1 gap-6">
                {/* Product Title */}
                <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-stone-500 ml-1">Product Title</label>
                    <input 
                        type="text"
                        value={formData.name || ""}
                        onChange={(e) => onChange("name", e.target.value)}
                        placeholder="e.g. Sovereign Gold Signet"
                        className="w-full px-5 py-4 bg-stone-50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-stone-200 transition-all placeholder:text-stone-300"
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    {/* SKU */}
                    <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest text-stone-500 ml-1">SKU</label>
                        <input 
                            type="text"
                            value={formData.sku || ""}
                            onChange={(e) => onChange("sku", e.target.value)}
                            placeholder="LX-001"
                            className="w-full px-5 py-4 bg-stone-50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-stone-200 transition-all"
                        />
                    </div>

                    {/* Price - Validated to prevent negative values */}
                    <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest text-stone-500 ml-1">Price (USD)</label>
                        <input 
                            type="number"
                            min="0"
                            step="0.01"
                            value={formData.price || ""}
                            onChange={(e) => onChange("price", Math.max(0, Number(e.target.value)) as any)}
                            placeholder="0.00"
                            className="w-full px-5 py-4 bg-stone-50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-stone-200 transition-all"
                        />
                    </div>
                </div>

                {/* Status & Care Logic */}
                <div className="grid grid-cols-2 gap-4 pt-4">
                    {/* Publication Status */}
                    <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest text-stone-500 ml-1">Availability Status</label>
                        <select 
                            value={formData.status || "active"}
                            onChange={(e) => onChange("status", e.target.value as any)}
                            className="w-full px-5 py-4 bg-stone-50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-stone-200 appearance-none transition-all cursor-pointer"
                        >
                            <option value="draft">Draft (Hidden)</option>
                            <option value="active">Active (Live)</option>
                            <option value="archived">Archived (Sold Out)</option>
                        </select>
                    </div>

                    {/* Care Instruction Template */}
                    <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest text-stone-500 ml-1">Care Template</label>
                        <select 
                            value={formData.careTemplateKey || "gold-care"}
                            onChange={(e) => onChange("careTemplateKey", e.target.value)}
                            className="w-full px-5 py-4 bg-stone-50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-stone-200 appearance-none transition-all cursor-pointer"
                        >
                            <option value="gold-care">Standard Gold Care</option>
                            <option value="stone-care">Gemstone & Diamond Care</option>
                            <option value="delicate-care">Delicate / Vintage Care</option>
                        </select>
                    </div>
                </div>
            </div>
        </section>
    );
}