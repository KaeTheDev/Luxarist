/**
 * Purpose: Defines all TypeScript interfaces scoped to the checkout feature.
 *
 * Responsibilities:
 * - ShippingForm: shape of the shipping address form state.
 * - PaymentForm: shape of the mock payment form state.
 *
 * Usage:
 *   import type { ShippingForm, PaymentForm } from "../types/checkout";
 */

export interface ShippingForm {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
}

export interface PaymentForm {
    cardholderName: string;
    cardNumber: string;
    expiration: string;
    cvv: string;
}

 
export const INPUT_CLASS =
  "w-full px-4 py-3 bg-white border border-stone-200 rounded-xl text-sm text-stone-900 placeholder:text-stone-300 focus:outline-none focus:border-stone-400 transition-colors";