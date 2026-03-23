import { useState, useEffect } from "react";
import { Plus, Package, Search } from "lucide-react";
import ProductTable from "./ProductTable";
import ProductForm from "./form/ProductForm";
import type { AdminProduct } from "../../../shared/types";

export default function AdminProducts() {
    const [products, setProducts] = useState<AdminProduct[]>([]);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<AdminProduct | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    
    // State for delete orchestration
    const [deletingId, setDeletingId] = useState<string | null>(null);
    const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const fetchProducts = async () => {
        setIsLoading(true);
        try {
            const response = await fetch("/api/products");
            if (!response.ok) throw new Error("Failed to fetch collections");
            const data = await response.json();
            setProducts(data);
        } catch (error) {
            console.error("Error loading products:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleAddProduct = () => {
        setSelectedProduct(null);
        setIsFormOpen(true);
    };

    const handleEditProduct = (product: AdminProduct) => {
        setSelectedProduct(product);
        setIsFormOpen(true);
    };

    const handleDelete = async (id: string) => {
        setDeletingId(id);
        try {
            const response = await fetch(`/api/products/${id}`, { method: 'DELETE' });
            if (response.ok) {
                setProducts(prev => prev.filter(p => p._id !== id));
                setConfirmDeleteId(null);
            }
        } catch (error) {
            console.error("Delete failed:", error);
        } finally {
            setDeletingId(null);
        }
    };

    const handleSubmit = async (data: Partial<AdminProduct>) => {
        setIsSubmitting(true);
        try {
            const method = selectedProduct ? 'PUT' : 'POST';
            const url = selectedProduct ? `/api/products/${selectedProduct._id}` : '/api/products';
            
            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                await fetchProducts(); // Refresh list
                setIsFormOpen(false);
            }
        } catch (error) {
            console.error("Save failed:", error);
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

            <ProductTable 
                products={products} 
                onEdit={handleEditProduct}
                onDelete={handleDelete}
                deletingId={deletingId}
                confirmDeleteId={confirmDeleteId}
                setConfirmDeleteId={setConfirmDeleteId}
                isLoading={isLoading}
            />

            <ProductForm 
                isOpen={isFormOpen} 
                onClose={() => setIsFormOpen(false)} 
                initialData={selectedProduct}
                onSubmit={handleSubmit}
                isSubmitting={isSubmitting}
                onSuccess={fetchProducts}
            />
        </main>
    );
}