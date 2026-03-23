import { useEffect, useState } from "react";
import { X, Loader2 } from "lucide-react";
import type { AdminProduct } from "../../../../shared/types";

interface ProductFormProps {
    isOpen: boolean;
    onClose: () => void;
    initialData: AdminProduct | null;
    onSubmit: (data: Partial<AdminProduct>) => void;
    isSubmitting?: boolean;
}

export default function ProductForm({ isOpen, onClose, initialData, onSubmit, isSubmitting } : ProductFormProps) {
    // Initialize state with initialData or empty defaults
    const [formData, setFormData] = useState<Partial<AdminProduct>>({});

    useEffect(() => {
        if(initialData) {
            setFormData(initialData);
        } else {
            setFormData({}); // Reset for new products
        }
    }, [initialData, isOpen]);

    // Centralized Change Handler
    const handleChange = <K extends keyof AdminProduct>(field: K, value: AdminProduct[K]) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    if(!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex justify-end bg-stone-900/20 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="w-full max-w-2xl bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-500 ease-out">
                
                <div className="px-8 py-6 border-b border-stone-100 flex items-center justify-between">
                    <div>
                        <h2 className="text-xl font-serif italic text-stone-900">
                            {initialData ? "Edit Product" : "New Creation"}
                        </h2>
                        <p className="text-[10px] uppercase tracking-widest text-stone-400 mt-1">
                            {initialData ? `Editing SKU: ${initialData.sku}` : "Add to the collection"}
                        </p>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-stone-50 rounded-full transition-colors text-stone-400">
                        <X size={20} />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-8 space-y-12">
                    {/* 3. Pass state and handler to sub-sections */}
                    {/* <SectionBasicInfo formData={formData} onChange={handleChange} /> */}
                </div>

                <div className="p-8 border-t border-stone-100 flex gap-4 bg-stone-50/50">
                    <button 
                        onClick={onClose}
                        type="button"
                        className="flex-1 py-4 text-[10px] uppercase tracking-widest font-black text-stone-400 hover:text-stone-900 transition-colors"
                    >
                        Discard
                    </button>
                    <button 
                        onClick={() => onSubmit(formData)}
                        disabled={isSubmitting}
                        className="flex-2 py-4 bg-stone-900 text-white text-[10px] uppercase tracking-[0.2em] font-black rounded-2xl hover:bg-stone-800 transition-all shadow-lg shadow-stone-200 flex items-center justify-center gap-2"
                    >
                        {isSubmitting ? (
                            <Loader2 size={16} className="animate-spin" />
                        ) : (
                            initialData ? "Update Product" : "Publish to Store"
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}