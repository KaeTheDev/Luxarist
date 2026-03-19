import { MapPin, CreditCard, Package } from "lucide-react";
import type { Order } from "../../shared/types";
import StatusStep from "./StatusStep";

interface OrderDetailsProps {
    order: Order;
}

export default function OrderDetails({ order }: OrderDetailsProps) {
    return(
        <div className="space-y-8 pb-12 animate-in fade-in slide-in--from-bottom-2 duration-500">
            {/* Status Timeline Card */}
            <div className="bg-white border border-stone-100 p-8 rounded-[2.5rem] shadow-sm">
                <div className="flex justify-between items-start mb-10">
                <div>
            <p className="text-[10px] text-stone-400 uppercase tracking-[0.2em] font-bold">Details for</p>
            <h3 className="text-xl font-semibold text-stone-900">{order.id}</h3>
          </div>
          <span className="px-5 py-2 rounded-full bg-stone-900 text-white text-[10px] uppercase tracking-widest font-black">
            {order.status}
          </span>
                </div>

                {/* Vertical Timeline */}
                <div className="space-y-8 relative before:absolute before:left-2.75 before:top-2 before:bottom-2 before:w-px before:bg-stone-100">
          <StatusStep 
            title="Order Placed" 
            date={order.date} 
            completed={true} 
          />
          <StatusStep 
            title="Processing" 
            date={order.status === 'Pending' ? "Awaiting confirmation" : "Confirmed"} 
            completed={order.status !== 'Pending'} 
          />
          <StatusStep 
            title="Shipped" 
            date={['Shipped', 'Delivered'].includes(order.status) ? "In Transit" : "Preparing for dispatch"} 
            completed={['Shipped', 'Delivered'].includes(order.status)} 
          />
          <StatusStep 
            title="Delivered" 
            date={order.status === 'Delivered' ? "Arrived at destination" : "Arrival"} 
            completed={order.status === 'Delivered'} 
            isLast={true}
          />
            </div>
        </div>

        {/* Order Summary & Totals */}
        <div className="bg-white border border-stone-100 p-8 rounded-[2.5rem] shadow-sm space-y-6">
        <h4 className="text-[10px] text-stone-400 uppercase tracking-widest font-bold border-b border-stone-50 pb-4">
            Acquisition Summary
        </h4>
        {/* Placeholder for items - needs to be wired to order.items */}
        <div className="flex justify-between items-center group">
          <div className="flex gap-4 items-center">
            <div className="w-16 h-16 bg-stone-50 rounded-2xl flex items-center justify-center text-[10px] text-stone-300 uppercase tracking-tighter">
              <Package size={20} />
            </div>
            <div>
              <p className="text-sm font-semibold text-stone-900">Solaire Statement Necklace</p>
              <p className="text-xs text-stone-400 font-medium italic">High Jewelry • Qty: 1</p>
            </div>
          </div>
          <p className="text-sm font-semibold text-stone-900">${order.total.toLocaleString()}</p>
        </div>

        <div className="pt-6 border-t border-stone-50 space-y-3">
          <div className="flex justify-between text-sm text-stone-500">
            <span>Subtotal</span>
            <span>${order.total.toLocaleString()}.00</span>
          </div>
          <div className="flex justify-between text-sm text-stone-500">
            <span>Shipping</span>
            <span className="italic">Complimentary</span>
          </div>
          <div className="flex justify-between text-lg font-semibold text-stone-900 pt-2 border-t border-stone-50">
            <span>Total</span>
            <span>${order.total.toLocaleString()}.00</span>
          </div>
        </div>
      </div>

      {/* Logistics Bento Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white border border-stone-100 p-6 rounded-4xl flex gap-4 transition-all hover:border-stone-200">
          <div className="w-12 h-12 rounded-2xl bg-stone-50 flex items-center justify-center text-stone-400 shrink-0">
            <MapPin size={20} />
          </div>
          <div className="space-y-1">
            <p className="text-[10px] text-stone-400 uppercase tracking-widest font-bold">Shipping Address</p>
            <p className="text-sm text-stone-500 leading-relaxed font-light">
              123 Luxury Way<br/>Beverly Hills, CA 90210
            </p>
          </div>
        </div>

        <div className="bg-white border border-stone-100 p-6 rounded-4xl flex gap-4 transition-all hover:border-stone-200">
          <div className="w-12 h-12 rounded-2xl bg-stone-50 flex items-center justify-center text-stone-400 shrink-0">
            <CreditCard size={20} />
          </div>
          <div className="space-y-1">
            <p className="text-[10px] text-stone-400 uppercase tracking-widest font-bold">Payment Method</p>
            <p className="text-sm text-stone-500 font-light italic">Visa ending in •••• 4242</p>
          </div>
        </div>
      </div>
        </div>
    )
}