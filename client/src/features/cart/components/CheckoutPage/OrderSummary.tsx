/**
 * Purpose: Renders the order summary sidebar on the checkout page.
 *
 * Responsibilities:
 * - Display each cart item with image, name, size, quantity, and line total.
 * - Show subtotal, free shipping, tax (8%), and grand total.
 * - Remain sticky on desktop as the user scrolls through the forms.
 *
 * Usage:
 *   <OrderSummary subtotal={subtotal} tax={tax} total={total} />
 *   // Cart items are read directly from CartContext inside this component.
 */

import { ShoppingBag } from "lucide-react";
import { useCart } from "../../../../context/CartContext";

interface OrderSummaryProps {
    subtotal: number;
    tax: number;
    total: number;
}

export function OrderSummary({ subtotal, tax, total }: OrderSummaryProps) {
    const { cart } = useCart();
   
    return (
      <div className="bg-white border border-stone-100 rounded-3xl p-8 space-y-6 lg:sticky lg:top-32">
        <h2 className="text-[10px] uppercase tracking-[0.3em] font-black text-stone-400">
          Order Summary
        </h2>
   
        {/* Items */}
        <div className="space-y-4">
          {cart.map((item) => (
            <div
              key={`${item.productId}-${item.selectedSize}`}
              className="flex items-center gap-4"
            >
              {/* Image */}
              <div className="w-16 h-16 shrink-0 bg-stone-50 rounded-2xl overflow-hidden border border-stone-100">
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <ShoppingBag size={16} className="text-stone-200" />
                  </div>
                )}
              </div>
   
              {/* Details */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-stone-900 truncate">
                  {item.name}
                </p>
                {item.selectedSize && (
                  <p className="text-[11px] text-stone-400 uppercase tracking-widest">
                    {item.selectedSize}
                  </p>
                )}
                <p className="text-[11px] text-stone-400">Qty: {item.quantity}</p>
              </div>
   
              {/* Line total */}
              <p className="text-sm font-semibold text-stone-900 shrink-0">
                ${(item.price * item.quantity).toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                })}
              </p>
            </div>
          ))}
        </div>
   
        <div className="border-t border-stone-100" />
   
        {/* Totals */}
        <div className="space-y-3">
          <div className="flex justify-between text-sm text-stone-500">
            <span>Subtotal</span>
            <span>
              ${subtotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </span>
          </div>
          <div className="flex justify-between text-sm text-stone-500">
            <span>Shipping</span>
            <span className="text-emerald-600 font-medium">Free</span>
          </div>
          <div className="flex justify-between text-sm text-stone-500">
            <span>Tax (8%)</span>
            <span>
              ${tax.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </span>
          </div>
          <div className="border-t border-stone-100 pt-3 flex justify-between items-baseline">
            <span className="text-base font-semibold text-stone-900">Total</span>
            <span className="text-2xl font-semibold text-stone-900 tracking-tight tabular-nums">
              ${total.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </span>
          </div>
        </div>
      </div>
    );
  }