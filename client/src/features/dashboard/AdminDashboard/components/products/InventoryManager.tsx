import { useState, useMemo } from "react";
import { Plus, Package, Search, Filter } from "lucide-react";
import ProductForm from "./form/ProductForm";
import InventoryTable from "./InventoryTable";
import { useProducts } from "../../../../../hooks/useProducts";
import type { Product } from "../../../shared/types";

export default function InventoryManager() {
    const { products, loading, error, addProduct, editProduct, removeProduct, refresh, page, setPage, pagination } = useProducts({ isAdmin: true });

    const [isFormOpen, setIsFormOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    const [deletingId, setDeletingId] = useState<string | null>(null);
    const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

    // Filter products based on Name, SKU, or Material
    const filteredProducts = useMemo(() => {
        if (!Array.isArray(products)) return [];
    
        return products.filter(p =>
            p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.sku?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.metalSpecs?.type?.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [products, searchQuery]);

    const handleAddProduct = () => {
        setSelectedProduct(null);
        setIsFormOpen(true);
    };

    const handleEditProduct = (product: Product) => {
        setSelectedProduct(product);
        setIsFormOpen(true);
    };

    const handleDelete = async(id: string) => {
        setDeletingId(id);
        try {
            await removeProduct(id);
            setConfirmDeleteId(null);
        } catch(err) {
            console.error("Delete failed", err);
        } finally {
            setDeletingId(null);
        }
    };

    const handleSubmit = async(data: Partial<Product>) => {
        setIsSubmitting(true);

        try {
            if(selectedProduct) {
                await editProduct(selectedProduct._id, data);
            } else {
                await addProduct(data);
            }
            setIsFormOpen(false);
            refresh();
        } catch (err) {
            console.error("Save failed", err);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <main className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-1">
                    <div className="flex items-center gap-2 text-stone-400 mb-1">
                        <Package size={14} />
                        <span className="text-[10px] uppercase tracking-[0.3em] font-bold">Stockroom</span>
                    </div>
                    <h1 className="text-4xl font-serif text-stone-900 italic">Inventory</h1>
                </div>

                <button 
                    onClick={handleAddProduct}
                    className="flex items-center gap-2 px-8 py-4 bg-stone-900 text-white rounded-2xl hover:bg-stone-800 transition-all shadow-xl shadow-stone-200 group"
                >
                    <Plus size={18} className="group-hover:rotate-90 transition-transform" />
                    <span className="text-xs font-black uppercase tracking-widest">Add New Piece</span>
                </button>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="p-6 bg-white border border-stone-100 rounded-3xl flex flex-col justify-center">
                    <span className="text-[10px] uppercase tracking-widest text-stone-400 font-bold mb-1">Vault Capacity</span>
                    <span className="text-2xl font-serif italic text-stone-900">{Array.isArray(products) ? products.length : 0} Units</span>
                </div>
                
                <div className="md:col-span-3 relative group flex items-center">
                    <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-stone-300 group-focus-within:text-stone-900 transition-colors" size={18} />
                    <input 
                        type="text" 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search by SKU, Name, or Material..."
                        className="w-full h-full pl-16 pr-20 py-5 bg-white border border-stone-100 rounded-3xl text-sm outline-none focus:border-stone-900/20 transition-all"
                    />
                    {/* The Filter Icon: Positioned on the right side of the input bar */}
                    <button 
                        className="absolute right-6 p-2 text-stone-300 hover:text-stone-900 transition-colors border-l border-stone-100 pl-4"
                        aria-label="Filter"
                    >
                        <Filter size={18} />
                    </button>
                </div>
            </div>

            {error && (
                <div className="p-4 bg-red-50 border border-red-100 rounded-2xl text-red-600 text-xs font-bold uppercase tracking-widest">
                    System Error: {error}
                </div>
            )}

            <InventoryTable 
                products={filteredProducts} 
                onEdit={handleEditProduct}
                onDelete={handleDelete}
                isLoading={loading}
                deletingId={deletingId}
                confirmDeleteId={confirmDeleteId}
                setConfirmDeleteId={setConfirmDeleteId}
            />

<div className="flex justify-center items-center gap-4 mt-6">
  <button
    onClick={() => setPage(page - 1)}
    disabled={page === 1}
    className="px-4 py-2 bg-stone-200 rounded disabled:opacity-50"
  >
    Prev
  </button>

  <span className="text-sm text-stone-600">
    Page {pagination?.page || 1} of {pagination?.pages || 1}
  </span>

  <button
    onClick={() => setPage(page + 1)}
    disabled={page === pagination?.pages}
    className="px-4 py-2 bg-stone-900 text-white rounded disabled:opacity-50"
  >
    Next
  </button>
</div>

            <ProductForm 
                isOpen={isFormOpen} 
                onClose={() => setIsFormOpen(false)} 
                initialData={selectedProduct}
                onSubmit={handleSubmit}
                isSubmitting={isSubmitting}
                onSuccess={refresh}
            />
        </main>
    );
}