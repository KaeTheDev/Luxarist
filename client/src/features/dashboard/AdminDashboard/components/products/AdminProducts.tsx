import { useState } from "react";
import { Plus, Package, Search } from "lucide-react";
import ProductTable from "./ProductTable";
import ProductForm from "./form/ProductForm";
import { useProducts } from "../../../../../hooks/useProducts";
import type { Product } from "../../../shared/types";

export default function AdminProducts() {
    // Hook replaces all manual fetch, delete, and loading states
    const { products, loading, error, addProduct, editProduct, removeProduct, refresh } = useProducts({ isAdmin: true });
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

     // Track which ID is being deleted for the ProductTable spinner
     const [deletingId, setDeletingId] = useState<string | null>(null);
     const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

    const handleAddProduct = () => {
        setSelectedProduct(null);
        setIsFormOpen(true);
    };

    const handleEditProduct = (product: Product) => {
        setSelectedProduct(product);
        setIsFormOpen(true);
    };

    const handleDelete = async (id: string) => {
        setDeletingId(id);
        try {
            await removeProduct(id);
            setConfirmDeleteId(null);
        } catch (err) {
            console.error("Delete failed", err);
        } finally {
            setDeletingId(null);
        }
    };

    // Simplified Submit Logic
    const handleSubmit = async (data: Partial<Product>) => {
        setIsSubmitting(true);
        try {
            if (selectedProduct) {
                await editProduct(selectedProduct._id, data);
            } else {
                await addProduct(data);
            }
            setIsFormOpen(false);
        } catch (err) {
            console.error("Save failed", err);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <main className="p-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-1">
                    <div className="flex items-center gap-2 text-stone-400 mb-1">
                        <Package size={14} />
                        <span className="text-[10px] uppercase tracking-[0.3em] font-bold">Inventory Management</span>
                    </div>
                    <h1 className="text-4xl font-serif text-stone-900 italic">Collections</h1>
                </div>

                <button 
                    onClick={handleAddProduct}
                    className="flex items-center gap-2 px-8 py-4 bg-stone-900 text-white rounded-2xl hover:bg-stone-800 transition-all shadow-xl shadow-stone-200"
                >
                    <Plus size={18} />
                    <span className="text-xs font-black uppercase tracking-widest">New Piece</span>
                </button>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-6 bg-white border border-stone-100 rounded-4xl flex flex-col justify-center">
                    <span className="text-[10px] uppercase tracking-widest text-stone-400 font-bold mb-1">Total Items</span>
                    <span className="text-2xl font-serif italic text-stone-900">{products.length} Units</span>
                </div>
                <div className="md:col-span-2 relative">
                    <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-stone-300" size={18} />
                    <input 
                        type="text" 
                        placeholder="Search by SKU, Name, or Material..."
                        className="w-full h-full pl-16 pr-8 py-5 bg-white border border-stone-100 rounded-4xl text-sm outline-none"
                    />
                </div>
            </div>

            {error && <p className="text-red-500 font-bold">Error: {error}</p>}

            <ProductTable 
                products={products} 
                onEdit={handleEditProduct}
                onDelete={handleDelete} // Using our new handler above
                isLoading={loading}
                deletingId={deletingId} // Added to satisfy error
                confirmDeleteId={confirmDeleteId}
                setConfirmDeleteId={setConfirmDeleteId}
            />

            <ProductForm 
                isOpen={isFormOpen} 
                onClose={() => setIsFormOpen(false)} 
                initialData={selectedProduct}
                onSubmit={handleSubmit}
                isSubmitting={isSubmitting}
                onSuccess={refresh} // Added to satisfy error and trigger a refresh
            />
        </main>
    );
}