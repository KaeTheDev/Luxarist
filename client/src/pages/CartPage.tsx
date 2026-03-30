/**
 * Purpose: Renders the full /cart page displaying all cart items with
 * quantity controls, removal, and an order summary sidebar.
 *
 * Responsibilities:
 * - Fetch cart state from CartContext.
 * - Display each cart item with image, name, size, price, quantity stepper,
 *   subtotal, and remove button.
 * - Render an order summary column with subtotal, shipping note, order note
 *   textarea, and a Checkout CTA.
 * - Render an empty state with a link back to the shop when cart is empty.
 * - Close the CartDrawer if it happens to be open when navigating here.
 *
 * Usage:
 *   // Registered as a route in App.tsx:
 *   <Route path="/cart" element={<CartPage />} />
 */

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft, Lock } from "lucide-react";
import { useCart } from "../context/CartContext";

export default function CartPage() {
    const {
      cart,
      cartCount,
      subtotal,
      removeItem,
      updateQuantity,
      closeCart,
    } = useCart();
   
    const [orderNote, setOrderNote] = useState("");
   
    // Close the drawer if it's open when the user navigates to the full cart page
    useEffect(() => {
      closeCart();
    }, [closeCart]);
   
    // ── Empty state ────────────────────────────────────────────────────────────
    if (cart.length === 0) {
      return (
        <div className="min-h-[70vh] flex flex-col items-center justify-center px-6 text-center gap-8">
          <ShoppingBag size={64} className="text-stone-100" strokeWidth={1} />
          <div className="space-y-3">
            <h1 className="text-3xl font-semibold text-stone-900 tracking-tight">
              Your cart is empty
            </h1>
            <p className="text-stone-400 font-light max-w-sm">
              Discover pieces crafted for lasting elegance.
            </p>
          </div>
          <Link
            to="/shop-all"
            className="flex items-center gap-2 px-8 py-4 bg-stone-900 text-white text-[11px] uppercase tracking-[0.2em] font-black rounded-2xl hover:bg-stone-700 transition-colors"
          >
            <ShoppingBag size={14} />
            Continue Shopping
          </Link>
        </div>
      );
    }
   
    return (
      <div className="max-w-7xl mx-auto px-6 py-12 lg:py-16">
   
        {/* ── Page header ──────────────────────────────────────────────────── */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-12">
          <div>
            <h1 className="text-4xl md:text-5xl font-semibold text-stone-900 tracking-tight">
              Your cart
            </h1>
            <p className="text-sm text-stone-400 font-light mt-1">
              {cartCount} {cartCount === 1 ? "item" : "items"}
            </p>
          </div>
          <Link
            to="/collections"
            className="flex items-center gap-2 px-6 py-3 border border-stone-200 text-stone-600 text-[11px] uppercase tracking-[0.2em] font-black rounded-full hover:border-stone-400 hover:text-stone-900 transition-all w-fit"
          >
            <ArrowLeft size={13} />
            Continue shopping
          </Link>
        </div>
   
        {/* ── Two-column layout ─────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8 lg:gap-12 items-start">
   
          {/* ── LEFT: Cart items ─────────────────────────────────────────────── */}
          <div className="space-y-0 bg-white border border-stone-100 rounded-3xl overflow-hidden">
   
            {/* Table header — desktop only */}
            <div className="hidden md:grid grid-cols-12 gap-4 px-8 py-4 bg-stone-50/60 border-b border-stone-100">
              <span className="col-span-6 text-[9px] uppercase tracking-[0.3em] font-black text-stone-400">
                Product
              </span>
              <span className="col-span-2 text-[9px] uppercase tracking-[0.3em] font-black text-stone-400 text-center">
                Quantity
              </span>
              <span className="col-span-2 text-[9px] uppercase tracking-[0.3em] font-black text-stone-400 text-right">
                Price
              </span>
              <span className="col-span-2 text-[9px] uppercase tracking-[0.3em] font-black text-stone-400 text-right">
                Total
              </span>
            </div>
   
            {/* Items */}
            {cart.map((item, idx) => (
              <div
                key={`${item.productId}-${item.selectedSize}`}
                className={`grid grid-cols-1 md:grid-cols-12 gap-4 items-center px-8 py-6 ${
                  idx < cart.length - 1 ? "border-b border-stone-50" : ""
                }`}
              >
                {/* Product info — spans 6 cols on desktop */}
                <div className="md:col-span-6 flex items-center gap-5">
                  {/* Image */}
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
   
                  {/* Name, size, unit price + remove on mobile */}
                  <div className="flex-1 min-w-0">
                    <Link
                      to={`/products/${item.slug}`}
                      className="text-sm font-semibold text-stone-900 hover:text-stone-600 transition-colors line-clamp-2"
                    >
                      {item.name}
                    </Link>
                    {item.selectedSize && (
                      <p className="text-[11px] text-stone-400 uppercase tracking-widest mt-0.5">
                        Size: {item.selectedSize}
                      </p>
                    )}
                    <p className="text-sm text-stone-500 mt-1">
                      ${item.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </p>
                    {/* Remove — shown on mobile below name */}
                    <button
                      onClick={() => removeItem(item.productId, item.selectedSize)}
                      className="md:hidden flex items-center gap-1 text-[10px] uppercase tracking-widest font-bold text-stone-300 hover:text-red-400 transition-colors mt-2"
                    >
                      <Trash2 size={11} />
                      Remove
                    </button>
                  </div>
                </div>
   
                {/* Quantity stepper — 2 cols */}
                <div className="md:col-span-2 flex items-center md:justify-center gap-3">
                  <div className="flex items-center border border-stone-200 rounded-xl overflow-hidden">
                    <button
                      onClick={() =>
                        updateQuantity(item.productId, item.selectedSize, item.quantity - 1)
                      }
                      className="w-9 h-9 flex items-center justify-center text-stone-400 hover:text-stone-900 hover:bg-stone-50 transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <Minus size={12} />
                    </button>
                    <span className="w-9 text-center text-sm font-medium text-stone-900 tabular-nums">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        updateQuantity(item.productId, item.selectedSize, item.quantity + 1)
                      }
                      className="w-9 h-9 flex items-center justify-center text-stone-400 hover:text-stone-900 hover:bg-stone-50 transition-colors"
                      aria-label="Increase quantity"
                    >
                      <Plus size={12} />
                    </button>
                  </div>
                </div>
   
                {/* Unit price — 2 cols, desktop only */}
                <div className="hidden md:flex md:col-span-2 justify-end">
                  <span className="text-sm text-stone-600">
                    ${item.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </span>
                </div>
   
                {/* Line total + remove — 2 cols */}
                <div className="md:col-span-2 flex items-center justify-between md:justify-end gap-4">
                  <span className="text-sm font-semibold text-stone-900 tabular-nums">
                    ${(item.price * item.quantity).toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                    })}
                  </span>
                  {/* Remove — desktop only */}
                  <button
                    onClick={() => removeItem(item.productId, item.selectedSize)}
                    className="hidden md:flex text-stone-200 hover:text-red-400 transition-colors p-1"
                    aria-label="Remove item"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            ))}
          </div>
   
          {/* ── RIGHT: Order summary ──────────────────────────────────────────── */}
          <div className="space-y-4 lg:sticky lg:top-32">
   
            {/* Summary card */}
            <div className="bg-white border border-stone-100 rounded-3xl p-8 space-y-6">
              <h2 className="text-[10px] uppercase tracking-[0.3em] font-black text-stone-400">
                Order Summary
              </h2>
   
              {/* Subtotal row */}
              <div className="flex justify-between items-baseline">
                <span className="text-base font-semibold text-stone-900">Subtotal</span>
                <span className="text-2xl font-semibold text-stone-900 tabular-nums tracking-tight">
                  ${subtotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </span>
              </div>
   
              {/* Shipping note */}
              <p className="text-xs text-stone-400 font-light leading-relaxed">
                Tax included.{" "}
                <span className="underline cursor-pointer hover:text-stone-600 transition-colors">
                  Shipping
                </span>{" "}
                calculated at checkout.
              </p>
   
              {/* Order note */}
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-[0.2em] font-black text-stone-400">
                  Add a note to your order
                </label>
                <textarea
                  rows={3}
                  value={orderNote}
                  onChange={(e) => setOrderNote(e.target.value)}
                  placeholder="Order note"
                  className="w-full bg-stone-50 border border-stone-100 rounded-2xl px-4 py-3 text-sm text-stone-900 placeholder:text-stone-300 focus:outline-none focus:border-stone-300 transition-colors resize-none"
                />
              </div>
   
              {/* Checkout CTA */}
              <Link
                to="/checkout"
                className="flex items-center justify-center gap-2 w-full py-4 bg-stone-900 text-white text-[11px] uppercase tracking-[0.2em] font-black rounded-2xl hover:bg-stone-700 transition-colors"
              >
                <Lock size={13} />
                Check out
              </Link>
            </div>
   
          </div>
        </div>
   
      </div>
    );
  }  