import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { fetchCategoryBySlug } from "../../api/fetchCategoryBySlug";
import { fetchProductsByCategory } from "../../api/fetchProductsByCategory";

import type { Category } from "../../types/Category";
import type { Product } from "../../types/Product";

import { CategoryFilters, type FiltersState } from "./CategoryFilters";
import { CategoryHero } from "./CategoryHero";
import { ProductList } from "../../common/ui/ProductList";

export function CategoryPage() {
  const { slug: slugParam } = useParams<{ slug: string }>();

  const [category, setCategory] = useState<Category | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [pagination, setPagination] = useState<any>(null);

  const [filters, setFilters] = useState<FiltersState>({
    page: 1,
    limit: 12,
  });

  // Throw an error or handle missing slug immediately
  if (!slugParam) {
    throw new Error("Category slug is required in the URL");
  }

  const slug: string = slugParam;

  // Fetch category hero data
  useEffect(() => {
    async function loadCategory() {
      try {
        const data = await fetchCategoryBySlug({ slug });
        setCategory(data);
      } catch (error) {
        console.error("Failed to load category:", error);
      }
    }

    loadCategory();
  }, [slug]);

  // Fetch products whenever filters change
  useEffect(() => {
    if (!slug) return;
    async function loadProducts() {
      try {
        const data = await fetchProductsByCategory({
          slug,
          ...filters,
        });
        setProducts(data.products);
        setPagination(data.pagination);
      } catch (error) {
        console.error("Failed to load products:", error);
      }
    }
    loadProducts();
  }, [slug, filters]);

  if (!category) {
    return (
      <div className="h-screen flex items-center justify-center text-gray-400 animate-pulse">
        Loading Collection...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <CategoryHero
        title={category.name}
        description={category.description}
        imageUrl={category.heroImage}
        count={products.length}
      />
      {/* Main Content Area */}
      <main className="container mx-auto px-6 nd:px-12 lg:px-20 py-12">
      <div className="flex flex-row justify-between items-center mb-12 border-b border-gray-100 pb-6">
          {/* FILTERS */}
          <CategoryFilters filters={filters} setFilters={setFilters} />
        </div>
        {/* Product Grid */}
        <section>
          <ProductList products={products} />
        </section>

        {/* Pagination */}
        {pagination && pagination.pages > 1 && (
          <div className="mt-20 flex justify-center border-t border-gray-100 pt-10">
            <p className="text-xs uppercase tracking-widest text-gray-400">
              Page {pagination.page} of {pagination.pages}
            </p>
          </div>
        )}
      </main>
    </div>
  );
}