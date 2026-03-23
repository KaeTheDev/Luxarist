import type { AdminProduct } from "../../../../shared/types";

export interface SectionProps {
    formData: Partial<AdminProduct>;
    onChange: <K extends keyof AdminProduct>(field: K, value: AdminProduct[K]) => void;
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
                    {/* Price */}
                    <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest text-stone-500 ml-1">Price (USD)</label>
                        <input 
                            type="number"
                            value={formData.price || ""}
                            // Cast to Number here because the Generic handler 
                            // now strictly requires a number for the "price" key.
                            onChange={(e) => onChange("price", Number(e.target.value))}
                            placeholder="0.00"
                            className="w-full px-5 py-4 bg-stone-50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-stone-200 transition-all"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}