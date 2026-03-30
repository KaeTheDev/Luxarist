/**
 * Purpose: Renders the shipping information section of the checkout form.
 *
 * Responsibilities:
 * - Display controlled inputs for first name, last name, email, phone,
 *   street address, city, state, postal code, and country.
 * - Call onChange whenever any field value changes.
 *
 * Usage:
 *   <ShippingForm values={shipping} onChange={updateShipping} />
 */

import { type ShippingForm as ShippingFormType, INPUT_CLASS } from "../../types/checkout";

interface ShippingFormProps {
    values: ShippingFormType;
    onChange: (field: keyof ShippingFormType, value: string) => void;
}

export function ShippingForm({ values, onChange }: ShippingFormProps) {
    return (
      <div className="bg-white border border-stone-100 rounded-3xl p-8 space-y-5">
        <h2 className="text-base font-semibold text-stone-900 tracking-tight">
          Shipping Information
        </h2>
   
        {/* Name row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-[10px] uppercase tracking-[0.2em] font-black text-stone-400">
              First Name <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              placeholder="John"
              value={values.firstName}
              onChange={(e) => onChange("firstName", e.target.value)}
              className={INPUT_CLASS}
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] uppercase tracking-[0.2em] font-black text-stone-400">
              Last Name <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              placeholder="Doe"
              value={values.lastName}
              onChange={(e) => onChange("lastName", e.target.value)}
              className={INPUT_CLASS}
            />
          </div>
        </div>
   
        {/* Email + phone row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-[10px] uppercase tracking-[0.2em] font-black text-stone-400">
              Email Address <span className="text-red-400">*</span>
            </label>
            <input
              type="email"
              placeholder="john.doe@example.com"
              value={values.email}
              onChange={(e) => onChange("email", e.target.value)}
              className={INPUT_CLASS}
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] uppercase tracking-[0.2em] font-black text-stone-400">
              Phone Number
            </label>
            <input
              type="tel"
              placeholder="+1 (555) 123-4567"
              value={values.phone}
              onChange={(e) => onChange("phone", e.target.value)}
              className={INPUT_CLASS}
            />
          </div>
        </div>
   
        {/* Street */}
        <div className="space-y-1.5">
          <label className="text-[10px] uppercase tracking-[0.2em] font-black text-stone-400">
            Street Address <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            placeholder="123 Luxury Lane"
            value={values.street}
            onChange={(e) => onChange("street", e.target.value)}
            className={INPUT_CLASS}
          />
        </div>
   
        {/* City / state / zip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="space-y-1.5">
            <label className="text-[10px] uppercase tracking-[0.2em] font-black text-stone-400">
              City <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              placeholder="Beverly Hills"
              value={values.city}
              onChange={(e) => onChange("city", e.target.value)}
              className={INPUT_CLASS}
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] uppercase tracking-[0.2em] font-black text-stone-400">
              State <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              placeholder="CA"
              value={values.state}
              onChange={(e) => onChange("state", e.target.value)}
              className={INPUT_CLASS}
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] uppercase tracking-[0.2em] font-black text-stone-400">
              Postal Code <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              placeholder="90210"
              value={values.zip}
              onChange={(e) => onChange("zip", e.target.value)}
              className={INPUT_CLASS}
            />
          </div>
        </div>
   
        {/* Country */}
        <div className="space-y-1.5">
          <label className="text-[10px] uppercase tracking-[0.2em] font-black text-stone-400">
            Country <span className="text-red-400">*</span>
          </label>
          <select
            value={values.country}
            onChange={(e) => onChange("country", e.target.value)}
            className={`${INPUT_CLASS} cursor-pointer`}
          >
            <option>United States</option>
            <option>Canada</option>
            <option>United Kingdom</option>
            <option>Australia</option>
            <option>France</option>
            <option>Germany</option>
            <option>Japan</option>
            <option>UAE</option>
          </select>
        </div>
      </div>
    );
  }  