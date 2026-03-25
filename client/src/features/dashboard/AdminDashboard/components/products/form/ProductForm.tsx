import { useEffect, useState } from "react";
import { X, Loader2 } from "lucide-react";
import type { Product } from "../../../../shared/types"; 
import SectionBasicInfo from "./SectionBasicInfo";
import SectionImages from "./SectionImages";
import SectionSpecs from "./SectionSpecs";

interface ProductFormProps {
    isOpen: boolean;
    onClose: () => void;
    initialData: Product | null; 
    onSubmit: (data: Partial<Product>) => Promise<void>; // This should be a Promise
    isSubmitting?: boolean;
    onSuccess: () => void;
}

export default function ProductForm({ isOpen, onClose, initialData, onSubmit, isSubmitting, onSuccess } : ProductFormProps) {
    // 2. State now strictly follows the unified Product blueprint
    const [formData, setFormData] = useState<Partial<Product>>({});

    useEffect(() => {
        if(initialData) {
            setFormData(initialData);
        } else {
            setFormData({
                status: 'active', // Default for new creations
                diamondSpecs: {},
                metalSpecs: {}
            }); 
        }
    }, [initialData, isOpen]);

    // 3. Centralized Change Handler updated for Product type
    const handleChange = <K extends keyof Product>(field: K, value: Product[K]) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleInternalSubmit = async () => {
        try {
            // Await the actual database save
            await onSubmit(formData);
            
            // Only trigger success (closing the form/refreshing) if the save worked
            onSuccess(); 
            onClose(); 
        } catch (error) {
            console.error("Submission failed in Form:", error);
        }
    };

    if(!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex justify-end bg-stone-900/20 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="w-full max-w-2xl bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-500 ease-out">
                
                {/* Header Section */}
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

                {/* Scrollable Form Content */}
                <div className="flex-1 overflow-y-auto p-8 space-y-12">
                    <SectionBasicInfo formData={formData} onChange={handleChange} />
                    <SectionImages formData={formData} onChange={handleChange} />
                    <SectionSpecs formData={formData} onChange={handleChange} />
                </div>

                {/* Footer Actions */}
                <div className="p-8 border-t border-stone-100 flex gap-4 bg-stone-50/50">
                    <button 
                        onClick={onClose}
                        type="button"
                        className="flex-1 py-4 text-[10px] uppercase tracking-widest font-black text-stone-400 hover:text-stone-900 transition-colors"
                    >
                        Discard
                    </button>
                    <button 
                        onClick={handleInternalSubmit} 
                        disabled={isSubmitting}
                        className="flex-2 py-4 bg-stone-900 text-white text-[10px] uppercase tracking-[0.2em] font-black rounded-2xl hover:bg-stone-800 transition-all shadow-lg shadow-stone-200 flex items-center justify-center gap-2 disabled:opacity-50"
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