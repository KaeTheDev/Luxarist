import { CreditCard } from "lucide-react";

const payments = [
    { id: 1, brand: "Visa", last4: "4532", expiry: "12/26" }
];

export default function PaymentSection() {
    return (
        <section className="bg-white border border-stone-100 rounded-[2.5rem] p-8 shadow-sm">
            <div className="flex justify-between items-center mb-8 pb-4 border-b border-stone-50">
                <div className="flex items-center gap-3">
                    <CreditCard size={18} className="text-stone-400" />
                    <h3 className="text-sm font-semibold text-stone-900">Payment Methods</h3>
                </div>
                <span className="text-[10px] uppercase tracking-widest font-bold text-stone-300 italic">Coming Soon</span>
            </div>
            {payments.map(pay => (
                <div key={pay.id} className="p-6 border border-stone-100 rounded-3xl flex items-center gap-4 opacity-40">
                    <div className="w-10 h-6 bg-stone-50 rounded border border-stone-100 flex items-center justify-center text-[10px] font-bold italic text-stone-400">{pay.brand}</div>
                    <div>
                        <p className="text-sm font-medium text-stone-900">•••• •••• •••• {pay.last4}</p>
                        <p className="text-[10px] text-stone-400 uppercase tracking-widest">Expires {pay.expiry}</p>
                    </div>
                </div>
            ))}
        </section>
    );
}