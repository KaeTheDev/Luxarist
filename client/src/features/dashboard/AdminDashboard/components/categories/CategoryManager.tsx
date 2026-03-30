/**
 * Purpose: Admin panel for managing all site categories — create, edit, delete.
 * Allows admins to control category names, slugs, hero images, featured images,
 * descriptions, and the isFeatured toggle that drives the homepage bento grid.
 *
 * Responsibilities:
 * - Fetch and display all categories in a table on mount.
 * - Open a slide-in form panel for creating or editing a category.
 * - Auto-generate slug from name if not manually entered.
 * - Delete categories with an inline confirmation step.
 * - Show Toast feedback on all operations.
 *
 * Usage:
 *   <CategoryManager />  (mounted at /admin/categories)
 */

import { useState, useEffect } from "react";
import { Loader2, Plus, Pencil, Trash2, Save, X, ImageIcon } from "lucide-react";
import { useAuth } from "../../../../../context/AuthContext";
import { API_URL, getAuthHeaders } from "../../../../../api/config";
import Toast from "../../../../../common/ui/Toast";
import { useFadeIn } from "../hooks/useFadeIn";

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

interface Category {
  _id: string;
  name: string;
  slug: string;
  featuredImage: string;
  heroImage: string;
  description: string;
  isFeatured: boolean;
  productCount: number;
}

interface CategoryForm {
  name: string;
  slug: string;
  featuredImage: string;
  heroImage: string;
  description: string;
  isFeatured: boolean;
}

const EMPTY_FORM: CategoryForm = {
  name: "",
  slug: "",
  featuredImage: "",
  heroImage: "",
  description: "",
  isFeatured: false,
};

const inputClass =
  "w-full px-4 py-3 bg-stone-50 border border-stone-100 rounded-xl text-sm text-stone-900 placeholder:text-stone-300 focus:outline-none focus:border-stone-400 focus:bg-white transition-all duration-200";

// ─────────────────────────────────────────────────────────────────────────────
// CategoryManager
// ─────────────────────────────────────────────────────────────────────────────

export default function CategoryManager() {
  const { token } = useAuth();
  const visible = useFadeIn();

  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  // Form panel state
  const [formOpen, setFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<CategoryForm>(EMPTY_FORM);

  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  const showToast = (message: string, type: "success" | "error" = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  // ── Fetch categories ───────────────────────────────────────────────────────

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`${API_URL}/categories`);
        if (!res.ok) throw new Error("Failed to fetch categories.");
        const data = await res.json();
        setCategories(Array.isArray(data) ? data : []);
      } catch (err: any) {
        showToast(err.message, "error");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  // ── Form helpers ───────────────────────────────────────────────────────────

  const updateForm = (field: keyof CategoryForm, value: string | boolean) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  // Auto-generate slug from name if slug hasn't been manually edited
  const handleNameChange = (value: string) => {
    setForm((prev) => ({
      ...prev,
      name: value,
      // Only auto-generate if slug is empty or was auto-generated from the previous name
      slug: prev.slug === "" || prev.slug === prev.name.toLowerCase().replace(/\s+/g, "-")
        ? value.toLowerCase().replace(/\s+/g, "-")
        : prev.slug,
    }));
  };

  const openCreate = () => {
    setEditingId(null);
    setForm(EMPTY_FORM);
    setFormOpen(true);
  };

  const openEdit = (category: Category) => {
    setEditingId(category._id);
    setForm({
      name: category.name,
      slug: category.slug,
      featuredImage: category.featuredImage,
      heroImage: category.heroImage,
      description: category.description,
      isFeatured: category.isFeatured,
    });
    setFormOpen(true);
  };

  const closeForm = () => {
    setFormOpen(false);
    setEditingId(null);
    setForm(EMPTY_FORM);
  };

  // ── Save (create or update) ────────────────────────────────────────────────

  const handleSave = async () => {
    if (!form.name || !form.featuredImage || !form.heroImage || !form.description) {
      showToast("Please fill in all required fields.", "error");
      return;
    }

    setSaving(true);
    try {
      const url = editingId
        ? `${API_URL}/admin/categories/${editingId}`
        : `${API_URL}/admin/categories`;

      const res = await fetch(url, {
        method: editingId ? "PUT" : "POST",
        headers: getAuthHeaders(token),
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message ?? "Failed to save category.");
      }

      const saved: Category = await res.json();

      if (editingId) {
        setCategories((prev) => prev.map((c) => (c._id === editingId ? saved : c)));
        showToast("Category updated successfully.");
      } else {
        setCategories((prev) => [saved, ...prev]);
        showToast("Category created successfully.");
      }

      closeForm();
    } catch (err: any) {
      showToast(err.message ?? "Something went wrong.", "error");
    } finally {
      setSaving(false);
    }
  };

  // ── Delete ─────────────────────────────────────────────────────────────────

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    try {
      const res = await fetch(`${API_URL}/admin/categories/${id}`, {
        method: "DELETE",
        headers: getAuthHeaders(token),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message ?? "Failed to delete category.");
      }

      setCategories((prev) => prev.filter((c) => c._id !== id));
      setConfirmDeleteId(null);
      showToast("Category deleted.");
    } catch (err: any) {
      showToast(err.message ?? "Something went wrong.", "error");
    } finally {
      setDeletingId(null);
    }
  };

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <div className={`space-y-8 pb-20 transition-opacity duration-500 ${visible ? "opacity-100" : "opacity-0"}`}>

      {toast && (
        <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
      )}

      {/* Page header */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-stone-100 pb-8">
        <div>
          <h2 className="text-3xl font-serif text-stone-900 tracking-tight italic">
            Categories
          </h2>
          <p className="text-sm text-stone-500 font-light mt-1">
            Manage collections — names, images, hero content, and featured status.
          </p>
        </div>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 px-6 py-3.5 bg-stone-900 text-white text-[10px] uppercase tracking-[0.2em] font-black rounded-xl hover:bg-stone-700 transition-all shrink-0"
        >
          <Plus size={14} />
          New Category
        </button>
      </header>

      {/* Categories table */}
      {loading ? (
        <div className="h-64 flex items-center justify-center">
          <Loader2 className="animate-spin text-stone-200" size={40} />
        </div>
      ) : categories.length === 0 ? (
        <div className="py-20 text-center bg-white border border-stone-100 rounded-3xl">
          <p className="text-stone-400 italic font-light">No categories yet. Create one above.</p>
        </div>
      ) : (
        <div className="bg-white border border-stone-100 rounded-3xl overflow-hidden">
          {/* Table header */}
          <div className="hidden md:grid grid-cols-12 gap-4 px-8 py-4 bg-stone-50/60 border-b border-stone-100">
            <span className="col-span-1 text-[9px] uppercase tracking-[0.3em] font-black text-stone-400">Image</span>
            <span className="col-span-3 text-[9px] uppercase tracking-[0.3em] font-black text-stone-400">Name</span>
            <span className="col-span-2 text-[9px] uppercase tracking-[0.3em] font-black text-stone-400">Slug</span>
            <span className="col-span-3 text-[9px] uppercase tracking-[0.3em] font-black text-stone-400">Description</span>
            <span className="col-span-1 text-[9px] uppercase tracking-[0.3em] font-black text-stone-400">Featured</span>
            <span className="col-span-1 text-[9px] uppercase tracking-[0.3em] font-black text-stone-400">Products</span>
            <span className="col-span-1 text-[9px] uppercase tracking-[0.3em] font-black text-stone-400 text-right">Actions</span>
          </div>

          {/* Rows */}
          {categories.map((category, idx) => (
            <div
              key={category._id}
              className={`grid grid-cols-1 md:grid-cols-12 gap-4 items-center px-8 py-5 ${
                idx < categories.length - 1 ? "border-b border-stone-50" : ""
              }`}
            >
              {/* Featured image thumbnail */}
              <div className="md:col-span-1">
                <div className="w-12 h-12 rounded-xl overflow-hidden bg-stone-50 border border-stone-100 shrink-0">
                  {category.featuredImage ? (
                    <img
                      src={category.featuredImage}
                      alt={category.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <ImageIcon size={16} className="text-stone-200" />
                    </div>
                  )}
                </div>
              </div>

              {/* Name */}
              <div className="md:col-span-3">
                <p className="text-sm font-semibold text-stone-900">{category.name}</p>
              </div>

              {/* Slug */}
              <div className="md:col-span-2">
                <p className="text-xs text-stone-400 font-mono">{category.slug}</p>
              </div>

              {/* Description */}
              <div className="md:col-span-3">
                <p className="text-xs text-stone-400 line-clamp-2 font-light">{category.description}</p>
              </div>

              {/* isFeatured badge */}
              <div className="md:col-span-1">
                <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                  category.isFeatured
                    ? "bg-emerald-50 text-emerald-600"
                    : "bg-stone-50 text-stone-400"
                }`}>
                  {category.isFeatured ? "Yes" : "No"}
                </span>
              </div>

              {/* Product count */}
              <div className="md:col-span-1">
                <p className="text-sm text-stone-500">{category.productCount}</p>
              </div>

              {/* Actions */}
              <div className="md:col-span-1 flex items-center justify-end gap-2">
                <button
                  onClick={() => openEdit(category)}
                  className="p-2 text-stone-300 hover:text-stone-900 transition-colors"
                  aria-label="Edit category"
                >
                  <Pencil size={15} />
                </button>

                {confirmDeleteId === category._id ? (
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleDelete(category._id)}
                      disabled={deletingId === category._id}
                      className="px-3 py-1 bg-red-500 text-white text-[9px] font-black uppercase tracking-widest rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50"
                    >
                      {deletingId === category._id ? "..." : "Confirm"}
                    </button>
                    <button
                      onClick={() => setConfirmDeleteId(null)}
                      className="p-1 text-stone-300 hover:text-stone-900 transition-colors"
                    >
                      <X size={13} />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setConfirmDeleteId(category._id)}
                    className="p-2 text-stone-300 hover:text-red-400 transition-colors"
                    aria-label="Delete category"
                  >
                    <Trash2 size={15} />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── Form Panel (slide-in from right) ──────────────────────────────── */}
      {formOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
            onClick={closeForm}
          />

          {/* Panel */}
          <div className="fixed top-0 right-0 h-full w-full max-w-lg bg-white shadow-2xl z-50 flex flex-col animate-in slide-in-from-right duration-300">

            {/* Panel header */}
            <div className="flex items-center justify-between px-8 py-6 border-b border-stone-100">
              <div>
                <h3 className="text-base font-semibold text-stone-900 tracking-tight">
                  {editingId ? "Edit Category" : "New Category"}
                </h3>
                <p className="text-xs text-stone-400 font-light mt-0.5">
                  {editingId ? "Update category details." : "Add a new collection to the store."}
                </p>
              </div>
              <button
                onClick={closeForm}
                className="p-2 text-stone-300 hover:text-stone-900 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Form fields */}
            <div className="flex-1 overflow-y-auto px-8 py-6 space-y-5">

              {/* Name */}
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-[0.2em] font-black text-stone-400">
                  Name <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Bracelets"
                  value={form.name}
                  onChange={(e) => handleNameChange(e.target.value)}
                  className={inputClass}
                />
              </div>

              {/* Slug */}
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-[0.2em] font-black text-stone-400">
                  Slug <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  placeholder="bracelets"
                  value={form.slug}
                  onChange={(e) => updateForm("slug", e.target.value.toLowerCase().replace(/\s+/g, "-"))}
                  className={`${inputClass} font-mono`}
                />
                <p className="text-[10px] text-stone-300 italic">
                  Auto-generated from name. Used in URL: /collections/
                  <span className="font-mono">{form.slug || "slug"}</span>
                </p>
              </div>

              {/* Featured Image URL */}
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-[0.2em] font-black text-stone-400">
                  Featured Image URL (card thumbnail) <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  placeholder="https://ik.imagekit.io/..."
                  value={form.featuredImage}
                  onChange={(e) => updateForm("featuredImage", e.target.value)}
                  className={inputClass}
                />
                {form.featuredImage && (
                  <div className="h-28 rounded-xl overflow-hidden border border-stone-100">
                    <img src={form.featuredImage} alt="Featured preview" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>

              {/* Hero Image URL */}
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-[0.2em] font-black text-stone-400">
                  Hero Image URL (category page banner) <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  placeholder="https://ik.imagekit.io/..."
                  value={form.heroImage}
                  onChange={(e) => updateForm("heroImage", e.target.value)}
                  className={inputClass}
                />
                {form.heroImage && (
                  <div className="h-28 rounded-xl overflow-hidden border border-stone-100">
                    <img src={form.heroImage} alt="Hero preview" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>

              {/* Description */}
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-[0.2em] font-black text-stone-400">
                  Description <span className="text-red-400">*</span>
                </label>
                <textarea
                  rows={3}
                  placeholder="Describe this collection..."
                  value={form.description}
                  onChange={(e) => updateForm("description", e.target.value)}
                  className={`${inputClass} resize-none`}
                />
              </div>

              {/* isFeatured toggle */}
              <div className="flex items-center justify-between p-4 bg-stone-50 rounded-2xl">
                <div>
                  <p className="text-sm font-semibold text-stone-900">Featured on Homepage</p>
                  <p className="text-xs text-stone-400 font-light mt-0.5">
                    Show this category in the homepage bento grid.
                  </p>
                </div>
                <button
                  onClick={() => updateForm("isFeatured", !form.isFeatured)}
                  className={`relative w-12 h-6 rounded-full transition-colors duration-200 ${
                    form.isFeatured ? "bg-stone-900" : "bg-stone-200"
                  }`}
                >
                  <span
                    className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform duration-200 ${
                      form.isFeatured ? "translate-x-7" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>

            </div>

            {/* Panel footer */}
            <div className="px-8 py-6 border-t border-stone-100 flex gap-3">
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-stone-900 text-white text-[10px] uppercase tracking-[0.2em] font-black rounded-xl hover:bg-stone-700 transition-all disabled:opacity-50"
              >
                {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
                {saving ? "Saving..." : editingId ? "Save Changes" : "Create Category"}
              </button>
              <button
                onClick={closeForm}
                className="px-6 py-3.5 border border-stone-200 text-stone-600 text-[10px] uppercase tracking-[0.2em] font-black rounded-xl hover:border-stone-400 transition-all"
              >
                Cancel
              </button>
            </div>

          </div>
        </>
      )}

    </div>
  );
}