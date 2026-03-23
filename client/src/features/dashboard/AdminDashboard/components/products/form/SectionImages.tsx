import { useState } from "react";
import { Image as ImageIcon, Loader2, Plus, X } from "lucide-react";
import type { SectionProps } from "./SectionBasicInfo";
import { uploadImage } from "../../../../../../common/utils/imageUtils";

export default function SectionImages({ formData, onChange }: SectionProps) {
    const [isUploading, setIsUploading] = useState(false);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        try {
            setIsUploading(true);
            const url = await uploadImage(file);
            onChange("primaryImageUrl", url);
        } catch (error) {
            console.error("Upload failed", error);
            alert("Image upload failed. Please try again.");
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <section className="space-y-8 animate-in fade-in duration-500">
            <header>
                <h3 className="text-[10px] uppercase tracking-[0.2em] text-stone-400 font-black">Visual Assets</h3>
                <div className="h-px w-full bg-stone-100 mt-2" />
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Main Hero Asset */}
                <div className="space-y-4">
                    <label className="text-[10px] uppercase tracking-widest text-stone-500 ml-1">Primary Hero</label>
                    <div className="relative group aspect-square rounded-4xl bg-stone-50 border-2 border-dashed border-stone-100 flex items-center justify-center overflow-hidden transition-all hover:border-stone-200">
                        {isUploading ? (
                            <Loader2 className="animate-spin text-stone-300" size={32} />
                        ) : formData.primaryImageUrl ? (
                            <>
                                <img src={formData.primaryImageUrl} className="w-full h-full object-cover" alt="Product" />
                                {/* Using the X icon for a quick delete in the corner */}
                                <button 
                                    onClick={() => onChange("primaryImageUrl", "")}
                                    className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-md rounded-full text-stone-900 opacity-0 group-hover:opacity-100 transition-all hover:scale-110 shadow-sm"
                                >
                                    <X size={16} />
                                </button>
                            </>
                        ) : (
                            <label className="cursor-pointer flex flex-col items-center group p-12 text-center">
                                <div className="p-4 rounded-full bg-white mb-3 shadow-sm group-hover:shadow-md transition-all">
                                    <Plus className="text-stone-400" size={24} />
                                </div>
                                <span className="text-[10px] font-black uppercase tracking-widest text-stone-400">Add Main Image</span>
                                <input type="file" className="hidden" onChange={handleFileChange} accept="image/*" />
                            </label>
                        )}
                    </div>
                </div>

                {/* Gallery Placeholder - Logic for multiple images can go here later */}
                <div className="space-y-4">
                    <label className="text-[10px] uppercase tracking-widest text-stone-500 ml-1">Gallery Preview</label>
                    <div className="grid grid-cols-2 gap-4">
                        {[1, 2].map((i) => (
                            <div key={i} className="aspect-square rounded-3xl bg-stone-50 border border-stone-100 flex flex-col items-center justify-center border-dashed">
                                <ImageIcon size={20} className="text-stone-200 mb-1" />
                                <span className="text-[8px] uppercase tracking-tighter text-stone-300 font-bold">Slot {i}</span>
                            </div>
                        ))}
                    </div>
                    <p className="text-[9px] text-stone-400 italic px-1">Secondary views and lifestyle shots will appear here.</p>
                </div>
            </div>
        </section>
    );
}