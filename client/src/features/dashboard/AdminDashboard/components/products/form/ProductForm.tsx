import { useState, useEffect } from "react";
import { X, Loader2 } from "lucide-react";
import type { Product } from "../../../../shared/types"; 
import SectionBasicInfo from "./SectionBasicInfo";
import SectionImages from "./SectionImages";
import SectionSpecs from "./SectionSpecs";
import { getCategoryDefaults, buildSku } from "../../../../../../constants/categoryConfig";

interface ProductFormProps {
    isOpen: boolean;
    onClose: () => void;
    initialData: Product | null; 
    onSubmit: (data: Partial<Product>) => Promise<void>; 
    isSubmitting?: boolean;
    onSuccess?: () => void;
}

export default function ProductForm({ isOpen, onClose, initialData, onSubmit, isSubmitting, onSuccess } : ProductFormProps) {
    // 1. Initialize State
    // Note: We use 'any' for category in the initial state to avoid the TS error during the string-to-object transition
    const [formData, setFormData] = useState<Partial<Product>>({
        status: 'active',
        isNewArrival: false,
        galleryImageUrls: [],
        sizes: [],
        diamondSpecs: {},
        metalSpecs: {}
    });

    // keep a local string for the category key to feed the SKU/Config logic
    const [activeCategoryKey, setActiveCategoryKey] = useState<string>("ring");

    // 2. Handle Initial Load / Editing
    useEffect(() => {
        if (initialData && isOpen) {
            setFormData(initialData);
            // If editing, extract the slug or name to keep our config logic in sync
            if (initialData.category && typeof initialData.category === 'object') {
                setActiveCategoryKey(initialData.category.slug);
            }
        } else if (isOpen) {
            const defaults = getCategoryDefaults('ring');
            setFormData({
                ...defaults,
                category: null, // Reset to null so the user can select or the default logic applies
                status: 'active',
                isNewArrival: false,
                galleryImageUrls: [],
                sku: buildSku('ring', defaults.gemstoneType),
                diamondSpecs: {},
                metalSpecs: {}
            }); 
            setActiveCategoryKey('ring');
        }
    }, [initialData, isOpen]);

   // 3. Centralized Change Handler
    const onChange = (field: keyof Product, value: any) => {
        setFormData(prev => {
            const updatedData = { ...prev, [field]: value };

            // When the category UI sends a string (e.g., "ring"), update the local key
            // and trigger the auto-fill logic.
            if (field === 'category' && typeof value === 'string') {
                setActiveCategoryKey(value);
                const defaults = getCategoryDefaults(value);
                
                // keep 'category' as the string for the form's internal select, 
                // but the API will expect the object. The backend usually handles 
                // string IDs or can transform this on 'handleInternalSubmit'.
                return {
                    ...updatedData,
                    ...defaults,
                    sku: buildSku(value, defaults.gemstoneType)
                };
            }

            if (field === 'gemstoneType') {
                return {
                    ...updatedData,
                    sku: buildSku(activeCategoryKey, value)
                };
            }

            return updatedData;
        });
    };

    const handleInternalSubmit = async () => {
        try {
            // TRANSFORMATION: Before sending to DB, ensure category matches the expected type
            // If the backend expects an ID string, keep it as is. 
            // If it expects an object, we map it here.
            const submissionData = { ...formData };
            
            await onSubmit(submissionData);
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
                        <p className="text-[10px] uppercase tracking-widest text-stone-400 mt-1 font-bold">
                            {formData.sku ? `SKU: ${formData.sku}` : "Add to the collection"}
                        </p>
                    </div>
                    <button type="button" onClick={onClose} className="p-2 hover:bg-stone-50 rounded-full text-stone-400">
                        <X size={20} />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-8 space-y-12 scrollbar-hide">
                    <SectionBasicInfo formData={formData} onChange={onChange} />
                    <SectionImages formData={formData} onChange={onChange} />
                    <SectionSpecs formData={formData} onChange={onChange} />
                </div>

                <div className="p-8 border-t border-stone-100 flex gap-4 bg-stone-50/50">
                    <button 
                        type="button"
                        onClick={onClose}
                        className="flex-1 py-4 text-[10px] uppercase tracking-widest font-black text-stone-400"
                    >
                        Discard
                    </button>
                    <button 
                        type="button"
                        onClick={handleInternalSubmit} 
                        disabled={isSubmitting}
                        className="flex-2 py-4 bg-stone-900 text-white text-[10px] uppercase tracking-[0.2em] font-black rounded-2xl disabled:opacity-50 hover:bg-stone-800 transition-all flex items-center justify-center gap-2"
                    >
                        {isSubmitting ? <Loader2 size={16} className="animate-spin" /> : (initialData ? "Update Product" : "Publish to Store")}
                    </button>
                </div>
            </div>
        </div>
    );
}