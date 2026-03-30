/**
 * Purpose: Renders the /checkout page — orchestrates the shipping form,
 * payment form, and order summary into a two-column checkout layout.
 *
 * Responsibilities:
 * - Own ShippingForm and PaymentForm state, pre-filled from AuthContext.
 * - Validate all required fields before submission.
 * - POST to /api/orders on submit and handle success / error states.
 * - Clear the cart and show an order confirmation on success.
 * - Redirect to /cart if the cart is empty on mount.
 *
 * Usage:
 *   <Route path="/checkout" element={<CheckoutPage />} />
 */

import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Lock, CheckCircle2, ArrowLeft } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { API_URL, getAuthHeaders } from "../api/config";
import type { ShippingForm, PaymentForm } from "../features/cart/components/CheckoutPage/checkout";
import { ShippingForm as ShippingFormSection } from "../features/cart/components/CheckoutPage/ShippingForm";
import { PaymentForm as PaymentFormSection } from "../features/cart/components/CheckoutPage/PaymentForm";
import { OrderSummary } from "../features/cart/components/CheckoutPage/OrderSummary";

export default function CheckoutPage() {
    const { cart, subtotal, clearCart } = useCart();
    const { user, token } = useAuth();
    const navigate = useNavigate();
   
    const [shipping, setShipping] = useState<ShippingForm>({
      firstName: user?.firstName ?? "",
      lastName: user?.lastName ?? "",
      email: user?.email ?? "",
      phone: "",
      street: "",
      city: "",
      state: "",
      zip: "",
      country: "United States",
    });
   
    const [payment, setPayment] = useState<PaymentForm>({
      cardholderName: user ? `${user.firstName} ${user.lastName}` : "",
      cardNumber: "",
      expiration: "",
      cvv: "",
    });
   
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [confirmedOrderNumber, setConfirmedOrderNumber] = useState<string | null>(null);
   
    // Redirect to cart if empty
    useEffect(() => {
      if (cart.length === 0 && !confirmedOrderNumber) {
        navigate("/cart");
      }
    }, [cart, confirmedOrderNumber, navigate]);
   
    // ── Derived totals ─────────────────────────────────────────────────────────
    const TAX_RATE = 0.08;
    const tax = parseFloat((subtotal * TAX_RATE).toFixed(2));
    const total = parseFloat((subtotal + tax).toFixed(2));
   
    // ── Form update helpers ────────────────────────────────────────────────────
    const updateShipping = (field: keyof ShippingForm, value: string) =>
        setShipping((prev: ShippingForm) => ({ ...prev, [field]: value }));
      
      const updatePayment = (field: keyof PaymentForm, value: string) =>
        setPayment((prev: PaymentForm) => ({ ...prev, [field]: value }));
   
    // ── Validation ─────────────────────────────────────────────────────────────
    function validate(): string | null {
      if (!shipping.firstName || !shipping.lastName)
        return "Please enter your full name.";
      if (!shipping.email) return "Please enter your email address.";
      if (!shipping.street || !shipping.city || !shipping.state || !shipping.zip)
        return "Please complete your shipping address.";
      if (!payment.cardholderName) return "Please enter the cardholder name.";
      if (!payment.cardNumber || payment.cardNumber.replace(/\s/g, "").length < 16)
        return "Please enter a valid 16-digit card number.";
      if (!payment.expiration) return "Please enter the expiration date.";
      if (!payment.cvv || payment.cvv.length < 3) return "Please enter a valid CVV.";
      return null;
    }
   
    // ── Submit ─────────────────────────────────────────────────────────────────
    async function handleSubmit() {
      setError(null);
      const validationError = validate();
      if (validationError) {
        setError(validationError);
        return;
      }
   
      setSubmitting(true);
      try {
        const res = await fetch(`${API_URL}/orders`, {
          method: "POST",
          headers: getAuthHeaders(token),
          body: JSON.stringify({
            customerFirstName: shipping.firstName,
            customerLastName: shipping.lastName,
            customerEmail: shipping.email,
            shippingAddress: {
              street: shipping.street,
              city: shipping.city,
              state: shipping.state,
              zip: shipping.zip,
            },
            items: cart.map((item) => ({
              productId: item.productId,
              primaryImageUrl: item.image,
              name: item.name,
              price: item.price,
              quantity: item.quantity,
              subtotal: item.price * item.quantity,
            })),
            total,
          }),
        });
   
        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.message ?? "Failed to place order.");
        }
   
        const order = await res.json();
        clearCart();
        setConfirmedOrderNumber(order.orderNumber);
      } catch (err: any) {
        setError(err.message ?? "Something went wrong. Please try again.");
      } finally {
        setSubmitting(false);
      }
    }
   
    // ── Order confirmation ─────────────────────────────────────────────────────
    if (confirmedOrderNumber) {
      return (
        <div className="min-h-[70vh] flex flex-col items-center justify-center px-6 text-center gap-8">
          <div className="w-20 h-20 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center">
            <CheckCircle2 size={36} className="text-emerald-500" />
          </div>
          <div className="space-y-3 max-w-md">
            <p className="text-[11px] uppercase tracking-[0.3em] font-black text-stone-400">
              Order Confirmed
            </p>
            <h1 className="text-3xl font-semibold text-stone-900 tracking-tight">
              Thank you, {shipping.firstName}.
            </h1>
            <p className="text-stone-400 font-light leading-relaxed">
              Your order{" "}
              <span className="font-semibold text-stone-700">
                #{confirmedOrderNumber}
              </span>{" "}
              has been placed and is now pending fulfillment.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              to="/dashboard/orders"
              className="px-8 py-4 bg-stone-900 text-white text-[11px] uppercase tracking-[0.2em] font-black rounded-2xl hover:bg-stone-700 transition-colors"
            >
              View My Orders
            </Link>
            <Link
              to="/collections"
              className="px-8 py-4 border border-stone-200 text-stone-600 text-[11px] uppercase tracking-[0.2em] font-black rounded-2xl hover:border-stone-400 transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      );
    }
   
    // ── Main layout ────────────────────────────────────────────────────────────
    return (
      <div className="max-w-7xl mx-auto px-6 py-12 lg:py-16">
   
        {/* Header */}
        <div className="flex items-center gap-4 mb-3">
          <Link
            to="/cart"
            className="flex items-center gap-2 text-stone-400 hover:text-stone-900 transition-colors text-[10px] uppercase tracking-[0.2em] font-bold"
          >
            <ArrowLeft size={14} /> Cart
          </Link>
          <span className="text-stone-200">|</span>
          <div className="flex items-center gap-2">
            <Lock size={16} className="text-stone-900" />
            <h1 className="text-2xl font-semibold text-stone-900 tracking-tight">
              Secure Checkout
            </h1>
          </div>
        </div>
        <p className="text-sm text-stone-400 font-light mb-10">
          Complete your purchase securely
        </p>
   
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8 lg:gap-12 items-start">
   
          {/* LEFT: Forms */}
          <div className="space-y-6">
            <ShippingFormSection values={shipping} onChange={updateShipping} />
            <PaymentFormSection values={payment} onChange={updatePayment} />
   
            {/* Validation / API error */}
            {error && (
              <div className="px-5 py-4 bg-red-50 border border-red-100 rounded-2xl">
                <p className="text-xs text-red-600 font-medium">{error}</p>
              </div>
            )}
   
            {/* Place Order */}
            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="w-full py-5 bg-stone-900 text-white text-[11px] uppercase tracking-[0.25em] font-black rounded-2xl hover:bg-stone-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <Lock size={13} />
              {submitting ? "Placing Order..." : "Place Order"}
            </button>
   
            <p className="text-center text-[10px] text-stone-300 uppercase tracking-widest">
              Your payment information is encrypted and secure
            </p>
          </div>
   
          {/* RIGHT: Order summary */}
          <OrderSummary subtotal={subtotal} tax={tax} total={total} />
   
        </div>
      </div>
    );
  }