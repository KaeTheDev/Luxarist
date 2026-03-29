import { MapPin, CreditCard, Package } from "lucide-react";
import type { Order } from "../../../shared/types";

interface OrderDetailsProps { order: Order; }

export default function CustomerOrderDetails({ order }: OrderDetailsProps) {
  return (
    <div className="space-y-8 pb-12 animate-in fade-in slide-in-from-bottom-2 duration-500">
      
      {/* 1. Header & Status */}
      <div className="bg-white border border-stone-100 p-8 rounded-[2.5rem] shadow-sm flex flex-col md:flex-row justify-between items-start gap-4">
        <div>
          <p className="text-[10px] text-stone-400 uppercase tracking-[0.2em] font-bold">Ref No.</p>
          <h3 className="text-xl font-semibold text-stone-900">#{order.orderNumber || order._id.toUpperCase()}</h3>
          <p className="text-xs text-stone-400 mt-1 italic">
            Acquired on {new Date(order.orderDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
        </div>
        <span className={`px-5 py-2 rounded-full text-[10px] uppercase tracking-widest font-black border ${
          order.status === 'Delivered' 
            ? 'bg-stone-50 border-stone-200 text-stone-500' 
            : 'bg-stone-900 border-stone-900 text-white'
        }`}>
          {order.status}
        </span>
      </div>

      {/* 2. Acquisition Summary (Items) */}
      <div className="bg-white border border-stone-100 p-8 rounded-[2.5rem] shadow-sm space-y-6">
        <h4 className="text-[10px] text-stone-400 uppercase tracking-widest font-bold border-b border-stone-50 pb-4">Acquisition Summary</h4>
        
        <div className="space-y-6">
          {order.items?.map((item, idx) => (
            <div key={idx} className="flex justify-between items-center group">
              <div className="flex gap-4 items-center">
                <div className="w-16 h-16 bg-stone-50 rounded-2xl overflow-hidden border border-stone-100 flex items-center justify-center shrink-0">
                  {item.image ? (
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  ) : (
                    <Package size={20} className="text-stone-300" />
                  )}
                </div>
                <div>
                  <p className="text-sm font-semibold text-stone-900">{item.name}</p>
                  <p className="text-xs text-stone-400 font-medium italic">Qty: {item.quantity}</p>
                </div>
              </div>
              <p className="text-sm font-semibold text-stone-900">${item.subtotal.toLocaleString()}</p>
            </div>
          ))}
        </div>

        <div className="pt-6 border-t border-stone-50 space-y-3">
          <div className="flex justify-between text-sm text-stone-500">
            <span>Subtotal</span>
            <span>${order.total.toLocaleString()}.00</span>
          </div>
          <div className="flex justify-between text-sm text-stone-500">
            <span>Logistic Fee</span>
            <span className="italic text-stone-400">Complimentary</span>
          </div>
          <div className="flex justify-between text-lg font-semibold text-stone-900 pt-4 border-t border-stone-100">
            <span>Total</span>
            <span>${order.total.toLocaleString()}.00</span>
          </div>
        </div>
      </div>

      {/* 3. Logistics & Payment Bento */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white border border-stone-100 p-6 rounded-4xl flex gap-4 transition-all hover:border-stone-200">
          <div className="w-12 h-12 rounded-2xl bg-stone-50 flex items-center justify-center text-stone-400 shrink-0"><MapPin size={20} /></div>
          <div>
            <p className="text-[10px] text-stone-400 uppercase tracking-widest font-bold mb-1">Shipping Destination</p>
            <p className="text-sm text-stone-500 leading-relaxed font-light">
              {order.shippingAddress ? (
                <>
                  {order.shippingAddress.street}<br />
                  {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zip}
                </>
              ) : "Information on file"}
            </p>
          </div>
        </div>

        <div className="bg-white border border-stone-100 p-6 rounded-4xl flex gap-4 transition-all hover:border-stone-200">
          <div className="w-12 h-12 rounded-2xl bg-stone-50 flex items-center justify-center text-stone-400 shrink-0"><CreditCard size={20} /></div>
          <div>
            <p className="text-[10px] text-stone-400 uppercase tracking-widest font-bold mb-1">Payment Method</p>
            <p className="text-sm text-stone-500 font-light italic">
              {order.paymentMethod || "Secured Card Transaction"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}