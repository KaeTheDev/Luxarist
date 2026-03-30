/**
 * Purpose: Renders the slide-out cart drawer that appears from the right side
 * of the viewport when the cart icon is clicked.
 *
 * Responsibilities:
 * - Display all cart items with image, name, selected size, price, and subtotal.
 * - Allow quantity updates via inline stepper buttons.
 * - Allow item removal via a remove button on each line.
 * - Display subtotal derived from CartContext.
 * - Render an empty state with a "Continue Shopping" link when cart is empty.
 * - Close on backdrop click or the X button.
 * - Link to the Checkout page via the "Check Out" button.
 *
 * Usage:
 *   <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
 */

import { X, ShoppingBag, Minus, Plus, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "../../../context/CartContext";

interface CartDrawerProps {
    isOpen: boolean;
    onClose: () => void;
}

export function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
    const { cart, cartCount, subtotal, removeItem, updateQuantity } = useCart();

    return(
        <>
        {/* Backdrop */}
        {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 transition-opacity duration-300"
          onClick={onClose}
        />
      )}

       {/* Drawer panel */}
       <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-white z-50 flex flex-col shadow-2xl transition-transform duration-500 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* ── Header ─────────────────────────────────────────────────────── */}
        <div className="flex items-center justify-between px-8 pt-8 pb-6 border-b border-stone-100">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-semibold text-stone-900 tracking-tight">
              Cart
            </h2>
            {cartCount > 0 && (
              <span className="text-xl font-light text-stone-400">
                {cartCount}
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full border border-stone-200 flex items-center justify-center text-stone-400 hover:text-stone-900 hover:border-stone-400 transition-all"
            aria-label="Close cart"
          >
            <X size={16} />
          </button>
        </div>
 
        {/* ── Body ───────────────────────────────────────────────────────── */}
        {cart.length === 0 ? (
          /* Empty state */
          <div className="flex-1 flex flex-col items-center justify-center px-8 text-center gap-6">
            <ShoppingBag size={48} className="text-stone-100" strokeWidth={1} />
            <div className="space-y-2">
              <p className="text-xl font-semibold text-stone-900 tracking-tight">
                Your cart is currently empty.
              </p>
              <p className="text-sm text-stone-400 font-light">
                Discover pieces crafted for lasting elegance.
              </p>
            </div>
            <button
              onClick={onClose}
              className="flex items-center justify-between w-full px-6 py-4 bg-stone-50 rounded-2xl text-sm text-stone-700 hover:bg-stone-100 transition-colors group"
            >
              <span>Continue shopping</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </button>
          </div>
        ) : (
          /* Cart items */
          <div className="flex-1 overflow-y-auto px-8 py-6 space-y-6">
            {cart.map((item) => (
              <div
                key={`${item.productId}-${item.selectedSize}`}
                className="flex gap-4 pb-6 border-b border-stone-50 last:border-0"
              >
                {/* Product image */}
                <div className="w-20 h-20 shrink-0 bg-stone-50 rounded-2xl overflow-hidden border border-stone-100">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <ShoppingBag size={20} className="text-stone-200" />
                    </div>
                  )}
                </div>
 
                {/* Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start gap-2">
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-stone-900 truncate">
                        {item.name}
                      </p>
                      {item.selectedSize && (
                        <p className="text-[11px] text-stone-400 uppercase tracking-widest mt-0.5">
                          Size: {item.selectedSize}
                        </p>
                      )}
                      <p className="text-sm text-stone-600 mt-1">
                        ${item.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                      </p>
                    </div>
 
                    {/* Remove button */}
                    <button
                      onClick={() => removeItem(item.productId, item.selectedSize)}
                      className="text-stone-300 hover:text-red-400 transition-colors shrink-0 p-1"
                      aria-label="Remove item"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
 
                  {/* Quantity stepper */}
                  <div className="flex items-center gap-3 mt-3">
                    <div className="flex items-center border border-stone-200 rounded-xl overflow-hidden">
                      <button
                        onClick={() =>
                          updateQuantity(item.productId, item.selectedSize, item.quantity - 1)
                        }
                        className="w-8 h-8 flex items-center justify-center text-stone-400 hover:text-stone-900 hover:bg-stone-50 transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="w-8 text-center text-sm font-medium text-stone-900">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.productId, item.selectedSize, item.quantity + 1)
                        }
                        className="w-8 h-8 flex items-center justify-center text-stone-400 hover:text-stone-900 hover:bg-stone-50 transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus size={12} />
                      </button>
                    </div>
 
                    {/* Line subtotal */}
                    <span className="text-sm font-semibold text-stone-900 ml-auto">
                      ${(item.price * item.quantity).toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                      })}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
 
        {/* ── Footer ─────────────────────────────────────────────────────── */}
        {cart.length > 0 && (
          <div className="px-8 py-6 border-t border-stone-100 space-y-4">
            {/* Shipping note + subtotal */}
            <div className="flex justify-between items-center">
              <div>
                <p className="text-xs text-stone-400 font-light">
                  Tax included.{" "}
                  <span className="underline cursor-pointer">Shipping</span>{" "}
                  calculated at checkout.
                </p>
              </div>
              <div className="text-right">
                <p className="text-[10px] uppercase tracking-widest text-stone-400 font-bold">
                  Subtotal
                </p>
                <p className="text-2xl font-semibold text-stone-900 tracking-tight">
                  ${subtotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </p>
              </div>
            </div>
 
            {/* CTA buttons */}
            <div className="grid grid-cols-2 gap-3">
              <Link
                to="/checkout"
                onClick={onClose}
                className="flex items-center justify-center gap-2 py-4 bg-stone-900 text-white text-[11px] uppercase tracking-[0.2em] font-black rounded-2xl hover:bg-stone-700 transition-colors"
              >
                Check Out
              </Link>
              <Link
                to="/cart"
                onClick={onClose}
                className="flex items-center justify-center py-4 border border-stone-200 text-stone-900 text-[11px] uppercase tracking-[0.2em] font-black rounded-2xl hover:border-stone-400 transition-colors"
              >
                View Cart
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
}