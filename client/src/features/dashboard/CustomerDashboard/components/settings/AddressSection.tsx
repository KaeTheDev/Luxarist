import { useState } from "react";
import { MapPin, Plus, Trash2, Check, X, Loader2 } from "lucide-react";
import type { Address } from "../../hooks/useAccountSettings";

interface Status {
    type: "success" | "error" | null;
    message: string;
}

interface Props {
    addresses: Address[];
    addressStatus: Status;
    addressLoading: boolean;
    addAddress: (type: string, address: string, isDefault: boolean) => Promise<void>;
    deleteAddress: (id: string) => Promise<void>;
}

export default function AddressSection({ addresses, addressStatus, addressLoading, addAddress, deleteAddress }: Props) {
    const [showForm, setShowForm] = useState(false);
    const [newAddress, setNewAddress] = useState({ type: "", address: "", isDefault: false });

    const handleAdd = async () => {
        await addAddress(newAddress.type, newAddress.address, newAddress.isDefault);
        setNewAddress({ type: "", address: "", isDefault: false });
        setShowForm(false);
    };

    return (
        <section className="bg-white border border-stone-100 rounded-[2.5rem] p-8 shadow-sm">
            <div className="flex justify-between items-center mb-8 pb-4 border-b border-stone-50">
                <div className="flex items-center gap-3">
                    <MapPin size={18} className="text-stone-400" />
                    <h3 className="text-sm font-semibold text-stone-900">Shipping Addresses</h3>
                </div>
                <button onClick={() => setShowForm(!showForm)}
                    className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold text-stone-400 hover:text-stone-900 transition-colors"
                >
                    <Plus size={12} /> Add New
                </button>
            </div>
            <div className="space-y-4">
                {showForm && (
                    <div className="p-6 border border-dashed border-stone-200 rounded-3xl space-y-4 animate-in fade-in duration-300">
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-[10px] uppercase tracking-widest text-stone-400 font-bold ml-1">Type (e.g. Home, Work)</label>
                                <input type="text" value={newAddress.type}
                                    onChange={(e) => setNewAddress({ ...newAddress, type: e.target.value })}
                                    className="w-full bg-stone-50/50 border border-stone-100 rounded-2xl px-5 py-3 text-sm focus:ring-1 focus:ring-stone-900 transition-all"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] uppercase tracking-widest text-stone-400 font-bold ml-1">Address</label>
                                <input type="text" value={newAddress.address}
                                    onChange={(e) => setNewAddress({ ...newAddress, address: e.target.value })}
                                    className="w-full bg-stone-50/50 border border-stone-100 rounded-2xl px-5 py-3 text-sm focus:ring-1 focus:ring-stone-900 transition-all"
                                />
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <input type="checkbox" id="isDefault" checked={newAddress.isDefault}
                                onChange={(e) => setNewAddress({ ...newAddress, isDefault: e.target.checked })}
                                className="rounded"
                            />
                            <label htmlFor="isDefault" className="text-[10px] uppercase tracking-widest text-stone-400 font-bold">Set as default</label>
                        </div>
                        <div className="flex gap-3">
                            <button onClick={handleAdd} disabled={addressLoading}
                                className="flex items-center gap-2 px-6 py-3 bg-stone-900 text-white text-[10px] uppercase tracking-widest font-bold rounded-xl hover:bg-stone-700 transition-colors disabled:opacity-50"
                            >
                                {addressLoading ? <Loader2 size={12} className="animate-spin" /> : <Check size={12} />}
                                Save Address
                            </button>
                            <button onClick={() => setShowForm(false)}
                                className="flex items-center gap-2 px-6 py-3 bg-stone-50 text-stone-500 text-[10px] uppercase tracking-widest font-bold rounded-xl hover:bg-stone-100 transition-colors"
                            >
                                <X size={12} /> Cancel
                            </button>
                        </div>
                        {addressStatus.type === "error" && <p className="text-red-500 text-xs italic">{addressStatus.message}</p>}
                    </div>
                )}
                {addresses.length === 0 && !showForm ? (
                    <p className="text-stone-400 italic text-sm text-center py-6">No addresses saved yet.</p>
                ) : (
                    addresses.map(addr => (
                        <div key={addr._id} className="p-6 border border-stone-100 rounded-3xl flex justify-between items-start">
                            <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                    <span className="text-sm font-medium text-stone-900">{addr.type}</span>
                                    {addr.isDefault && <span className="bg-stone-900 text-white text-[8px] px-2 py-0.5 rounded-full uppercase tracking-tighter">Default</span>}
                                </div>
                                <p className="text-xs text-stone-500 max-w-xs leading-relaxed">{addr.address}</p>
                            </div>
                            <button onClick={() => deleteAddress(addr._id)} disabled={addressLoading}
                                className="text-stone-300 hover:text-red-500 transition-colors disabled:opacity-50"
                            >
                                <Trash2 size={16} />
                            </button>
                        </div>
                    ))
                )}
            </div>
        </section>
    );
}