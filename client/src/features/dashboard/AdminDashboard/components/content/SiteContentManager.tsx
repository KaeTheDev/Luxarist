/**
 * Purpose: Admin panel for editing the homepage Hero and Signature Collection
 * sections without touching code. Fetches current content on mount, allows
 * editing all fields, and saves via PUT /api/site-content.
 *
 * Responsibilities:
 * - Load current hero and signature content on mount.
 * - Allow admins to update hero: video URL, fallback image, heading, body, CTA text + link.
 * - Allow admins to pick a product from the database for the signature section
 *   and override eyebrow, heading, subheading, body text, CTA text, and custom image URL.
 * - Show a live preview of the hero fallback image and signature image.
 * - Save changes via PUT /api/site-content with Toast feedback.
 *
 * Usage:
 *   <SiteContentManager />  (mounted at /admin/content)
 */

import { useState, useEffect } from "react";
import { Loader2, Save, Image, Monitor, Type } from "lucide-react";
import { useAuth } from "../../../../../context/AuthContext";
import { API_URL, getAuthHeaders } from "../../../../../api/config";
import { fetchProducts } from "../../../../../api/productServices";
import type { Product } from "../../../shared/types";
import Toast from "../../../../../common/ui/Toast";
import { useFadeIn } from "../hooks/useFadeIn";

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────
 
interface HeroForm {
  videoUrl: string;
  fallbackImageUrl: string;
  heading: string;
  bodyText: string;
  ctaText: string;
  ctaLink: string;
}
 
interface SignatureForm {
  productId: string;
  customImageUrl: string;
  eyebrow: string;
  heading: string;
  subheading: string;
  bodyText: string;
  ctaText: string;
}
 
const inputClass =
  "w-full px-4 py-3 bg-stone-50 border border-stone-100 rounded-xl text-sm text-stone-900 placeholder:text-stone-300 focus:outline-none focus:border-stone-400 focus:bg-white transition-all duration-200";
 
// ─────────────────────────────────────────────────────────────────────────────
// SiteContentManager
// ─────────────────────────────────────────────────────────────────────────────
 
export default function SiteContentManager() {
  const { token } = useAuth();
  const visible = useFadeIn();
 
  const [heroForm, setHeroForm] = useState<HeroForm>({
    videoUrl: "",
    fallbackImageUrl: "",
    heading: "",
    bodyText: "",
    ctaText: "",
    ctaLink: "",
  });
 
  const [signatureForm, setSignatureForm] = useState<SignatureForm>({
    productId: "",
    customImageUrl: "",
    eyebrow: "",
    heading: "",
    subheading: "",
    bodyText: "",
    ctaText: "",
  });
 
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
 
  const showToast = (message: string, type: "success" | "error" = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };
 
  // ── Load current content + all products ───────────────────────────────────
 
  useEffect(() => {
    async function init() {
      try {
        const [contentRes, productsData] = await Promise.all([
          fetch(`${API_URL}/site-content`),
          fetchProducts(),
        ]);
 
        if (contentRes.ok) {
          const data = await contentRes.json();
          if (data.hero) setHeroForm(data.hero);
          if (data.signature) {
            setSignatureForm({
              ...data.signature,
              productId: data.signature.productId?._id ?? data.signature.productId ?? "",
            });
          }
        }
 
        setProducts(Array.isArray(productsData) ? productsData : []);
      } catch (err) {
        console.error("SiteContentManager init error:", err);
      } finally {
        setLoading(false);
      }
    }
    init();
  }, []);
 
  // ── Save ───────────────────────────────────────────────────────────────────
 
  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch(`${API_URL}/site-content`, {
        method: "PUT",
        headers: getAuthHeaders(token),
        body: JSON.stringify({
          hero: heroForm,
          signature: {
            ...signatureForm,
            productId: signatureForm.productId || null,
          },
        }),
      });
 
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message ?? "Failed to save.");
      }
 
      showToast("Site content updated successfully.");
    } catch (err: any) {
      showToast(err.message ?? "Something went wrong.", "error");
    } finally {
      setSaving(false);
    }
  };
 
  // ── Helpers ────────────────────────────────────────────────────────────────
 
  const updateHero = (field: keyof HeroForm, value: string) =>
    setHeroForm((prev) => ({ ...prev, [field]: value }));
 
  const updateSignature = (field: keyof SignatureForm, value: string) =>
    setSignatureForm((prev) => ({ ...prev, [field]: value }));
 
  // Selecting a product auto-fills image and subheading from that product
  const handleProductSelect = (productId: string) => {
    const selected = products.find((p) => p._id === productId);
    setSignatureForm((prev) => ({
      ...prev,
      productId,
      customImageUrl: selected?.primaryImageUrl ?? prev.customImageUrl,
      subheading: selected?.name ?? prev.subheading,
    }));
  };
 
  // ── Loading ────────────────────────────────────────────────────────────────
 
  if (loading) {
    return (
      <div className="h-96 flex items-center justify-center">
        <Loader2 className="animate-spin text-stone-200" size={40} />
      </div>
    );
  }
 
  // ── Render ─────────────────────────────────────────────────────────────────
 
  return (
    <div className={`space-y-10 pb-20 transition-opacity duration-500 ${visible ? "opacity-100" : "opacity-0"}`}>
 
      {toast && (
        <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
      )}
 
      {/* Page header */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-stone-100 pb-8">
        <div>
          <h2 className="text-3xl font-serif text-stone-900 tracking-tight italic">
            Site Content
          </h2>
          <p className="text-sm text-stone-500 font-light mt-1">
            Manage homepage hero and signature collection content.
          </p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-8 py-3.5 bg-stone-900 text-white text-[10px] uppercase tracking-[0.2em] font-black rounded-xl hover:bg-stone-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
        >
          {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </header>
 
      {/* ── Hero Section ──────────────────────────────────────────────────── */}
      <section className="bg-white border border-stone-100 rounded-3xl p-8 space-y-8">
        <div className="flex items-center gap-3 border-b border-stone-50 pb-6">
          <div className="p-2.5 bg-stone-50 rounded-xl">
            <Monitor size={16} className="text-stone-400" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-stone-900 tracking-tight">
              Hero Section
            </h3>
            <p className="text-xs text-stone-400 font-light mt-0.5">
              Desktop video + mobile fallback image, overlay text and CTA.
            </p>
          </div>
        </div>
 
        {/* Media URLs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-[0.2em] font-black text-stone-400">
              Desktop Video URL (ImageKit)
            </label>
            <input
              type="text"
              placeholder="https://ik.imagekit.io/..."
              value={heroForm.videoUrl}
              onChange={(e) => updateHero("videoUrl", e.target.value)}
              className={inputClass}
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-[0.2em] font-black text-stone-400">
              Mobile Fallback Image URL (ImageKit)
            </label>
            <input
              type="text"
              placeholder="https://ik.imagekit.io/..."
              value={heroForm.fallbackImageUrl}
              onChange={(e) => updateHero("fallbackImageUrl", e.target.value)}
              className={inputClass}
            />
          </div>
        </div>
 
        {/* Fallback image preview */}
        {heroForm.fallbackImageUrl && (
          <div className="rounded-2xl overflow-hidden border border-stone-100 h-48">
            <img
              src={heroForm.fallbackImageUrl}
              alt="Hero preview"
              className="w-full h-full object-cover"
            />
          </div>
        )}
 
        {/* Text fields */}
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-[0.2em] font-black text-stone-400">
              Heading (h1)
            </label>
            <input
              type="text"
              placeholder="Luxury in Every Detail"
              value={heroForm.heading}
              onChange={(e) => updateHero("heading", e.target.value)}
              className={inputClass}
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-[0.2em] font-black text-stone-400">
              Body Text (p)
            </label>
            <textarea
              rows={2}
              placeholder="Discover refinement across every piece..."
              value={heroForm.bodyText}
              onChange={(e) => updateHero("bodyText", e.target.value)}
              className={`${inputClass} resize-none`}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-[0.2em] font-black text-stone-400">
                CTA Button Text
              </label>
              <input
                type="text"
                placeholder="Shop the Collection"
                value={heroForm.ctaText}
                onChange={(e) => updateHero("ctaText", e.target.value)}
                className={inputClass}
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-[0.2em] font-black text-stone-400">
                CTA Link
              </label>
              <input
                type="text"
                placeholder="/collections"
                value={heroForm.ctaLink}
                onChange={(e) => updateHero("ctaLink", e.target.value)}
                className={inputClass}
              />
            </div>
          </div>
        </div>
      </section>
 
      {/* ── Signature Collection Section ──────────────────────────────────── */}
      <section className="bg-white border border-stone-100 rounded-3xl p-8 space-y-8">
        <div className="flex items-center gap-3 border-b border-stone-50 pb-6">
          <div className="p-2.5 bg-stone-50 rounded-xl">
            <Type size={16} className="text-stone-400" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-stone-900 tracking-tight">
              Signature Collection
            </h3>
            <p className="text-xs text-stone-400 font-light mt-0.5">
              Featured product, image, and all overlay text including eyebrow label.
            </p>
          </div>
        </div>
 
        {/* Product picker */}
        <div className="space-y-2">
          <label className="text-[10px] uppercase tracking-[0.2em] font-black text-stone-400">
            Featured Product
          </label>
          <select
            value={signatureForm.productId}
            onChange={(e) => handleProductSelect(e.target.value)}
            className={`${inputClass} cursor-pointer`}
          >
            <option value="">— Select a product —</option>
            {products.map((p) => (
              <option key={p._id} value={p._id}>
                {p.name}
              </option>
            ))}
          </select>
          <p className="text-[10px] text-stone-300 italic">
            Selecting a product auto-fills the image and subheading. You can override them below.
          </p>
        </div>
 
        {/* Custom image URL */}
        <div className="space-y-2">
          <label className="text-[10px] uppercase tracking-[0.2em] font-black text-stone-400 flex items-center gap-2">
            <Image size={11} />
            Custom Image URL (overrides product image)
          </label>
          <input
            type="text"
            placeholder="https://ik.imagekit.io/..."
            value={signatureForm.customImageUrl}
            onChange={(e) => updateSignature("customImageUrl", e.target.value)}
            className={inputClass}
          />
        </div>
 
        {/* Image preview */}
        {signatureForm.customImageUrl && (
          <div className="rounded-2xl overflow-hidden border border-stone-100 h-48">
            <img
              src={signatureForm.customImageUrl}
              alt="Signature preview"
              className="w-full h-full object-cover"
            />
          </div>
        )}
 
        {/* Text fields */}
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-[0.2em] font-black text-stone-400">
              Eyebrow Text (small label above h3)
            </label>
            <input
              type="text"
              placeholder="Timeless Elegance"
              value={signatureForm.eyebrow}
              onChange={(e) => updateSignature("eyebrow", e.target.value)}
              className={inputClass}
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-[0.2em] font-black text-stone-400">
              Section Heading (h2)
            </label>
            <input
              type="text"
              placeholder="The Necklace That Defines the Brand"
              value={signatureForm.heading}
              onChange={(e) => updateSignature("heading", e.target.value)}
              className={inputClass}
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-[0.2em] font-black text-stone-400">
              Product Subheading (h3)
            </label>
            <input
              type="text"
              placeholder="Luxury Necklace"
              value={signatureForm.subheading}
              onChange={(e) => updateSignature("subheading", e.target.value)}
              className={inputClass}
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-[0.2em] font-black text-stone-400">
              Body Text (p)
            </label>
            <textarea
              rows={3}
              placeholder="Experience timeless elegance..."
              value={signatureForm.bodyText}
              onChange={(e) => updateSignature("bodyText", e.target.value)}
              className={`${inputClass} resize-none`}
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-[0.2em] font-black text-stone-400">
              CTA Button Text
            </label>
            <input
              type="text"
              placeholder="View Necklace"
              value={signatureForm.ctaText}
              onChange={(e) => updateSignature("ctaText", e.target.value)}
              className={inputClass}
            />
          </div>
        </div>
      </section>
 
      {/* Save button — bottom of page */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-8 py-3.5 bg-stone-900 text-white text-[10px] uppercase tracking-[0.2em] font-black rounded-xl hover:bg-stone-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>
 
    </div>
  );
}