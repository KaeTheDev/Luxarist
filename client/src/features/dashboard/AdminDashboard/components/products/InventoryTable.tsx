import { Pencil, Trash2, Package, Loader2, Diamond } from "lucide-react";
import type { Product } from "../../../shared/types";

interface InventoryTableProps {
    products: Product[];
    onEdit: (product: Product) => void;
    onDelete: (id: string) => void;
    deletingId: string | null;
    confirmDeleteId: string | null;
    setConfirmDeleteId: (id: string | null) => void;
    isLoading: boolean;
}

export default function InventoryTable({ products, onEdit, onDelete, deletingId, confirmDeleteId,setConfirmDeleteId, isLoading}: InventoryTableProps) {
    if (isLoading) {
        return (
            <div className="bg-white border border-stone-100 rounded-3xl p-32 flex flex-col items-center justify-center text-center">
                <Loader2 size={32} className="animate-spin text-stone-200 mb-4" />
                <h3 className="text-sm font-serif italic text-stone-400">Consulting Archive...</h3>
            </div>
        );
    }
    
    if(products.length === 0) {
        return (
            <div className="bg-white border border-stone-100 rounded-3xl p-32 flex flex-col items-center justify-center text-center">
                <Package size={32} className="text-stone-100 mb-4" />
                <h3 className="text-lg font-serif italic text-stone-900">Vault is Empty</h3>
                <p className="text-[10px] uppercase tracking-widest text-stone-400 mt-2 font-bold">No pieces match your current criteria</p>
            </div>
        );
    }

    return (
        <div className="bg-white border border-stone-100 rounded-3xl overflow-hidden shadow-sm">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="bg-stone-50/50 border-b border-stone-50">
                        <th className="px-8 py-5 text-[9px] uppercase tracking-[0.25em] text-stone-400 font-black">Piece Details</th>
                        <th className="px-8 py-5 text-[9px] uppercase tracking-[0.25em] text-stone-400 font-black hidden md:table-cell">Material</th>
                        <th className="px-8 py-5 text-[9px] uppercase tracking-[0.25em] text-stone-400 font-black">Valuation</th>
                        <th className="px-8 py-5 text-[9px] uppercase tracking-[0.25em] text-stone-400 font-black hidden lg:table-cell">Status</th>
                        <th className="px-8 py-5"></th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-stone-50">
                    {products.map((product) => (
                        <tr key={product._id} className="group hover:bg-stone-50/30 transition-colors">
                            <td className="px-8 py-6">
                                <div className="flex items-center gap-5">
                                    <div className="w-14 h-14 rounded-2xl overflow-hidden border border-stone-100 bg-stone-50 shrink-0">
                                        <img 
                                            src={product.primaryImageUrl || '/assets/placeholder.jpg'} 
                                            alt={product.name} 
                                            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" 
                                            loading="lazy"
                                        />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-stone-900 tracking-tight">{product.name}</p>
                                        <p className="text-[9px] text-stone-400 uppercase tracking-[0.2em] font-medium mt-0.5">{product.sku || 'No SKU'}</p>
                                    </div>
                                </div>
                            </td>

                            <td className="px-8 py-6 hidden md:table-cell">
                                <div className="flex items-center gap-2">
                                    <span className="text-[10px] uppercase tracking-widest font-bold text-stone-600">
                                        {product.metalSpecs?.purity} {product.metalSpecs?.type}
                                    </span>
                                    {product.diamondSpecs?.carat && (
                                        <div className="flex items-center gap-1 px-2 py-0.5 bg-stone-100 rounded text-[8px] text-stone-500 uppercase font-black">
                                            <Diamond size={8} /> {product.diamondSpecs.carat}ct
                                        </div>
                                    )}
                                </div>
                            </td>

                            <td className="px-8 py-6">
                                <span className="text-sm font-black text-stone-900">
                                    ${product.price.toLocaleString()}
                                </span>
                            </td>

                            <td className="px-8 py-6 hidden lg:table-cell">
                                <span className={`px-3 py-1 rounded-full text-[8px] uppercase tracking-[0.2em] font-black border ${
                                    product.status === "active" 
                                        ? "bg-emerald-50 border-emerald-100 text-emerald-600" 
                                        : "bg-stone-100 border-stone-200 text-stone-400"
                                }`}>
                                    {product.status}
                                </span>
                            </td>

                            <td className="px-8 py-6 text-right">
                                <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                    {confirmDeleteId === product._id ? (
                                        <div className="flex items-center gap-2">
                                            <button 
                                                onClick={() => onDelete(product._id)}
                                                disabled={deletingId === product._id}
                                                className="px-3 py-2 bg-red-600 text-white text-[8px] uppercase tracking-widest font-black rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 min-w-18.75 flex justify-center items-center"
                                            >
                                                {deletingId === product._id ? (
                                                    <Loader2 size={10} className="animate-spin" />
                                                ) : (
                                                    "Confirm"
                                                )}
                                            </button>
                                            <button 
                                                onClick={() => setConfirmDeleteId(null)}
                                                disabled={deletingId === product._id}
                                                className="px-3 py-2 bg-stone-100 text-stone-500 text-[8px] uppercase tracking-widest font-black rounded-lg hover:bg-stone-200 transition-colors disabled:opacity-50"
                                            >
                                                Back
                                            </button>
                                        </div>
                                    ) : (
                                        <>
                                            <button 
                                                onClick={() => onEdit(product)}
                                                className="p-2 text-stone-400 hover:text-stone-900 transition-colors"
                                            >
                                                <Pencil size={16} />
                                            </button>
                                            <button 
                                                onClick={() => setConfirmDeleteId(product._id)}
                                                className="p-2 text-stone-400 hover:text-red-600 transition-colors"
                                            >
                                                <Trash2 size={16} />
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