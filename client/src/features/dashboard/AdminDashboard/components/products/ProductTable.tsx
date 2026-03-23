import { Pencil, Trash2, Package, Loader2 } from "lucide-react";
import type { AdminProduct } from "../../../shared/types";

interface ProductTableProps {
    products: AdminProduct[];
    onEdit: (product: AdminProduct) => void;
    onDelete: (id: string) => void;
    deletingId: string | null;
    confirmDeleteId: string | null;
    setConfirmDeleteId: (id: string | null) => void;
    isLoading: boolean; 
}

export default function ProductTable({ products, onEdit, onDelete, deletingId, confirmDeleteId, setConfirmDeleteId, isLoading }: ProductTableProps) {
    if (isLoading) {
        return (
            <div className="bg-white border border-stone-100 rounded-4xl p-20 flex flex-col items-center justify-center text-center shadow-sm">
                <Loader2 size={40} className="animate-spin text-stone-200 mb-4" />
                <h3 className="text-lg font-serif italic text-stone-900">Curating Collection...</h3>
            </div>
        );
    }
    
    if(products.length === 0) {
        return (
            <div className="bg-white border border-stone-100 rounded-4xl p-20 flex flex-col items-center justify-center text-center shadow-sm">
                <div className="w-16 h-16 bg-stone-50 rounded-full flex items-center justify-center text-stone-200 mb-4">
                    <Package size={32} />
                </div>
                <h3 className="text-lg font-serif italic text-stone-900">No products found</h3>
                <p className="text-sm text-stone-400 mt-1">Your collection is currently empty.</p>
            </div>
        );
    }

    return (
        <div className="bg-white border border-stone-100 rounded-4xl overflow-hidden shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-700">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="border-b border-stone-50">
                        <th className="px-8 py-5 text-[10px] uppercase tracking-[0.2em] text-stone-400 font-black">Product</th>
                        <th className="px-8 py-5 text-[10px] uppercase tracking-[0.2em] text-stone-400 font-black hidden md:table-cell">Category</th>
                        <th className="px-8 py-5 text-[10px] uppercase tracking-[0.2em] text-stone-400 font-black">Price</th>
                        <th className="px-8 py-5 text-[10px] uppercase tracking-[0.2em] text-stone-400 font-black hidden lg:table-cell">Status</th>
                        <th className="px-8 py-5"></th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-stone-50">
                    {products.map((product) => (
                        <tr key={product._id} className="group hover:bg-stone-50/50 transition-colors">
                            {/* Product Info */}
                            <td className="px-8 py-5">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-2xl overflow-hidden border border-stone-100 bg-stone-50 shrink-0">
                                        {product.primaryImageUrl ? (
                                            <img 
                                                src={product.primaryImageUrl} 
                                                alt={product.name} 
                                                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" 
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-stone-200">
                                                <Package size={16} />
                                            </div>
                                        )}
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-stone-900 tracking-tight">{product.name}</p>
                                        <p className="text-[10px] text-stone-400 uppercase tracking-widest">{product.sku}</p>
                                    </div>
                                </div>
                            </td>

                            {/* Category */}
                            <td className="px-8 py-5 hidden md:table-cell">
                                <span className="text-xs text-stone-500 italic font-serif">
                                {product.category && typeof product.category === 'object' ? product.category.name : 'Uncategorized'}
                                </span>
                            </td>

                            {/* Price */}
                            <td className="px-8 py-5">
                                <span className="text-sm font-semibold text-stone-900">
                                    ${product.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                                </span>
                            </td>

                            {/* Status */}
                            <td className="px-8 py-5 hidden lg:table-cell">
                                <span className={`px-3 py-1 rounded-full text-[9px] uppercase tracking-[0.15em] font-black border ${
                                    product.status === "active" 
                                        ? "bg-stone-50 border-stone-200 text-stone-600" 
                                        : "bg-red-50 border-red-100 text-red-400"
                                }`}>
                                    {product.status}
                                </span>
                            </td>

                            {/* Actions */}
                            <td className="px-8 py-5">
                                <div className="flex items-center justify-end gap-2">
                                    {confirmDeleteId === product._id ? (
                                        <div className="flex items-center gap-2 animate-in fade-in zoom-in-95 duration-200">
                                            <button 
                                                onClick={() => onDelete(product._id)}
                                                disabled={deletingId === product._id}
                                                className="px-3 py-1.5 bg-red-600 text-white text-[9px] uppercase tracking-widest font-black rounded-xl hover:bg-red-700 transition-colors disabled:opacity-50"
                                            >
                                                {deletingId === product._id ? <Loader2 size={10} className="animate-spin" /> : "Confirm"}
                                            </button>
                                            <button 
                                                onClick={() => setConfirmDeleteId(null)}
                                                className="px-3 py-1.5 bg-stone-100 text-stone-500 text-[9px] uppercase tracking-widest font-black rounded-xl hover:bg-stone-200 transition-colors"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    ) : (
                                        <>
                                            <button 
                                                onClick={() => onEdit(product)}
                                                className="w-9 h-9 rounded-xl bg-stone-50 flex items-center justify-center text-stone-400 hover:bg-stone-900 hover:text-white transition-all duration-300"
                                            >
                                                <Pencil size={14} />
                                            </button>
                                            <button 
                                                onClick={() => setConfirmDeleteId(product._id)}
                                                className="w-9 h-9 rounded-xl bg-stone-50 flex items-center justify-center text-stone-400 hover:bg-red-600 hover:text-white transition-all duration-300"
                                            >
                                                <Trash2 size={14} />
                                            </button>
                                        </>
                                    )}
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}