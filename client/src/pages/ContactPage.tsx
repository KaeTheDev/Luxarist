/**
 * Purpose: Placeholder contact page with basic inquiry form.
 * Displays contact information and a mock form until a backend contact
 * endpoint is implemented.
 *
 * Usage:
 *   <Route path="/contact" element={<ContactPage />} />
 */

import { useState } from "react";
import { Send, MapPin, Mail, Clock } from "lucide-react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const inputClass =
    "w-full px-4 py-3 bg-white border border-stone-200 rounded-xl text-sm text-stone-900 placeholder:text-stone-300 focus:outline-none focus:border-stone-400 transition-colors";

  const handleSubmit = () => {
    if (!form.name || !form.email || !form.message) return;
    // Mock submit — replace with real endpoint later
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-white">

      {/* Header */}
      <section className="border-b border-stone-100 py-16 px-6 text-center">
        <p className="text-[11px] uppercase tracking-[0.4em] font-black text-stone-400 mb-3">
          Get In Touch
        </p>
        <h1 className="text-4xl md:text-5xl font-semibold text-stone-900 tracking-tight">
          Contact Us
        </h1>
        <p className="text-stone-400 font-light mt-3 max-w-md mx-auto text-sm leading-relaxed">
          Our client relations team is available to assist you with any
          enquiries about our collection.
        </p>
      </section>

      <main className="max-w-5xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

          {/* Contact details */}
          <div className="space-y-8">
            <h2 className="text-xl font-semibold text-stone-900 tracking-tight">
              Client Relations
            </h2>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-2.5 bg-stone-50 rounded-xl shrink-0">
                  <Mail size={16} className="text-stone-400" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest font-black text-stone-400 mb-1">
                    Email
                  </p>
                  <p className="text-sm text-stone-700">hello@luxarist.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-2.5 bg-stone-50 rounded-xl shrink-0">
                  <Clock size={16} className="text-stone-400" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest font-black text-stone-400 mb-1">
                    Hours
                  </p>
                  <p className="text-sm text-stone-700">
                    Monday – Friday, 9am – 6pm EST
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-2.5 bg-stone-50 rounded-xl shrink-0">
                  <MapPin size={16} className="text-stone-400" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest font-black text-stone-400 mb-1">
                    Location
                  </p>
                  <p className="text-sm text-stone-700">New York, NY</p>
                </div>
              </div>
            </div>

            <div className="border border-stone-100 rounded-3xl p-6 bg-stone-50/50 space-y-2">
              <p className="text-[10px] uppercase tracking-[0.3em] font-black text-stone-400">
                Response Time
              </p>
              <p className="text-sm text-stone-500 font-light leading-relaxed">
                We aim to respond to all enquiries within one business day.
                For urgent matters, please include "URGENT" in your message.
              </p>
            </div>
          </div>

          {/* Form */}
          {submitted ? (
            <div className="flex flex-col items-center justify-center text-center gap-4 border border-stone-100 rounded-3xl p-12">
              <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center">
                <Send size={20} className="text-emerald-500" />
              </div>
              <div className="space-y-2">
                <p className="text-[11px] uppercase tracking-[0.3em] font-black text-stone-400">
                  Message Sent
                </p>
                <p className="text-base font-semibold text-stone-900">
                  Thank you, {form.name}.
                </p>
                <p className="text-sm text-stone-400 font-light">
                  We'll be in touch within one business day.
                </p>
              </div>
            </div>
          ) : (
            <div className="border border-stone-100 rounded-3xl p-8 space-y-5">
              <h2 className="text-base font-semibold text-stone-900 tracking-tight">
                Send a Message
              </h2>

              <div className="space-y-1.5">
                <label className="text-[10px] uppercase tracking-[0.2em] font-black text-stone-400">
                  Your Name
                </label>
                <input
                  type="text"
                  placeholder="Jane Doe"
                  value={form.name}
                  onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                  className={inputClass}
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] uppercase tracking-[0.2em] font-black text-stone-400">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="jane@example.com"
                  value={form.email}
                  onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                  className={inputClass}
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] uppercase tracking-[0.2em] font-black text-stone-400">
                  Message
                </label>
                <textarea
                  rows={5}
                  placeholder="How can we help you?"
                  value={form.message}
                  onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
                  className={`${inputClass} resize-none`}
                />
              </div>

              <button
                onClick={handleSubmit}
                className="flex items-center justify-center gap-2 w-full py-4 bg-stone-900 text-white text-[11px] uppercase tracking-[0.2em] font-black rounded-2xl hover:bg-stone-700 transition-colors"
              >
                <Send size={13} />
                Send Message
              </button>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}