import { Image as ImageIcon, Plus, X } from "lucide-react";
import type { SectionProps } from "./SectionBasicInfo";

export default function SectionImages({ formData, onChange }: SectionProps) {
    return (
        <section className="space-y-6">
            <header>
                <h3 className="text-[10px] uppercase tracking-[0.2em] text-stone-400 font-black">Visual Assets</h3>
                <div className="h-px w-full bg-stone-100 mt-2" />
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Primary Image */}
                <div className="space-y-4">
                    <label className="text-[10px] uppercase tracking-widest text-stone-500 ml-1">Hero Image URL</label>
                    <div className="aspect-square rounded-4xl bg-stone-50 border-2 border-dashed border-stone-100 flex flex-col items-center justify-center overflow-hidden group relative">
                        {formData.primaryImageUrl ? (
                            <>
                                <img src={formData.primaryImageUrl} alt="Preview" className="w-full h-full object-cover" />
                                <button 
                                    onClick={() => onChange("primaryImageUrl", "")}
                                    className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur-md rounded-full text-stone-900 opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                    <X size={16} />
                                </button>
                            </>
                        ) : (
                            <div className="text-center p-6">
                                <ImageIcon className="mx-auto text-stone-200 mb-2" size={32} />
                                <input 
                                    type="text"
                                    placeholder="Paste URL..."
                                    className="bg-transparent text-center text-xs border-none focus:ring-0 w-full placeholder:text-stone-300"
                                    onChange={(e) => onChange("primaryImageUrl", e.target.value)}
                                />
                            </div>
                        )}
                    </div>
                </div>

                {/* Placeholder for Gallery logic */}
                <div className="space-y-4">
                    <label className="text-[10px] uppercase tracking-widest text-stone-500 ml-1">Gallery Collection</label>
                    <div className="grid grid-cols-2 gap-4">
                        {[0, 1].map((i) => (
                            <div key={i} className="aspect-square rounded-2xl bg-stone-50 border border-stone-100 flex items-center justify-center text-stone-200">
                                <Plus size={20} />
                            </div>
                        ))}
                    </div>
                    <p className="text-[9px] text-stone-400 italic">Multi-image upload logic coming in next iteration.</p>
                </div>
            </div>
        </section>
    );
}