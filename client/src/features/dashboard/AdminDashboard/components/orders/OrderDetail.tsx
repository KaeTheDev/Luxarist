import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { API_URL, getAuthHeaders } from "../../../../../api/config";
import type { Order } from "../../../shared/types";
import { useAuth } from "../../../../../context/AuthContext";
import { ChevronLeft, Package, User, CreditCard } from "lucide-react";
import Toast from "../../../../../common/ui/Toast";

export default function OrderDetail() {
    const { id } = useParams();
    const { token } = useAuth();
    const navigate = useNavigate();
    
    const [order, setOrder] = useState<Order | null>(null);
    const [status, setStatus] = useState("");
    const [updating, setUpdating] = useState(false);
    const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const res = await fetch(`${API_URL}/admin/orders/${id}`, {
                    headers: getAuthHeaders(token)
                });
                if (res.ok) {
                    const data = await res.json();
                    setOrder(data);
                    setStatus(data.status);
                }
            } catch (err) {
                setToast({ message: "Failed to connect to manifest server.", type: "error" });
            }
        };
        if (token) fetchOrder();
    }, [id, token]);

    const handleUpdateStatus = async () => {
        setUpdating(true);
        try {
            const res = await fetch(`${API_URL}/admin/orders/${id}`, {
                method: "PUT",
                headers: {
                    ...getAuthHeaders(token),
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ status })
            });

            if (res.ok) {
                const updatedOrder = await res.json();
                setOrder(updatedOrder);
                setToast({ message: "Acquisition Status Synchronized", type: "success" });
                setTimeout(() => setToast(null), 4000);
            } else {
                setToast({ message: "Update rejected by server.", type: "error" });
            }
        } catch (error) {
            setToast({ message: "Network synchronization error.", type: "error" });
        } finally {
            setUpdating(false);
        }
    };

    if (!order) return <div className="p-20 text-center font-serif italic text-stone-400">Loading Manifest...</div>;

    return (
        <div className="max-w-4xl mx-auto p-6 md:p-10 space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

            {/* Navigation */}
            <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] font-black text-stone-400 hover:text-stone-900 transition-colors">
                <ChevronLeft size={14} /> Back to Ledger
            </button>

            {/* Header */}
            <header className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-stone-100 pb-10 gap-4">
                <div>
                    <h2 className="text-4xl font-serif italic text-stone-900">Order #{order.orderNumber}</h2>
                    <p className="text-[10px] uppercase tracking-widest text-stone-400 font-bold mt-2">
                        Recorded: {new Date(order.orderDate).toLocaleDateString()}
                    </p>
                </div>
                <div className={`px-6 py-2 rounded-none text-[9px] uppercase tracking-[0.2em] font-black border ${
                    order.status === 'Pending' ? 'bg-amber-50 border-amber-100 text-amber-700' : 'bg-stone-900 text-white border-stone-900'
                }`}>
                    {order.status}
                </div>
            </header>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                    { icon: User, label: "Client", val: `${order.customerFirstName} ${order.customerLastName}`, sub: order.customerEmail },
                    { icon: Package, label: "Acquisition", val: new Date(order.orderDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }), sub: "Verified Timestamp" },
                    { icon: CreditCard, label: "Investment", val: `$${order.total.toLocaleString(undefined, { minimumFractionDigits: 2 })}`, sub: `via ${order.paymentMethod || 'Secure'}` }
                ].map((card, i) => (
                    <div key={i} className="bg-white border border-stone-100 p-8 rounded-none shadow-sm space-y-4">
                        <card.icon size={20} className="text-stone-300" />
                        <div>
                            <p className="text-[9px] uppercase tracking-[0.2em] text-stone-400 font-bold mb-1">{card.label}</p>
                            <p className="text-sm font-black text-stone-900">{card.val}</p>
                            <p className="text-[10px] text-stone-400 font-light italic mt-1">{card.sub}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Items Manifest (Mobile Scrollable Table) */}
            <div className="bg-white border border-stone-100 rounded-none overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left min-w-125">
                        <thead className="bg-stone-50 border-b border-stone-100">
                            <tr>
                                <th className="px-8 py-5 text-[9px] uppercase tracking-[0.2em] text-stone-400 font-bold">Product Item</th>
                                <th className="px-8 py-5 text-[9px] uppercase tracking-[0.2em] text-stone-400 font-bold">Qty</th>
                                <th className="px-8 py-5 text-[9px] uppercase tracking-[0.2em] text-stone-400 font-bold text-right">Subtotal</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-stone-50">
                            {order.items.map((item, i) => (
                                <tr key={i} className="hover:bg-stone-50/50 transition-colors">
                                    <td className="px-8 py-8 text-sm font-medium text-stone-900">{item.name}</td>
                                    <td className="px-8 py-8 text-sm text-stone-500 font-light">{item.quantity} Units</td>
                                    <td className="px-8 py-8 text-sm font-black text-stone-900 text-right">
                                        ${item.price.toLocaleString()}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Management Section (Sharp Stacking Design) */}
{/* Management Section - Stacked Controls for Perfect Alignment */}
<div className="bg-[#141414] p-8 md:p-14 rounded-none flex flex-col lg:flex-row justify-between items-center lg:items-end gap-10 shadow-2xl mt-12">
    
    {/* Text Section */}
    <div className="text-center lg:text-left space-y-3">
        <h4 className="text-white font-serif italic text-3xl tracking-tight leading-tight">
            Modify Acquisition <br className="hidden lg:block" /> Status
        </h4>
        <p className="text-stone-500 text-[9px] uppercase tracking-[0.3em] font-bold">
            Logistics Management Protocol
        </p>
    </div>
    
    {/* Stacked Control Group */}
    <div className="flex flex-col gap-3 w-full sm:w-72 lg:w-80">
        {/* Dropdown Wrapper */}
        <div className="relative h-13.75">
            <select 
                value={status} 
                onChange={(e) => setStatus(e.target.value)}
                className="w-full h-full bg-stone-900/50 border border-stone-800 text-white text-[10px] uppercase tracking-[0.2em] font-black px-6 appearance-none cursor-pointer focus:border-white transition-all text-center"
            >
                {['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'].map(s => (
                    <option key={s} value={s} className="bg-stone-900 text-white">{s}</option>
                ))}
            </select>
            <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-stone-600 text-[10px]">
                ↓
            </div>
        </div>
        
        {/* Update Button */}
        <button 
            onClick={handleUpdateStatus}
            disabled={updating}
            className="w-full h-13.75 bg-white text-stone-900 text-[10px] uppercase tracking-[0.2em] font-black rounded-none hover:bg-stone-100 transition-all active:scale-[0.98] disabled:opacity-50"
        >
            {updating ? "Syncing..." : "Update Manifest"}
        </button>
    </div>
</div>
        </div>
    );
}