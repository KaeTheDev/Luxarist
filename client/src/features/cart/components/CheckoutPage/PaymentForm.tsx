/**
 * Purpose: Renders the payment information section of the checkout form.
 *
 * Responsibilities:
 * - Display mock card brand badges (VISA, MC, AMEX).
 * - Collect cardholder name, card number (auto-formats with spaces),
 *   expiration date (auto-formats MM/YY), and CVV.
 * - Show a secure payment note at the bottom.
 * - Call onChange whenever any field value changes.
 * - Payment is mock — no real processing occurs.
 *
 * Usage:
 *   <PaymentForm values={payment} onChange={updatePayment} />
 */

import { Lock } from "lucide-react";
import { type PaymentForm as PaymentFormType, INPUT_CLASS } from "../../types/checkout";

interface PaymentFormProps {
    values: PaymentFormType;
    onChange: (field: keyof PaymentFormType, value: string) => void;
}

export function PaymentForm({ values, onChange }: PaymentFormProps) {
    return (
      <div className="bg-white border border-stone-100 rounded-3xl p-8 space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold text-stone-900 tracking-tight">
            Payment Information
          </h2>
          <div className="flex items-center gap-1.5 text-[10px] text-stone-400 font-bold uppercase tracking-widest">
            <Lock size={11} />
            Secure
          </div>
        </div>
   
        {/* Card brand badges */}
        <div className="flex gap-2">
          {["VISA", "MC", "AMEX"].map((brand) => (
            <span
              key={brand}
              className="px-3 py-1 text-[9px] font-black tracking-widest border border-stone-200 rounded-lg text-stone-500"
            >
              {brand}
            </span>
          ))}
        </div>
   
        {/* Cardholder name */}
        <div className="space-y-1.5">
          <label className="text-[10px] uppercase tracking-[0.2em] font-black text-stone-400">
            Cardholder Name <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            placeholder="John Doe"
            value={values.cardholderName}
            onChange={(e) => onChange("cardholderName", e.target.value)}
            className={INPUT_CLASS}
          />
        </div>
   
        {/* Card number — auto-formats with spaces every 4 digits */}
        <div className="space-y-1.5">
          <label className="text-[10px] uppercase tracking-[0.2em] font-black text-stone-400">
            Card Number <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            placeholder="1234 5678 9012 3456"
            maxLength={19}
            value={values.cardNumber}
            onChange={(e) => {
              const raw = e.target.value.replace(/\D/g, "").slice(0, 16);
              const formatted = raw.replace(/(.{4})/g, "$1 ").trim();
              onChange("cardNumber", formatted);
            }}
            className={INPUT_CLASS}
          />
        </div>
   
        {/* Expiry + CVV */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-[10px] uppercase tracking-[0.2em] font-black text-stone-400">
              Expiration Date <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              placeholder="MM/YY"
              maxLength={5}
              value={values.expiration}
              onChange={(e) => {
                const raw = e.target.value.replace(/\D/g, "").slice(0, 4);
                const formatted =
                  raw.length > 2 ? `${raw.slice(0, 2)}/${raw.slice(2)}` : raw;
                onChange("expiration", formatted);
              }}
              className={INPUT_CLASS}
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] uppercase tracking-[0.2em] font-black text-stone-400">
              CVV <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              placeholder="123"
              maxLength={4}
              value={values.cvv}
              onChange={(e) =>
                onChange("cvv", e.target.value.replace(/\D/g, "").slice(0, 4))
              }
              className={INPUT_CLASS}
            />
          </div>
        </div>
   
        {/* Security note */}
        <div className="flex items-start gap-3 p-4 bg-stone-50 rounded-2xl">
          <Lock size={14} className="text-stone-400 shrink-0 mt-0.5" />
          <div>
            <p className="text-[11px] font-semibold text-stone-600">Secure Payment</p>
            <p className="text-[11px] text-stone-400 font-light leading-relaxed">
              Your payment information is encrypted and processed securely. We
              never store your card details.
            </p>
          </div>
        </div>
      </div>
    );
  }