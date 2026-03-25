import { useState, useEffect } from "react";
import { X, Loader2 } from "lucide-react";
import type { Product } from "../../../../shared/types"; 
import SectionBasicInfo from "./SectionBasicInfo";
import SectionImages from "./SectionImages";
import SectionSpecs from "./SectionSpecs";

interface ProductFormProps {
    isOpen: boolean;
    onClose: () => void;
    initialData: Product | null; 
    onSubmit: (data: Partial<Product>) => Promise<void>; 
    isSubmitting?: boolean;
    onSuccess?: () => void; // Made optional just in case
}

export default function ProductForm({ isOpen, onClose, initialData, onSubmit, isSubmitting, onSuccess } : ProductFormProps) {
    // 1. Initialize with specific defaults to satisfy TypeScript
    const [formData, setFormData] = useState<Partial<Product>>({
        status: 'active',
        isNewArrival: false,
        galleryImageUrls: [],
        sizes: [],
        diamondSpecs: {},
        metalSpecs: {}
    });

    useEffect(() => {
        if (initialData && isOpen) {
            setFormData(initialData);
        } else if (isOpen) {
            setFormData({
                status: 'active',
                isNewArrival: false,
                galleryImageUrls: [],
                sizes: [],
                diamondSpecs: {},
                metalSpecs: {}
            }); 
        }
    }, [initialData, isOpen]);

   // 2. Centralized Change Handler 
    const onChange = (field: keyof Product, value: any) => {
        setFormData(prev => ({ 
            ...prev, 
            [field]: value 
        }));
    };

    const handleInternalSubmit = async () => {
        try {
            await onSubmit(formData);
            if (onSuccess) onSuccess(); 
            onClose(); 
        } catch (error) {
            console.error("Submission failed in Form:", error);
        }
    };

    if(!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex justify-end bg-stone-900/20 backdrop-blur-sm">
            <div className="w-full max-w-2xl bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-500">
                
                <div className="px-8 py-6 border-b border-stone-100 flex items-center justify-between">
                    <div>
                        <h2 className="text-xl font-serif italic text-stone-900">
                            {initialData ? "Edit Product" : "New Creation"}
                        </h2>
                        <p className="text-[10px] uppercase tracking-widest text-stone-400 mt-1">
                            {initialData ? `Editing SKU: ${initialData.sku}` : "Add to the collection"}
                        </p>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-stone-50 rounded-full text-stone-400">
                        <X size={20} />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-8 space-y-12">
                    {/* IMPORTANT: Ensure these components expect Partial<Product> */}
                    <SectionBasicInfo formData={formData} onChange={onChange} />
                    <SectionImages formData={formData} onChange={onChange} />
                    <SectionSpecs formData={formData} onChange={onChange} />
                </div>

                <div className="p-8 border-t border-stone-100 flex gap-4 bg-stone-50/50">
                    <button 
                        onClick={onClose}
                        className="flex-1 py-4 text-[10px] uppercase tracking-widest font-black text-stone-400"
                    >
                        Discard
                    </button>
                    <button 
                        onClick={handleInternalSubmit} 
                        disabled={isSubmitting}
                        className="flex-2 py-4 bg-stone-900 text-white text-[10px] uppercase tracking-[0.2em] font-black rounded-2xl disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                        {isSubmitting ? <Loader2 size={16} className="animate-spin" /> : (initialData ? "Update Product" : "Publish to Store")}
                    </button>
                </div>
            </div>
        </div>
    );
}